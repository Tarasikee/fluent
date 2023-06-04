import { Request, Response } from 'express'
import errorHandler from '@utils/errorHandler'
import orderModel from './model'

type User = {
    id?: string
}

async function create(req: Request, res: Response) {
    try {
        const lastOrder = await orderModel.findOne({
            user: (req.user as User).id,
        }).sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await orderModel.create({
            list: req.body.list,
            user: (req.user as User).id,
            order: maxOrder + 1,
        })

        await order.save()
        return res.status(201).json(order)
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const user = (req.user as User)
        const query = new Map<string, string | number | Record<string, unknown>>()

        if (user && user.id) {
            query.set('user', user.id)
        }

        if (req.query.start) {
            query.set('date', {
                '$gte': req.query.start,
            })
        }

        if (req.query.end) {
            query.set('date', {
                '$lte': req.query.end,
            })
        }

        if (req.query.order) {
            query.set('order', Number(req.query.order))
        }

        const orders = await orderModel
            .find(Object.fromEntries(query))
            .sort({ date: -1 })
            .skip(Number(req.query.offset))
            .limit(Number(req.query.limit))

        return res.status(200).json(orders)
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

export default { create, getAll }
