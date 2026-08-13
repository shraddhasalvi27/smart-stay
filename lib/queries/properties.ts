import { driver } from "../congodb";

export async function getPropertyRecommendations(userId: string) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {id: $userId})
      MATCH (u)-[:LOOKING_IN]->(location:Location)
      MATCH (property:Property)-[:LOCATED_IN]->(location)
      MATCH (property)-[:HAS_ROOM]->(room:Room)

      WHERE
        property.rent <= u.budget
        AND room.available = true

      RETURN
        property.id AS propertyId,
        property.name AS propertyName,
        property.rent AS rent,
        property.type AS type,
        property.bedrooms AS bedrooms,
        location.name AS location,
        room.name AS roomName
      ORDER BY property.rent ASC
      `,
      { userId }
    );

    return result.records.map((record) => ({
      propertyId: record.get("propertyId"),
      propertyName: record.get("propertyName"),
      rent: record.get("rent"),
      type: record.get("type"),
      bedrooms: record.get("bedrooms"),
      location: record.get("location"),
      roomName: record.get("roomName"),
    }));
  } finally {
    await session.close();
  }
}

export async function searchProperties(filters: {
  location?: string;
  maxBudget?: number;
  propertyType?: string;
}) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (property:Property)-[:LOCATED_IN]->(location:Location)
      MATCH (property)-[:HAS_ROOM]->(room:Room)

      WHERE
        room.available = true
        AND ($location IS NULL OR location.name = $location)
        AND ($maxBudget IS NULL OR property.rent <= $maxBudget)
        AND ($propertyType IS NULL OR property.type = $propertyType)

      OPTIONAL MATCH (property)-[:NEAR_METRO]->(metro:MetroStation)

      RETURN
        property.id AS propertyId,
        property.name AS propertyName,
        property.rent AS rent,
        property.type AS type,
        property.bedrooms AS bedrooms,
        location.name AS location,
        room.name AS roomName,
        COUNT(metro) AS metroCount

      ORDER BY property.rent ASC
      `,
      {
        location: filters.location ?? null,
        maxBudget: filters.maxBudget ?? null,
        propertyType: filters.propertyType ?? null,
      }
    );

    return result.records.map((record) => ({
      propertyId: record.get("propertyId"),
      propertyName: record.get("propertyName"),
      rent: record.get("rent"),
      type: record.get("type"),
      bedrooms: record.get("bedrooms"),
      location: record.get("location"),
      roomName: record.get("roomName"),
      metroCount: record.get("metroCount"),
    }));
  } finally {
    await session.close();
  }
}