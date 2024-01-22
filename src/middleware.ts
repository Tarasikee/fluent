import { type NextRequest, NextResponse } from 'next/server'

import { isNullish } from '~/lib/utils'


export async function middleware(request: NextRequest) {
    const pathname = new URL(request.url).pathname
    const authCookie = request.cookies.get('next-auth.session-token')?.value

    const userUrl = new URL('/user', request.url)

    if (pathname === '/') {
        return NextResponse.redirect(userUrl)
    }

    if (pathname === '/app') {
        return NextResponse.redirect(userUrl)
    }

    if (pathname.startsWith('/app') && !isNullish(authCookie)) {
        return NextResponse.redirect(userUrl)
    }

    return NextResponse.next()
}
