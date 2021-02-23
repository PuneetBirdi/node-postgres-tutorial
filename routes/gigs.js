const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//Get all gigs
router.get('/', (req, res) => 
Gig.findAll()
    .then(gigs => {
        res.render('gigs', {gigs})
    })
    .catch(err => console.log(err))
)

//display add gig form
router.get('/add', (req, res) => res.render('add'))

//Add a gig
router.post('/add', (req, res) =>{
    let { title, technologies, budget, description, contact_email } = req.body;
    const errors = [];

    //Validate fields
    if(!title){
        errors.push({text: 'Please add a title.'})
    }
    if(!technologies){
        errors.push({text: 'Please add technologies.'})
    }
    if(!description){
        errors.push({text: 'Please add a description.'})
    }
    if(!contact_email){
        errors.push({text: 'Please add a contact email.'})
    }

    //Check for errors
    if(errors.length > 0){
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    }else{

        //if no budget, add in unknown
        if(!budget){
            budget = 'Unknown';
        }else{
            budget = `$${budget}`;
        }

        //make lowercase and remove spaces
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        //Insert into the table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        }).then(gig =>{
            res.redirect('/gigs')
        }).catch(error => console.log(error))
    }
})

// Search for gigs
router.get('/search', (req, res) =>{
    const { term } = req.query;

    Gig.findAll({
        where: {
            technologies: { [Op.like]: '%' + term + '%'}
        }
    }).then((gigs) =>{
        res.render('gigs', {gigs})
    }).catch(error => console.log(error))

})

module.exports = router;

