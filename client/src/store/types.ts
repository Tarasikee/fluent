import { RootState } from './store'

export type Selectors<State> = {
    [StateKey in keyof State]: (state: RootState) => State[StateKey]
}
