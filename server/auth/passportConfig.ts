import { PassportStatic } from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import { getUserByUsername } from "../services/users";
import bcrypt from "bcrypt";

export const initializePassport = (passport: PassportStatic) => {
    const authenticateUser: VerifyFunction = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username)
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
            const isValid = await bcrypt.compare(password, user.password as string)
            if (!isValid) {
                return done(null, false, { message: 'Invalid credentials' })
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }

    passport.use(
        new Strategy({
            usernameField: "username",
            passwordField: "password"
        }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser(async (username: string, done) => {
        done(null, await getUserByUsername(username))
    })
}