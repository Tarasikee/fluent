const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.login = async (req, res) => {
    const {email, password} = req.body
    const candidate = await User.findOne({email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(password, candidate.password)

        if (passwordResult) {
            const {id, email} = candidate
            const token = jwt.sign({id, email}, process.env.JWT, {expiresIn: 60 * 60})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Invalid password'})
        }
    } else {
        res.status(404).json({message: 'User not found'})
    }
}

module.exports.register = async (req, res) => {
    let {email, password} = req.body
    const candidate = await User.findOne({email})

    if (candidate) {
        res.status(409).json({message: 'User already exists'})
    } else {
        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
        const user = new User({email, password})
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
        }
    }
}
