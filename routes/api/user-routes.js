const router = require('express').Router();
const { User } = require('../../models');
const sequelize = require('../../config/connection');
const { load } = require('dotenv');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['user_name','id', 'island_code'],
  });
  res.send(
    JSON.stringify(users, null, 2)
  )
});

router.get('/:id', async (req, res) => {
  // find one user by its `id` value
  // be sure to include its associated Products
  const user_id = req.params.id
  const user = await User.findAll({
    attributes: ['user_name','id', 'island_code'],
    where: {
      id: user_id
    },
    
  })
  res.send(
    JSON.stringify(user, null, 2)
  )
});

router.post('/', async (req, res) => {
  // create a new user
  try {
    const createUser = await User.create(req.body)
    res.send(
      JSON.stringify(createUser, null, 2)
    )
  }
  catch(err) {
    
    res.send(
      JSON.stringify({error: err.message}, null, 2)
    )
  }
  
});

router.put('/:id', async (req, res) => {
  // update a user by its `id` value
  const user_id = req.params.id
  const user = await User.update(req.body,
    {
      where: {
        id: user_id,
      },
    })
  res.send(
    JSON.stringify(user, null, 2)
  )
});

router.delete('/:id', async (req, res) => {
  // delete a user by its `id` value
  const user_id = req.params.id
  const user = await User.destroy(
    {
      where: {
        id: user_id
      },
    }
  )
  res.send(
    JSON.stringify(user, null, 2)
  )
});

module.exports = router;
