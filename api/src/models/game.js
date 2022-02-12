const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    gameId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    summary: {
        type: String
    },
    releaseDate: {
        type: Number
    }
})

const Game = mongoose.model('Games', gameSchema)

module.exports = Game