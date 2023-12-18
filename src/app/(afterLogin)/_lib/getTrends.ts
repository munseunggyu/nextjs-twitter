export default async function getTrends() {
  const res = await fetch('http://localhost:9090/api/trends', {
    next: {
      tags: ['posts', 'trends']
    },
    cache: 'no-store' // 캐시를 하지 않으려면 설정
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
