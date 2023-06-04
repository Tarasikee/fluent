import { Request, Response } from 'express'
import errorHandler from '@utils/errorHandler'
import positionModel from './model'

type User = {
    id?: string
}

async function create(req: Request, res: Response) {
    const position = new positionModel({
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        user: (req.user as User)?.id,
    })

    try {
        await position.save()
        return res.status(201).json(position)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function getByCategoryId(req: Request, res: Response) {
    try {
        const position = await positionModel.find({
            category: req.params.categoryId,
            user: (req.user as User)?.id,
        })

        return res.json(position)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function update(req: Request, res: Response) {
    try {
        const position = await positionModel.findOneAndUpdate(
            {
                _id: req.params.id,
                user: (req.user as User)?.id,
            },
            { $set: req.body },
            { new: true },
        )

        return res.json(position)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function deletePosition(req: Request, res: Response) {
    try {
        await positionModel.remove({
            _id: req.params.id,
            user: (req.user as User)?.id,
        })

        return res.json({
            success: true,
            data: 'Position was deleted',
        })
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

export default {
    delete: deletePosition,
    create, update, getByCategoryId,
}
