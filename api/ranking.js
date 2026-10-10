// GET /api/ranking?t=hoxe|semana|mes|sempre&n=50&uid=...
// Devolve os mellores con nome visible (posto contado entre eles) e, se se pasa uid, o posto desa persoa entre todos
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  const url = new URL(req.url, "http://x"), t = url.searchParams.get("t") || "hoxe", uid = url.searchParams.get("uid") || "";
  const lim = Math.max(1, Math.min(100, parseInt(url.searchParams.get("n"), 10) || 50));
  const today = L.todayN(); // "hoxe" segundo a hora de Madrid
  await L.init();
  const R = { hoxe: [today, today, 1], semana: [today - 6, today, 5], mes: [L.firstOfMonthN(today), today, 9999], sempre: [1, today, 99999] }[t];
  if (!R) return L.send(res, 400, { error: "tab" });
  const base = `
    with s as (select uid, score, row_number() over (partition by uid order by score desc) rn from cal_results where n between $1 and $2),
    a as (select uid, sum(score)::int score, count(*)::int days from s where rn <= $3 group by uid)`;
  const r = await L.q(base + `,
    v as (select a.* from a join cal_players p on p.uid = a.uid where p.name is not null and not p.hidden)
    select v.uid, v.score, v.days, (rank() over (order by v.score desc))::int pos, p.name
    from v join cal_players p on p.uid = v.uid order by v.score desc, p.name limit $4`, [R[0], R[1], R[2], lim]);
  const rows = r.rows.map(x => ({ name: x.name, score: x.score, days: x.days, pos: x.pos, me: !!uid && x.uid === uid }));
  let me = null;
  if (uid){
    const m = await L.q(base + `,
      k as (select a.*, rank() over (order by a.score desc) pos, count(*) over () tot from a)
      select pos::int, tot::int, score, days from k where uid = $4`, [R[0], R[1], R[2], uid]);
    if (m.rows.length) me = m.rows[0];
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  L.send(res, 200, { t, today, rows, me });
});
