# SmartStay

## 1. Problem Statement

Finding a suitable PG accommodation is often more complicated than simply searching by rent or location. Users may have multiple preferences, including **budget, preferred location, lifestyle, amenities, proximity to public transportation, workplace, and compatibility with other tenants**.

Traditional property search systems generally treat these preferences as independent filters. This makes it difficult to discover meaningful connections between users, properties, locations, amenities, lifestyles, workplaces, and nearby facilities.

**SmartStay** is a graph-based property recommendation application designed to help users discover PG properties based on multiple interconnected preferences.

The application models users, properties, locations, lifestyles, amenities, rooms, companies, and metro stations as nodes in a graph. Relationships between these entities allow SmartStay to perform **multi-hop graph traversals** and generate recommendations based on connected data rather than relying only on traditional property filters.

For example, a user's preferences can be connected through multiple relationships:

**User → Lifestyle → Property → Location → Metro Station**

This graph structure enables SmartStay to identify properties that are suitable not only based on direct attributes such as price and location, but also through relationships between different entities.

---

## 2. Objective

The primary objective of SmartStay is to build a property recommendation system that understands the **relationships between users, properties, and their preferences**.

The system aims to:

* Recommend properties based on multiple user preferences.
* Identify properties connected to preferred locations and lifestyles.
* Consider amenities and room configurations.
* Recommend properties close to metro stations and workplaces.
* Use graph relationships to improve recommendation relevance.
* Provide a scalable data model for future recommendation features.

---

## 3. Features

### 3.1 Property Search

Users can search for PG properties based on parameters such as:

* Location
* Budget
* Property type
* Room type
* Amenities
* Rating

### 3.2 Graph-Based Recommendations

SmartStay uses relationships between graph nodes to identify properties that match multiple user preferences.

For example:

**User → PREFERS → Lifestyle → MATCHES → Property**

### 3.3 Multi-Criteria Matching

Properties can be evaluated using multiple factors such as:

* Budget compatibility
* Location preference
* Lifestyle compatibility
* Amenities
* Room availability
* Workplace proximity
* Metro connectivity

### 3.4 Property Details

Users can view detailed information about a property, including:

* Property information
* Available rooms
* Rent
* Amenities
* Location
* Nearby metro stations
* Rating

### 3.5 Location and Transport Connectivity

Properties can be connected to locations and nearby metro stations, allowing the system to recommend properties based on transportation accessibility.

### 3.6 Workplace-Based Recommendations

Users can be connected to companies or workplaces. This relationship can be used to identify properties that are conveniently located near their workplace.

---

# 4. System Architecture

SmartStay follows a full-stack architecture in which **Next.js** handles the frontend and API layer, while **CognoDB** is used as the graph database for storing and querying interconnected property data.

```text
┌──────────────────────────────────────┐
│              User / UI               │
│           Next.js Frontend           │
│                                      │
│  • Property Search                   │
│  • Property Recommendations          │
│  • Property Details                  │
│  • Filters                           │
└───────────────────┬──────────────────┘
                    │
                    │ HTTP / REST API
                    ▼
┌──────────────────────────────────────┐
│          Next.js API Layer           │
│                                      │
│  • API Routes                        │
│  • Recommendation Logic              │
│  • Query Parameters                  │
│  • Graph Queries                     │
│  • Error Handling                    │
└───────────────────┬──────────────────┘
                    │
                    │ Official Graph DB Driver
                    │ Parameterized Cypher
                    ▼
┌──────────────────────────────────────┐
│               CognoDB                │
│            Graph Database            │
│                                      │
│  • Users                             │
│  • Properties                        │
│  • Locations                         │
│  • Lifestyles                        │
│  • Amenities                         │
│  • Rooms                             │
│  • Companies                         │
│  • Metro Stations                    │
└──────────────────────────────────────┘
```

### Architecture Flow

The overall request flow is:

**User → Next.js Frontend → Next.js API → CognoDB → Recommendation Result → Frontend**

The frontend collects user preferences and sends them to the API layer. The API constructs parameterized graph queries and executes them against CognoDB. The resulting properties are then processed and returned to the frontend for display.

---

# 5. Graph Data Model

SmartStay represents the application domain using a graph-based data model.

Each important entity is represented as a **node**, while the connection between two entities is represented as a **relationship**.

```text
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
                             PREFERS
                                │
                                ▼
                         ┌──────────────┐
                         │  Lifestyle   │
                         └──────┬───────┘
                                │
                              MATCHES
                                │
                                ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│     Room     │───────▶│   Property   │◀───────│   Amenity    │
└──────────────┘        └──────┬───────┘        └──────────────┘
                               │
                           LOCATED_IN
                               │
                               ▼
                        ┌──────────────┐
                        │   Location   │
                        └──────┬───────┘
                               │
                           NEAR_METRO
                               │
                               ▼
                        ┌──────────────┐
                        │ MetroStation │
                        └──────────────┘


                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                       WORKS_AT
                           │
                           ▼
                    ┌──────────────┐
                    │   Company    │
                    └──────────────┘
```

This structure allows SmartStay to traverse multiple relationships when generating recommendations.

For example:

```text
User
  │
  ├── PREFERS ──→ Lifestyle
  │                  │
  │               MATCHES
  │                  │
  │                  ▼
  │              Property
  │                  │
  │             LOCATED_IN
  │                  │
  │                  ▼
  │              Location
  │                  │
  │              NEAR_METRO
  │                  │
  │                  ▼
  │             MetroStation
  │
  └── WORKS_AT ──→ Company
```

---

# 6. Node Types

SmartStay represents the main entities of the property recommendation system as graph nodes. Each node contains properties that describe the entity and is connected to other nodes through typed relationships.

| Node             | Description                                                                        | Example Properties                          |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| **User**         | Represents a person searching for a PG or rental property.                         | `id`, `name`, `budget`, `preferredLocation` |
| **Property**     | Represents a PG or rental property available to users.                             | `id`, `name`, `price`, `address`, `rating`  |
| **Location**     | Represents the geographical area associated with a property.                       | `id`, `name`, `city`                        |
| **Lifestyle**    | Represents lifestyle preferences used for matching users with suitable properties. | `id`, `name`                                |
| **Amenity**      | Represents facilities available at a property.                                     | `id`, `name`                                |
| **Room**         | Represents rooms or room configurations available within a property.               | `id`, `type`, `capacity`, `price`           |
| **Company**      | Represents a company or workplace associated with a user's work location.          | `id`, `name`                                |
| **MetroStation** | Represents a nearby public transportation location.                                | `id`, `name`, `line`                        |

---

# 7. Relationships

Relationships define how the entities in SmartStay are connected.

| Relationship    | From      | To           | Purpose                                                   |
| --------------- | --------- | ------------ | --------------------------------------------------------- |
| **PREFERS**     | User      | Lifestyle    | Represents the user's lifestyle preference.               |
| **MATCHES**     | Lifestyle | Property     | Connects a lifestyle preference with suitable properties. |
| **HAS_ROOM**    | Property  | Room         | Represents rooms available within a property.             |
| **HAS_AMENITY** | Property  | Amenity      | Represents amenities provided by a property.              |
| **LOCATED_IN**  | Property  | Location     | Connects a property to its geographical location.         |
| **NEAR_METRO**  | Location  | MetroStation | Represents nearby metro connectivity.                     |
| **WORKS_AT**    | User      | Company      | Represents the user's workplace.                          |

These relationships allow the recommendation engine to move across different parts of the graph and identify relevant properties.

---

# 8. Why Use a Graph Database?

A graph database is suitable for SmartStay because the application depends heavily on **relationships between entities**.

In a traditional relational database, information such as user preferences, amenities, locations, workplaces, and transport connectivity may be distributed across multiple tables. Finding relationships between these entities can require several joins.

With a graph database, these relationships are represented directly as connections between nodes.

For example:

```text
User
  ↓
Lifestyle
  ↓
Property
  ↓
Location
  ↓
Metro Station
```

This makes it easier to perform multi-hop queries and discover properties that satisfy multiple interconnected requirements.

---

# 9. Recommendation Example

Suppose a user has the following preferences:

```text
Budget: ₹15,000
Preferred Location: Andheri
Lifestyle: Quiet
Workplace: Andheri
Transport Preference: Near Metro
```

SmartStay can traverse the graph to identify properties that satisfy multiple conditions:

```text
User
 │
 ├── PREFERS ──→ Quiet Lifestyle
 │                    │
 │                 MATCHES
 │                    │
 │                    ▼
 │                Property
 │                    │
 │              LOCATED_IN
 │                    │
 │                    ▼
 │                Andheri
 │                    │
 │               NEAR_METRO
 │                    │
 │                    ▼
 │               Metro Station
 │
 └── WORKS_AT ──→ Company
```

The recommendation engine can then rank properties based on factors such as:

* Budget compatibility
* Location match
* Lifestyle compatibility
* Amenities
* Room availability
* Workplace proximity
* Metro accessibility

This produces recommendations based on **multiple connected signals rather than a single filter**.

---

# 10. Technology Stack

| Layer              | Technology                 |
| ------------------ | -------------------------- |
| Frontend           | Next.js, React, TypeScript |
| Styling            | Tailwind CSS               |
| API Layer          | Next.js API Routes         |
| Database           | CognoDB                    |
| Database Type      | Graph Database             |
| Query Language     | Cypher                     |
| Communication      | HTTP / REST API            |
| Graph Connectivity | Official Graph DB Driver   |
| Version Control    | Git / GitHub               |

---

# 11. Future Enhancements

SmartStay can be extended with additional graph-based features such as:

* User-to-user roommate compatibility.
* Personalized recommendation scores.
* Distance-based property ranking.
* Historical user interactions.
* Property popularity and ratings.
* Similar-property recommendations.
* Recommendation based on previous searches.
* Dynamic pricing analysis.
* Advanced graph-based recommendation algorithms.
* Integration with maps and real-time transportation data.

---

# 12. Conclusion

SmartStay demonstrates how graph databases can be used to build a property recommendation system based on interconnected user preferences and property information.

Instead of treating budget, location, lifestyle, amenities, workplace, and transportation as isolated filters, SmartStay represents them as connected entities within a graph.

This enables the system to perform multi-hop traversals and generate more meaningful recommendations by understanding the relationships between users, properties, and their surrounding context.
