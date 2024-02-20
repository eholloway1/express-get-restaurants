const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const food = await Restaurant.findAll();
    res.json(food);
});

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})

module.exports = app;