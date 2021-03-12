// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');



router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch( () => {
            res.status(500).json({
                message:"Can't grab action."
            })
        })
})

router.get('/:id', (req,res) => {
    Actions.get( req.params.id )
        .then(actions => {
            if (actions){
                res.status(200).json(actions)
            } else {
                res.status(404).json({
                    message: "Action with ID could not be performed."
                })
            }
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                message:"Couldn't perform action"
            });
        });
})

router.post('/', (req, res) => {
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



///seomthing wrong with res.status
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




router.delete('/:id', (req,res) => {
    Actions.remove(req.params.id)
        .then( () => {
            res.status(200).json("Action deleted")
        })
        .catch( err => {
            res.status(404).json({message: `Could not perform delete. ${err} `})
        })
})

module.exports = router;