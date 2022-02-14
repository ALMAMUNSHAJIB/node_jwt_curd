const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/', (req, res) => {

});

router.post('/signup', async (req, res) => {

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const newUser = new User({
            ...req.body,
            password: hashPassword
        });

        await newUser.save();
        res.status(201).json({
            message: "User insert!!"
        })

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }

});


router.post('/login', async (req, res) => {
    const user = await User.find({name:req.body.name});
    
    try {
        if (user && user.length > 0) {
            const isValidaPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidaPassword) {
                //token genrat
                 const token = jwt.sign({
                     username: user[0].name,
                     userId: user[0]._id
                 }, process.env.JWT_SECRET,{
                     expiresIn: '2h'
                 });
             res.status(200).json({
                 access_token: token,
                 message: "Login Successfully"
             })

            } else {
                res.status(401).json({
                    error: "Authnication failed!!"
                })
            }
        } else {
            res.status(401).json({
                error: "Authnication failedss!!"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Authnication failed!!"
        });
    }
})


module.exports = router;