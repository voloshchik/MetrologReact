const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// DB models
const User = require("../../models/User");
const Device = require("../../models/Device");

// @route       POST api/devices
// @desc        Insert a device
// @access      Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("period", "Period is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var { name, type, number, period } = req.body;

    //Build device object
    const deviceFields = {};
    deviceFields.user = req.user.id;

    if (name) deviceFields.name = name;
    if (type) deviceFields.type = type;
    if (number) deviceFields.number = number;
    if (period) deviceFields.period = period;

    try {
      let device = new Device(deviceFields);

      await device.save();

      res.json(device);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       POST api/devices/:id
// @desc        Update a device
// @access      Private

router.post("/:id", auth, async (req, res) => {
  let device = await Device.findById(req.params.id);

  if (!device) {
    return res.status(404).json({ msg: "Device not found" });
  }

  // check user
  if (device.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not authorized" });
  }

  var { name, period } = req.body;

  const deviceFields = {};
  deviceFields.user = req.user.id;

  if (name) deviceFields.name = name;
  if (period) deviceFields.period = period;

  try {
    device = await Device.findByIdAndUpdate(
      req.params.id,
      {
        $set: deviceFields,
        new: true,
      },
      (err, response) => {
        if (err) throw err;
        else console.log("Device successfuly updated");
      }
    );
    res.json(device);
  } catch (err) {
    console.error(err.messages);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/devices
// @desc        Get all devices
// @access      Private

router.get("/", auth, async (req, res) => {
  try {
    const devices = await Device.find().sort({ nextP: 1 }); //.populate('user', 'name');
    res.json(devices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/devices/my
// @desc        Get my devices
// @access      Private

router.get("/my", auth, async (req, res) => {
  try {
    const devices = await Device.find().where({ user: req.user.id });
    res.json(devices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       PUT api/:device_id/check
// @desc        Check for device
// @access      Private

router.put("/:id/check", auth, async (req, res) => {
  let device = await Device.findOne({ user: req.user.id, _id: req.params.id });

  if (!device) {
    return res.status(404).send("Device not found");
  }

  var lastCheck = req.body.lastCheck;

  lastCheck = new Date(lastCheck);

  var nextCheck = new Date(
    lastCheck.getFullYear(),
    lastCheck.getMonth() + device.period,
    lastCheck.getDate()
  );
  if (!nextCheck) return res.json({ msg: "nextCheck not found" });

  var newExp = {
    lastCheck,
    nextCheck,
  };

  try {
    device.check.unshift(newExp);

    await device.save();

    res.json(device);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/:devices_id/check/:check_id
// @desc        Delete check for device
// @access      Private

router.delete("/:id/check/:check_id", auth, async (req, res) => {
  let device = await Device.findOne({ user: req.user.id, _id: req.params.id });

  if (!device) {
    return res.status(404).send("Device not found");
  }

  // Get remove index
  const removeIndex = device.check
    .map((item) => item.id)
    .indexOf(req.params.check_id);

  device.check.splice(removeIndex, 1);

  await device.save();

  res.json(device);
});

// @route       DELETE api/devices/:id
// @desc        Delete a device
// @access      Private

router.delete("/:id", auth, async (req, res) => {
  const device = await Device.findById(req.params.id);

  // Check if device exists
  if (!device) return res.status(404).send("Device not found");

  // Check user
  if (device.user.toString() !== req.user.id)
    return res.status(401).send("User not authorized");

  try {
    Device.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) throw err;
      else res.send("Device successfully deleted");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
