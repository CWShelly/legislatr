const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const humps = require('humps');
const camelizeKeys = humps.camelizeKeys;
const jsonParser = require('body-parser').urlencoded({extended:true});
const agent = require ('superagent');

router.get('/us_senators', (req,res)=>{
    knex('ussenators')
    .then((rows)=> res.send(camelizeKeys(rows)))
    .catch((err)=> next(err));
});

// console.log(process.env.PROPUBLICA);

router.post('/us_senators', jsonParser, (req, res, next)=>{
    console.log('posting here ');
    console.log(req.body);
    // console.log(req);
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
