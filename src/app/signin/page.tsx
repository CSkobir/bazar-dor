'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('reason') === 'protected') {
      toast.error('লগইন ছাড়া শুধু হোমপেজ দেখা যায়। বিস্তারিত পাতার জন্য সাইন ইন করুন।');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast.error('ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || 'লগইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড ভুল।');
      } else {
        toast.success('সফলভাবে লগইন হয়েছে!');
        window.location.href = callbackUrl;
      }
    } catch {
      toast.error('সার্ভারে যোগাযোগ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error('Google দিয়ে সাইন ইন ব্যর্থ হয়েছে');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error('GitHub দিয়ে সাইন ইন ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="card w-full max-w-md bg-white shadow-xl shadow-slate-200/50 border border-slate-200/90 p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

      <div className="text-center mb-6 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold mb-4 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-3 shadow-2xs">
          🔐
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">সাইন ইন</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-xs text-slate-700">ইমেইল</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full rounded-xl text-xs border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-xs text-slate-700">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full rounded-xl text-xs border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black w-full rounded-xl border-0 shadow-md text-xs mt-2 transition-all cursor-pointer"
        >
          {loading ? 'প্রবেশ করা হচ্ছে…' : 'সাইন ইন →'}
        </button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400">অথবা</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs"
        >
          <span>🌐</span> Google দিয়ে
        </button>

        <button
          type="button"
          onClick={handleGithubSignIn}
          className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs"
        >
          <span>🐙</span> GitHub দিয়ে
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100">
        অ্যাকাউন্ট নেই?{' '}
        <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold underline ml-1">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-emerald-50/40 via-slate-50/50 to-teal-50/40">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-white rounded-3xl animate-pulse"></div>}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
