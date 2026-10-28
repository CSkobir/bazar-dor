'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import toast from 'react-hot-toast';

type TGuardedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  title?: string;
};

export default function GuardedLink({ href, className, children, title }: TGuardedLinkProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isPending || session?.user) return;

    e.preventDefault();
    toast.error('লগইন ছাড়া শুধু হোমপেজ দেখা যায়। সাইন ইন করুন।');
    router.push(`/signin?callbackUrl=${encodeURIComponent(href)}&reason=protected`);
  };

  return (
    <Link href={href} className={className} title={title} onClick={handleClick}>
      {children}
    </Link>
  );
}
