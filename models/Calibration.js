const mongoose = require('mongoose');

const calibrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'device'
    },
    lastCalib: {
        type: Date,
        default: Date.now
    },
    nextCalib: {
        type: Date
    }
});

module.exports = Calibration = mongoose.model('calibration', calibrationSchema);
