import controllers from './controllers'
import express from 'express'
import passport from 'passport'

const analyticsRoutes = express.Router()
    .get(
        '/overview',
        passport.authenticate('jwt', { session: false }),
        controllers.overview,
    )
    .get(
        '/analytics',
        passport.authenticate('jwt', { session: false }),
        controllers.analytics,
    )

export default analyticsRoutes
