const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.check = (req, res) => {
    try {
        res.status(200).json({message: 'Valid token'})
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body
    const candidate = await User.findOne({email})

    if (!candidate) {
        return res.status(404).json({message: 'User not found'})
    }

    const passwordResult = bcrypt.compareSync(password, candidate.password)

    if (!passwordResult) {
        return res.status(401).json({message: 'Invalid password'})
    }

    const token = jwt.sign({
        id: candidate.id,
        email: candidate.email
    }, process.env.JWT_ACCESS_SECRET, {expiresIn: 60 * 60 * 24})
    res.status(200).json({token: `Bearer ${token}`})
}

module.exports.register = async (req, res) => {
    let {email, password} = req.body
    const candidate = await User.findOne({email})

    if (candidate) {
        return res.status(409).json({message: 'User already exists'})
    }

    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hashSync(password, salt)
    const user = new User({email, password})

    try {
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}
