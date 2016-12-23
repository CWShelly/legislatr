const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const humps = require('humps');
const camelizeKeys = humps.camelizeKeys;
const jsonParser = require('body-parser').json();

router.get('/us_senators', (req,res)=>{
    knex('ussenators')
    .then((rows)=> res.send(camelizeKeys(rows)))
    .catch((err)=> next(err));
});


router.post('/us_senators', jsonParser, (req, res, next)=>{
    console.log(req.body);
    return knex('ussenators')

    .insert(req.body)
    .then(()=>{
        console.log('hey');
        res.send(req.body);
        console.log(res.status);
    })
    .catch((err)=>next(err))
    ;
});
module.exports = router;
