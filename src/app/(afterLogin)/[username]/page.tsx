import style from './profile.module.css';
import Post from '@/app/(afterLogin)/_component/Post';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import { getUserPosts } from './_lib/getUserPosts';
import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';
import { getUserServer } from './_lib/getUserServer';

type IProps = {
  params: { username: string };
};

export default async function Profile({ params }: IProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', params.username],
    queryFn: getUserServer
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', params.username],
    queryFn: getUserPosts
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <UserInfo username={params.username} />
        <div>
          <UserPosts username={params.username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
