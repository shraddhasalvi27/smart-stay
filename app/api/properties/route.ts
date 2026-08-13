import { NextRequest, NextResponse } from "next/server";
// import { searchProperties } from "@/lib/queries/propertyRecommendation";
import { searchProperties } from "@/lib/queries/properties";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location") || undefined;

    const budgetParam = searchParams.get("maxBudget");

    const maxBudget = budgetParam
      ? Number(budgetParam)
      : undefined;

    const propertyType =
      searchParams.get("propertyType") || undefined;

    const data = await searchProperties({
      location,
      maxBudget,
      propertyType,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Property search error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search properties",
      },
      { status: 500 }
    );
  }
}