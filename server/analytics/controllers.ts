import { Request, Response } from 'express'
import { calculateGain, getOrdersMap } from '@analytics/utils'
import errorHandler from '@utils/errorHandler'
import moment from 'moment'
import orderModel from '@order/model'

type User = {
    id?: string
}

async function overview(req: Request, res: Response) {
    try {
        const allOrders = await orderModel.find({ user: (req.user as User).id }).sort('desc')
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        const yesterdayOrdersNumber = yesterdayOrders.length
        const totalOrders = allOrders.length
        const daysNumber = Object.keys(ordersMap).length
        const ordersPerDay = Number((totalOrders / daysNumber).toFixed(0))
        const ordersPercent = Number((((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2))

        const totalGain = calculateGain(allOrders)
        const gainPerDay = totalGain / daysNumber
        const yesterdayGain = calculateGain(yesterdayOrders)
        const gainPercent = Number((((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2))

        const compareGain = Number((yesterdayGain - gainPerDay).toFixed(2))
        const compareOrdersNumber = Number((yesterdayOrdersNumber - ordersPerDay).toFixed(2))

        return res.json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0,
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareOrdersNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0,
            },
        })
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

async function analytics(req: Request, res: Response) {
    try {

        const allOrders = await orderModel.find({ user: (req.user as User).id }).sort('desc')
        const ordersByDay = getOrdersMap(allOrders)

        const daysNumber = Object.keys(ordersByDay).length
        const totalGain = calculateGain(allOrders)

        const averageBill = +(totalGain / daysNumber).toFixed(2)

        const chart = Object.keys(ordersByDay).map(label => {
            const gain = calculateGain(ordersByDay[label])
            const order = ordersByDay[label].length

            return { label, order, gain }
        })

        return res.json({ averageBill, chart })
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

export default { overview, analytics }
