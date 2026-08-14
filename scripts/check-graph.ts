import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
//tested wether graph is working or not - debugging purpose
async function checkGraph() {
  const { driver } = await import("../lib/congodb");

  const session = driver.session();

  try {
    await driver.verifyConnectivity();

    const result = await session.run(`
      MATCH (a)-[r]->(b)
      RETURN
        labels(a) AS fromType,
        a.name AS fromName,
        type(r) AS relationship,
        labels(b) AS toType,
        b.name AS toName
      LIMIT 50
    `);

    console.table(
      result.records.map((record) => ({
        from: `${record.get("fromType")} - ${record.get("fromName")}`,
        relationship: record.get("relationship"),
        to: `${record.get("toType")} - ${record.get("toName")}`,
      }))
    );
  } finally {
    await session.close();
    await driver.close();
  }
}
checkGraph();