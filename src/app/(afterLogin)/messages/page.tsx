import { auth } from '@/auth';
import { getRooms } from './_lib/getRooms';
import style from './message.module.css';
import Room from '@/app/(afterLogin)/messages/_component/Room';
import { Room as IRoom } from '@/model/Room';

export default async function Home() {
  const session = await auth();

  const rooms = session?.user?.email
    ? await getRooms(session?.user?.email)
    : [];
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.length > 0 &&
        rooms.map(room => <Room key={room.room} room={room} />)}
    </main>
  );
}
