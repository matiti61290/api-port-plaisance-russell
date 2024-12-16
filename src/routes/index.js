const express = require('express');
const router = express.Router();
const private = require('../middlewares/private')

const userRoute = require('../routes/users');

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
  console.log(req.user)
  res.render('dashboard', { user: req.user })
})

router.use('/users', userRoute);

module.exports = router;