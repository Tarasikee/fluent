import AppAuth from './AppAuth'
import AppDB from './AppDB'
import AppRouter from './AppRouter'
import AppStatic from './AppStatic'
import dotenv from 'dotenv'
import express from 'express'

async function initServer() {
    dotenv.config()

    const PORT = process.env.PORT || 3000
    const app = express()

    await AppDB()
    AppAuth(app)
    AppStatic(app)
    AppRouter(app)

    app.listen(PORT, () => console.info(`Server running on port ${PORT}`))

}

initServer().then(console.info)
