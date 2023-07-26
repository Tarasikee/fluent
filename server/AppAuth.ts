import { Express } from 'express-serve-static-core'

import passport from 'passport'
import passportInit from '@user/passport'

const AppAuth = (secret: string) => (app: Express) => {
    app.use(passport.initialize())
    passportInit(passport, secret)
}

export default AppAuth
