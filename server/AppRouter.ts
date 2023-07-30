import { Express } from 'express-serve-static-core'

import analyticsRoutes from '@analytics/routes'
import categoryRoutes from '@category/routes'
import orderRoutes from '@order/routes'
import positionRoutes from '@position/routes'
import userRoutes from '@user/routes'

export default function AppRouter(app: Express, path: string) {
    app.use(`${path}/auth`, userRoutes)
    app.use(`${path}/category`, categoryRoutes)
    app.use(`${path}/position`, positionRoutes)
    app.use(`${path}/order`, orderRoutes)
    app.use(`${path}/analytics`, analyticsRoutes)
}
