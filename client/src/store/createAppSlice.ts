import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Args<T> = {
    name: Readonly<string>
    initialState: T
}

function createAppSlice<T extends Record<string, unknown>>({ name, initialState }: Args<T>) {
    return createSlice({
        name,
        initialState,
        reducers: {
            set: (state, action: PayloadAction<Partial<T>>) => {
                Object.assign(state, action.payload)
            },
        },
    })
}

export default createAppSlice
