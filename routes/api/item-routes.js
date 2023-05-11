const router = require('express').Router();
const { Item } = require('../../models');
const sequelize = require('../../config/connection');
const { load } = require('dotenv');


router.get('/', async (req, res) => {
    const items = await Item.findAll({
    
    });
    res.send(
      JSON.stringify(items, null, 2)
    )
});

router.get('/:id', async (req, res) => {
    const item_id = req.params.id
    const items = await Item.findAll({
        where: {
            id: item_id,
        }
    });
    res.send(
      JSON.stringify(items, null, 2)
    )
  });

router.post('/', async (req, res) => {
    try {
      const user_id = req.session.user.id;
      const item = {...req.body, user_id: user_id}
      const createItem = await Item.create(item)
      res.send(
        JSON.stringify(createItem, null, 2)
      )
    }
    catch(err) {
      
      res.send(
        JSON.stringify({error: err.message}, null, 2)
      )
    }
    
  });

module.exports = router;