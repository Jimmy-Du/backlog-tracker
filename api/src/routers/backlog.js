const express = require('express')
const router = new express.Router()
const passport = require('passport')
const axios = require('axios')
const Backlog = require('../models/backlog')
const Game = require('../models/game')

// Route:       GET /games
// Description: Get user's backlog of games
// Access:      Private
router.get('/backlog', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        // retrieves backlog information of the user
        const backlog = await Backlog.find({owner: req.user._id}).populate({path: 'game'}).exec()

        // sends back all the games in the user's backlog
        res.send(backlog)
    }
    catch (error) {
        console.log(error)
        res.status(400).send({error: error.message})
    }
})


// Route:       POST /games
// Description: Add game to users' backlog
// Access:      Private
router.post('/backlog', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const existingGame = await Game.findOne({gameId: req.body.gameId})

        // if the game is not present in the database, the id and image data will be saved to the database
        if (!existingGame) {
            // sends out request to IGDB to get data on the game selected
            const gameResponse = await axios({
                url: process.env.IGDB_GAME_URL,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.IGDB_CLIENT_ID,
                    'Authorization': process.env.IGDB_ACCESS_KEY
                },
                data: `fields name, summary, cover, first_release_date; where version_parent = null; where id = ${req.body.gameId};`
            })

            // sends out another request to get the image data of the game
            const imageResponse = await axios({
                url: process.env.IGDB_COVER_URL,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.IGDB_CLIENT_ID,
                    'Authorization': process.env.IGDB_ACCESS_KEY
                },
                data: `fields image_id, url; where game = (${gameResponse.data[0].id});`
            })

            // creates new game entry and saves it to the database
            const newGame = new Game({
                gameId: req.body.gameId,
                name: gameResponse.data[0].name,
                summary: gameResponse.data[0].summary,
                releaseDate: gameResponse.data[0].first_release_date,
                image: imageResponse.data[0].image_id
            })
            await newGame.save()
        }

        // retrieves the game from the database to create a reference
        const selectedGame = await Game.findOne({gameId: req.body.gameId})

        const existingBacklog = await Backlog.findOne({game: selectedGame._id})

        // if the game has already been added into the user's backlog, an error is sent back
        if (existingBacklog) {
            throw new Error('Game already exists within your backlog.')
        }

        // Adds game into the user's backlog
        const backlog = new Backlog({game: selectedGame._id, completed: req.body.completed, owner: req.user._id})
        await backlog.save()

        res.send(backlog)
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

// Route:       PATCH /backlog/:id
// Description: Edit a user's backlogged game information
// Access:      Private
router.patch('/backlog/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (isValidOperation) {
        try {
            const backlog = await Backlog.findOne({_id: req.params.id, owner: req.user._id})

            if (!backlog) {
                res.status(404).send()
            }
            else {
                updates.forEach((update) => backlog[update] = req.body[update])
                await backlog.save()
                res.send(backlog)
            }
        }
        catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.status(400).send({error: 'Invalid Updates'})
    }
})

// Route:       DELETE /backlog/:id
// Description: Delete a user's backlogged game information
// Access:      Private
router.delete('/backlog/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const backlog = await Backlog.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!backlog) {
            res.status(404).send()
        }
        else {
            res.send(backlog)
        }
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router