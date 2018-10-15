const mongoose = require('mongoose')

const DocumentSchema = mongoose.Schema({
    name: String,
    content: String,
    date: String,
})

module.exports = mongoose.model('Document', DocumentSchema)