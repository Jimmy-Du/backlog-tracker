const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('Users')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = '' + process.env.SECRET_KEY

module.exports = passport => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id)

            if (user) {
                done(null, user)
            }
            else {
                done(null, false)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }))
}