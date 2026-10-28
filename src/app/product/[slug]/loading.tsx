export default function ProductLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 animate-pulse">
      {/* Top Card Skeleton */}
      <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-2 flex-1">
            <div className="w-48 h-8 bg-slate-200 rounded-lg"></div>
            <div className="w-32 h-4 bg-slate-100 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl h-28 space-y-2">
            <div className="w-24 h-4 bg-slate-200 rounded"></div>
            <div className="w-32 h-7 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 h-64 space-y-3">
        <div className="w-40 h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-8 bg-slate-100 rounded"></div>
        <div className="w-full h-8 bg-slate-100 rounded"></div>
        <div className="w-full h-8 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}
