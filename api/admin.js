// POST /api/admin { key, action, ... } → panel oculto (contrasinal na variable ADMIN_KEY)
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  if (req.method !== "POST") return L.send(res, 405, { error: "method" });
  const b = await L.body(req);
  if (!L.isAdmin(b.key)) return L.send(res, 401, { error: "key" });
  await L.init();
  const today = L.todayN();
  switch (b.action){
    case "ping": return L.send(res, 200, { ok: true, today });
    case "orde": {
      const list = await L.preview(today, Math.max(7, Math.min(120, +b.days || 30)));
      const off = (await L.q("select astro from cal_off")).rows.map(x => x.astro);
      return L.send(res, 200, { today, list, off });
    }
    case "fixar": { // escoller o astro dun día futuro
      const n = parseInt(b.n, 10);
      if (!(n > today && n >= 1) || !L.CAT[b.astro]) return L.send(res, 400, { error: "datos" });
      await L.q("insert into cal_orde (n, astro, manual) values ($1, $2, true) on conflict (n) do update set astro = excluded.astro, manual = true", [n, b.astro]);
      return L.send(res, 200, { ok: true });
    }
    case "soltar": { // quitar un día fixado (volve á orde automática)
      const n = parseInt(b.n, 10);
      if (!(n > today)) return L.send(res, 400, { error: "datos" });
      await L.q("delete from cal_orde where n = $1 and manual", [n]);
      return L.send(res, 200, { ok: true });
    }
    case "off": { // activar / desactivar un astro como obxectivo
      if (!L.CAT[b.astro]) return L.send(res, 400, { error: "datos" });
      if (b.off) await L.q("insert into cal_off (astro) values ($1) on conflict do nothing", [b.astro]);
      else await L.q("delete from cal_off where astro = $1", [b.astro]);
      return L.send(res, 200, { ok: true });
    }
    case "xogadores": {
      const r = await L.q(`select p.uid, p.name, p.hidden, p.created_at, p.last_seen, count(r.n)::int partidas, coalesce(sum(r.score),0)::int puntos
        from cal_players p left join cal_results r on r.uid = p.uid group by p.uid order by (p.name is null), p.last_seen desc limit 300`);
      const d = await L.q(`select n, count(*)::int xogadores, sum(case when found then 1 else 0 end)::int atopados, round(avg(tries),1)::float intentos
        from cal_results where n > $1 group by n order by n desc`, [today - 14]);
      return L.send(res, 200, { today, players: r.rows, days: d.rows });
    }
    case "agochar": await L.q("update cal_players set hidden = $2 where uid = $1", [b.uid, !!b.hidden]); return L.send(res, 200, { ok: true });
    case "borrarnome": await L.q("update cal_players set name = null where uid = $1", [b.uid]); return L.send(res, 200, { ok: true });
    default: return L.send(res, 400, { error: "action" });
  }
});
