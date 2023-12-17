import React from 'react';
import Main from './_component/Main';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const seseion = await auth();
  if (seseion?.user) {
    redirect('/home');
    return null;
  }
  return <Main />;
}
