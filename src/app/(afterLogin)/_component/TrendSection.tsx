'use client';
import { usePathname } from 'next/navigation';
import style from './trendSection.module.css';
import Trend from '@/app/(afterLogin)/_component/Trend';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import getTrends from '../_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';
import { useSession } from 'next-auth/react';

export default function TrendSection() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends', 'recommends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    enabled: !!session?.user
  });

  if (pathname === '/explore') return null;
  if (!session?.user) return null;

  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {data && data.map(item => <Trend trend={item} key={item.tagId} />)}
      </div>
    </div>
  );
}
