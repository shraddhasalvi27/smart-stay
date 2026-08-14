export default function PropertyCardSkeleton() {
  return (
    <div className="w-full flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* image placeholder */}
      <div className="px-2.5 pt-2.5">
        <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl animate-pulse" />
      </div>

      {/* info placeholder */}
      <div className="px-2.5 py-2.5 space-y-2">
        {/* meta row */}
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-2.5 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
        {/* name */}
        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
        {/* address */}
        <div className="h-2.5 w-1/2 bg-gray-200 rounded animate-pulse" />
        {/* price */}
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
