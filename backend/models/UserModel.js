const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Static method to signup user
userSchema.statics.signup = async function (email, password) {

    //Make sure the email and password are provided
    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    //Check if the email is valid
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    }

    //Check if the password is strong
    if(!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough')
    }

    //Check if the email already exists
    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error('Email already exists, please login')
    }

    //Generate the salt + hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //Create the user
    const user = await this.create({ email, password: hash })

    return user
}

//Static method to login user
userSchema.statics.login = async function (email, password) {

    //Make sure the email and password are provided
    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    //Check if the email exists
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Email does not exist, please signup')
    }

    //Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Password is incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)