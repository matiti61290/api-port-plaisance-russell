const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Callback to find a user with ID
exports.getUserById = async (req, res, next) => {
    const id = req.params.id

    try{
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback to create a user
exports.addUser = async (req, res, next) => {
    const temp = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback to update a user
exports.updateUser = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({_id: id});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] =temp[key];
                }
            });

            await user.save();
            return res.status(200).json(user)
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback to delete a user
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    
    try{
        await User.deleteOne({_id: id});

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback for login
exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    const SECRET_KEY = process.env.SECRET_KEY;

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updateAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if(err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.cookie('auth_token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'template',
                        maxAge: expireIn * 1000
                    })

                    res.header('Authorization', 'Bearer ' + token);
                    // return res.status(200).json('authenticate_succeed');
                    return res.redirect('/dashboard');
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error)
    }
}