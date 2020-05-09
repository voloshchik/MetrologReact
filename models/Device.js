const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    check: [{
        lastCheck: {
            type: Date,
            default: Date.now
        },
        nextCheck: {
            type: Date
        }
    }]
});

module.exports = Device = mongoose.model('device', deviceSchema);