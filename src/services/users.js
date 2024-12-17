const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Callback to find a user with ID and redirect to the update page
exports.getUserById = async (req, res, next) => {
    const id = req.params.id

    try{
        let user = await User.findById(id);

        if (user) {
            return res.render('updateUser', { user });
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}


// Callback to get all users
exports.getUsers = async (req, res, next) => {

    try {
        const users = await User.find({}).select('name email _id');
        
        if (users) {
            const usersObj = users.reduce((acc, user) => {
                acc[user.email] = { name: user.name, email: user.email, id: user._id };
                return acc
            }, {});
            return res.render('dashboard', { user: req.user, users: usersObj });
            // return res.status(200).json(usersObj)
        }

        return res.status(404).json('users_not_found');
    } catch (error) {
        return res.status(501).json(error)
    }
}

// Callback to create a user
exports.addUser = async (req, res, next) => {
    const { name, email, password } = req.body

    try{
        let user = await User.create({ name, email, password});

        return res.redirect('/users/dashboard');
    } catch (error) {
        return res.status(501).json(error)
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
            return res.redirect('/users/dashboard');
            // return res.status(200).json(user)
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback to delete a user
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id
    
    try{
        await User.deleteOne({_id: id});
        
        console.log('utilisateur supprime')
        return res.redirect('/users/dashboard');
    } catch (error) {
        return res.status(501).json(error)
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
                    return res.redirect('/users/dashboard');
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