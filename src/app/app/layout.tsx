import { redirect } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'

import { getUser } from '~/lib/actions'

export const metadata = {
    title: 'Overview',
}

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
    const user = await getUser()
    if (!user) return redirect('/user')

    return children
}

export default RootLayout
