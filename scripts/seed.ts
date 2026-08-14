import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function seed() {
    const { driver } = await import("../lib/congodb");
    const session = driver.session();

    try {
        await driver.verifyConnectivity();

        // LOCATIONS
        await session.run(`
      UNWIND $locations AS location

      MERGE (l:Location {id: location.id})
      SET
        l.name = location.name,
        l.city = location.city
    `, {
            locations: [
                {
                    id: "loc-andheri",
                    name: "Andheri",
                    city: "Mumbai",
                },
                {
                    id: "loc-bandra",
                    name: "Bandra",
                    city: "Mumbai",
                },
                {
                    id: "loc-bkc",
                    name: "BKC",
                    city: "Mumbai",
                },
                {
                    id: "loc-powai",
                    name: "Powai",
                    city: "Mumbai",
                },
                {
                    id: "loc-ghatkopar",
                    name: "Ghatkopar",
                    city: "Mumbai",
                },
            ],
        });

        console.log(" Locations created");


        // AMENITIES
        await session.run(`
      UNWIND $amenities AS amenity

      MERGE (a:Amenity {id: amenity.id})
      SET a.name = amenity.name
    `, {
            amenities: [
                { id: "amenity-wifi", name: "WiFi" },
                { id: "amenity-parking", name: "Parking" },
                { id: "amenity-gym", name: "Gym" },
                { id: "amenity-laundry", name: "Laundry" },
                { id: "amenity-security", name: "24x7 Security" },
            ],
        });

        console.log("Amenities created");


        // LIFESTYLES
        await session.run(`
      UNWIND $lifestyles AS lifestyle

      MERGE (l:Lifestyle {id: lifestyle.id})
      SET l.name = lifestyle.name
    `, {
            lifestyles: [
                { id: "life-quiet", name: "Quiet" },
                { id: "life-social", name: "Social" },
                { id: "life-active", name: "Active" },
                { id: "life-work", name: "Work Focused" },
                {
                    userId: "user-5",
                    lifestyleId: "life-work",
                },
                {
                    userId: "user-6",
                    lifestyleId: "life-social",
                },
                {
                    userId: "user-7",
                    lifestyleId: "life-work",
                },
                {
                    userId: "user-8",
                    lifestyleId: "life-quiet",
                },
                {
                    userId: "user-9",
                    lifestyleId: "life-active",
                },
                {
                    userId: "user-10",
                    lifestyleId: "life-social",
                },
            ],
        });

        console.log(" Lifestyles created");


        // COMPANIES
        await session.run(`
      UNWIND $companies AS company

      MERGE (c:Company {id: company.id})
      SET c.name = company.name
    `, {
            companies: [
                { id: "company-tcs", name: "TCS" },
                { id: "company-infosys", name: "Infosys" },
                { id: "company-accenture", name: "Accenture" },
                { id: "company-google", name: "Google" },
            ],
        });

        console.log("Companies created");


        // USERS

        await session.run(`
      UNWIND $users AS user

      MERGE (u:User {id: user.id})
      SET
        u.name = user.name,
        u.age = user.age,
        u.budget = user.budget,
        u.occupation = user.occupation
    `, {
            users: [
                {
                    id: "user-1",
                    name: "Rahul",
                    age: 26,
                    budget: 20000,
                    occupation: "Software Developer",
                },
                {
                    id: "user-2",
                    name: "Priya",
                    age: 25,
                    budget: 18000,
                    occupation: "Designer",
                },
                {
                    id: "user-3",
                    name: "Ankit",
                    age: 28,
                    budget: 25000,
                    occupation: "Software Engineer",
                },
                {
                    id: "user-4",
                    name: "Neha",
                    age: 24,
                    budget: 17000,
                    occupation: "Marketing",
                },
                {
                    id: "user-5",
                    name: "Aarav",
                    age: 27,
                    budget: 22000,
                    occupation: "Product Manager",
                },
                {
                    id: "user-6",
                    name: "Isha",
                    age: 23,
                    budget: 16000,
                    occupation: "UI/UX Designer",
                },
                {
                    id: "user-7",
                    name: "Vikram",
                    age: 30,
                    budget: 28000,
                    occupation: "Data Scientist",
                },
                {
                    id: "user-8",
                    name: "Meera",
                    age: 26,
                    budget: 19000,
                    occupation: "HR Manager",
                },
                {
                    id: "user-9",
                    name: "Rohan",
                    age: 29,
                    budget: 24000,
                    occupation: "Backend Developer",
                },
                {
                    id: "user-10",
                    name: "Kavya",
                    age: 25,
                    budget: 21000,
                    occupation: "Marketing Manager",
                },
            ],
        });

        console.log("Users created");


        // PROPERTIES


        await session.run(`
      UNWIND $properties AS property

      MERGE (p:Property {id: property.id})
      SET
        p.name = property.name,
        p.rent = property.rent,
        p.type = property.type,
        p.bedrooms = property.bedrooms
    `, {
            properties: [
                {
                    id: "property-1",
                    name: "Green Heights",
                    rent: 18000,
                    type: "2BHK",
                    bedrooms: 2,
                },
                {
                    id: "property-2",
                    name: "Urban Nest",
                    rent: 15000,
                    type: "2BHK",
                    bedrooms: 2,
                },
                {
                    id: "property-3",
                    name: "Sky Residency",
                    rent: 22000,
                    type: "3BHK",
                    bedrooms: 3,
                },
                {
                    id: "property-4",
                    name: "Metro Heights",
                    rent: 16000,
                    type: "1BHK",
                    bedrooms: 1,
                },
                {
                    id: "property-5",
                    name: "Lakeview Residency",
                    rent: 20000,
                    type: "2BHK",
                    bedrooms: 2,
                },
                {
                    id: "property-6",
                    name: "Andheri Prime",
                    rent: 14000,
                    type: "1BHK",
                    bedrooms: 1,
                },
                {
                    id: "property-7",
                    name: "Bandra Elite",
                    rent: 26000,
                    type: "3BHK",
                    bedrooms: 3,
                },
                {
                    id: "property-8",
                    name: "Ghatkopar Gardens",
                    rent: 17000,
                    type: "2BHK",
                    bedrooms: 2,
                },
                {
                    id: "property-9",
                    name: "BKC Corporate Stay",
                    rent: 24000,
                    type: "2BHK",
                    bedrooms: 2,
                },
                {
                    id: "property-10",
                    name: "Powai Lake Homes",
                    rent: 19000,
                    type: "2BHK",
                    bedrooms: 2,
                },
            ],
        });

        console.log(" Properties created");


        // ROOMS


        await session.run(`
      UNWIND $rooms AS room

      MERGE (r:Room {id: room.id})
      SET
        r.name = room.name,
        r.rent = room.rent,
        r.type = room.type,
        r.available = room.available
    `, {
            rooms: [
                {
                    id: "room-1",
                    name: "Green Heights Room",
                    rent: 18000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-2",
                    name: "Urban Nest Room",
                    rent: 15000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-3",
                    name: "Sky Residency Room",
                    rent: 22000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-4",
                    name: "Metro Heights Room",
                    rent: 16000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-5",
                    name: "Lakeview Residency Room",
                    rent: 20000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-6",
                    name: "Andheri Prime Room",
                    rent: 14000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-7",
                    name: "Bandra Elite Room",
                    rent: 26000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-8",
                    name: "Ghatkopar Gardens Room",
                    rent: 17000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-9",
                    name: "BKC Corporate Room",
                    rent: 24000,
                    type: "Private",
                    available: true,
                },
                {
                    id: "room-10",
                    name: "Powai Lake Homes Room",
                    rent: 19000,
                    type: "Private",
                    available: true,
                },
            ],
        });

        console.log(" Rooms created");


        // METRO STATIONS


        await session.run(`
      UNWIND $stations AS station

      MERGE (m:MetroStation {id: station.id})
      SET m.name = station.name
    `, {
            stations: [
                { id: "metro-andheri", name: "Andheri Metro" },
                { id: "metro-bandra", name: "Bandra Metro" },
                { id: "metro-bkc", name: "BKC Metro" },
                { id: "metro-powai", name: "Powai Metro" },
            ],
        });

        console.log(" Metro stations created");

        console.log("🎉 All SmartStay nodes created!");
        // =========================
        // RELATIONSHIPS
        // =========================

        // PROPERTY → LOCATION
        await session.run(`
  UNWIND $connections AS connection

  MATCH (p:Property {id: connection.propertyId})
  MATCH (l:Location {id: connection.locationId})

  MERGE (p)-[:LOCATED_IN]->(l)
`, {
            connections: [
                { propertyId: "property-1", locationId: "loc-andheri" },
                { propertyId: "property-2", locationId: "loc-bandra" },
                { propertyId: "property-3", locationId: "loc-bkc" },
                { propertyId: "property-4", locationId: "loc-powai" },
            ],
        });

        console.log(" Properties connected to locations");


        // PROPERTY → ROOM
        await session.run(`
  UNWIND $connections AS connection

  MATCH (p:Property {id: connection.propertyId})
  MATCH (r:Room {id: connection.roomId})

  MERGE (p)-[:HAS_ROOM]->(r)
`, {
            connections: [
                { propertyId: "property-1", roomId: "room-1" },
                { propertyId: "property-2", roomId: "room-2" },
                { propertyId: "property-3", roomId: "room-3" },
                { propertyId: "property-4", roomId: "room-4" },
                {
                    propertyId: "property-5",
                    roomId: "room-5",
                },
                {
                    propertyId: "property-6",
                    roomId: "room-6",
                },
                {
                    propertyId: "property-7",
                    roomId: "room-7",
                },
                {
                    propertyId: "property-8",
                    roomId: "room-8",
                },
                {
                    propertyId: "property-9",
                    roomId: "room-9",
                },
                {
                    propertyId: "property-10",
                    roomId: "room-10",
                },
            ],
        });

        console.log("Properties connected to rooms");


        // PROPERTY → AMENITIES
        await session.run(`
  UNWIND $connections AS connection

  MATCH (p:Property {id: connection.propertyId})
  MATCH (a:Amenity {id: connection.amenityId})

  MERGE (p)-[:HAS_AMENITY]->(a)
`, {
            connections: [
                { propertyId: "property-1", amenityId: "amenity-wifi" },
                { propertyId: "property-1", amenityId: "amenity-gym" },
                { propertyId: "property-1", amenityId: "amenity-security" },

                { propertyId: "property-2", amenityId: "amenity-wifi" },
                { propertyId: "property-2", amenityId: "amenity-laundry" },
                { propertyId: "property-2", amenityId: "amenity-security" },

                { propertyId: "property-3", amenityId: "amenity-wifi" },
                { propertyId: "property-3", amenityId: "amenity-parking" },
                { propertyId: "property-3", amenityId: "amenity-gym" },
                { propertyId: "property-3", amenityId: "amenity-security" },

                { propertyId: "property-4", amenityId: "amenity-wifi" },
                { propertyId: "property-4", amenityId: "amenity-laundry" },
                // Lakeview Residency
                {
                    propertyId: "property-5",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-5",
                    amenityId: "amenity-gym",
                },
                {
                    propertyId: "property-5",
                    amenityId: "amenity-laundry",
                },

                // Andheri Prime
                {
                    propertyId: "property-6",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-6",
                    amenityId: "amenity-security",
                },

                // Bandra Elite
                {
                    propertyId: "property-7",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-7",
                    amenityId: "amenity-parking",
                },
                {
                    propertyId: "property-7",
                    amenityId: "amenity-gym",
                },
                {
                    propertyId: "property-7",
                    amenityId: "amenity-security",
                },

                // Ghatkopar Gardens
                {
                    propertyId: "property-8",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-8",
                    amenityId: "amenity-laundry",
                },
                {
                    propertyId: "property-8",
                    amenityId: "amenity-security",
                },

                // BKC Corporate Stay
                {
                    propertyId: "property-9",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-9",
                    amenityId: "amenity-gym",
                },
                {
                    propertyId: "property-9",
                    amenityId: "amenity-parking",
                },
                {
                    propertyId: "property-9",
                    amenityId: "amenity-security",
                },

                // Powai Lake Homes
                {
                    propertyId: "property-10",
                    amenityId: "amenity-wifi",
                },
                {
                    propertyId: "property-10",
                    amenityId: "amenity-laundry",
                },
                {
                    propertyId: "property-10",
                    amenityId: "amenity-parking",
                },
            ],
        });

        console.log(" Properties connected to amenities");


        // USER → LOCATION
        await session.run(`
  UNWIND $connections AS connection

  MATCH (u:User {id: connection.userId})
  MATCH (l:Location {id: connection.locationId})

  MERGE (u)-[:LOOKING_IN]->(l)
`, {
            connections: [
                { userId: "user-1", locationId: "loc-andheri" },
                { userId: "user-2", locationId: "loc-bandra" },
                { userId: "user-3", locationId: "loc-bkc" },
                { userId: "user-4", locationId: "loc-powai" },
                {
                    userId: "user-5",
                    locationId: "loc-bkc",
                },
                {
                    userId: "user-6",
                    locationId: "loc-andheri",
                },
                {
                    userId: "user-7",
                    locationId: "loc-bkc",
                },
                {
                    userId: "user-8",
                    locationId: "loc-bandra",
                },
                {
                    userId: "user-9",
                    locationId: "loc-powai",
                },
                {
                    userId: "user-10",
                    locationId: "loc-ghatkopar",
                },
            ],
        });

        console.log(" Users connected to locations");


        // USER → LIFESTYLE
        await session.run(`
  UNWIND $connections AS connection

  MATCH (u:User {id: connection.userId})
  MATCH (l:Lifestyle {id: connection.lifestyleId})

  MERGE (u)-[:PREFERS]->(l)
`, {
            connections: [
                { userId: "user-1", lifestyleId: "life-quiet" },
                { userId: "user-2", lifestyleId: "life-social" },
                { userId: "user-3", lifestyleId: "life-active" },
                { userId: "user-4", lifestyleId: "life-work" },
            ],
        });

        console.log(" Users connected to lifestyles");
        // =========================
        // USER → AMENITIES
        // =========================

        await session.run(
            `
  UNWIND $connections AS connection

  MATCH (u:User {id: connection.userId})
  MATCH (a:Amenity {id: connection.amenityId})

  MERGE (u)-[:WANTS]->(a)
  `,
            {
                connections: [
                    // Rahul
                    { userId: "user-1", amenityId: "amenity-wifi" },
                    { userId: "user-1", amenityId: "amenity-gym" },

                    // Priya
                    { userId: "user-2", amenityId: "amenity-wifi" },
                    { userId: "user-2", amenityId: "amenity-laundry" },

                    // Ankit
                    { userId: "user-3", amenityId: "amenity-gym" },
                    { userId: "user-3", amenityId: "amenity-parking" },
                    { userId: "user-3", amenityId: "amenity-wifi" },

                    // Neha
                    { userId: "user-4", amenityId: "amenity-wifi" },
                    { userId: "user-4", amenityId: "amenity-security" },
                    // Aarav
                    {
                        userId: "user-5",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-5",
                        amenityId: "amenity-gym",
                    },
                    {
                        userId: "user-5",
                        amenityId: "amenity-parking",
                    },

                    // Isha
                    {
                        userId: "user-6",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-6",
                        amenityId: "amenity-laundry",
                    },

                    // Vikram
                    {
                        userId: "user-7",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-7",
                        amenityId: "amenity-gym",
                    },
                    {
                        userId: "user-7",
                        amenityId: "amenity-security",
                    },

                    // Meera
                    {
                        userId: "user-8",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-8",
                        amenityId: "amenity-security",
                    },

                    // Rohan
                    {
                        userId: "user-9",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-9",
                        amenityId: "amenity-gym",
                    },
                    {
                        userId: "user-9",
                        amenityId: "amenity-parking",
                    },

                    // Kavya
                    {
                        userId: "user-10",
                        amenityId: "amenity-wifi",
                    },
                    {
                        userId: "user-10",
                        amenityId: "amenity-laundry",
                    },
                    {
                        userId: "user-10",
                        amenityId: "amenity-security",
                    },
                ],
            }
        );

        console.log("Users connected to preferred amenities");


        // USER → COMPANY
        await session.run(`
  UNWIND $connections AS connection

  MATCH (u:User {id: connection.userId})
  MATCH (c:Company {id: connection.companyId})

  MERGE (u)-[:WORKS_AT]->(c)
`, {
            connections: [
                { userId: "user-1", companyId: "company-tcs" },
                { userId: "user-2", companyId: "company-infosys" },
                { userId: "user-3", companyId: "company-accenture" },
                { userId: "user-4", companyId: "company-google" },
                {
                    userId: "user-5",
                    companyId: "company-google",
                },
                {
                    userId: "user-6",
                    companyId: "company-infosys",
                },
                {
                    userId: "user-7",
                    companyId: "company-accenture",
                },
                {
                    userId: "user-8",
                    companyId: "company-tcs",
                },
                {
                    userId: "user-9",
                    companyId: "company-google",
                },
                {
                    userId: "user-10",
                    companyId: "company-infosys",
                },
            ],
        });

        console.log(" Users connected to companies");


        // COMPANY → LOCATION


        await session.run(
            `
  UNWIND $connections AS connection

  MATCH (c:Company {id: connection.companyId})
  MATCH (l:Location {id: connection.locationId})

  MERGE (c)-[:LOCATED_IN]->(l)
  `,
            {
                connections: [
                    {
                        companyId: "company-tcs",
                        locationId: "loc-andheri",
                    },
                    {
                        companyId: "company-infosys",
                        locationId: "loc-bandra",
                    },
                    {
                        companyId: "company-accenture",
                        locationId: "loc-bkc",
                    },
                    {
                        companyId: "company-google",
                        locationId: "loc-powai",
                    },
                ],
            }
        );

        console.log("Companies connected to locations");


        // PROPERTY → METRO
        await session.run(`
  UNWIND $connections AS connection

  MATCH (p:Property {id: connection.propertyId})
  MATCH (m:MetroStation {id: connection.stationId})

  MERGE (p)-[:NEAR_METRO]->(m)
`, {
            connections: [
                { propertyId: "property-1", stationId: "metro-andheri" },
                { propertyId: "property-2", stationId: "metro-bandra" },
                { propertyId: "property-3", stationId: "metro-bkc" },
                { propertyId: "property-4", stationId: "metro-powai" },
                {
                    propertyId: "property-5",
                    stationId: "metro-powai",
                },
                {
                    propertyId: "property-6",
                    stationId: "metro-andheri",
                },
                {
                    propertyId: "property-7",
                    stationId: "metro-bandra",
                },
                {
                    propertyId: "property-8",
                    stationId: "metro-andheri",
                },
                {
                    propertyId: "property-9",
                    stationId: "metro-bkc",
                },
                {
                    propertyId: "property-10",
                    stationId: "metro-powai",
                },
            ],
        });

        console.log(" Properties connected to metro stations");

        console.log(" SmartStay graph created successfully!");

    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await session.close();
        await driver.close();
    }
}

seed();