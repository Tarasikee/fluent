const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async ({id}, done) => {
            try {
                const user = await User.findById(id).select('id email')
                if (!user) return done(user, false);
                done(null, user)
            } catch (e) {
                console.log(e);
            }
        })
    )
}
