const mongoose = require('mongoose')

const DocumentSchema = mongoose.Schema({
    name: { type: String, required: true, min: 1, max: 100},
    content: { type: String, required: true},
    author: { type: String }
})

module.exports = mongoose.model('Document', DocumentSchema)