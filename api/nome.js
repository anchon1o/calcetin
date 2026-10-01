// POST /api/nome { uid, key, name } → aparecer (ou deixar de aparecer, name: null) na clasificación
const L = require("./_lib");
module.exports = L.handler(async (req, res) => {
  if (req.method !== "POST") return L.send(res, 405, { error: "method" });
  const b = await L.body(req);
  await L.init();
  const name = L.cleanName(b.name);
  if (name === undefined) return L.send(res, 400, { error: "name" });
  if (!(await L.player(b.uid, b.key))) return L.send(res, 403, { error: "key" });
  await L.q("update cal_players set name = $2 where uid = $1", [b.uid, name]);
  L.send(res, 200, { ok: true, name });
});
