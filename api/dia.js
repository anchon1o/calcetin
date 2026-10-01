// GET /api/dia → número do reto de hoxe e o astro de cada día ata hoxe (nunca os futuros)
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  const today = L.todayN();
  await L.materialize(today);
  const r = await L.q("select n, astro from cal_orde where n <= $1 order by n", [today]);
  const ids = {}; r.rows.forEach(x => { ids[x.n] = x.astro; });
  L.send(res, 200, { today, ids });
});
