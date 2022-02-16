const express = require('express')
const passport = require('passport')
const upload = require('../middlewares/upload')
const controller = require('../controllers/category')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)

module.exports = router;
