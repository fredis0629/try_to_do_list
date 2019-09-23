const express = require("express");
const app = express();
const port = 9000;
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("tasks", "YYY", "1", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true
  }
});
const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    task: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false
    },
    important: Sequelize.BOOLEAN,
    done: Sequelize.BOOLEAN
  },
  {
    sequelize,
    modelName: "Tasks"
  }
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/build")));
app.use(cors());
app.use(urlencodedParser);

app.get("/", (req, res) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});

app.get("/toDoList", (req, res) => {
  User.findAll()
    .then(users => {
      res.send(JSON.stringify(users, null, 4));
    })
    .catch(err => {
      console.error(err.body);
      res.status(400).end();
    });
});

app.post("/toDoList/addTask", (req, res) => {
  if (req.body.name === "" || req.body.task === "" || req.body.date === "") return res.status(400).end();
  User.create(req.body)
    .then(() =>
      User.findAll().then(users => {
        res.send(JSON.stringify(users, null, 4));
      })
    )
    .catch(err => {
      console.error(err.body);
      res.status(400).end();
    });
});

app.patch("/toDoList/update/:id/:operation", (req, res) => {
  User.update(
    { [req.params.operation]: Sequelize.literal(`NOT ${req.params.operation}`) },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.error(err.message);
      res.status(400).end();
    });
});

app.delete("/toDoList/delete/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).end();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
