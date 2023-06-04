import mongoose from 'mongoose'

const Schema = mongoose.Schema

const positionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
})

const orderModel = mongoose.model('positions', positionSchema)

export default orderModel
