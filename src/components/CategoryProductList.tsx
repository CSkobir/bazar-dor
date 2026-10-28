'use client';

import { TProduct } from '@/types/product';
import { toBengaliNumber } from '@/utils/formatters';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

type TCategoryProductListProps = {
  products: TProduct[];
};

export default function CategoryProductList({ products }: TCategoryProductListProps) {
  const [sortOption, setSortOption] = useState<string>('default');

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === 'lowToHigh') {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'highToLow') {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortOption]);

  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-2xs">
          📦
        </div>
        <h3 className="text-lg font-black text-slate-800">এই ক্যাটাগরিতে কোনো পণ্য নেই</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          এই মুহূর্তে এই বিভাগে কোনো পণ্যের বাজার দর পাওয়া যায়নি। অনুগ্রহ করে অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
        </p>
        <Link
          href="/"
          className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-5 text-xs shadow-xs"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-xs text-slate-600 font-bold">
          মোট <strong className="text-slate-900 font-black">{toBengaliNumber(products.length)}</strong>টি পণ্য তালিকাভুক্ত
        </span>

        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="cat-sort" className="font-bold text-slate-700 whitespace-nowrap">
            সাজান:
          </label>
          <select
            id="cat-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered select-sm rounded-xl text-xs font-semibold focus:border-emerald-600 focus:outline-emerald-600 bg-slate-50 border-slate-200 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি ↑</option>
            <option value="highToLow">দাম: বেশি থেকে কম ↓</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
