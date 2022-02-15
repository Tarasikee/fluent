const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()

router.post('/', controller.create)
router.get('/', controller.getAll)

module.exports = router;
