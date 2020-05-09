const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Device = require('../../models/Device');

// @route       GET api/graph
// @desc        GET Checks By Date
// @access      Private

router.get('/:year', async (req, res) => {
    var dates = [];
    var months = [0,0,0,0,0,0,0,0,0,0,0,0];
    var year = req.params.year;

    var device = await Device.find().where({ 'check.lastCheck': {$gte: new Date(year,00,01), $lt: new Date(year,11,31) }});
    
    device.map(dev => {
        dev.check.map(check => {
            dates.push(check.lastCheck);
        })
    });
    
    dates = dates.filter( date => date > new Date(year,0,01) && date < new Date(year,11,31) );

    for(var i = 0; i<=11; i++) {
        dates.forEach( date => {
            if(date > new Date(year,i,0) && date < new Date(year, i, 31)) months[i]++;
        })
    }

    res.json(months);
});

module.exports = router;