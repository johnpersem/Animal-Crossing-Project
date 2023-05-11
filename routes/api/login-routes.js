const router = require('express').Router();
const { User } = require('../../models');
const sequelize = require('../../config/connection');
const { load } = require('dotenv');
// The `/api/login` endpoint

// {
//     "": "name",
//     "password": "mypassowrd"
// }


router.post('/', async (req, res) => {
  const user_name = req.body.user_name
  const user_password = req.body.password
  const user = await User.findOne({
    attributes: ['user_name','id','island_code'],
    where: {
      user_name: user_name,
      password: user_password,
    },
    
  })
  req.session.user = user;
  req.session.authenticated = true;
  res.send(
    JSON.stringify(user, null, 2)
  )
});


module.exports = router;
