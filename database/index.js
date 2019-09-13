const express = require("express");
const app = express();
const port = 9000;
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
var fs = require("fs");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/src")));
app.use(cors());
app.use(urlencodedParser);

app.get("/", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get("/ajaxGetRequest", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/addTask", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      arr = [...JSON.parse(data), req.body];
      json = JSON.stringify(arr);
      fs.writeFile("./src/files/jsonDataFile.json", json, "utf8", err => {
        if (err) throw err; // если возникла ошибка
        console.log(`Запись файла завершена. Содержимое файла: ${arr}`);
        res.send(arr);
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
