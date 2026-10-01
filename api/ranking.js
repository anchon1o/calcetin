// GET /api/ranking?t=hoxe|semana|mes|sempre&uid=... → os mellores (só quen ten nome) e o teu posto
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  const url = new URL(req.url, "http://x"), t = url.searchParams.get("t") || "hoxe", uid = url.searchParams.get("uid") || "";
  const today = L.todayN();
  await L.init();
  const R = { hoxe: [today, today, 1], semana: [today - 6, today, 5], mes: [L.firstOfMonthN(today), today, 9999], sempre: [0, today, 99999] }[t];
  if (!R) return L.send(res, 400, { error: "tab" });
  const r = await L.q(`
    with s as (select uid, score, row_number() over (partition by uid order by score desc) rn from cal_results where n between $1 and $2),
    a as (select uid, sum(score)::int score, count(*)::int days from s where rn <= $3 group by uid),
    k as (select a.*, rank() over (order by a.score desc) pos, count(*) over () tot from a)
    select k.uid, k.score, k.days, k.pos::int, k.tot::int, p.name, p.hidden from k join cal_players p on p.uid = k.uid
    where (p.name is not null and not p.hidden) or k.uid = $4 order by k.pos limit 60`, [R[0], R[1], R[2], uid]);
  const rows = r.rows.filter(x => x.name && !x.hidden).slice(0, 50).map(x => ({ name: x.name, score: x.score, days: x.days, pos: x.pos, me: x.uid === uid }));
  const m = r.rows.find(x => x.uid === uid);
  L.send(res, 200, { t, today, rows, me: m ? { pos: m.pos, tot: m.tot, score: m.score, days: m.days } : null });
});
