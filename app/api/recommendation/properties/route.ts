import { NextRequest, NextResponse } from "next/server";
import { recommendProperties } from "@/lib/queries/properties";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId is required",
        },
        { status: 400 }
      );
    }

    const data = await recommendProperties(userId);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate recommendations",
      },
      { status: 500 }
    );
  }
}