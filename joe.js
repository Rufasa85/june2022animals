const express = require("express");
const path = require("path");
const app = express();

//middleware for find static assets
app.use(express.static("public"));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allRoutes = require("./controllers")
app.use(allRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3000, () => {
  console.log("listenin to port " + 3000);
});


