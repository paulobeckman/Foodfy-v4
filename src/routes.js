const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const chefsHome = require('./app/controllers/chefsHome')
const searchRecipes = require('./app/controllers/searchRecipes')
const home = require ('./app/controllers/home')
const RecipesHome = require ('./app/controllers/recipesHome')


routes.get("/", function (req, res) {
    return res.redirect("/home")
})

routes.get("/home", home.index)

routes.get("/about", function(req, res) {
    return res.render("about")
})

routes.get("/recipes", RecipesHome.index)

routes.get("/recipes/:index", function (req, res) {
    const { index: recipeIndex } = req.params

    const recipe = data.recipes[recipeIndex]

    if(!recipe) return res.send("recipt nor found")

    return res.render("recipe", {item: recipe})
})

routes.get("/chefs", chefsHome.index)

routes.get("/search", searchRecipes.index)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", multer.array("photos", 5), recipes.post)
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put)
routes.delete("/admin/recipes", recipes.delete)



routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)



module.exports = routes