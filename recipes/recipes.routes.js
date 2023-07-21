const express = require("express")
const router = express.Router({mergeParams:true})
const Controller = require("./recipes.controller")

router.post("/",Controller.addRecipesToDataBase)
router.get("/",Controller.getRecipe)
router.get("/search",Controller.getRecipeByQuery)
router.post("/addRecipe",Controller.addRecipes)
router.delete("/:id",Controller.deleteRecipeById)
router.put("/:id",Controller.updateRecipe)








module.exports = router;