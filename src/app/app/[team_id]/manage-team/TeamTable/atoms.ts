import { atom } from 'jotai'

const filterOptions = ['members', 'pending', 'canceled'] as const
type FilterOption = typeof filterOptions[number]

export function isFilterOption(x: string): x is FilterOption {
  return filterOptions.includes(x as FilterOption)
}

export const filterAtom = atom<FilterOption>('members')
