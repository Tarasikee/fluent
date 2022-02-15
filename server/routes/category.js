const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.delete('/:id', controller.delete)
router.patch('/:id', controller.update)

module.exports = router;
