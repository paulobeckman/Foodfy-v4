const Recipe = require('../models/Recipe')

module.exports = {
    index(req, res){
        Recipe.all(function (recipes) {
            return res.render("admin/recipes/index", {recipes})
        })
    },
    create(req, res) {
        Recipe.chefSelectOptions(function (options) {
            return res.render("admin/recipes/create", {chefOptions: options})
            
        })

    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }
        
        Recipe.create(req.body, function (recipe) { 
            return res.redirect(`recipes/${recipe.id}`)
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function (recipe) {
            if(!recipe) return res.send("Recipe not found!")
    
            return res.render("admin/recipes/show", {recipe})
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function (recipe) {
            if(!recipe) return res.send("Chef not found")

            Recipe.chefSelectOptions(function (options) {
                return res.render("admin/recipes/edit", {recipe, chefOptions: options})

            })

        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }

        Recipe.update(req.body, function () {
            
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function () {
            return res.redirect ("recipes")
        })
    }

} 