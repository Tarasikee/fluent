import moment from 'moment'
import multer from 'multer'

const upload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, 'static/')
        },
        filename: (_req, file, cb) => {
            const date = moment().format('DDMMYYYY-HHmmss_SSS')
            cb(null, `${date}-${file.originalname}`)
        },
    }),
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
})

export default upload
