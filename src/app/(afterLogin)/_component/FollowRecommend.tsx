'use client';

import { User } from '@/model/User';
import style from './followRecommend.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { constant } from '@/app/constant';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type IProps = {
  user: User;
};

export default function FollowRecommend({ user }: IProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const followed = !!user.Followers.find(v => {
    return v.id === session?.user?.email;
  });
  const follow = useMutation({
    mutationFn: () => {
      return fetch(constant.apiUrl + `/api/users/${user.id}/follow`, {
        method: 'post',
        credentials: 'include'
      });
    },
    onMutate() {
      const oldData: User[] | undefined = queryClient.getQueryData([
        'users',
        'followRecommends'
      ]);
      if (oldData) {
        const shallow = [...oldData];
        let resultData;
        if (followed) {
          resultData = shallow.map(v => {
            if (user.id === v.id) {
              return {
                ...v,
                Followers: v.Followers.filter(
                  x => x.id !== session?.user?.email
                )
              };
            }
            return v;
          });
        } else {
          resultData = shallow.map(v => {
            if (user.id === v.id) {
              return {
                ...v,
                Followers: [...v.Followers, { id: session?.user?.email }]
              };
            }
            return v;
          });
        }
        console.log('resultData', resultData);
        queryClient.setQueryData(['users', 'followRecommends'], resultData);
      }

      console.log('팔로우 완', oldData);
    },
    onError() {},
    onSettled() {}
  });
  const unfollow = useMutation({
    mutationFn: () => {
      return fetch(constant.apiUrl + `/api/users/${user.id}/follow`, {
        method: 'delete',
        credentials: 'include'
      });
    },
    onMutate() {
      const oldData: User[] | undefined = queryClient.getQueryData([
        'users',
        'followRecommends'
      ]);
      if (oldData) {
        const shallow = [...oldData];
        let resultData;
        if (followed) {
          resultData = shallow.map(v => {
            if (user.id === v.id) {
              return {
                ...v,
                Followers: v.Followers.filter(
                  x => x.id !== session?.user?.email
                )
              };
            }
            return v;
          });
        } else {
          resultData = shallow.map(v => {
            if (user.id === v.id) {
              return {
                ...v,
                Followers: [...v.Followers, { id: session?.user?.email }]
              };
            }
            return v;
          });
        }
        queryClient.setQueryData(['users', 'followRecommends'], resultData);
      }

      console.log('팔로우 완', oldData);
    },
    onError() {},
    onSettled() {}
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (followed) {
      unfollow.mutate();
    } else {
      follow.mutate();
    }
  };

  return (
    <Link href={`${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        {session?.user?.email !== user.id && (
          <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
        )}
      </div>
    </Link>
  );
}
