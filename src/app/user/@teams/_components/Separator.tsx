import { type FC } from 'react'

export const Separator: FC = () => (
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"/>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or enter your team</span>
        </div>
    </div>
)
