const Actions = require('./../actions/actions-model')


async function validateId(req , res, next){
    try{
        const user = await Actions.get(req.params.id)
        if(!user){
            res.status(404).json({message: 'No such action'})
        } else {
            req.user = user;
            next()
        }
    } catch {
        res.status(500).json({ message: 'Problem with finding user'})
    }
}




module.exports = {
    validateId,
 
}