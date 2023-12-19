import style from './home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from './_component/TabProvider';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <div style={{ marginTop: 150 }} />
        안녕~
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
