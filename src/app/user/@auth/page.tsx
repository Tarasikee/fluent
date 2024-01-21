import { Typography } from '~/components'

import { LoginButton } from './LoginButton'

export default function Page() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <Typography.H2>Continue with</Typography.H2>
                <p className="text-muted-foreground">
                    Choose one of the options to continue
                </p>
            </div>
            <LoginButton/>
        </>
    )
}
