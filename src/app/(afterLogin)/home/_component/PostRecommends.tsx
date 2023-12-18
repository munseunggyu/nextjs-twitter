'use client';

import { useQuery } from '@tanstack/react-query';
import getPostRecommends from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { useEffect, useState } from 'react';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
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