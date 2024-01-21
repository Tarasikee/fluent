'use client'

import { Next13ProgressBar } from 'next13-progressbar'
import { type FC, type PropsWithChildren } from 'react'

export const Providers: FC<PropsWithChildren> = ({ children }) => <>
    {children}
    <Next13ProgressBar height="4px" color={'#000000'} showOnShallow/>
</>
