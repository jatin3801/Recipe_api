const Service  = require("./recipes.service")


const addRecipesToDataBase = async(req,res)=>{
    try {
        const data = await Service.addRecipes()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}


const getRecipe = async(req,res)=>{
    try {
        const data = await Service.getRecipe()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}

const getRecipeByQuery = async(req,res)=>{
    try {
        const {name} = req.query
        const data =  await Service.getRecipeByQuery({name})
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
} 


const addRecipes = async(req,res)=>{
    try {
       
        const {id,title,summary,image,readyInMinutes,servings,sourceUrl,instructions,ingredients} = req.body
        const data = await Service.addRecipes({id,title,summary,image,readyInMinutes,servings,sourceUrl,instructions,ingredients})
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}

const deleteRecipeById = async(req,res)=>{
    try {
        const {id} = req.params
        const data = await Service.deleteRecipeById({id})
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}


const updateRecipe = async(req,res)=>{
    try {
        const body = req.body
       const {id} = req.params 
       const data = await Service.updateRecipe({id},{body}) 
       res.send(data)       
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    addRecipesToDataBase,
    addRecipes,
    getRecipe,
    getRecipeByQuery,
    deleteRecipeById,
    updateRecipe
}