'use strict'

var Testimonio = require('../models/Testimonios')
const { param } = require('../routes/user')

var controller = {
  //Ver o listar informacion peticion GET
  index : function(req, res){
        Testimonio.find({publico: true}).exec((err, testimonios) => {
            if(err) return res.status(500).send({message: 'Error al devover datos'})
            if (!testimonios) return res.status(404).send({message: 'No se a podido encontrar datos'})
            return res.status(200).send({testimonios})
        })
    }
}

module.exports = controller