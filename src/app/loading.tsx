import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 animate-pulse space-y-4">
        <div className="w-32 h-6 bg-slate-200 rounded-full"></div>
        <div className="w-3/4 h-10 bg-slate-200 rounded-xl"></div>
        <div className="w-1/2 h-5 bg-slate-100 rounded-lg"></div>
      </div>

      <div className="space-y-4">
        <div className="w-48 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
