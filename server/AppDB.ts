import mongoose from 'mongoose'

export default async function AppDB() {
    const MONGO_URI = process.env.MONGO_URI

    if (!MONGO_URI) {
        throw new Error('No Mongo URI defined in .env file')
    }

    try {
        await mongoose.connect(MONGO_URI)
        console.info('Connected')
    } catch (error) {
        console.error(error)
    }
}
