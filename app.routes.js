const express = require('express');

const RecipesRoutes = require("./recipes/recipes.routes")
const route = express.Router({ mergeParams: true });

route.use("/recipe",RecipesRoutes)
module.exports = route;
