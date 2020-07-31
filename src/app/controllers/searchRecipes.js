const Recipe = require ('../models/Recipe')

module.exports = {
    index(req, res){

        let { filter } = req.query

        Recipe.findBy(filter, function(recipes){
        
            return res.render("search", {recipes, filter})
        })

    }
}