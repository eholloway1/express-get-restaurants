const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const food = await Restaurant.findAll();
    res.json(food);
});

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
    await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

app.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

app.delete("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});


module.exports = app;