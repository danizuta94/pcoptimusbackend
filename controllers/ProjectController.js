'use strict'

var Project = require('../models/Project')
const { param } = require('../routes/project')

var controller = {
  //Ver o listar informacion peticion GET
  index : function(req, res){
    Project.find({}).exec((err, projects) => {
      if (err) return res.status(500).send({message: 'Error al devover datos'}) 
      if (!projects) return res.status(404).send({message: 'No se a podido encontrar datos'})
      return res.status(200).send({
        projects
      })  
    })
  },

  //Guardar informacion en la base de datos peticion POST
  store : function(req, res){
    var project = new Project()
    var params = req.body

    project.name = params.name
    project.age = params.age
    project.description = params.description

    project.save((err, ProjectStored) => {
      if(err) return res.status(500).send({message: "Error al guardar"})
      if(!ProjectStored) return res.status(404).send({message: "no se a podido guardar"})
      return res.status(200).send({
        message: 'Guardado con exito',
        project: project
      })
    })

    
  },

  //traer un registro especifico por el id peticion GET
  show : function(req, res){
    var projectId = req.params.id
    if(projectId == null) return res.status(404).send({message: "no se a encontrado ningun registro"})
    Project.findById(projectId, (err, project) => {
      if(err) return res.status(500).send({message: "Error al mostrar"})
      if(!project) return res.status(404).send({message: "no se a encontrado ningun registro"})
      return res.status(200).send({
        project
      })
    })
  },

  //actualizar informacion de registros peticion PUT
  update : function(req, res){
    var projectId = req.params.id
    if (projectId == null) return res.status(404).send({message: 'No tengo ID'})
    var update = req.body
    Project.findByIdAndUpdate(projectId, update, (err, projectUpdate) => {
      if (err) return res.status(500).send({message: 'Error al modificar los datos'})
      if (!projectUpdate) return res.status(404).send({message: 'El registro no existe'})
      return res.status(200).send({
        message: 'Actualizado con exito',
        project: projectUpdate
      })
    })
  },

  //eliminar registros peticion DELETE
  delete : function(req, res){
    var projectId = req.params.id
    if (projectId == null) return res.status(404).send({message: 'No tengo ID'})
    Project.findByIdAndDelete(projectId, (err, projectUpdate) => {
      if (err) return res.status(500).send({message: 'Error al eliminar los datos'})
      if (!projectUpdate) return res.status(404).send({message: 'El documento no existe'})
      return res.status(200).send({
        message: 'Eliminado con exito',
        project: projectUpdate
      })
    })
  }
}

module.exports = controller