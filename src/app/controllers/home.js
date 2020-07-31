const Recipe = require ('../models/Recipe')

module.exports = {
    index(req, res) {
       Recipe.all(function (recipes) {

        let recipesFiltered = []

        for( let i = 0; i < 6; i++){
            recipesFiltered.push(recipes[i])
        }

            return res.render("home", {recipes: recipesFiltered})
       })
    }
}