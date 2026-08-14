"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Check, IndianRupee, UserRound } from "lucide-react";

interface User {
    id: string;
    name: string;
    age: number;
    budget: number;
    occupation: string;
}

export default function SelectUserPage() {
    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const result = await response.json();

                if (result.success) {
                    setUsers(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleContinue = () => {
        if (!selectedUser) return;

        localStorage.setItem("smartstay-user-id", selectedUser);

        router.push("/recommended-properties");
    };

    return (
        <main className="min-h-screen bg-[#F7F7F5] text-[#171717]">

            {/* Top Header */}
            <header>
                <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">

                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold">
                            S
                        </div>

                        <span className="text-lg font-bold tracking-tight">
                            SmartStay
                        </span>
                    </div>

                    {/* Progress */}
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-16 rounded-full bg-black" />
                    <div className="h-1.5 w-16 rounded-full bg-black/10" />

                    <span className="ml-1 text-xs font-medium text-black/40">
                        1 of 2
                    </span>
                </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">

                

                {/* Hero */}
                <section className="mb-10 max-w-2xl">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-black/40">
                        Personalize your search
                    </p>

                    <h1 className="text-4xl font-bold tracking-[-0.04em] text-black sm:text-5xl">
                        Who are you looking
                        <br className="hidden sm:block" />
                        <span className="text-black/40"> a stay for?</span>
                    </h1>

                    <p className="mt-4 max-w-xl text-base leading-7 text-black/50">
                        Select a profile and we&apos;ll use their preferences,
                        budget and lifestyle to find the most suitable
                        properties.
                    </p>
                </section>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-[280px] animate-pulse rounded-3xl bg-white"
                            />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && users.length === 0 && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
                            <UserRound className="h-6 w-6 text-black/40" />
                        </div>

                        <h3 className="text-lg font-semibold">
                            No profiles found
                        </h3>

                        <p className="mt-2 text-sm text-black/40">
                            Create a profile to continue with recommendations.
                        </p>
                    </div>
                )}

                {/* Users */}
                {!loading && users.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {users.map((user) => {
                                const isSelected =
                                    selectedUser === user.id;

                                return (
                                    <button
                                        key={user.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedUser(user.id)
                                        }
                                        className={`group relative overflow-hidden rounded-3xl border bg-white p-6 text-left transition-all duration-200 ${
                                            isSelected
                                                ? "border-black shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
                                                : "border-black/[0.07] hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]"
                                        }`}
                                    >

                                        {/* Selected Indicator */}
                                        {isSelected && (
                                            <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                                                <Check
                                                    size={15}
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                        )}

                                        {/* Avatar */}
                                        <div className="mb-7 flex items-center gap-4">
                                            <div
                                                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold transition ${
                                                    isSelected
                                                        ? "bg-black text-white"
                                                        : "bg-[#F1F1EF] text-black"
                                                }`}
                                            >
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold tracking-tight">
                                                    {user.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-black/40">
                                                    Profile
                                                </p>
                                            </div>
                                        </div>

                                        {/* Occupation */}
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F7F5]">
                                                <BriefcaseBusiness
                                                    size={16}
                                                    className="text-black/50"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider text-black/35">
                                                    Occupation
                                                </p>

                                                <p className="mt-0.5 text-sm font-medium text-black/80">
                                                    {user.occupation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-5">

                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider text-black/35">
                                                    Age
                                                </p>

                                                <p className="mt-1 text-lg font-semibold">
                                                    {user.age}
                                                    <span className="ml-1 text-xs font-normal text-black/40">
                                                        yrs
                                                    </span>
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider text-black/35">
                                                    Monthly budget
                                                </p>

                                                <div className="mt-1 flex items-center">
                                                    <IndianRupee
                                                        size={15}
                                                        strokeWidth={2.5}
                                                    />

                                                    <span className="text-lg font-semibold">
                                                        {user.budget.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Hover bottom text */}
                                        <div
                                            className={`mt-6 flex items-center gap-2 text-sm font-medium transition ${
                                                isSelected
                                                    ? "text-black"
                                                    : "text-black/30 group-hover:text-black"
                                            }`}
                                        >
                                            {isSelected
                                                ? "Selected"
                                                : "Select this profile"}

                                            <ArrowRight
                                                size={15}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                       
                      {/* Floating CTA */}
<div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
    <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedUser}
        className={`pointer-events-auto flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-200 ${
            selectedUser
                ? "bg-black text-white hover:scale-[1.02] hover:bg-black/90 active:scale-[0.98]"
                : "border border-black/10 bg-white/80 text-black/40 cursor-not-allowed"
        }`}
    >
        {selectedUser
            ? `Continue with ${
                  users.find((user) => user.id === selectedUser)?.name
              }`
            : "Select a user to continue"}

        {selectedUser && (
            <ArrowRight
                size={17}
                strokeWidth={2.5}
            />
        )}
    </button>
</div>
                    </>
                )}
            </div>
        </main>
    );
}