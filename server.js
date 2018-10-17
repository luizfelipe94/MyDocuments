const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// tiny, combined, personalizado ({:method :url :response-time})
app.use(morgan('combined'))

app.use(session({
    secret: 'i love program',
    resave: true,
    saveUninitialized: false
}))

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
require('./userRoute')(app)


app.listen(port, () => {
    console.log(`Servidor ON na porta ${port}`)
})