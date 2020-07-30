const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const chefsHome = require('./app/controllers/chefsHome')


routes.get("/", function(req, res){

    // let recipesFiltered = []

    // for( let i = 0; i < 2; i++){
    //     recipesFiltered.push(data.recipes[i])
    // }
    
    return res.render("home")
})

routes.get("/about", function(req, res) {
    return res.render("about")
})

routes.get("/recipes", function(req, res){

    // let recipesFiltered = []

    // const all = data.recipes.length

    // for( let i = 0; i < all; i++){
    //     const obj = data.recipes[i]
    //     obj.index = i
    //     recipesFiltered.push(obj)
    // }

    return res.render("recipes")
})

routes.get("/recipes/:index", function (req, res) {
    const { index: recipeIndex } = req.params

    const recipe = data.recipes[recipeIndex]

    if(!recipe) return res.send("recipt nor found")

    return res.render("recipe", {item: recipe})
})

routes.get("/chefs", chefsHome.index)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)



routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)



module.exports = routes