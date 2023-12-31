'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';
import { Session } from '@auth/core/types';

type IProps = {
  me: Session;
};

export default function LogoutButton({ me }: IProps) {
  const router = useRouter();

  const onLogout = () => {
    signOut({
      redirect: false
    }).then(() => {
      router.push('/');
    });
  };
  if (!me?.user) return;
  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user.image as string} alt={me.user.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.id}</div>
      </div>
    </button>
  );
}
