export default async function getPostRecommends({
  pageParam
}: {
  pageParam?: number;
}) {
  const res = await fetch(
    `http://localhost:9090/api/posts/recommends/?cursor=${pageParam}&likes=1`,
    {
      next: {
        tags: ['posts', 'recommends']
      }
      // cache: 'no-store' // 캐시를 하지 않으려면 설정
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
