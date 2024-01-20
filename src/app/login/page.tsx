import { LoginButton } from './LoginButton'
import { Typography, FluentLogo } from '~/components'

export default function Page() {
    return (
        <div
            className="h-screen max-w-none grid grid-cols-2 container relative flex-col items-center justify-center px-0">
            <div className="relative hidden h-full flex-col items-center bg-zinc-900 p-10 text-white lg:flex">
                <FluentLogo className="w-full h-full"/>
                <Typography.H1>Fluent</Typography.H1>
                <p>The bug tracking system</p>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Typography.H2>Continue with</Typography.H2>
                        <p className="text-muted-foreground">
                            Choose one of the options to continue
                        </p>
                    </div>
                    <LoginButton/>
                </div>
            </div>
        </div>
    )
}
