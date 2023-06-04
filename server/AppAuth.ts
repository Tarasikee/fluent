import { Express } from 'express-serve-static-core'

import passport from 'passport'
import passportInit from '@user/passport'

export default function AppAuth(app: Express) {
    app.use(passport.initialize())
    passportInit(passport, process.env.JWT_ACCESS_SECRET as string)
}
