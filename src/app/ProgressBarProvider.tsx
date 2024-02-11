'use client'

import { Next13ProgressBar } from 'next13-progressbar'
import { type FC, type PropsWithChildren, Suspense } from 'react'

export const ProgressBarProvider: FC<PropsWithChildren> = ({ children }) => <>
    {children}

    <Suspense>
        <Next13ProgressBar height="4px" color={'#000000'} showOnShallow/>
    </Suspense>
</>
