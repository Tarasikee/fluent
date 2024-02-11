import '~/styles/globals.css'

import { Inter as FontSans } from 'next/font/google'
import { type ReactNode } from 'react'

import { Toaster } from '~/components/ui/sonner'
import { cn } from '~/lib/utils'

import { AuthProvider } from './_components/AuthProvider'
import { Providers } from './_components/Providers'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata = {
    title: 'Fluent',
    description: 'Generated by create-t3-app',
    icons: [{ rel: 'icon', url: '/logo.svg' }],
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <Providers>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Providers>
                <Toaster/>
            </body>
        </html>
    )
}
