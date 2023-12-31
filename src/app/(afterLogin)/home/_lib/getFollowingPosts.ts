export default async function getFollowingPosts({
  pageParam = 0
}: {
  pageParam: number;
}) {
  const res = await fetch(
    `http://localhost:9090/api/posts/followings/?cursor=${pageParam}`,
    {
      next: {
        tags: ['posts', 'followings']
      },
      cache: 'no-store' // 캐시를 하지 않으려면 설정
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
