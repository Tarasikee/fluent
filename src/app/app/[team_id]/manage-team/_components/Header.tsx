import { PlusIcon } from '@radix-ui/react-icons'
import { type FC } from 'react'

import { Typography } from '~/components'
import { Button } from '~/components/ui/button'

export const Header: FC = () => {
    return (
        <div className="flex justify-between items-center">
            <Typography.H2>Manage yor team</Typography.H2>
            <Button variant="blue">
                <PlusIcon className="mr-2 h-4 w-4"/>
                Add new team member
            </Button>
        </div>
    )
}
