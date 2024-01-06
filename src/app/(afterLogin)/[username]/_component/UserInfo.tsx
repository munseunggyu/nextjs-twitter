'use client';

import style from '@/app/(afterLogin)/[username]/profile.module.css';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/model/User';
import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  username: string;
};
export default function UserInfo({ username }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const myUserName = session?.user?.email;
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000
  });
  if (!user) return null;
  const onMessage = () => {
    const ids = [session?.user?.email, user.id];
    ids.sort();
    router.push(`/messages/${ids.join('-')}`);
  };

  // const followed = !!user?.Followers.find(v => v.id === myUserName);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: 'center',
            fontSize: 31,
            fontWeight: 'bold',
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }
  if (!user) {
    return null;
  }
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        {myUserName !== username && (
          <>
            <button onClick={onMessage} className={style.messageButton}>
              <svg
                viewBox="0 0 24 24"
                width={18}
                aria-hidden="true"
                className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"
              >
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
            </button>
            <button className={style.followButton}>
              {/* {followed ? '팔로잉' : '팔로우'} */}
            </button>
          </>
        )}
      </div>
    </>
  );
}
