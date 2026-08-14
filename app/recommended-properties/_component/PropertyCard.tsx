"use client";
import { useState } from "react";
import Image from "next/image";
import {
  GitCompare,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  IndianRupee,
  CameraOff,
} from "lucide-react";
import Link from "next/link";
interface PropertyCardData {
  _id: string;
  id: string;
  address: string;
  allowedGender: "male" | "female" | "any";
  city: string;
  companyId: string;
  companyName: string;
  emptyBeds: number;
  name: string;
  noticeBeds: number;
  occupiedBeds: number;
  operatorId: string;
  pincode: string;
  state: string;
  status: "active" | "inactive";
  totalBeds: number;
  // Default UI data
  price: number;
  bathrooms: number;
  rating: number;
  badge: string;
  images: string[];
}
export default function PropertyCard({
  pg,
  variant = "grid",
}: {
  pg: PropertyCardData;
  variant?: "grid" | "list";
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const isListVariant = variant === "list";
  return (
    
      <div
        className={`w-full flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${isListVariant ? "flex flex-row" : ""
          }`}
      >
        {/* image section */}
        <div className={isListVariant ? "w-[240px] flex-shrink-0 p-2.5" : "px-2.5 pt-2.5"}>
          <div
            className={`relative bg-gray-100 group rounded-xl overflow-hidden ${isListVariant ? "w-full h-full min-h-[160px]" : "w-full aspect-[4/3]"
              }`}
          >
            <Image
              src={pg.images[imgIdx]}
              alt={pg.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
            />
            {/* badge */}
            {pg.badge && (
              <span className="absolute top-2.5 left-2.5 bg-black text-[11px] font-medium text-white rounded-full px-2 py-2 shadow-sm">
                {pg.badge}
              </span>
            )}
            {/* icons top-right */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 ">
              <button className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition">
                <GitCompare size={16} className="text-black/70" />
              </button>
              <button className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition">
                <Heart size={16} className="text-black/70" />
              </button>
            </div>
            {/* carousel arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((p) => (p <= 0 ? pg.images.length - 1 : p - 1));
              }}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((p) => (p >= pg.images.length - 1 ? 0 : p + 1));
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight size={14} />
            </button>
            {/* photo count */}
            <div className="absolute bottom-2.5 right-2.5 text-white text-[9px] font-normal px-1.5 py-0.5 flex items-center gap-1">
              <CameraOff size={9} />
              {pg.images.length}+ photos
            </div>
            {/* carousel dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
              {pg.images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition ${i === imgIdx ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* info */}
        <div className="px-2.5 py-2.5">
          {/* meta row */}
          <div className="flex items-center gap-1 md:gap-2 text-[10px] text-black/50 mb-1">
            <span className="flex items-center gap-0.5">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
              {pg.totalBeds} Beds Sharing
            </span>
            <span className="flex items-center gap-0.5">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                <line x1="10" x2="8" y1="5" y2="7" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <line x1="7" x2="7" y1="19" y2="21" />
                <line x1="17" x2="17" y1="19" y2="21" />
              </svg>
              {pg.bathrooms} Bathrooms
            </span>
            <span className="flex items-center gap-0.5 ml-auto">
              <Star className="text-[#FCAA1D] fill-[#FCAA1D]" size={15} />
              {pg.rating}
            </span>
          </div>
          {/* name */}
          <h3 className="font-medium text-base text-black leading-tight">
            {pg.name}
          </h3>
          <p className="text-xs text-black/40 mt-0.5 leading-tight truncate">
            {pg.address}
          </p>
          {/* price */}
          <p className="mt-1.5 flex items-center text-base font-bold text-black">
            <IndianRupee size={12} strokeWidth={3} />
            {pg.price}
            <span className="text-xs font-normal text-black/40 ml-0.5">
              / month
            </span>
          </p>
        </div>
      </div>
    

  );
}