import { type FC, type ComponentProps } from 'react'

const H1: FC<ComponentProps<'h1'>> = (props) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {props.children}
    </h1>
)

const H2: FC<ComponentProps<'h2'>> = (props) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
        {props.children}
    </h2>
)

const H3: FC<ComponentProps<'h3'>> = (props) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
        {props.children}
    </h3>
)

const H4: FC<ComponentProps<'h4'>> = (props) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
        {props.children}
    </h4>
)

export const Typography = Object.assign({}, {
    H1, H2, H3, H4,
})
