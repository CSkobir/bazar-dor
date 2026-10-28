import { auth } from '@/lib/auth';
import { getProductByIdOrSlug } from '@/lib/api';
import { formatTaka, formatUnit, toBengaliNumber } from '@/utils/formatters';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type TProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: TProductDetailsPageProps) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const hasSessionCookie = cookieStore
    .getAll()
    .some(
      (c) =>
        c.name.includes('session_token') ||
        c.name.includes('session_data') ||
        c.name.includes('better-auth')
    );

  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(() => null);

  if (!session?.user && !hasSessionCookie) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-md shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mx-auto">
            ⚠️
          </div>
          <h1 className="text-xl font-black text-slate-900">পণ্য পাওয়া যায়নি</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            অনুরোধকৃত পণ্যের বিবরণী খুঁজে পাওয়া যায়নি। হয়তো পণ্যটি সরানো হয়েছে অথবা লিংকটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-6 text-xs shadow-xs"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pctBn = toBengaliNumber((product.change?.pct ?? 0).toFixed(1));

  const markets = product.markets || [];
  const minVal = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxVal = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgVal =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const minMarket = markets.find((m) => m.min === minVal)?.market || 'স্থানীয় বাজার';
  const maxMarket = markets.find((m) => m.max === maxVal)?.market || 'প্রধান বাজার';

  const diffTodayYesterday = Math.abs(product.today - (product.yesterday || product.today));
  const diffBn = toBengaliNumber(diffTodayYesterday);

  return (
    <div className="bg-slate-50/40 min-h-screen py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <nav className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-emerald-600 transition-colors font-medium">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            {product.categoryNameBn || product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 truncate">
            {product.nameBn}
          </span>
        </nav>

        <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-center text-4xl shadow-xs shrink-0">
                {product.image || product.categoryIcon || '🛒'}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-sm bg-emerald-100 text-emerald-800 font-bold border-0">
                    {product.categoryNameBn || product.category}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {formatUnit(product.unit)} · {product.categoryNameBn || product.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">যাচাইকৃত দর</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {product.nameBn}
                </h1>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {isUp
                    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${diffBn} টাকা`
                    : isDown
                    ? `গতকালের তুলনায় আজ দাম কমেছে · ${diffBn} টাকা`
                    : 'গতকালের তুলনায় আজকের দামে কোনো পরিবর্তন হয়নি'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 rounded-2xl shadow-lg space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium">আজকের জাতীয় গড় রেট</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  লাইভ ইনডেক্স
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {toBengaliNumber(product.today)}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit === 'liter' ? 'লিটার' : product.unit}
                </span>
                <span
                  className={`text-xs font-black ml-auto px-2.5 py-1 rounded-md border ${
                    isUp
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : isDown
                      ? 'bg-rose-950 text-rose-400 border-rose-800'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isUp && '▲ '}
                  {isDown && '▼ '}
                  {pctBn}%
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden flex">
                  <div className="bg-emerald-400 h-full w-[40%]"></div>
                  <div className="bg-teal-400 h-full w-[35%]"></div>
                  <div className="bg-rose-400 h-full w-[25%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                  <span>সর্বনিম্ন {toBengaliNumber(minVal)} টাকা</span>
                  <span>সর্বোচ্চ {toBengaliNumber(maxVal)} টাকা</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 border-t-4 border-t-emerald-500 p-5 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                🎯 সর্বনিম্ন দাম
              </span>
              <span className="text-sm">📉</span>
            </div>
            <div className="text-2xl font-black text-emerald-700">
              {formatTaka(minVal)}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              সবচেয়ে কম দামের বাজার: <strong className="text-slate-700">{minMarket}</strong>
            </p>
          </div>

          <div className="bg-white border border-slate-200 border-t-4 border-t-teal-500 p-5 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                ⚖️ গড় দাম
              </span>
              <span className="text-sm">📊</span>
            </div>
            <div className="text-2xl font-black text-teal-700">
              {formatTaka(avgVal)}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {formatUnit(product.unit)}-এর হিসাবে জাতীয় গড়
            </p>
          </div>

          <div className="bg-white border border-slate-200 border-t-4 border-t-rose-500 p-5 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                ⚡ সর্বাধিক দাম
              </span>
              <span className="text-sm">📈</span>
            </div>
            <div className="text-2xl font-black text-rose-700">
              {formatTaka(maxVal)}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              সবচেয়ে বেশি দামের বাজার: <strong className="text-slate-700">{maxMarket}</strong>
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-xs p-6 sm:p-7 space-y-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🏬</span> বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ৬টি বিভাগের ১২টি শীর্ষ পাইকারি ও খুচরা বাজারের যাচাইকৃত বর্তমান মূল্য তালিকা
              </p>
            </div>
            <span className="badge badge-sm bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1 self-start sm:self-auto">
              ১২টি বাজার অন্তর্ভুক্ত
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-black">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বাধিক</th>
                  <th>গড় রেট</th>
                  <th>স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {markets.map((m, idx) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td>
                        <div className="font-black text-slate-900 flex items-center gap-1.5">
                          {m.market}
                          <span className="text-emerald-600 text-xs" title="ভেরিফাইড বাজার">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm font-semibold text-slate-600">
                          {m.division}
                        </span>
                      </td>
                      <td className="text-slate-600 font-semibold">{formatTaka(m.min)}</td>
                      <td className="text-slate-600 font-semibold">{formatTaka(m.max)}</td>
                      <td>
                        <span className="font-black text-slate-900 text-sm sm:text-base">
                          {formatTaka(mAvg)}
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          সক্রিয় স্টক
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
