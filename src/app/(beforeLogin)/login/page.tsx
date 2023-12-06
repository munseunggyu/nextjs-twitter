'use client';
import { useRouter } from 'next/navigation';
import Main from '../_component/Main';
import { useEffect } from 'react';

export default function Login() {
  // redirect('/i/flow/login'); 서버에서 이동
  const router = useRouter(); // 클라이언트 이동

  useEffect(() => {
    router.replace('/i/flow/login');
  }, []);
  return <Main />;
}
