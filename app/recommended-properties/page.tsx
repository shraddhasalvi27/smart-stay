"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, MapPin, BriefcaseBusiness } from "lucide-react";
import PropertyCard from "./_component/PropertyCard";
import PropertyCardSkeleton from "./_component/PropertyCardSkeleton";

interface GraphInteger {
    low: number;
    high: number;
}

interface RawRecommendation {
    id: string;
    name: string;
    rent: number;
    type?: string;
    bedrooms?: number;
    location: string;

    score: GraphInteger | number;

    breakdown?: {
        location?: GraphInteger | number;
        budget?: GraphInteger | number;
        workplace?: GraphInteger | number;
        amenities?: GraphInteger | number;
    };

    matchingAmenities?: GraphInteger | number;

    reasons?: string[];
    images?: string[];
}
interface Recommendation {
    id: string;
    name: string;
    rent: number;
    type?: string;
    bedrooms?: number;
    location: string;

    score: number;

    matchingAmenities?: number;

    breakdown?: {
        location: number;
        budget: number;
        workplace: number;
        amenities: number;
    };

    reasons?: string[];

    images?: string[];
}

interface User {
    id: string;
    name: string;
    age: number;
    budget: number;
    occupation: string;
}

const sampleImages = [
    "/images/property-images/img.png",
    "/images/property-images/img(2).png",
];

export default function RecommendationsPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedProperty, setSelectedProperty] =
    useState<Recommendation | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("smartstay-user-id");

        if (!userId) {
            router.push("/select-user");
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                // --------------------------------
                // 1. Get users
                // --------------------------------
                const userResponse = await fetch("/api/users");

                if (!userResponse.ok) {
                    throw new Error("Failed to fetch user");
                }

                const userResult = await userResponse.json();

                if (!userResult.success) {
                    throw new Error("Failed to fetch user");
                }

                const currentUser = userResult.data.find(
                    (item: User) => item.id === userId
                );

                if (!currentUser) {
                    throw new Error("User not found");
                }

                setUser(currentUser);

                // --------------------------------
                // 2. Get graph recommendations
                // --------------------------------
                const recommendationResponse = await fetch(
                    `/api/recommendation/properties?userId=${userId}`
                );

                if (!recommendationResponse.ok) {
                    throw new Error(
                        "Failed to fetch property recommendations"
                    );
                }

                const recommendationResult =
                    await recommendationResponse.json();

                console.log(
                    "Graph recommendations:",
                    recommendationResult
                );

                if (recommendationResult.success) {
    const normalizedProperties = recommendationResult.data.map(
        (property: RawRecommendation) => ({
            ...property,

            // Neo4j/CognoDB integer → number
            score:
                typeof property.score === "object"
                    ? Number(property.score.low)
                    : Number(property.score ?? 0),

            breakdown: {
                location:
                    typeof property.breakdown?.location === "object"
                        ? Number(property.breakdown.location.low)
                        : Number(property.breakdown?.location ?? 0),

                budget:
                    typeof property.breakdown?.budget === "object"
                        ? Number(property.breakdown.budget.low)
                        : Number(property.breakdown?.budget ?? 0),

                workplace:
                    typeof property.breakdown?.workplace === "object"
                        ? Number(property.breakdown.workplace.low)
                        : Number(property.breakdown?.workplace ?? 0),

                amenities:
                    typeof property.breakdown?.amenities === "object"
                        ? Number(property.breakdown.amenities.low)
                        : Number(property.breakdown?.amenities ?? 0),
            },

            matchingAmenities:
                typeof property.matchingAmenities === "object"
                    ? Number(property.matchingAmenities.low)
                    : Number(property.matchingAmenities ?? 0),
        })
    );

    console.log("Normalized recommendations:", normalizedProperties);

    setProperties(normalizedProperties);
} else {
                    throw new Error(
                        recommendationResult.message ||
                            "Failed to generate recommendations"
                    );
                }
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to load recommendations. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    return (
        <main className="flex-1 px-4 py-7 lg:px-24 lg:py-7 bg-white">
            <div className="min-h-screen flex flex-col ">

               
                {/* Header */}
               

                <div className="flex flex-col gap-5">

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-black/60 hover:text-black w-fit"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles
                                    size={22}
                                    className="text-[#00AEEF]"
                                />

                                <span className="text-[#00AEEF] font-medium">
                                    SmartStay Recommendations
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-semibold text-[#1B1B1B]">
                                {user
                                    ? `Recommended for ${user.name}`
                                    : "Recommended Properties"}
                            </h1>

                            <p className="text-black/50 mt-2 max-w-2xl">
                                Properties selected based on your budget,
                                preferred location, lifestyle, workplace and
                                amenities using our graph-based recommendation
                                system.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/selectuser")}
                            className="border border-black rounded-full px-5 py-3 text-sm hover:bg-gray-50 transition w-fit cursor-pointer"
                        >
                            Change Profile
                        </button>
                    </div>
                </div>

                {/* -------------------------------- */}
                {/* User Preference Summary */}
                {/* -------------------------------- */}

                {user && !loading && (
                    <div className="mt-8 rounded-2xl border border-[#F6F6F6] bg-[#FAFAFA] p-5">

                        <div className="flex flex-wrap items-center gap-6">

                            <div>
                                <p className="text-xs text-black/40">
                                    Profile
                                </p>

                                <p className="font-semibold mt-1">
                                    {user.name}
                                </p>
                            </div>

                            <div className="h-8 w-px bg-gray-200 hidden md:block" />

                            <div>
                                <p className="text-xs text-black/40">
                                    Budget
                                </p>

                                <p className="font-semibold mt-1">
                                    ₹{user.budget.toLocaleString("en-IN")}
                                </p>
                            </div>

                            <div className="h-8 w-px bg-gray-200 hidden md:block" />

                            <div className="flex items-start gap-2">
                                <BriefcaseBusiness
                                    size={17}
                                    className="text-black/40"
                                />

                                <div>
                                    <p className="text-xs text-black/40">
                                        Occupation
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {user.occupation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------------------------------- */}
                {/* Loading */}
                {/* -------------------------------- */}

                {loading && (
                    <>
                        <div className="flex items-center gap-3 mt-10 mb-5">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <PropertyCardSkeleton
                                    key={`recommendation-skeleton-${i}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* -------------------------------- */}
                {/* Error */}
                {/* -------------------------------- */}

                {!loading && error && (
                    <div className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
                        <p className="text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-full bg-black px-6 py-3 text-white text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* -------------------------------- */}
                {/* Results */}
                {/* -------------------------------- */}

                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between mt-10 mb-5">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Best Matches
                                </h2>

                                <p className="text-sm text-black/50 mt-1">
                                    {properties.length} properties matched
                                    your profile
                                </p>
                            </div>

                            <div className="hidden md:flex items-center gap-2 text-sm text-black/50">
                                <Sparkles
                                    size={16}
                                    className="text-[#00AEEF]"
                                />
                                Graph Match
                            </div>
                        </div>

                        {properties.length === 0 ? (
                            <div className="rounded-2xl border border-[#F6F6F6] p-12 text-center">
                                <p className="text-lg font-medium">
                                    No matching properties found
                                </p>

                                <p className="text-sm text-black/50 mt-2">
                                    Try updating your preferences to get
                                    better recommendations.
                                </p>

                                <button
                                    onClick={() =>
                                        router.push("/preferences")
                                    }
                                    className="mt-5 rounded-full bg-black px-6 py-3 text-white text-sm"
                                >
                                    Update Preferences
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                {properties.map((property) => (
                                    <RecommendationCard
                                        key={property.id}
                                        property={property}
                                         onClick={() => setSelectedProperty(property)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {selectedProperty && (
    <RecommendationModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
    />
)}
        </main>
    );
}

/* ============================================================
   Recommendation Card
============================================================ */

function RecommendationCard({
    property,
    onClick,
}: {
    property: Recommendation;
    onClick: () => void;
}) {
    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            <PropertyCard
                pg={{
                    id: property.id,
                    _id: property.id,

                    name: property.name,

                    address: property.location || "",
                    city: property.location || "Mumbai",
                    state: "Maharashtra",
                    pincode: "",

                    allowedGender: "any",

                    companyId: "",
                    companyName: "",

                    emptyBeds: 0,
                    occupiedBeds: 0,
                    totalBeds: 0,
                    noticeBeds: 0,

                    operatorId: "",
                    status: "active",

                    price: property.rent,
                    bathrooms: 1,
                    rating: 4.5,

                    badge: `${property.score}% Match`,

                    images:
                        property.images?.length
                            ? property.images
                            : sampleImages,
                }}
            />

            <div className="px-1 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-black/45">
                    <MapPin
                        size={13}
                        className="shrink-0 text-[#00AEEF]"
                    />

                    <span className="truncate">
                        {property.location}
                    </span>
                </div>

                {property.reasons &&
                    property.reasons.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {property.reasons
                                .slice(0, 2)
                                .map((reason) => (
                                    <span
                                        key={reason}
                                        className="rounded-full bg-[#F5F5F3] px-2.5 py-1 text-[10px] font-medium text-black/55"
                                    >
                                        ✓ {reason}
                                    </span>
                                ))}
                        </div>
                    )}
            </div>
        </div>
    );
}
function RecommendationModal({
    property,
    onClose,
}: {
    property: Recommendation;
    onClose: () => void;
}) {
    const breakdown = [
        {
            label: "Location",
            value: property.breakdown?.location ?? 0,
            max: 30,
        },
        {
            label: "Budget",
            value: property.breakdown?.budget ?? 0,
            max: 25,
        },
        {
            label: "Workplace",
            value: property.breakdown?.workplace ?? 0,
            max: 15,
        },
        {
            label: "Amenities",
            value: property.breakdown?.amenities ?? 0,
            max: 30,
        },
    ];

    return (
       <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[3px]"
    onClick={onClose}
>
    <div
        className="relative flex max-h-[88vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
    >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] bg-white px-6 py-4">
            <div>
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF9FD]">
                        <Sparkles
                            size={14}
                            className="text-[#00AEEF]"
                        />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#00AEEF]">
                        SmartStay Match
                    </span>
                </div>

                <h2 className="mt-1 text-[19px] font-semibold tracking-tight text-black">
                    Why this property?
                </h2>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-xl leading-none text-black/50 transition hover:bg-black/[0.08] hover:text-black cursor-pointer"
            >
                ×
            </button>
        </div>

        {/* Scrollable content */}
        <div
            className="
                overflow-y-auto
                px-6 py-5
                scrollbar-thin
                scrollbar-track-transparent
                scrollbar-thumb-black/10
                hover:scrollbar-thumb-black/20
            "
        >
            {/* Property header */}
            <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                    <h3 className="truncate text-[23px] font-semibold tracking-tight text-black">
                        {property.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-black/45">
                        <MapPin
                            size={14}
                            className="shrink-0"
                        />
                        <span>{property.location}</span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-black">
                            ₹{property.rent.toLocaleString("en-IN")}
                        </span>

                        <span className="text-xs text-black/40">
                            / month
                        </span>
                    </div>
                </div>

                {/* Match score */}
                <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full border-[5px] border-[#00AEEF]/15 bg-[#F4FBFD]">
                        <div className="text-center">
                            <p className="text-[22px] font-bold leading-none text-black">
                                {property.score}%
                            </p>

                            <p className="mt-1 text-[9px] font-semibold tracking-wider text-black/35">
                                MATCH
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-black/[0.06]" />

            {/* Why recommended */}
            <section>
                <div className="mb-3">
                    <h4 className="text-[15px] font-semibold text-black">
                        Why we recommend it
                    </h4>

                    <p className="mt-0.5 text-xs text-black/40">
                        Based on your SmartStay preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {property.reasons &&
                    property.reasons.length > 0 ? (
                        property.reasons.map((reason, index) => (
                            <div
                                key={`${reason}-${index}`}
                                className="flex items-start gap-2.5 rounded-xl border border-black/[0.05] bg-[#FAFAFA] px-3.5 py-3"
                            >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF9FD]">
                                    <span className="text-[11px] font-bold text-[#00AEEF]">
                                        ✓
                                    </span>
                                </div>

                                <p className="text-xs leading-5 text-black/60">
                                    {reason}
                                </p>
                            </div>
                        ))
                    ) : (
                        breakdown.map((item) =>
                            item.value > 0 ? (
                                <div
                                    key={item.label}
                                    className="flex items-start gap-2.5 rounded-xl border border-black/[0.05] bg-[#FAFAFA] px-3.5 py-3"
                                >
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF9FD]">
                                        <span className="text-[11px] font-bold text-[#00AEEF]">
                                            ✓
                                        </span>
                                    </div>

                                    <p className="text-xs leading-5 text-black/60">
                                        {item.label} contributes{" "}
                                        <span className="font-semibold text-black">
                                            {item.value} points
                                        </span>{" "}
                                        to your match.
                                    </p>
                                </div>
                            ) : null
                        )
                    )}
                </div>
            </section>

            {/* Match breakdown */}
            <section className="mt-7">
                <div className="mb-4">
                    <h4 className="text-[15px] font-semibold text-black">
                        Match breakdown
                    </h4>

                    <p className="mt-0.5 text-xs text-black/40">
                        See how your preferences contributed to the score
                    </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white p-4">
                    <div className="space-y-5">
                        {breakdown.map((item) => {
                            const percentage =
                                item.max > 0
                                    ? Math.round(
                                          (item.value /
                                              item.max) *
                                              100
                                      )
                                    : 0;

                            return (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-black/70">
                                            {item.label}
                                        </span>

                                        <span className="text-[11px] font-semibold text-black/40">
                                            {item.value}/{item.max}
                                        </span>
                                    </div>

                                    <div className="h-[6px] w-full overflow-hidden rounded-full bg-black/[0.06]">
                                        <div
                                            className="h-full rounded-full bg-[#00AEEF] transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Amenities */}
            <section className="mt-5">
                <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-[#FAFAFA] px-4 py-4">
                    <div>
                        <p className="text-sm font-semibold text-black">
                            Matching amenities
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                            Amenities matching your preferences
                        </p>
                    </div>

                    <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-white text-lg font-bold shadow-sm">
                        {property.matchingAmenities ?? 0}
                    </div>
                </div>
            </section>

            {/* Bottom spacing */}
            <div className="h-2" />
        </div>
    </div>
</div>
    );
}