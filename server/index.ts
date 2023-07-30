import * as process from 'process'
import AppAuth from './AppAuth'
import AppDB from './AppDB'
import AppRouter from './AppRouter'
import AppStatic from './AppStatic'
import dotenv from 'dotenv'
import express from 'express'

async function initServer() {
    dotenv.config({ path: '../.env' })

    const PORT = process.env.SERVER_PORT || 3000
    const JWT_SECRET = process.env.JWT_ACCESS_SECRET || ''
    const app = express()

    await AppDB()
    AppAuth(app, JWT_SECRET)
    AppStatic(app)
    AppRouter(app, '/api')

    app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
}

initServer().then(console.info)
