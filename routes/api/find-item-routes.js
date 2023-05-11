const router = require('express').Router();
const { Item, User } = require('../../models');
const sequelize = require('../../config/connection');
const { load } = require('dotenv');

router.get('/:name', async (req, res) => {
  console.log(`${JSON.stringify(req.session.user)}`)
  const itemName = req.params.name
  const item = await Item.findAll({
    where: {
      item_name: itemName
    },
    include: [
      {
        model: User,
        attributes:['user_name', 'island_code']
      }
    ]
  })
  res.send(
    JSON.stringify(item, null, 2)
  )
});

module.exports = router