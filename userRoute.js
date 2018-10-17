const User = require('./userModel')

module.exports = (app) => {

    app.post('/users', (req, res, next) => {
        if(!req.body.email && !req.body.username && !req.body.password && !req.body.passwordConf){
            return res.status(400).send({
                message: "Todos os campos devem ser preenchidos."
            })
        }

        const userData = new User({
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            passwordConf : req.body.passwordConf
        })

        userData.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Não foi possível salvar o novo usuário"
            })
        })

        
    })

}