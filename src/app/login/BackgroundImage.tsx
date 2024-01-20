import { type FC, type ComponentProps } from 'react'

export const BackgroundImage: FC<ComponentProps<'svg'>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" {...props}>
        <line x1="50" y1="100" x2="150" y2="100" stroke="white" strokeWidth="2"/>
        <line x1="100" y1="50" x2="100" y2="150" stroke="white" strokeWidth="2"/>

        <circle cx="50" cy="100" r="10" fill="white"/>
        <circle cx="150" cy="100" r="10" fill="white"/>
        <circle cx="100" cy="50" r="10" fill="white"/>
        <circle cx="100" cy="150" r="10" fill="white"/>

        <path d="M 50 100 Q 75 75, 100 100 T 150 100" fill="transparent" stroke="white" strokeWidth="2"/>
        <path d="M 100 50 Q 125 75, 100 100 T 100 150" fill="transparent" stroke="white" strokeWidth="2"/>
    </svg>

)
