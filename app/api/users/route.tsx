import { NextResponse } from "next/server";
import { driver } from "@/lib/congodb";

export async function GET() {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (u:User)
            RETURN
                u.id AS id,
                u.name AS name,
                u.age AS age,
                u.budget AS budget,
                u.occupation AS occupation
            ORDER BY u.name
        `);

        const users = result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
            age: record.get("age"),
            budget: record.get("budget"),
            occupation: record.get("occupation"),
        }));

        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch users",
            },
            { status: 500 }
        );
    } finally {
        await session.close();
    }
}