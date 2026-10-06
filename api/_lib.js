// Utilidades comúns das funcións de Vercel (os ficheiros que empezan por "_" non son rutas).
const { Pool } = require("pg");
const crypto = require("crypto");
const { STARS_RAW, DSO_RAW } = require("../data.js");

/* ---------- Configuración do xogo (igual que no navegador) ---------- */
const MAX_TRIES = 10, WIN_DEG = 0.6;
const EPOCH_UTC = Date.UTC(2026, 9, 10); // reto nº 1 = 10/10/2026 (estrea)
const EPOCH_TAG = "2026-10-10";
const PINNED = ["Betelgeuse","Polaris","M31","Sirius","Antares","Vega","M45","Proxima Centauri","Deneb","SGRA"];

/* ---------- Catálogo ---------- */
const CAT = {};
STARS_RAW.forEach(r => { CAT[r[0]] = { id: r[0], lon: r[2]*15, lat: r[3] }; });
DSO_RAW.forEach(r => { CAT[r[0]] = { id: r[0], lon: r[2]*15, lat: r[3] }; });
const IDS = Object.keys(CAT);

const rad = Math.PI / 180;
function angDist(a, b){
  const s = Math.sin((b[1]-a[1])*rad/2)**2 + Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin((b[0]-a[0])*rad/2)**2;
  return 2*Math.asin(Math.min(1, Math.sqrt(s))) / rad;
}
function mulberry(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- Datas: o día cambia á medianoite de Madrid ---------- */
function dayFromDate(y, m, d){ return Math.round((Date.UTC(y, m-1, d) - EPOCH_UTC) / 86400000) + 1; }
function todayN(){
  const s = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const [y, m, d] = s.split("-").map(Number); return dayFromDate(y, m, d);
}
function dateOf(n){ const t = new Date(EPOCH_UTC + (n-1)*86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth()+1, d: t.getUTCDate() }; }
function firstOfMonthN(n){ const { y, m } = dateOf(n); return dayFromDate(y, m, 1); }

/* ---------- Base de datos ---------- */
let pool = null, ready = null;
function db(){
  if (!pool){
    let url = process.env.DATABASE_URL || "";
    // node-postgres falla co certificado de Supabase se a cadea leva sslmode: quítase e fíxase o SSL aquí
    url = url.replace(/([?&])sslmode=[^&]*(&|$)/, (m, a, b) => b ? a : "").replace(/[?&]$/, "");
    pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, max: 3, idleTimeoutMillis: 10000 });
  }
  return pool;
}
const SCHEMA = `
create table if not exists cal_config (k text primary key, v text not null);
create table if not exists cal_orde (n int primary key, astro text not null, manual boolean not null default false, created_at timestamptz not null default now());
create table if not exists cal_off (astro text primary key);
create table if not exists cal_players (uid text primary key, key_hash text not null, name text, hidden boolean not null default false,
  created_at timestamptz not null default now(), last_seen timestamptz not null default now());
create table if not exists cal_results (uid text not null references cal_players(uid) on delete cascade, n int not null,
  score int not null, tries int not null, found boolean not null, secs int not null, created_at timestamptz not null default now(), primary key (uid, n));
create index if not exists cal_results_n on cal_results (n);
alter table cal_config enable row level security;
alter table cal_orde enable row level security;
alter table cal_off enable row level security;
alter table cal_players enable row level security;
alter table cal_results enable row level security;
`;
async function q(text, params){ return db().query(text, params); }
async function init(){
  if (!ready) ready = (async () => {
    await q(SCHEMA);
    await q("insert into cal_config (k, v) values ('seed', $1) on conflict (k) do nothing", [crypto.randomBytes(4).toString("hex")]);
    await q("insert into cal_config (k, v) values ('ptr', '0'), ('upto', '0') on conflict (k) do nothing");
    // se cambia a data do reto nº 1, a orde e as partidas anteriores xa non valen: empézase de cero
    const e = await q("select v from cal_config where k = 'epoch'");
    if (!e.rows.length || e.rows[0].v !== EPOCH_TAG){
      await q("delete from cal_results"); await q("delete from cal_orde");
      await q("update cal_config set v = '0' where k in ('ptr', 'upto')");
      await q("insert into cal_config (k, v) values ('epoch', $1) on conflict (k) do update set v = excluded.v", [EPOCH_TAG]);
    }
  })().catch(e => { ready = null; throw e; });
  return ready;
}
async function getConfig(client){
  const r = await (client || db()).query("select k, v from cal_config");
  return Object.fromEntries(r.rows.map(x => [x.k, x.v]));
}

/* ---------- Orde dos retos ----------
   Unha secuencia base (uns famosos primeiro e o resto barallado cunha semente secreta gardada na base de datos).
   Cada día gárdase en cal_orde, así o pasado nunca cambia aínda que se desactiven astros ou se fixen días. */
function baseSequence(seed){
  const rest = IDS.filter(id => !PINNED.includes(id)), r = mulberry(parseInt(seed, 16) || 2026);
  for (let i = rest.length-1; i > 0; i--){ const j = Math.floor(r()*(i+1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
  return PINNED.filter(id => CAT[id]).concat(rest);
}
// Simula (ou executa) a elección día a día desde "upto+1" ata "until"
function plan(base, ptr, upto, until, existing, off){
  const out = {}, recent = [];
  for (let d = Math.max(0, upto - 60); d <= upto; d++) if (existing[d]) recent.push(existing[d]);
  for (let d = upto + 1; d <= until; d++){
    let pick = existing[d] || null, manual = !!pick;
    if (!pick){
      for (let k = 0; k < base.length; k++){
        const c = base[(ptr + k) % base.length];
        if (off.has(c) || recent.slice(-60).includes(c)) continue;
        pick = c; ptr = ptr + k + 1; break;
      }
      if (!pick){ pick = base[ptr % base.length]; ptr++; }
    }
    out[d] = { astro: pick, manual };
    recent.push(pick);
  }
  return { out, ptr };
}
async function loadOrde(client, from, to){
  const r = await client.query("select n, astro, manual from cal_orde where n between $1 and $2", [from, to]);
  const m = {}; r.rows.forEach(x => { m[x.n] = x.astro; }); return { map: m, rows: r.rows };
}
async function materialize(today){
  await init();
  if (today < 1) return; // antes da estrea non hai retos
  const cfg0 = await getConfig();
  if (+cfg0.upto >= today) return;
  const client = await db().connect();
  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock(424242)");
    const cfg = await getConfig(client), upto = +cfg.upto;
    if (upto < today){
      const base = baseSequence(cfg.seed);
      const off = new Set((await client.query("select astro from cal_off")).rows.map(x => x.astro));
      const { map } = await loadOrde(client, Math.max(0, upto - 60), today);
      const { out, ptr } = plan(base, +cfg.ptr, upto, today, map, off);
      for (const d in out) if (!map[d]) await client.query("insert into cal_orde (n, astro) values ($1, $2) on conflict (n) do nothing", [+d, out[d].astro]);
      await client.query("update cal_config set v = $1 where k = 'ptr'", [String(ptr)]);
      await client.query("update cal_config set v = $1 where k = 'upto'", [String(today)]);
    }
    await client.query("commit");
  } catch (e){ await client.query("rollback").catch(() => {}); throw e; }
  finally { client.release(); }
}
// Vista previa dos próximos días (non garda nada)
async function preview(today, days){
  await materialize(today);
  const client = await db().connect();
  try {
    const cfg = await getConfig(client), base = baseSequence(cfg.seed);
    const off = new Set((await client.query("select astro from cal_off")).rows.map(x => x.astro));
    const { map, rows } = await loadOrde(client, Math.max(0, today - 60), today + days);
    const { out } = plan(base, +cfg.ptr, Math.max(today, +cfg.upto), today + days, map, off);
    const manual = new Set(rows.filter(x => x.manual).map(x => +x.n));
    const list = [];
    for (let d = Math.max(1, today - 7); d <= today + days; d++){
      const astro = d <= today ? map[d] : (out[d] || {}).astro;
      list.push({ n: d, astro, manual: manual.has(d), past: d < today, today: d === today });
    }
    return list;
  } finally { client.release(); }
}

/* ---------- Puntuación (a mesma lóxica que no navegador) ---------- */
function tuneScore(d){ return Math.max(0, Math.min(1, 1 - Math.log(1 + d)/Math.log(181))); }
function scoreGame(targetId, guesses, secs){
  const t = CAT[targetId]; let found = false, tries = 0, best = 0;
  for (let i = 0; i < guesses.length; i++){
    const g = guesses[i];
    const d = (g.id && g.id === targetId) ? 0 : angDist([+g.lon, +g.lat], [t.lon, t.lat]);
    best = Math.max(best, tuneScore(d)); tries = i + 1;
    if (d <= WIN_DEG){ found = true; break; }
  }
  const score = found
    ? 600 + 40*(MAX_TRIES - tries) + Math.round(40*Math.max(0, Math.min(1, (300 - secs)/240)))
    : 5 * Math.min(99, Math.round(100 * best));
  return { found, tries, score };
}

/* ---------- Xogadores anónimos ---------- */
const sha = s => crypto.createHash("sha256").update(String(s)).digest("hex");
function validIds(uid, key){ return /^[a-f0-9]{16,40}$/.test(uid || "") && /^[a-f0-9]{32,64}$/.test(key || ""); }
async function player(uid, key){ // crea o xogador se non existe; devolve false se a clave non coincide
  if (!validIds(uid, key)) return false;
  const h = sha(key);
  const r = await q("insert into cal_players (uid, key_hash) values ($1, $2) on conflict (uid) do update set last_seen = now() returning key_hash", [uid, h]);
  return r.rows[0].key_hash === h;
}
function cleanName(s){
  if (s == null) return null;
  s = String(s).normalize("NFC").replace(/\s+/g, " ").trim();
  if (!s) return null;
  if (!/^[\p{L}\p{N} ._'·-]{2,20}$/u.test(s)) return undefined;
  return s;
}

/* ---------- Administración ---------- */
function isAdmin(key){
  const real = process.env.ADMIN_KEY || "";
  if (!real || !key) return false;
  const a = Buffer.from(sha(key)), b = Buffer.from(sha(real));
  return crypto.timingSafeEqual(a, b);
}

/* ---------- HTTP ---------- */
function send(res, status, obj){ res.statusCode = status; res.setHeader("Content-Type", "application/json; charset=utf-8"); res.setHeader("Cache-Control", "no-store"); res.end(JSON.stringify(obj)); }
async function body(req){
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string"){ try { return JSON.parse(req.body); } catch(e){ return {}; } }
  let raw = ""; for await (const c of req) { raw += c; if (raw.length > 20000) break; }
  try { return JSON.parse(raw || "{}"); } catch(e){ return {}; }
}
function handler(fn){
  return async (req, res) => {
    try { await fn(req, res); }
    catch (e){ console.error(e); send(res, 500, { error: "server" }); }
  };
}

module.exports = { plan, baseSequence, CAT, IDS, MAX_TRIES, WIN_DEG, todayN, firstOfMonthN, dateOf, init, q, materialize, preview, scoreGame, player, cleanName, isAdmin, send, body, handler };
