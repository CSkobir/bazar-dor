import SkeletonCard from '@/components/SkeletonCard';

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-2">
            <div className="w-40 h-7 bg-slate-200 rounded-lg"></div>
            <div className="w-24 h-4 bg-slate-100 rounded-md"></div>
          </div>
        </div>
        <div className="w-28 h-8 bg-slate-200 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
