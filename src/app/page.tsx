import Hero from '@/components/Hero';
import HomeProductCatalog from '@/components/HomeProductCatalog';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getCategories } from '@/lib/api';
import { toBengaliNumber } from '@/utils/formatters';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const risers = products
    .filter((item) => item.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const fallers = products
    .filter((item) => item.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const bestDeal = fallers[0];

  return (
    <div className="bg-slate-50/40 min-h-screen">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold shrink-0">
              📈
            </div>
            <div>
              <span className="font-bold text-slate-800 block">মার্কেট মুভার্স</span>
              <p className="text-slate-500 text-[11px]">উর্ধ্বমুখী ও হ্রাসপ্রাপ্ত শীর্ষ ১২ পণ্য</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold shrink-0">
              🔥
            </div>
            <div>
              <span className="font-bold text-slate-800 block">দিনের সেরা বাজেট ডিল</span>
              <p className="text-rose-600 font-bold text-[11px]">
                {bestDeal ? `${bestDeal.nameBn} (▼ ${toBengaliNumber((bestDeal.change?.pct || 0).toFixed(1))}%)` : 'মিনিকেট চাল (▼ ২.৯%)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-2 lg:pt-0 lg:pl-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold shrink-0">
              🏬
            </div>
            <div>
              <span className="font-bold text-slate-800 block">১২টি যাচাইকৃত বাজার</span>
              <p className="text-slate-500 text-[11px]">কারওয়ান বাজার, গ্রীন মার্কেট ও সদর বাজার</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-2 lg:pt-0 lg:pl-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold shrink-0">
              🛡️
            </div>
            <div>
              <span className="font-bold text-slate-800 block">১০০% ভেরিফাইড তথ্য</span>
              <p className="text-slate-500 text-[11px]">দৈনিক সরাসরি ফিল্ড সার্ভে তথ্য</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section id="মার্কেট-মুভার্স" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  আজকের মার্কেট মুভার্স
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-1">
                  তুলনামূলক বোর্ড
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ঢাকার প্রধান খুচরা বাজারসমূহের দ্রুত মূল্য পরিবর্তন হওয়া পণ্যসমূহ — বামে মূল্য বৃদ্ধি ও ডানে মূল্যহ্রাস
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> আজ দাম বেড়েছে ({toBengaliNumber(risers.length)})
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> আজ দাম কমেছে ({toBengaliNumber(fallers.length)})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="bg-gradient-to-b from-emerald-50/60 to-white rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    আজ দাম বেড়েছে ▲
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold">(শীর্ষ ৬ পণ্য)</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                  শীর্ষ ০৬ টি
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-rose-50/60 to-white rounded-3xl p-5 sm:p-6 border border-rose-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500/50"></span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    আজ দাম কমেছে ▼
                  </h3>
                  <span className="text-xs text-rose-700 font-semibold">(সেরা বাজেট ডিল)</span>
                </div>
                <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-0.5 rounded-full">
                  শীর্ষ ০৬ টি
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-200/80 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl shrink-0">
              💡
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                স্মার্ট ক্রেতার বাজার পরামর্শ
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                নিত্যপ্রয়োজনীয় পণ্য কেনার পূর্বে কারওয়ান বাজার, গ্রীন মার্কেট মিরপুর ও স্থানীয় বাজারের
                আজকের গড় ও সর্বনিম্ন দর যাচাই করে নিন।
              </p>
            </div>
          </div>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm bg-white hover:bg-slate-100 text-emerald-800 font-bold px-5 rounded-xl border border-emerald-200 shadow-2xs whitespace-nowrap text-xs cursor-pointer"
          >
            সব পণ্য ব্রাউজ করুন →
          </a>
        </div>

        <HomeProductCatalog products={products} categories={categories} />
      </div>
    </div>
  );
}
