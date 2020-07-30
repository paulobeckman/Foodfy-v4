const Chef = require('../models/Chef')

module.exports = {
    index(req, res) {
        Chef.AllChefs(function(chefs){

            return res.render("chefs", {chefs: chefs})
        })
    }
}