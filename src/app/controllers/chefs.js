const Chef = require('../models/Chef')
const { show } = require('./recipes')

module.exports = {
    create(req, res) {
        return res.render("admin/chefs/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        Chef.create(req.body, function (chef) {
            return res.redirect(`chefs/${chef.id}`)
        })
    },

    show(req, res) {
        Chef.find(req.params.id, function name(chef) {
            if(!chef) return res.send("Chef not found")

            return res.render("admin/chefs/show", { chef })
        })
    },

    edit(req, res) {
        Chef.find(req.params.id, function (chef) {
            if(!chef) return res.send("Chef not found")

            return res.render("admin/chefs/edit", { chef })
        })
    }
} 