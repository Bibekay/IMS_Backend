const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            fullname:req.body.fullname,
            username: req.body.username,
            password: hash,
            contact: req.body.contact,
            email: req.body.email,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup Successfull", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        if (user.admin)
                        {
                            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status:"isadmin",  token: token });
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status:"Login Successfull",  token: token });
                    }).catch(next);
            }
        }).catch(next);
})


router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, fullname: req.user.fullname, username: req.user.username,phone: req.user.phone,email: req.user.email, image: req.user.image });
});

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, fullname: req.user.fullname, username: user.username,phone: user.phone,email: user.email, image: user.image });
        }).catch(next);
});


router.route('/:id/saved')
.get((req, res, next) => {
    User.findById(req.params.id)
    .populate('saved')
        .then((user) => {
            res.json(user.saved);
        })
        .catch(next);
})
.delete((req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            user.saved = [];
            user.save()
                .then((user) => {
                    res.json(user.saved);
                })
                .catch(next);
        })
        .catch(next);
});




//saved (adding hotels and empting in saved hotels)
router.route('/:id/saved/:hid')
.get((req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json(user.saved);
        })
        .catch(next);
})
.post((req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            user.saved.push(req.params.hid);
            user.save()
                .then((user) => {
                    res.json(user.saved);
                })
                .catch(next);
        })
        .catch(next);
})
.put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete((req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            user.saved.pull(req.params.hid);
            user.save()
                .then((user) => {
                    res.json(user.saved);
                })
                .catch(next);
        })
        .catch(next);
});


module.exports = router;
