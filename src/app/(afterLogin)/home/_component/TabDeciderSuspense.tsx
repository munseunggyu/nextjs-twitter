import React, { Suspense } from 'react';
import TabDecider from './TabDecider';
import Loading from '../loading';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import getPostRecommends from '../_lib/getPostRecommends';

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
