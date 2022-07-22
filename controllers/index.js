const express = require("express");
const router = express.Router();

const petRoutes = require("./petController");
router.use("/api/pets",petRoutes);

const userRoutes = require("./userController");
router.use("/api/users",userRoutes);


module.exports = router;