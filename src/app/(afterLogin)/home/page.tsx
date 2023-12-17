import style from './home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import Post from '@/app/(afterLogin)/_component/Post';
import TabProvider from './_component/TabProvider';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import PostRecommends from './_component/PostRecommends';
import getPostRecommends from './_lib/getPostRecommends';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
          {/* <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post /> */}
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
