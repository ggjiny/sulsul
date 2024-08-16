'use client'
import { PropsWithChildren } from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/sonner'
import { getQueryClient } from '@/lib/tanstack-query/client'

interface ProvidersProps extends PropsWithChildren {
  session?: Session
  queryClient?: QueryClient
}

export const Providers = ({
  children,
  session,
  queryClient,
}: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient ?? getQueryClient()}>
        {children}
        <Toaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}