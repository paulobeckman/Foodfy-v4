const fs = require('fs')
const data = require("../../data.json")

exports.index = function (req, res){
    
    let recipesFiltered = []

    const all = data.recipes.length

    for( let i = 0; i < all; i++){
        const obj = data.recipes[i]
        obj.index = i
        recipesFiltered.push(obj)
    }

    return res.render("admin/recipes/index", {recipes: recipesFiltered})
}

exports.create = function (req, res){
    
    return res.render("admin/recipes/create")
}

exports.show = function (req, res){

    const { index: recipeIndex } = req.params

    const recipe = data.recipes[recipeIndex]

    if(!recipe) return res.send("recipt nor found")

    return res.render("admin/recipes/recipe", {recipe})
}

exports.post = function (req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }

    const id = Number(data.recipes.length + 1)

    let{image, title, author, ingredients, preparations_mode, information} = req.body

    data.recipes.push({
        id,
        image, 
        title, 
        author,
        ingredients, 
        preparations_mode, 
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.rend("Write file error!")

        return res.redirect("/admin/recipes")

    })

}


exports.edit = function (req, res){

    const { index: recipeIndex } = req.params

    const recipe = data.recipes[recipeIndex]

    if(!recipe) return res.send("recipt nor found")

    return res.render("admin/recipes/edit", {recipe})

}

exports.put = function (req, res){
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if (id == recipe.id){
            
            index = foundIndex

            return true
        }
    })

    if(!foundRecipe) return res.send("Instructor not found!")

    const recipe = {
        ...foundRecipe,
        ...req.body,
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect(`recipes/${index}`)

    })

}

exports.delete = function (req, res){
    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send ("Write file error")

        return res.redirect("/admin/recipes")
    })
}