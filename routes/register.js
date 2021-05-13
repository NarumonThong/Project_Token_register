let express = require('express');
const flash = require('express-flash');
let router = express.Router();
let dbCon = require('../lib/db');
let { body, validationResult } = require('express-validator');

// display register page
router.get('/', (req, res, next) => {
    dbCon.query('SELECT * FROM token ', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('register', { data: '' });
        } else {
            res.render('register', { data: rows });
        }
    })
});

// display add register page
router.get('/add', (req, res, next) => {
    res.render('register/add', {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        line: '',
        number: ''
    })
});

// add a new register
router.post('/add', [
    body('email').not().isEmpty(),
    body('number').not().isEmpty()
], (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let email = req.body.email;
    let line = req.body.line;
    let number = req.body.number;
    let errors = false;

    

    if (firstname.length === 0 || lastname.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'Please enter firstname and lastname');
        // render to add.ejs with flash message
        res.render('register/add', {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            line: line,
            number: number
        })
    }

    // if no error
    if (!errors) {
        let form_data = {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            line: line,
            number: number
        }

        // insert query
        dbCon.query('INSERT INTO token SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err);

                res.render('register/add', {
                    firstname: form_data.firstname,
                    lastname: form_data.lastname,
                    phone: form_data.phone,
                    email: form_data.email,
                    line: form_data.line,
                    number: form_data.number
                });
            } else {
                req.flash('success', 'เพิ่มการลงทะเบียนเรียบร้อยแล้ว !');
                res.redirect('/register');
            }
        });
    }

});

module.exports = router;