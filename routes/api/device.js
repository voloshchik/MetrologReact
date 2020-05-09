const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Device = require('../../models/Device');

// @route       GET api/device/:id
// @desc        Get Device By Id
// @access      Private

router.get('/:id', auth, async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.json(device);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;