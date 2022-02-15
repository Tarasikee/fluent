const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id).select('id email')
                if (user) {
                    done(null, user)
                } else {
                    done(user, false)
                }
            } catch (e) {
                console.log(e);
            }
        })
    )
}
