// Write your "projects" router here!
const Projects = require('./projects-model')
const express = require('express')
const router = express.Router()

router.get('/', ( req , res, next) => {
    Projects.get()
    .then( project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id', ( req, res, next) => {
    Projects.get(req.params.id)
    .then( project => {
        if(!project){
            res.status(404).json({message: "No project with ID"})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        res.status(500).json({message:'Could not perform search'})
    })
})


router.post('/', ( req, res, next) => {
    Projects.insert(req.body)
    .then( project => {
        if(!project){
            res.status(400).json({ message: "Required Fields"})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(next)
})


router.put('/:id', ( req , res , next ) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if(!req.body.name || !req.body.description){
            res.status(400).json({message:"Missing fields"})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(next)
})

router.delete('/:id', ( req, res, next) => {
    Projects.remove(req.params.id)
    .then( project => {
        if(!project){
            res.status(404).json({message:'No project found with ID'})
        } else {
            res.status(200).json({message:"Project removed"})
        }
    })
    .catch(next)
})


router.get('/:id/actions', ( req , res , next) => {
    Projects.getProjectActions(req.params.id)
    .then( project => {
        if(!project){
            res.status(400).json({message:'No found actions'})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(next)
})


module.exports = router;