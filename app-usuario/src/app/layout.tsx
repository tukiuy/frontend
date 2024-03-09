import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CookiesProvider } from 'next-client-cookies/server'
import Provider from '@/components/Provider'
import RedirectionHandler from '@/components/RedirectHandler'
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: 'Tuki',
  description: 'Salteate las filas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative flex flex-col h-[100dvh] bg-light'>
        <UserProvider>
          <CookiesProvider>   
            <Provider>
              <Header className='grow-0' />
              <div className='grow overflow-scroll'>
                {children}
              </div>
            </Provider>
            <RedirectionHandler />
          </CookiesProvider>
        </UserProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
