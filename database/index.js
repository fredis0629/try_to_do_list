const express = require("express");
const app = express();
const port = 9000;
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
var fs = require("fs");

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());
app.use(urlencodedParser);

app.get("/", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      var options = {
        root: path.join(__dirname, "/build")
      };
      res.sendFile("/index.html", options);
    }
  });
});

app.get("/toDoList", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/toDoList/addTask", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (req.body.name === "" || req.body.task === "") {
        res.status(400);
        arr = JSON.parse(data);
        res.send(arr);
      } else {
        arr = [...JSON.parse(data), req.body];
        json = JSON.stringify(arr);
        fs.writeFile("./src/files/jsonDataFile.json", json, "utf8", err => {
          if (err) return res.sendStatus(404);
          console.log(`Запись файла завершена.`);
          res.send(arr);
        });
      }
    }
  });
});

app.patch("/toDoList/update/:id/:operation", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      arr = JSON.parse(data);
      if (!arr[req.params.id]) return res.sendStatus(400);
      arr[req.params.id][req.params.operation] = !arr[req.params.id][req.params.operation];
      json = JSON.stringify(arr);
      fs.writeFile("./src/files/jsonDataFile.json", json, "utf8", err => {
        if (err) return res.sendStatus(404);
        console.log(`Запись файла завершена.`);
        res.status(200).end();
      });
    }
  });
});

app.delete("/toDoList/delete/:id", (req, res) => {
  fs.readFile("./src/files/jsonDataFile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      arr = JSON.parse(data);
      if (!arr[req.params.id]) return res.sendStatus(404);
      arr.splice(req.params.id, 1);
      json = JSON.stringify(arr);
      fs.writeFile("./src/files/jsonDataFile.json", json, "utf8", err => {
        if (err) return res.sendStatus(404);
        console.log(`Запись файла завершена. Содержимое файла: ${arr}`);
        res.status(200).end();
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
