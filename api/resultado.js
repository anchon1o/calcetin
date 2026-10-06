// POST /api/resultado { uid, key, n, guesses:[{lon,lat,id}], secs } → garda a partida (só a primeira de cada día conta)
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  if (req.method !== "POST") return L.send(res, 405, { error: "method" });
  const b = await L.body(req), today = L.todayN(), n = parseInt(b.n, 10);
  if (!(n >= Math.max(1, today - 2) && n <= today)) return L.send(res, 400, { error: "day" });
  const guesses = Array.isArray(b.guesses) ? b.guesses.slice(0, L.MAX_TRIES).filter(g => g && isFinite(g.lon) && isFinite(g.lat)) : [];
  if (!guesses.length) return L.send(res, 400, { error: "guesses" });
  if (!(await L.player(b.uid, b.key))) return L.send(res, 403, { error: "key" });
  await L.materialize(today);
  const t = await L.q("select astro from cal_orde where n = $1", [n]);
  if (!t.rows.length) return L.send(res, 400, { error: "day" });
  const secs = Math.max(0, Math.min(86400, Math.round(+b.secs || 0)));
  const s = L.scoreGame(t.rows[0].astro, guesses.map(g => ({ lon: +g.lon, lat: +g.lat, id: typeof g.id === "string" ? g.id : null })), secs);
  await L.q("insert into cal_results (uid, n, score, tries, found, secs) values ($1,$2,$3,$4,$5,$6) on conflict (uid, n) do nothing",
    [b.uid, n, s.score, s.tries, s.found, secs]);
  L.send(res, 200, { ok: true, score: s.score });
});
