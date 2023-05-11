const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    res.send(JSON.stringify({}))
});

module.exports = router;