'use client';

import { TCategory } from '@/types/category';
import { TProduct } from '@/types/product';
import { toBengaliNumber } from '@/utils/formatters';
import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

type THomeProductCatalogProps = {
  products: TProduct[];
  categories: TCategory[];
};

export default function HomeProductCatalog({
  products,
  categories,
}: THomeProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('default');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category === selectedCategory || p.categoryNameBn === selectedCategory
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q)
      );
    }

    // Sort by numeric price value (Challenge C1 requirement)
    if (sortOption === 'lowToHigh') {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'highToLow') {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  const countBn = toBengaliNumber(filteredProducts.length);

  return (
    <section id="সব-পণ্য" className="space-y-6 scroll-mt-28">
      {/* Catalog Title Bar */}
      <div className="border-b-2 border-emerald-600 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-xs shadow-emerald-600/50"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              সব পণ্য
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            সারা দেশের ১২টি খুচরা বাজার থেকে সংগৃহীত নিত্যপ্রয়োজনীয় পণ্যের পূর্ণ তালিকা
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full w-fit">
          মোট {countBn}টি পণ্য দেখানো হচ্ছে
        </span>
      </div>

      {/* Filter, Search, and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            className="input input-sm w-full pl-9 rounded-xl text-xs bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Dropdown (Challenge C1) */}
        <div className="flex items-center gap-2 self-end lg:self-center text-xs">
          <label htmlFor="sort-dropdown" className="font-bold text-slate-700 whitespace-nowrap">
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="select select-sm select-bordered rounded-xl text-xs font-semibold bg-slate-50 border-slate-200 focus:border-emerald-600 focus:outline-emerald-600 pr-8 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি ↑</option>
              <option value="highToLow">দাম: বেশি থেকে কম ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
          }`}
        >
          সব ({toBengaliNumber(products.length)})
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mx-auto">
            🔍
          </div>
          <h3 className="font-black text-slate-800 text-base">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার অনুসন্ধানের সাথে মেলে এমন কোনো পণ্য বর্তমানে তালিকায় নেই। দয়া করে অন্য কোনো নাম দিয়ে চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs"
          >
            সব পণ্য আবার দেখুন
          </button>
        </div>
      )}
    </section>
  );
}
