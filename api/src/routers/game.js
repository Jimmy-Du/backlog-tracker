const express = require('express')
const router = new express.Router()
const passport = require('passport')
const axios = require('axios')
const mergeGameAndImageData = require('../utils/mergeGameAndImageData')
const isEmpty = require('../utils/isEmpty')

// Route:       POST /games/search
// Description: Search games to add to backlog
// Access:      Private
router.post('/games/search', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const search = req.body.search

    try {
        // sends out request to IGDB to get games matching the search term
        const gameResponse = await axios({
            url: process.env.IGDB_GAME_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.IGDB_CLIENT_ID,
                'Authorization': process.env.IGDB_ACCESS_KEY
            },
            data: `fields id, name, summary, cover, first_release_date; search "${search}"; where version_parent = null; limit 10;`
        })

        // creates new array to store the cover ids of the games retrieved to get the cover data
        const coverIds = gameResponse.data.map((gameData) => {
            return gameData.cover
        }).filter(cover => cover !== undefined)

        // if there are cover ids from the retrieved games, another request to get the image data of each game
        if (!isEmpty(coverIds)) {
            const imageResponse = await axios({
                url: process.env.IGDB_COVER_URL,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.IGDB_CLIENT_ID,
                    'Authorization': process.env.IGDB_ACCESS_KEY
                },
                data: `fields image_id, url; where id = (${coverIds.toString()});`
            })

            const combinedData = mergeGameAndImageData(gameResponse.data, imageResponse.data)
            res.send(combinedData)
        }
        // else, only the game data is sent back to the user
        else {
            res.send(gameResponse.data)
        }
    }
    catch (error) {
        console.log(error.response.data)
        res.status(400).send({error: error.message})
    }
})

// Route:       GET /games/:gameId
// Description: Preview game before adding to backlog
// Access:      Private
router.get('/games/:gameId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const gameId = req.params.gameId

    try {
        // sends out request to IGDB to get data on the game selected
        const gameResponse = await axios({
            url: process.env.IGDB_GAME_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.IGDB_CLIENT_ID,
                'Authorization': process.env.IGDB_ACCESS_KEY
            },
            data: `fields name, summary, cover, first_release_date; where version_parent = null; where id = ${gameId};`
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

        const combinedData = mergeGameAndImageData(gameResponse.data, imageResponse.data)

        res.send(combinedData)
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router