import controllers from './controllers'
import express from 'express'
import passport from 'passport'
import upload from './upload'

const categoryRoutes = express.Router()
    .get(
        '/',
        passport.authenticate('jwt', { session: false }),
        controllers.getAll,
    )
    .get(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controllers.getById,
    )
    .post(
        '/',
        passport.authenticate('jwt', { session: false }),
        upload.single('image'),
        controllers.create,
    )
    .delete(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        controllers.delete,
    )
    .patch(
        '/:id',
        passport.authenticate('jwt', { session: false }),
        upload.single('image'),
        controllers.update,
    )

export default categoryRoutes
