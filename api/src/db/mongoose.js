const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
