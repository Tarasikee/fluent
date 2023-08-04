import { FC, PropsWithChildren, ReactNode } from 'react'

type Props = {
    condition: boolean
    fallback: ReactNode
}

export const Show: FC<PropsWithChildren<Props>> = ({ condition, fallback, children }) => {
    return condition ? <>{children}</> : <>{fallback}</>
}
