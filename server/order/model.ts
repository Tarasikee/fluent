import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    order: {
        type: Number,
        required: true,
    },
    list: [{
        name: { type: String },
        quantity: { type: Number },
        cost: { type: Number },
    }],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
})

const orderModel = mongoose.model('orders', orderSchema)

export default orderModel
