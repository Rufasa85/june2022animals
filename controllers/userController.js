const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/", (req, res) => {
    fs.readFile("./users.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const users = JSON.parse(data);
        res.json(users);
      }
    });
  });
  
  router.post("/", (req, res) => {
    console.log(req.body);
    const newUser = {
      id: req.body.id,
      username: req.body.username,
      bio: req.body.bio,
    };
    fs.readFile("./users.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const users = JSON.parse(data);
        users.push(newUser);
        fs.writeFile(
          "./users.json",
          JSON.stringify(users, null, 4),
          (err, data) => {
            if (err) {
              throw err;
            }
            res.json({ data: req.body, message: "success!" });
          }
        );
      }
    });
  });
  
module.exports = router;