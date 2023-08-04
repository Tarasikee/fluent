import { Order } from '@order/model'
import moment from 'moment'

export function getOrdersMap(orders: Order[] = []) {
    const daysOrders: Record<string, Order[]> = {}

    orders.map(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        //No today logic
        if (date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })

    return daysOrders
}

export function calculateGain(orders: Order[] = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, { cost, quantity }) => orderTotal += cost * quantity, 0)
        return total += orderPrice
    }, 0)
}
