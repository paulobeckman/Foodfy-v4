const Recipe = require ('../models/Recipe')

module.exports = {
    index(req, res) {
        Recipe.all(function(recipes) {
            return res.render ("recipes", {recipes})
        })
    }
}