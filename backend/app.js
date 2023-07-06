const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const DBNAME = process.env.DBNAME || "MiniProject";
const mongouri =
	process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DBNAME}?ssl=false`;
mongoose.connect(mongouri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api", require('./src/routes/index'))
app.use('/public', express.static(path.join(__dirname, 'public/')));

app.listen(PORT, () => {
	console.log("Port run on " + PORT);
});
