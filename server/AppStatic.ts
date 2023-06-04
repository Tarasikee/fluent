import { Express } from 'express-serve-static-core'
import cors from 'cors'
import express from 'express'

export default function AppStatic(app: Express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/static', express.static('static'))
    app.use(cors({ origin: '*' }))
}
