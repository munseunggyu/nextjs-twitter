'use client';

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect, useState } from 'react';
import getFollowingPosts from '../_lib/getFollowingPosts';
import { useInView } from 'react-intersection-observer';

export default function FollowingPosts() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        data?.pages.map((page, i) => (
          <Fragment key={`${i}-follow`}>
            {page?.map(post => (
              <Post key={post.postId} post={post} />
            ))}
          </Fragment>
        ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
