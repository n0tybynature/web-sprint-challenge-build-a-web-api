// Write your "projects" router here!
const express = require('express');

const router = express.Router();
const Projects = require('./projects-model')

router.get('/', (req,res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: `${err}`})
        })
})


router.get('/:id', (req,res) => {
    Projects.get(req.params.id)
        .then(projects => {
            if(!projects){
                res.status(404).json({message:"Could not find project id"})
            } else {
                res.status(200).json(projects)
            }
        })
        .catch( err => {
            res.status(500).json({message: `${err}`})
        })
})

router.post('/', (req,res) => {
    Projects.insert(req.body)
        .then(projects => {
            if(!projects){
                res.status(400).json({message: "Missing fields"})
            } else {
                res.status(200).json(projects)
            }
        })
        .catch( err => {
            res.status(400).json({message: `${err}`})
        })
})


router.put('/:id', (req,res) => {
    Projects.update(req.params.id, req.body)
        .then(projects => {
            if(!req.body.name || !req.body.description){
                res.status(400).json({
                    message: "Missing field"
                })
            } else {
                res.status(200).json(projects)
            }
        })
        .catch( err => {
            res.status(400).json({message:"Can't retreive projects"})
        })
})

router.delete('/:id', (req,res) => {
    Projects.remove(req.params.id)
        .then( project => {
            if(!project){
                res.status(404).json({message:"Could not find project with ID"})
            } else {
                res.status(200).json({message:"Project removed"})
            }
        })
        .catch( err => {
            res.status(500).json({message:`${err}`})
        })
})
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch( err => {
            res.status(500).json({message:`${err}`})
        })
})

module.exports = router;