# SmartStay

## 1. Problem Statement

Finding suitable PG accommodations is often more complicated than simply searching by rent or location. A user may have multiple preferences such as budget, preferred location, lifestyle, amenities, proximity to public transport, and compatibility with other tenants.

Traditional property search systems generally treat these preferences as independent filters. This makes it difficult to discover meaningful connections between users, properties, locations, amenities, lifestyles, and nearby facilities.

**SmartStay** is a graph-based property recommendation application designed to help users discover PG properties based on multiple interconnected preferences.

The application models users, properties, locations, lifestyles, amenities, rooms, companies, and nearby metro stations as nodes in a graph. The relationships between these entities allow SmartStay to perform multi-hop traversals and generate recommendations based on connected data rather than relying only on simple property filters.

For example, a user's preferences can be connected through multiple relationships:

User → Lifestyle → Property → Location → Metro Station

This graph structure allows SmartStay to identify properties that are not only suitable based on direct attributes such as price, but also through relationships between different entities.


## 3. Features

## 4. Architecture

SmartStay follows a full-stack architecture where the Next.js application handles the user interface and API layer, while CognoDB is used as the graph database for storing and querying interconnected property data.

┌──────────────────────────────┐
│          User / UI           │
│       Next.js Frontend       │
│                              │
│  Property Search             │
│  Property Recommendations    │
│  Property Details            │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│       Next.js API Layer      │
│                              │
│  API Routes                  │
│  Recommendation Logic        │
│  Query Parameters            │
│  Error Handling              │
└──────────────┬───────────────┘
               │
               │ Official Graph DB Driver
               │ Parameterized Cypher
               ▼
┌──────────────────────────────┐
│           CognoDB            │
│        Graph Database        │
│                              │
│  Users                       │
│  Properties                  │
│  Locations                   │
│  Lifestyles                  │
│  Amenities                   │
│  Rooms                       │
│  Companies                   │
│  Metro Stations              │
└──────────────────────────────┘

## 5. Graph Data Model

                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                    PREFERS│
                           ▼
                    ┌──────────────┐
                    │  Lifestyle   │
                    └──────┬───────┘
                           │
                  MATCHES  │
                           ▼
┌──────────┐       ┌──────────────┐       ┌──────────┐
│  Room    │──────▶│   Property   │◀──────│ Amenity  │
└──────────┘       └──────┬───────┘       └──────────┘
                           │
                    LOCATED_IN
                           ▼
                    ┌──────────────┐
                    │   Location   │
                    └──────┬───────┘
                           │
                     NEAR_METRO
                           ▼
                    ┌──────────────┐
                    │ MetroStation │
                    └──────────────┘

             User ──WORKS_AT──▶ Company

## 6. Node Types

SmartStay represents the main entities of the property recommendation system as graph nodes. Each node contains properties that describe the entity and is connected to other nodes through typed relationships.



| `User` -  Represents a person searching for a PG/property.  -  `id`, `name`, `budget`, `preferredLocation` |
| `Property`  - Represents a PG or rental property available to users.  -  `id`, `name`, `price`, `address`, `rating` |
| `Location` - Represents the geographical area associated with a property. -  `id`, `name`, `city` |
| `Lifestyle` - Represents lifestyle preferences that can be used for matching.  - `id`, `name` |
| `Amenity` -  Represents facilities available at a property. - `id`, `name` |
| `Room` -  Represents rooms or room configurations available within a property. - `id`, `type`, `capacity`, `price` |
| `Company` - Represents a company or workplace associated with a user's preferred/work location. -`id`, `name` |
| `MetroStation` -  Represents nearby public transportation locations. - `id`, `name`, `line` |

### Why These Nodes?

The nodes are intentionally separated because each represents an entity that can participate in multiple relationships.

For example, a `Property` can be connected to a `Location`, multiple `Amenities`, multiple `Rooms`, and a nearby `MetroStation`. A `User` can have preferences connected to multiple `Lifestyle` nodes and can be matched with properties through these relationships.

This structure allows SmartStay to traverse the graph across multiple entities instead of treating each piece of information as an isolated field.

