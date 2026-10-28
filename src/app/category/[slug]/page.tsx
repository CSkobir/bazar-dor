import CategoryProductList from '@/components/CategoryProductList';
import { getAllProducts, getCategoryBySlug } from '@/lib/api';
import { toBengaliNumber } from '@/utils/formatters';
import Link from 'next/link';

type TCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: TCategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getAllProducts(slug),
  ]);

  if (!category && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-md shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mx-auto">
            ⚠️
          </div>
          <h1 className="text-xl font-black text-slate-900">ক্যাটাগরি পাওয়া যায়নি</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            দুঃখিত, অনুরোধকৃত ক্যাটাগরিটি বিদ্যমান নেই অথবা মুছে ফেলা হয়েছে।
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

  const categoryName = category?.nameBn || slug;
  const categoryIcon = category?.icon || '📦';
  const countBn = toBengaliNumber(products.length);

  return (
    <div className="bg-slate-50/40 min-h-screen py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600 transition-colors font-medium">
            হোম
          </Link>
          <span>/</span>
          <span className="text-slate-400">ক্যাটাগরি</span>
          <span>/</span>
          <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
            {categoryName}
          </span>
        </nav>

        {/* Category Header Banner adhering to Figma */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 rounded-2xl bg-white border border-emerald-200/80 flex items-center justify-center text-4xl shadow-xs shrink-0">
              {categoryIcon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-sm bg-emerald-100 text-emerald-800 font-bold border-0">
                  নিত্যপ্রয়োজনীয় পণ্য
                </span>
                <span className="text-[11px] text-slate-500">১২ বাজার থেকে সংগৃহীত</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {countBn}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200/60">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full">
              মোট {countBn}টি পণ্য দেখানো হচ্ছে
            </span>
            <span className="text-[11px] text-slate-400 font-medium">প্রতিদিনের লাইভ ইনডেক্স</span>
          </div>
        </div>

        {/* Product Cards List with Custom Sorting Toolbar */}
        <CategoryProductList products={products} />
      </div>
    </div>
  );
}
