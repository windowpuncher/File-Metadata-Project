require('dotenv').config()
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var upload = multer({ dest: "./public/data/uploads/" });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.use("/", bodyParser.urlencoded({ extended: false }));

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let info = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }

  let path = req.file.path;

  fs.unlink(path, (err) => {
    if (err) console.error(err);
    // console.log("Path/file was deleted.");
  });

  res.json(info);
});