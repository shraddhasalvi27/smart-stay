import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
//initial testing for api
async function test() {
     const { recommendProperties } =
    await import("../lib/queries/properties");
  const recommendations = await recommendProperties("user-1");
  console.table(recommendations);
}

test();