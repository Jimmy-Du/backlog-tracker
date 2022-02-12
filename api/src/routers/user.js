const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/user')
const isEmpty = require('../utils/isEmpty')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Route:       Post /users/register
// Description: Creates a new user
// Access:      Public
router.post('/users/register', async (req, res) => {
    const user = new User({email: req.body.email, password: req.body.password})

    // if any fields required for registration are empty, an error is sent back
    if (isEmpty(user.email) || isEmpty(user.password) || isEmpty(req.body.password2)) {
      return res.status(400).send({error: 'Must fill out all fields.'})
    }

    try {
        const existingUser = await User.findOne({email: req.body.email})

        // if the email is already in use, an error is thrown
        if (existingUser) {
            throw new Error('Email already exists.')
        }
        else if (req.body.password !== req.body.password2) {
            throw new Error('Password fields must match.')
        }

        await user.save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

// Route:       Post /users/login
// Description: Login a user
// Access:      Public
router.post('/users/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // if any fields required for login are empty, an error is sent back
    if (isEmpty(email) || isEmpty(password)) {
      return res.status(400).send({error: 'Must fill out both input fields.'})
    }

    try {
        const user = await User.findOne({email})

        // if there is no user with the specified email, an error is sent back
        if (!user) {
            return res.status(404).send({error: 'User not found.'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        // if the entered password was a match with the hashed password, the user will be successfully signed in
        if (isMatch) {
            const token = await jwt.sign({id: user._id, name: user.name}, process.env.SECRET_KEY, {expiresIn: 3600})
            res.send({token: 'Bearer ' + token})
        }
        // else, an incorrect password error is sent back
        else {
            res.status(400).send({error: 'Incorrect email or password'})
        }
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

// Route:       Get /users/me
// Description: Retrieves user information
// Access:      Private
router.get('/users/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        res.status(200).send(req.user)
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

// Route:       Patch /users/me
// Description: Updates user information
// Access:      Private
router.patch('/users/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'password', 'password2']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if all content in the request are valid updates, the update will be attempted to be performed
    if (isValidOperation) {
        try {
            // if an email update is requested and the new email is already in use, an error is thrown
            if (updates.includes('email') && await User.findOne({email: req.body.email})) {
                throw new Error('Email already in use.')
            }

            // if a password update is requested and the confirmation password doe snot match, an error is thrown
            if (updates.includes('password') && req.body.password !== req.body.password2) {
                throw new Error('Password fields must match.')
            }

            // updates each requested field and saves the user
            updates.forEach((update) => {
                // if the updated field is not the confirmation password, it is updated
                if (update !== 'password2') {
                    req.user[update] = req.body[update]
                }
            })
            await req.user.save()
            res.status(201).send()
        }
        catch (error) {
            res.status(400).send({error: error.message})
        }
    }
    // else, an error is sent back to indicate invalid updates
    else {
        res.status(400).send({error: 'Invalid Updates'})
    }
})

module.exports = router