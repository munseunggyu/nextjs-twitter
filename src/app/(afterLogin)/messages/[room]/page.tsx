import { faker } from '@faker-js/faker';
import style from './chatRoom.module.css';
import Link from 'next/link';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import cx from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import MessageForm from '../_component/MessageForm';
import { auth } from '@/auth';
import { QueryClient } from '@tanstack/react-query';
import { getUserServer } from '../../[username]/_lib/getUserServer';
import { UserInfo } from '../_component/UserInfo';
import WebSocketComponent from '../_component/WebSocketComponent';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  params: { room: string };
};

export default async function ChatRoom({ params }: Props) {
  // const user = {
  //   id: 'hero',
  //   nickname: '영웅',
  //   image: faker.image.avatar()
  // };
  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: 'zerohch0',
      content: '안녕하세요.',
      createdAt: new Date()
    },
    {
      messageId: 2,
      roomId: 123,
      id: 'hero',
      content: '안녕히가세요.',
      createdAt: new Date()
    }
  ];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', params.room],
    queryFn: getUserServer
  });

  const session = await auth();
  const myId = session?.user?.email;

  const ids = params.room.split('-');
  const userId = ids.find(v => v !== myId);
  if (!userId) return null;

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={userId} />

      <MessageForm id={userId} />
    </main>
  );
}
