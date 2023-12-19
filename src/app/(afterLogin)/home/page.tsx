import style from './home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import TabProvider from './_component/TabProvider';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import getPostRecommends from './_lib/getPostRecommends';
import TabDecider from './_component/TabDecider';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
