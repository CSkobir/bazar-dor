export default function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs animate-pulse flex flex-col justify-between h-48">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
          <div className="w-16 h-5 rounded-full bg-slate-200"></div>
        </div>
        <div className="w-3/4 h-5 rounded-md bg-slate-200 mb-2"></div>
        <div className="w-1/2 h-3.5 rounded-md bg-slate-100"></div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-6 rounded-md bg-slate-200"></div>
        <div className="w-14 h-5 rounded-lg bg-slate-200"></div>
      </div>
    </div>
  );
}
