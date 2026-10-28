'use client';

import { authClient, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      const hasCookie = typeof document !== 'undefined' && document.cookie.includes('session');
      if (!hasCookie) {
        router.replace('/signin?callbackUrl=/profile');
      }
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
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto">
            🔒
          </div>
          <h2 className="text-xl font-black text-slate-900">লগইন প্রয়োজন</h2>
          <p className="text-xs text-slate-500">
            প্রোফাইল তথ্য দেখার জন্য অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>
          <Link
            href="/signin?callbackUrl=/profile"
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-6 text-xs shadow-xs"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      router.push('/');
    } catch {
      toast.error('সাইন আউট ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-slate-50/40 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-slate-200/90 shadow-xl rounded-3xl overflow-hidden">
        {/* Banner Gradient Strip */}
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative">
          <div className="absolute top-3 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/30">
            সক্রিয় সদস্য
          </div>
        </div>

        {/* Content Body */}
        <div className="px-6 sm:px-8 pb-8 pt-0 -mt-12 text-center space-y-5">
          {/* Avatar with Ring */}
          <div className="avatar mx-auto">
            <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-3xl font-black text-white">
              {user.image ? (
                <img src={user.image} alt={user.name || 'User'} />
              ) : (
                <span>{(user.name || 'U').charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>

          {/* User Details */}
          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {user.name || 'নাম নেই'}
              </h1>
              <span className="text-emerald-600 text-lg font-bold" title="ভেরিফাইড অ্যাকাউন্ট">
                ✓
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{user.email}</p>
            <p className="text-[11px] text-slate-400 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
          </div>

          {/* Action Buttons (Requirement C3: Link to Update Information route) */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/profile/update"
              className="btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl border-0 w-full sm:w-auto px-5 shadow-xs text-xs"
            >
              ✏️ তথ্য পরিবর্তন করুন (C3)
            </Link>
            <button
              onClick={handleSignOut}
              type="button"
              className="btn btn-outline border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 font-bold rounded-xl w-full sm:w-auto px-5 text-xs cursor-pointer"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
