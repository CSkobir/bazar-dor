'use client';

import { authClient, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace('/signin?callbackUrl=/profile/update');
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md shadow-lg space-y-4">
          <h2 className="text-xl font-black text-slate-900">লগইন প্রয়োজন</h2>
          <p className="text-xs text-slate-500">
            প্রোফাইল তথ্য পরিবর্তনের জন্য অনুগ্রহ করে প্রথমে সাইন ইন করুন।
          </p>
          <Link
            href="/signin?callbackUrl=/profile/update"
            className="btn btn-sm bg-emerald-600 text-white rounded-xl font-bold px-6 text-xs"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নাম ফাঁকা রাখা যাবে না');
      return;
    }

    setLoading(true);
    try {
      // Better Auth update user API (Challenge C3 requirement)
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || 'তথ্য আপডেট করতে ব্যর্থ হয়েছে');
      } else {
        toast.success('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!');
        router.push('/profile');
      }
    } catch {
      toast.error('আপডেট করতে ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-slate-50/40 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-slate-200/90 shadow-xl rounded-3xl overflow-hidden p-8 space-y-6">
        <div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold mb-3 transition-colors"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              ✏️
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">তথ্য পরিবর্তন করুন (C3)</h1>
              <p className="text-xs text-slate-500">আপনার অ্যাকাউন্টের নাম আপডেট করুন</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block font-bold text-xs text-slate-700">নাম</label>
            <input
              type="text"
              defaultValue={user.name || ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              required
              className="input input-bordered w-full rounded-xl text-xs border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-xs text-slate-700">ইমেইল (অপরিবর্তনযোগ্য)</label>
            <input
              type="email"
              disabled
              value={user.email || ''}
              className="input input-bordered w-full rounded-xl text-xs border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-xl border-0 shadow-md text-xs flex-1 transition-all cursor-pointer"
            >
              {loading ? 'আপডেট হচ্ছে…' : 'তথ্য আপডেট করুন'}
            </button>
            <Link
              href="/profile"
              className="btn btn-outline border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
