const express = require("express");
const connectDB = require("./config/db");
const pdfRoutes = require("./routes/api/pdf");
const app = express();
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

// Connect Database
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/devices", require("./routes/api/devices"));
app.use("/api/device", require("./routes/api/device"));
app.use("/api/calibrations", require("./routes/api/calibrations"));
app.use("/api/graph", require("./routes/api/graph"));
app.use(pdfRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// YzZtMe9YXQLDivec
