const tokenName = 'token'

const storageToken = {
    get: () => localStorage.getItem(tokenName),
    set: (token: string) => {
        localStorage.setItem(tokenName, token)
    },
    remove: () => {
        localStorage.removeItem(tokenName)
    },
}

export default storageToken
