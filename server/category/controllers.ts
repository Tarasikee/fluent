import { Request, Response } from 'express'
import categoryModel from './model'
import errorHandler from '@utils/errorHandler'
import positionModel from '@position/model'

type User = {
    id?: string
}

type FileReq = Request & {
    file?: {
        path: string
    },
}

async function getAll(req: Request, res: Response) {
    try {
        const categories = await categoryModel.find({
            user: (req.user as User)?.id,
        })

        return res.json(categories)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function getById(req: Request, res: Response) {
    try {
        const category = await categoryModel.find({
            user: (req.user as User)?.id,
            _id: req.params.id,
        })

        return res.json(category)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function createCategory(req: FileReq, res: Response) {
    const category = new categoryModel({
        name: req.body.name,
        user: (req.user as User)?.id,
        imageSrc: req.file ? req.file.path : '',
    })

    try {
        await category.save()
        return res.status(201).json(category)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function deleteCategory(req: Request, res: Response) {
    try {
        await categoryModel.remove({
            _id: req.params.id,
            user: req.user,
        })

        await positionModel.remove({
            category: req.params.id,
            user: req.user,
        })

        return res.json({
            success: true,
            message: 'Category was deleted',
        })
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function update(req: FileReq, res: Response) {
    const updatedMap = new Map<string, string>()
    updatedMap.set('name', req.body.name)

    if (req.file) {
        updatedMap.set('imageSrc', req.file.path)
    }

    try {
        const category = await categoryModel.findOneAndUpdate(
            {
                _id: req.params.id,
                user: (req.user as User)?.id,
            },
            { $set: Object.fromEntries(updatedMap) },
            { new: true },
        )

        return res.json(category)
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

export default {
    getAll, getById, update,
    create: createCategory,
    delete: deleteCategory,
}
