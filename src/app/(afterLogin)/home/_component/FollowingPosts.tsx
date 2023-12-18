'use client';

import { useQuery } from '@tanstack/react-query';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { useEffect, useState } from 'react';
import getFollowingPosts from '../_lib/getFollowingPosts';

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>{mounted && data?.map(post => <Post key={post.postId} post={post} />)}</>
  );
}