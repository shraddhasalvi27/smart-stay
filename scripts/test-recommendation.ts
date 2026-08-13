import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// import { getPropertyRecommendations } from "../lib/queries/propertyRecommendation";
// import { getPropertyRecommendations } from "@/lib/queries/properties";

async function test() {
     const { getPropertyRecommendations } =
    await import("../lib/queries/properties");
  const recommendations = await getPropertyRecommendations("user-1");

  console.table(recommendations);
}

test();