'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { type FC } from 'react'
import { useFormState } from 'react-dom'

import { SubmitButton } from '~/components'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import { createTeam } from './action'

export const CreateTeamModal: FC = () => {
    const [formState, formAction] = useFormState(createTeam, { errors: { teamName: [] } })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    Create a team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create team</DialogTitle>
                    <DialogDescription>
                        Here you can create your team and give it name
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="flex flex-col space-y-2 mb-3">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Team name</Label>
                            <Input name="teamName" id="name" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="w-full text-xs text-red-500 col-start-2 col-span-3">{formState?.errors?.teamName}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <SubmitButton label="Create team" loadingLabel="Creating..." />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
