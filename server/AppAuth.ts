import { Express } from 'express-serve-static-core'

import passport from 'passport'
import passportInit from '@user/passport'

export default function AppAuth(app: Express, secret: string) {
    if (!app) {
        throw new Error('App is not defined')
    }

    app.use(passport.initialize())
    passportInit(passport, secret)
}
