export type AuthInput = {
    email: string
    password: string
}

export type ServerResponse<T> = {
    success: boolean
    data: T
}

export type ApiError = {
    data: {
        message: string
    }
}
