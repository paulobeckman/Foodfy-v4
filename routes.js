const express = require('express')
const routes = express.Router()

const data = require("./data.json")

const recipes = require('./controllers/recipes')


routes.get("/", function(req, res){

    let recipesFiltered = []

    for( let i = 0; i < 2; i++){
        recipesFiltered.push(data.recipes[i])
    }
    
    return res.render("home", {items: recipesFiltered})
})

routes.get("/about", function(req, res) {
    return res.render("about", {items: data})
})

routes.get("/recipes", function(req, res){

    let recipesFiltered = []

    const all = data.recipes.length

    for( let i = 0; i < all; i++){
        const obj = data.recipes[i]
        obj.index = i
        recipesFiltered.push(obj)
    }

    return res.render("recipes", {items: recipesFiltered})
})

routes.get("/recipes/:index", function (req, res) {
    const { index: recipeIndex } = req.params

    const recipe = data.recipes[recipeIndex]

    if(!recipe) return res.send("recipt nor found")

    return res.render("recipe", {item: recipe})
})

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:index", recipes.show)
routes.get("/admin/recipes/:index/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)



module.exports = routes