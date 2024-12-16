const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    // let token = req.headers['x-access-token'] || req.headers['authorization'];
    const token = req.cookies['auth_token'];
    
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                req.user = decoded.user;

                const expireIn = 24 * 60 * 60;
                const newToken = jwt.sign({
                    user: decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expireIn
                });

                res.cookie('auth_token', newToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'template',
                    maxAge: expireIn * 1000
                });
                // res.header('Authorization', 'Bearer ' + newToken);
                next()
            }

        });
    } else {
        return res.status(401).json('token_required');
    }
}