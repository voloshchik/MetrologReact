const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Device = require('../../models/Device');
const Calibration = require('../../models/Calibration');

// @route       POST api/calibrations/:device_id
// @desc        Insert a calibration by device id
// @access      Private

router.post('/:device_id', auth, async (req, res) => {
    
    let device = await Device.findById(req.params.device_id);

    // Check device

    if(!device) {
        return res.status(404).json({ msg: 'Device not found' });
    }

    // Check user

    if(device.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }

    var {
        lastCalib,
        nextCalib
    } = req.body;

    var calibrationFields = {};
    calibrationFields.user = req.user.id;
    calibrationFields.device = req.params.device_id;

    if(lastCalib) {
        calibrationFields.lastCalib = lastCalib;
        lastCalib = new Date(lastCalib);
        
        var nextCalib = new Date(lastCalib.getFullYear(), lastCalib.getMonth() + device.period, lastCalib.getDate());
        calibrationFields.nextCalib = nextCalib;
        if(!nextCalib) return res.json({ msg: 'nextCalib not found' });
    }
    
    try {
        let calibration = new Calibration(calibrationFields);
        
        await calibration.save();

        res.json(calibration);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route       GET api/calibrations/
// @desc        Get all calibrations
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        let calibrations = await Calibration.find().sort({ nextCalib: 1 });
        res.json(calibrations)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/calibrations/me
// @desc        Get all calibrations by current user
// @access      Private

router.get('/me', auth, async (req, res) => {
    try {
        const calibrations = await Calibration.find().where({ user: req.user.id }).populate('device', 'name');

        res.json(calibrations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route       DELETE api/calibrations/:device_id
// @desc        Delete calibration
// @access      Private

router.delete('/:device_id', auth, async (req, res) => {
    const calibration = await Calibration.findById(req.params.device_id);

    // Check if calibration exists

    if(!calibration) {
        return res.status(404).json({ msg: 'Calibration for this device is not found' });
    }

    // Check user

    if(calibration.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }

    try {
        Calibration.findByIdAndRemove(req.params.device_id, (err, result) => {
            if(err)
                throw err;
            else
                res.send('Calibration for this device successfully deleted');
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//
module.exports = router;