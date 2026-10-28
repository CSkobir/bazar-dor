export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white mt-16 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🛒</span>
          <p className="font-bold text-slate-800">
            বাজার দর — <span className="text-slate-500 font-normal">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </p>
        </div>

        <p className="text-slate-400 italic text-[11px] max-w-md">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
          <span>© ২০২৬ বাজার দর (Bazar Dor) • সর্বস্বত্ব সংরক্ষিত।</span>
          <div className="flex items-center gap-4 font-semibold text-slate-500">
            <span>বাংলাদেশ</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">মার্কেট স্ট্যাটাস: উন্মুক্ত ✓</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
