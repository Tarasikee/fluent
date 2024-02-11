import { PlusIcon } from '@radix-ui/react-icons'
import { type FC } from 'react'

import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

export const NoRightToAdd: FC = () => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="like-disabled">
                        <PlusIcon className="mr-2 h-4 w-4"/>
                        Add new team member
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="p-4">
                        <p className="text-sm">You don{'\''}t have the right to add new members to this team.</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
