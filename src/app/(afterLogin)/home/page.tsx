import style from './home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from './_component/TabProvider';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import { Suspense } from 'react';
import Loading from './loading';
import PostForm from './_component/PostForm';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <Suspense fallback={<Loading />}>
          <PostForm me={session} />
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
