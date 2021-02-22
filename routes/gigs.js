const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');


//Get all gigs
router.get('/', (req, res) => 
Gig.findAll()
    .then(gigs => {
        res.render('gigs', {gigs})
    })
    .catch(err => console.log(err))
)

//Add a gig
router.get('/add', (req, res) =>{
    const data = {
        title: 'Looking for a Wordpress Developer.',
        technologies: 'wordpress, php, html, css',
        budget: '$1000',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro tempore sapiente corrupti laborum culpa, quaerat inventore dolores iste facilis, veniam cumque sunt quam, consequatur explicabo.",
        contact_email: 'user2@gmail.com'
    }

    let { title, technologies, budget, description, contact_email } = data;

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
})


module.exports = router;