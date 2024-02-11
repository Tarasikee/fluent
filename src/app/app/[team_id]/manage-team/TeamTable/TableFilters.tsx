'use client'

import { useAtom } from 'jotai'
import { type FC } from 'react'

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

import { filterAtom, isFilterOption } from './atoms'

export const TableFilters: FC = () => {
    const [filter, setFilter] = useAtom(filterAtom)

    function onValueChange(value: string) {
        if (isFilterOption(value)) {
            setFilter(value)
        }
    }

    return (
        <Tabs value={filter} onValueChange={onValueChange} className="w-[400px]">
            <TabsList>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="pending">Pending invites</TabsTrigger>
                <TabsTrigger value="canceled">Canceled invites</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
