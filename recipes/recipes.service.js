const dotenv = require("dotenv")
const Recipe = require("../modal/index")
const axios = require("axios")
const {connect} = require("../dbConnection/index")
dotenv.config();
const apiKey = process.env.API_KEY
const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`



///Hit this route to enter data into database

const addRecipesToDataBase = async()=>{
    try {
        
        await connect()
        const response  = await axios.get(url,{
            headers:{
                "Content-Type":"application/json",
            }
        })
        const recipes = response.data.recipes
        if(recipes){
            for(let recipe of recipes ){
                const recipeRecord  = new Recipe(recipe)
                await recipeRecord.save()
            }
            return recipes
        }
    } catch (error) {
        return error.message
    }
}

const addRecipes = async({id,title,summary,image,readyInMinutes,servings,sourceUrl,instructions,ingredients})=>{
    try {
        await connect()
        if({id,title,summary,image,readyInMinutes,servings,sourceUrl,instructions,ingredients}){
            const recipe = new Recipe({id,title,summary,image,readyInMinutes,servings,sourceUrl,instructions,ingredients})
            recipe.save()
            return recipe
        }
    }catch (error) {
        return error.message
    }
}


const getRecipe = async()=>{
    await connect()
    const recipes = await Recipe.find({})
    if(recipes){
        return recipes
    }
}


const getRecipeByQuery = async({name})=>{
    try {
        await connect()
        if(name){
        const recipe = await Recipe.find({title:name})
        return recipe
        }
    } catch (error) {
        return error.message       
    }
}



const deleteRecipeById = async({id})=>{
    try {
        await connect()
        const Id = parseInt(id)
        if(Id){
          const deletedRecipe = await Recipe.deleteOne({ id: Id });
              return deletedRecipe
        }
    } catch (error) {
        return error.message        
    }
}


const updateRecipe = async({id},{body})=>{
    try {
        await connect()
        const Id = parseInt(id)
        if(Id){
             await Recipe.updateOne({id:Id},{summary:body.summary,instructions:body.instructions})
             const updateRecipe = await Recipe.findOne({id:id})
            return updateRecipe
        }
    } catch (error) {
        return error.message
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