import { driver } from "../congodb";


export async function recommendProperties(userId: string) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {id: $userId})

      // User's preferred location
      OPTIONAL MATCH (u)-[:LOOKING_IN]->(preferredLocation:Location)

      // User's preferred amenities
      OPTIONAL MATCH (u)-[:WANTS]->(wantedAmenity:Amenity)

      // User's lifestyle
      OPTIONAL MATCH (u)-[:PREFERS]->(lifestyle:Lifestyle)

      // User's workplace
      OPTIONAL MATCH (u)-[:WORKS_AT]->(company:Company)
      OPTIONAL MATCH (company)-[:LOCATED_IN]->(workLocation:Location)

      // Properties
      MATCH (p:Property)-[:LOCATED_IN]->(propertyLocation:Location)

      // Property amenities
      OPTIONAL MATCH (p)-[:HAS_AMENITY]->(propertyAmenity:Amenity)

      WITH
        u,
        p,
        propertyLocation,
        preferredLocation,
        workLocation,

        collect(DISTINCT wantedAmenity.id) AS wantedAmenities,
        collect(DISTINCT propertyAmenity.id) AS propertyAmenities

      // Count matching amenities
      WITH
        u,
        p,
        propertyLocation,
        preferredLocation,
        workLocation,
        wantedAmenities,
        propertyAmenities,

        size([
          amenity IN wantedAmenities
          WHERE amenity IN propertyAmenities
        ]) AS matchingAmenities

      // Calculate scores
      WITH
        u,
        p,
        propertyLocation,
        workLocation,
        matchingAmenities,

        CASE
          WHEN preferredLocation.id = propertyLocation.id
          THEN 30
          ELSE 0
        END AS locationScore,

        CASE
          WHEN p.rent <= u.budget
          THEN 25
          ELSE 0
        END AS budgetScore,

        CASE
          WHEN workLocation.id = propertyLocation.id
          THEN 15
          ELSE 0
        END AS workplaceScore,

        matchingAmenities * 10 AS amenityScore

      WITH
        p,
        propertyLocation,
        matchingAmenities,
        locationScore,
        budgetScore,
        workplaceScore,
        amenityScore,

        locationScore +
        budgetScore +
        workplaceScore +
        amenityScore AS totalScore

      RETURN
        p.id AS id,
        p.name AS name,
        p.rent AS rent,
        p.type AS type,
        p.bedrooms AS bedrooms,
        propertyLocation.name AS location,

        matchingAmenities,
        locationScore,
        budgetScore,
        workplaceScore,
        amenityScore,

        totalScore

      ORDER BY totalScore DESC
      `,
      {
        userId,
      }
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      rent: record.get("rent"),
      type: record.get("type"),
      bedrooms: record.get("bedrooms"),
      location: record.get("location"),

      score: record.get("totalScore"),

      breakdown: {
        location: record.get("locationScore"),
        budget: record.get("budgetScore"),
        workplace: record.get("workplaceScore"),
        amenities: record.get("amenityScore"),
      },

      matchingAmenities: record.get("matchingAmenities"),
    }));
  } finally {
    await session.close();
  }
}
