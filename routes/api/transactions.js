const express = require("express");
const router = express.Router();
const passport = require("passport");
const Transaction = require('../../models/Transaction');

router.get('/', (req, res)=>{
    Transaction.find()
        .sort({date: -1})
        .then(trans => res.json(trans))
        .catch(err=>res.status(400).json(err));
})


router.get('/:id', (req, res)=> {
    Transaction.findById(req.params.id)
    .then( trans => res.json(trans))
    .catch(err=>res.status(400).json(err));
})

router.post('/', passport.authenticate("jwt", {session: false}),
    (req, res)=>{
        //validate first 


        //
        const newTransaction = new Transaction({
            user: req.user.id,
            text: req.body.text
        });

        newTransaction.save().then(trans=>res.json(trans))
    }    
)


module.exports = router;