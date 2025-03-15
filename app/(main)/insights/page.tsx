'use client';

import { useGetProfile } from '@/service/queries/profile';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InsightCard } from '@/components/page/insight-card';

export default function Page() {
  const { data, error } = useGetProfile();
  const router = useRouter();

  useEffect(() => {
    if (data && data.role !== 'ADMIN') {
      router.push('/links');
    }
  }, [data, router]);

  if (error) {
    return <div>Error loading profile</div>;
  }

  return (
    <div>
      <InsightCard />
    </div>
  );
}
