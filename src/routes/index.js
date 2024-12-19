const express = require('express');
const router = express.Router();
const private = require('../middlewares/private')

const userRoute = require('../routes/users');
const catwaysRoute = require('../routes/catways')

router.get('/', async (req, res) => {
  // res.status(200).json({
  //   name:process.env.APP_NAME,
  //   version: '1.0',
  //   status: 200,
  //   message: "Bienvenue sur l'API !"
  // });
  res.render('home', {errorMessage: null});
});
router.get('/dashboard', private.checkJWT, async (req, res) => {
  res.render('dashboard', { user: req.user })
});

router.use('/users', userRoute);
router.use('/catways', catwaysRoute);


module.exports = router;