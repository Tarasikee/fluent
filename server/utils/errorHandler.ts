import { Response } from 'express'

function errorHandler (res: Response, error: Error) {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error.toString(),
    })
}

export default errorHandler
