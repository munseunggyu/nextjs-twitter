'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 탭 전환
          retryOnMount: true, // 컴포넌트가 unmouned됭 이후 mount 되었을때
          refetchOnReconnect: false, // 인터넷 연결 재접속시
          retry: false // 데티어 실패시 재 도전
        }
      }
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;