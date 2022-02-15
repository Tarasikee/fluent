const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    const candidate = await User.findOne({email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(password, candidate.password)

        if (passwordResult) {
            const token = ''
            res.status(200).json({token})
        } else {
            res.status(401).json({message: 'Invalid password'})
        }
    } else {
        res.status(404).json({message: 'User not found'});
    }
}

module.exports.register = async (req, res) => {
    let {email, password} = req.body;
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
