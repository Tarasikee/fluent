import controllers from './controllers'
import express from 'express'
import passport from 'passport'

const positionRoutes = express.Router()
    .get(
        '/:categoryId',
        passport.authenticate('jwt', { session: false }),
        controllers.getByCategoryId,
    )
    .post(
        '/',
        passport.authenticate('jwt', { session: false }),
        controllers.create,
    )
    .patch(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controllers.update,
    )
    .delete(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controllers.delete,
    )

export default positionRoutes
