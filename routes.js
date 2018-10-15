const express = require('express')
const Doc = require('./documentModel')

module.exports = (server) => {

    const router = express.Router()
    server.use('/api', router)

    router.route('/').get((req, res, next) => {
        res.json({"msg":"Rota principal da aplicação"})
    })

    // GET : findAll
    router.route('/documents').get((req, res, next) => {
        //res.json({"msg":"Get documents"})
        Doc.find()
        .then(docs => {
            res.send(docs)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algo deu errado enquanto recuparava os documentos."
            })
        })
    })

    // POST : save
    router.route('/documents').post((req, res, next) => {
        if(!req.body.content){
            return res.status(400).send({
                message: "Corpo do documento não pode estar vazio."
            })
        }
        // else{
        //     const doc = new Doc({
        //         name: req.body.name || "Doc sem titulo",
        //         content: req.body.content 
        //     })

        //     return res.status(200).send(doc)
        // }

        const doc = new Doc({
            name: req.body.name || "Doc sem titulo",
            content: req.body.content 
        })

        doc.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algo de errado na inclusao do documento no banco de dados"
            })
        })
    })

    // GET : getByID
    router.route('/documents/:id').get((req, res, next) => {
        Doc.findById(req.params.id)
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    message: "Documento não encontrado com o ID " + req.params.id
                })
            }
            res.send(docs)
        }).catch(err => {
            return res.send({
                message: "Não há documento com este ID: " + req.params.id
            })
        })
    })

    // PUT : update
    router.route('/documents/:id').put((req, res) => {
        if(!req.body.content){
            return res.status(400).send({
                message: "Corpo do documento não pode ser vazio."
            })
        }

        Doc.findByIdAndUpdate(req.params.id, {
            name: req.body.name || "Doc sem titulo atualizado",
            content: req.body.content
        }, {new: true})
        .then(doc => {
            if(!doc){
                return res.status(404).send({
                    message: "Documento não encontrado para atualizar os dados com o ID " + req.params.id
                })
            }
            res.send(doc)
        }).catch(err => {
            res.send({
                message: "Documento não encontrado para atualizar os dados com o ID " + req.params.id
            })
        })
    })

    // DELETE : delete
    router.route('/documents/:id').delete((req, res) => {
        Doc.findByIdAndRemove(req.params.id)
        .then(doc => {
            if(!doc){
                return res.status(404).send({
                    message: "Documento não encontrado para deletar com o ID " + req.params.id
                })
            }
            res.send({
                message: "Documento deletado com sucesso."
            })
        }).catch(err => {
            return res.status(404).send({
                message: "Não foi possível deletar o documento com ID " + req.params.id
            })
        })
    })

    

    
}