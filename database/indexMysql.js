const express = require("express");
const app = express();
const port = 9000;
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "YYY",
  password: "1",
  database: "tasks"
});

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());
app.use(urlencodedParser);

connection.connect();
app.on("exit", code => {
  connection.end();
  console.log(`About to exit with code: ${code}`);
});

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname, "/build")
  };
  res.sendFile("/index.html", options);
});

app.get("/toDoList", (req, res) => {
  connection.query(`SELECT * FROM Tasks`, (error, results) => {
    if (error) {
      connection.end();
      console.error(error.message);
      return res.status(404).end();
    }
    res.send(results);
  });
});

app.post("/toDoList/addTask", (req, res) => {
  if (req.body.name === "" || req.body.task === "" || req.body.date === "") return res.status(400).end();
  const sql = `INSERT INTO Tasks(name, task, date, important, done) VALUES("${req.body.name}", "${req.body.task}", "${req.body.date}", false, false)`;
  connection.query(sql);
  connection.query(`SELECT * FROM Tasks`, (error, results, fields) => {
    if (error) {
      connection.end();
      console.error(error.message);
      return res.status(404).end();
    }
    res.send(results);
  });
});

app.patch("/toDoList/update/:id/:operation", (req, res) => {
  const sql = `UPDATE Tasks SET ${req.params.operation} = !${req.params.operation} WHERE id = ${req.params.id}`;
  connection.query(sql, error => {
    if (error) {
      connection.end();
      console.error(error.message);
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

app.delete("/toDoList/delete/:id", (req, res) => {
  const sql = `DELETE FROM Tasks WHERE id = ${req.params.id}`;
  connection.query(sql, error => {
    if (error) {
      connection.end();
      console.error(error.message);
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
