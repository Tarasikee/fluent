'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { useParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

import { SubmitButton, Typography } from '~/components'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import { sendInvite } from '../action'

export const Header: FC = () => {
    const params = useParams()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formState, formAction] = useFormState(sendInvite, { errors: { email: [] } })

    useEffect(() => {
        if (formState?.success) {
            setIsDialogOpen(false)
            toast.success('Invitation sent')
        }
    }, [formState?.success])

    return (
        <div className="flex justify-between items-center">
            <Typography.H2>Manage your team</Typography.H2>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="blue">
                        <PlusIcon className="mr-2 h-4 w-4"/>
                        Add new team member
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new team member</DialogTitle>
                    </DialogHeader>
                    <form action={formAction}>
                        <div className="flex flex-col space-y-2 mb-3">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Enter email</Label>
                                <Input name="email" id="email" className="col-span-3"/>
                                <Input name="teamId" type="hidden" value={params?.team_id}/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <p className="w-full text-xs text-red-500 col-start-2 col-span-3">{formState?.errors?.email}</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <SubmitButton label="Sent request" loadingLabel="Sending..."/>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
