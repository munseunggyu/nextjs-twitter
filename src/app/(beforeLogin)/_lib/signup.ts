'use server';

import { redirect } from 'next/navigation';
type Props = {
  // prevState: { message: string | null };
  message: string | null;
  formData: FormData;
};
export const signup = async (
  prevState: { message: string | null },
  formData: FormData
) => {
  if (!formData.get('id')) {
    return { message: 'no_id' };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: 'post',
      body: formData,
      credentials: 'include'
    }
  );
  if (response.status === 403) {
    return { message: 'user_exists' };
  }
  console.log(await response.json());
  redirect('/home');
  return prevState;
};
