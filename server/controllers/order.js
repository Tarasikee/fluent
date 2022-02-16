const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1})

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

// (get) localhost:5000/api/order?offset=1&limit=5&start=01.01.2003&end=01.02.2020
module.exports.getAll = async (req, res) => {
    try {
        const query = {
            user: req.user.id,
            date: undefined
        }

        if (req.query.start) {
            query.date['$gte'] = req.query.start
        }

        if (req.query.end) {
            query.date['$lte'] = req.query.end;
        }

        if (req.query.order) {
            query.order = +req.query.order
        }

        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.params.offset)
            .limit(+req.params.limit)

        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}
