'use client';

import { authClient } from '@/lib/auth-client';
import { TCategory } from '@/types/category';
import { getBengaliDate } from '@/utils/formatters';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const INITIAL_CATEGORIES: TCategory[] = [
  { id: '1', slug: 'rice', nameBn: 'চাল', icon: '🍚' },
  { id: '2', slug: 'pulses', nameBn: 'ডাল', icon: '🫘' },
  { id: '3', slug: 'oil', nameBn: 'তেল', icon: '🛢️' },
  { id: '4', slug: 'vegetables', nameBn: 'সবজি', icon: '🥬' },
  { id: '5', slug: 'meat', nameBn: 'মাংস ও ডিম', icon: '🥩' },
  { id: '6', slug: 'spices', nameBn: 'মসলা', icon: '🧂' },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<TCategory[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      router.push('/');
    } catch {
      toast.error('সাইন আউট ব্যর্থ হয়েছে');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const element = document.getElementById('সব-পণ্য');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const [banglaDate, setBanglaDate] = useState<string>(() => getBengaliDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setBanglaDate(getBengaliDate(new Date()));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-emerald-500/20 border border-emerald-200 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-all">
            <span className="text-2xl">🛒</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                বাজার <span className="text-emerald-600">দর</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
                </span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium" suppressHydrationWarning>
              {banglaDate}
            </p>
          </div>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-emerald-400 focus-within:border-emerald-500 focus-within:bg-white rounded-full px-4 py-2 text-xs text-slate-400 transition-all w-72 lg:w-80 shadow-2xs"
        >
          <span>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            className="bg-transparent border-0 outline-hidden w-full text-slate-700 placeholder-slate-400 text-xs"
          />
          <kbd className="hidden lg:inline-block text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">
            ⌘K
          </kbd>
        </form>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                id="user-menu-button"
              >
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring-2 ring-emerald-500 ring-offset-1 overflow-hidden bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                    {user.image ? (
                      <img src={user.image} alt={user.name || 'User'} />
                    ) : (
                      <span>{(user.name || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name || 'ব্যবহারকারী'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">ভেরিফাইড ইউজার ▾</span>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="font-bold text-slate-900 truncate">{user.name || 'Rezwan Ahmed'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <span>👤</span> আমার প্রোফাইল
                  </Link>
                  <Link
                    href="/#সব-পণ্য"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <span>⚖️</span> বাজার তুলনা
                  </Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                  >
                    <span>↩</span> সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <button className="btn btn-ghost btn-sm text-slate-700 hover:text-emerald-700 font-bold rounded-xl text-xs">
                  সাইন ইন
                </button>
              </Link>
              <Link href="/signup">
                <button className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border-0 text-white font-bold px-4 rounded-xl shadow-xs text-xs">
                  সাইন আপ
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/60">
        <nav className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2 text-xs font-semibold scrollbar-none">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 font-medium'
            }`}
          >
            <span>🏠</span>
            <span>সব পণ্য</span>
          </Link>
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 font-medium'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
