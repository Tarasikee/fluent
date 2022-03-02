const moment = require('moment');
const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

const getOrdersMap = (orders = []) => {
    const daysOrders = {};
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');

        //No today logic
        if (date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }

        daysOrders[date].push(order)
    });
    return daysOrders;
}

const calculateGain = (orders = []) => {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, {cost, quantity}) => orderTotal += cost * quantity, 0);
        return total += orderPrice;
    }, 0);
}


module.exports.overview = async (req, res) => {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort("desc");
        const ordersByDay = getOrdersMap(allOrders);
        const yesterdayOrders = ordersByDay[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

        const yesterdayOrdersNumber = yesterdayOrders.length;
        const totalOrders = allOrders.length;
        const daysNumber = Object.keys(ordersByDay).length;
        const ordersPerDay = (totalOrders / daysNumber).toFixed(0);
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);

        //Gain
        const totalGain = calculateGain(allOrders);
        const gainPerDay = totalGain / daysNumber;
        const yesterdayGain = calculateGain(yesterdayOrders)
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

        //Compare Gain
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
        //Compare orders number
        const compareOrdersNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            }, orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareOrdersNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.analytics = async (req, res) => {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
        const ordersByDay = getOrdersMap(allOrders);

        const daysNumber = Object.keys(ordersByDay).length;
        const totalGain = calculateGain(allOrders);

        const averageBill = +(totalGain / daysNumber).toFixed(2);

        const chart = Object.keys(ordersByDay).map(label => {
            // label == 01.03.2022
            const gain = calculateGain(ordersByDay[label]);
            const order = ordersByDay[label].length;

            return {label, order, gain}
        })

        res.status(200).json({averageBill, chart})
    } catch (e) {
        errorHandler(res, e)
    }
}
