import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: '',
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
})

const categoryModel = mongoose.model('categories', categorySchema)

export default categoryModel
