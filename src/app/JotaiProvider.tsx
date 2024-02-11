'use client'

import { Provider } from 'jotai'
import { type FC, type PropsWithChildren } from 'react'

export const JotaiProvider: FC<PropsWithChildren> = ({ children }) => (
    <Provider>
        {children}
    </Provider>
)
