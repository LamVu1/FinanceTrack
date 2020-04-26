const express = require("express");
const router = express.Router();
const passport = require("passport");
const Transaction = require('../../models/Transaction');

router.get('/', (req, res)=>{
    Transaction.find()
        .sort({date: 1})
        .then(trans => res.json(trans))
        .catch(err=>res.status(400).json(err));
})


// router.get('/:id', (req, res)=> {
//     Transaction.findById(req.params.id)
//     .then( trans => res.json(trans))
//     .catch(err=>res.status(400).json(err));
// })


router.get('/:id', (req, res)=> {
    
    Transaction.find({user: req.params.id}).sort({date: -1})
    .then( trans => res.json(trans))
    .catch(err=>res.status(400).json(err));
})



router.post('/create', passport.authenticate("jwt", {session: false}),
    (req, res)=>{
        //validate first 
        let newTransaction;
        if(req.body.date){
            newTransaction = new Transaction({
                user: req.user.id,
                amount: req.body.amount,
                text: req.body.item,
                date: req.body.date
            });
        }else{
            newTransaction = new Transaction({
                user: req.user.id,
                amount: req.body.amount,
                text: req.body.item
            });
        }
        

        newTransaction.save().then(trans=>{
        const transdata = {
            _id: trans.id,
            text: trans.text,
            amount: trans.amount,
            date: trans.date
        }    
            
            res.json(transdata)
        })
    }    
)


router.post('/delete/:id', passport.authenticate("jwt", {session: false}),
    (req, res)=>{
        //validate first 

        Transaction.findOneAndRemove({ "_id" : req.params.id })
        .then( trans => res.json(trans))
        .catch(err=>res.status(400).json(err));
    }    
)




module.exports = router;