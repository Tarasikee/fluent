const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/')
    },
    filename: () => {

    }
})

module.exports = multer({})
