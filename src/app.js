const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const food = await Restaurant.findAll();
    res.json(food);
})



module.exports = app;