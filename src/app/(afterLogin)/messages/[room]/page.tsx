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
      <div className={style.list}>
        {messages.map(m => {
          if (m.id === 'zerohch0') {
            // 내 메시지면
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
              </div>
            </div>
          );
        })}
      </div>
      <MessageForm id={userId} />
    </main>
  );
}
