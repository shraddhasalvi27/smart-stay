import { NextResponse } from "next/server";
import { driver } from "@/lib/congodb";

export async function GET() {
  const session = driver.session();

  try {
    await driver.verifyConnectivity();
    const result = await session.run(`
      RETURN "SmartStay Connected!" AS message
    `);
    const message = result.records[0].get("message");
    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("CognoDB error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection/query failed",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}