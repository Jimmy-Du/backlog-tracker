const mongoose = require('mongoose')

const backlogSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Games'
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
})

const Backlog = mongoose.model('Backlogs', backlogSchema)

module.exports = Backlog