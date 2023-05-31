import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import db from './app/db'

const app = express();

app.use(cors());

const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync DB');
  initial()
})

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "express-jwt-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to express jwt app." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});