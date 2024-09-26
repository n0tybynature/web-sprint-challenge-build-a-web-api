// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { validateId } = require('./../middleware/middleware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then( action => {
        res.status(200).json(action)
    })
    .catch(next)
})


router.get('/:id', validateId,(req , res , next) => {

    Actions.get(req.params.id)
    .then( action => {
        res.status(200).json(action)
    })
    .catch( err => {
        res.status(404).json({ error: err.message})
        next()
    })
})

router.post('/',  ( req, res) => {
    Actions.insert(req.body)
        .then(actions =>{
            if(!actions){
                res.status(400).json({
                    message:"Please provide more information"
                })
            } else {
                res.status(201).json(actions)
            }
        })
        .catch(err => {
            res.status(400).json({
                message:"Could not post actions"
            })
        })

})

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then( actions => {
            
          if(!req.body.notes || !req.body.description){
            res.status(400).json({
                message:"Need more information for action."
            })
            } else {
            res.status(200).json(actions)
            }    
        })
        .catch( (err) => {
            res.status(400).json(`${err}`)
        })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then( () => {
        res.status(200).json({message: 'Action delete'})
    })
    .catch( err => {
        res.status(404).json({message: 'Could not delete Action.'})
    })
})


module.exports = router;