'use strict'

var User = require('../models/User')
const { param } = require('../routes/user')

var controller = {
  //Ver o listar informacion peticion GET
  index : function(req, res){
    var token = getToken(req.headers)
    if (token) {
      User.find({}).exec((err, users) => {
        if (err) return res.status(500).send({message: 'Error al devover datos'}) 
        if (!users) return res.status(404).send({message: 'No se a podido encontrar datos'})
        return res.status(200).send({
          users
        })  
      })
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  //Guardar informacion en la base de datos peticion POST
  store : function(req, res){
    var token = getToken(req.headers)
    if (token) {
      var user = new User()
      var params = req.body
  
      user.name = params.name
      user.mail = params.mail
      user.age = params.age
      user.password = params.password
      user.username = params.username    
  
      user.save((err, UserStored) => {
        if(err) return res.status(500).send({message: "Error al guardar"})
        if(!UserStored) return res.status(404).send({message: "no se a podido guardar"})
        return res.status(200).send({
          message: 'Guardado con exito',
          user
        })
      })  
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }      
  },

  //traer un registro especifico por el id peticion GET
  show : function(req, res){
    var token = getToken(req.headers)
    if (token) {
      var userId = req.params.id
      if(userId == null) return res.status(404).send({message: "no se a encontrado ningun registro"})
      User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: "Error al mostrar"})
        if(!user) return res.status(404).send({message: "no se a encontrado ningun registro"})
        return res.status(200).send({
          user
        })
      }) 
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  //actualizar informacion de registros peticion PUT
  update : function(req, res){
    var token = getToken(req.headers)
    if (token) {
      var userId = req.params.id
      if (userId == null) return res.status(404).send({message: 'No tengo ID'})
      var update = req.body       
      if (req.body.password != null && req.body.password != '') {
        update.password = req.body.password
      } else {
        var actual = User.findById(userId)
        update.password = actual.password
      }
      User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) return res.status(500).send({message: 'Error al modificar los datos'})
        if (!userUpdate) return res.status(404).send({message: 'El registro no existe'})
        return res.status(200).send({
          message: 'Actualizado con exito',
          user: userUpdate
        })
      })
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }    
  },

  //eliminar registros peticion DELETE
  delete : function(req, res){
    var token = getToken(req.headers)
    if (token) {
      var userId = req.params.id
      if (userId == null) return res.status(404).send({message: 'No tengo ID'})
      User.findByIdAndDelete(userId, (err, userUpdate) => {
        if (err) return res.status(500).send({message: 'Error al eliminar los datos'})
        if (!userUpdate) return res.status(404).send({message: 'El documento no existe'})
        return res.status(200).send({
          message: 'Eliminado con exito',
          user: userUpdate
        })
      })
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }    
  },
  getToken(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

module.exports = controller