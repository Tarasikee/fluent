'use client'

import { Loader2 } from 'lucide-react'
import { type FC } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from './ui/button'

type Props = {
    label: string
    loadingLabel: string
}

export const SubmitButton: FC<Props> = ({ loadingLabel, label }) => {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant={pending ? 'disabled' : 'default'}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {pending ? loadingLabel : label}
        </Button>
    )
}
