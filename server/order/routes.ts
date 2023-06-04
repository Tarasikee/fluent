import controllers from './controllers'
import express from 'express'
import passport from 'passport'

const analyticsRoutes = express.Router()
    .post(
        '/',
        passport.authenticate('jwt', { session: false }),
        controllers.create,
    )
    .get(
        '/',
        passport.authenticate('jwt', { session: false }),
        controllers.getAll,
    )

export default analyticsRoutes
