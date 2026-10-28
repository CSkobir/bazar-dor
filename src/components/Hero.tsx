import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-white border-b border-slate-200/80 py-10 sm:py-16">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>⚡ আজকের বাজারের দাম এক নজরে</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.3] tracking-tight">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              বাজারভিত্তিক বিস্তারিত ও পরিবর্তনের লাইভ তথ্য
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            ঢাকার কারওয়ান বাজার, গ্রীন মার্কেট মিরপুরসহ সারা দেশের ৬টি বিভাগের ১২টি প্রধান খুচরা বাজারের
            সর্বশেষ যাচাইকৃত বাজার দর, গড় মূল্য এবং মূল্য ওঠানামা এক নজরে পর্যবেক্ষণ করুন।
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-2xs text-center sm:text-left">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 block">৩৩</span>
              <span className="text-[11px] font-bold text-slate-700 block">টি নিত্যদিনের পণ্য</span>
              <span className="text-[10px] text-slate-400">নিয়মিত মনিটরিং</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-2xs text-center sm:text-left">
              <span className="text-xl sm:text-2xl font-black text-teal-600 block">১২</span>
              <span className="text-[11px] font-bold text-slate-700 block">টি বাজার অন্তর্ভুক্ত</span>
              <span className="text-[10px] text-slate-400">সরাসরি সার্ভে</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-2xs text-center sm:text-left">
              <span className="text-xl sm:text-2xl font-black text-cyan-600 block">৬</span>
              <span className="text-[11px] font-bold text-slate-700 block">টি বিভাগের তথ্য</span>
              <span className="text-[10px] text-slate-400">সারাদেশে বিস্তৃত</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#সব-পণ্য"
              className="btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black px-6 rounded-xl shadow-md border-0 transition-all text-xs sm:text-sm hover:scale-102 cursor-pointer"
            >
              সব পণ্য দেখুন ↓
            </a>
            <a
              href="#মার্কেট-মুভার্স"
              className="btn btn-outline border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-5 rounded-xl transition-all text-xs sm:text-sm cursor-pointer"
            >
              📊 আজকের দর পরিবর্তন
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-100 bg-white/80 p-3 shadow-xl">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                width={500}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
