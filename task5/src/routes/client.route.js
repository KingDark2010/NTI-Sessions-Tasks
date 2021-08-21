const express = require('express');
const router = express.Router();
const bank = require('../controllers/user.controller');


router.get('/', (req, res) => {
    myClients = bank.getAllCustomers();
    res.render('all', {
        title: 'All Clients',
        clients: myClients,
        isEmpty: myClients.length === 0
    })
})

router.get('/add', (req,res)=>{
    res.render('add', {title: "add new user"})
})
// add new user with post method
router.post('/add', (req, res) => {
    console.log(req.body)
    bank.addUser(req.body.name, req.body.password, req.body.email, req.body.balance)
    res.redirect('/')
});

//delete user
router.get('/delete/:email', (req, res) => {
    bank.deleteUser(req.params.email)
    res.redirect('/')
})

module.exports = router;