import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import errorHandler from '@utils/errorHandler'
import jsonwebtoken from 'jsonwebtoken'
import userModel from './model'

type UserDTO = {
    email: string
    password: string
}

async function check(req: Request, res: Response) {
    try {
        return res.json({
            success: true,
            data: req.user,
        })
    } catch (_e: unknown) {
        errorHandler(res, _e as Error)
    }
}

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body as UserDTO

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            })
        }

        const candidate = await userModel.findOne({ email })

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Email or password are incorrect',
            })
        }

        const isMatch = await bcrypt.compare(password, candidate.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Email or password are incorrect',
            })
        }

        const token = jsonwebtoken.sign({
            id: candidate._id,
            email: candidate.email,
        }, process.env.JWT_ACCESS_SECRET as string, {
            expiresIn: 60,
        })

        return res.json({
            success: true,
            data: {
                token: `Bearer ${token}`,
            },
        })
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

async function register(req: Request, res: Response) {
    try {
        const { email } = req.body as UserDTO
        let { password } = req.body as UserDTO

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            })
        }

        const candidate = await userModel.findOne({ email })

        if (candidate) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
        const user = new userModel({ email, password })

        await user.save()
        res.status(201).json({
            success: true,
            data: user,
        })
    } catch (e: unknown) {
        errorHandler(res, e as Error)
    }
}

export default { check, register, login }
