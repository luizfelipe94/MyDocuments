const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const dbConfig = require('./dbConfig')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Conectado na base de dados com sucesso.')
}).catch(() => {
    console.log('Não foi possível conectar a base de dados.')
    process.exit()
})

//rota de teste
require('./routes')(app)


app.listen(port, () => {
    console.log(`Servidor ON na porta ${port}`)
})