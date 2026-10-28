import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-16 bg-slate-50/50">
      <div className="max-w-md w-full bg-white border border-slate-200 shadow-xl rounded-3xl p-8 sm:p-10 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center text-4xl mx-auto shadow-xs">
          🔍
        </div>

        <div className="space-y-2">
          <span className="badge badge-sm bg-rose-100 text-rose-800 font-bold border-0">
            ৪০৪ • পৃষ্ঠাটি পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ভুল ঠিকানায় এসেছেন!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে, স্থানান্তরিত হয়েছে অথবা লিঙ্কটি ভুল।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black px-6 rounded-xl border-0 shadow-md text-xs sm:text-sm transition-all"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
