import { Schema, Types, model } from 'mongoose'

export type OrderItem = {
    name: string
    quantity: number
    cost: number
}

export type Order = {
    date: Date
    order: number
    list: OrderItem[]
    user: Types.ObjectId
}

const orderSchema = new Schema<Order>({
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

const orderModel = model<Order>('orders', orderSchema)

export default orderModel
