import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { PassportStatic } from 'passport'
import userModel from './model'

function passportInit(passport: PassportStatic, secret: string) {
    passport.use(
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        }, async ({ id }, done) => {
            try {
                const user = await userModel.findById(id).select('id email')
                if (!user) return done(user, false)
                done(null, user)
            } catch (e) {
                console.error(e)
            }
        }),
    )
}

export default passportInit
