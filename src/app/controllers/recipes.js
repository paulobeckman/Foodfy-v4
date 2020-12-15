const Recipe = require('../models/Recipe')
const File = require('../models/Files')
const Recipe_File = require(`../models/Recipe_Files`)

module.exports = {
    index(req, res){
        Recipe.all(function (recipes) {
            return res.render("admin/recipes/index", {recipes})
        })
    },
    async create(req, res) {

        let results = await Recipe.chefSelectOptions()
        const options = results.rows

        return res.render("admin/recipes/create", {chefOptions: options})
        
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }

        if(req.files.length == 0){
            return res.send('Please, send at least one image')
        }
        
        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create(file))
        const fileResults = await Promise.all(filesPromise)
        
        const filesPromiseResults = fileResults.map(file => {
            const  fileId = file.rows[0].id

            Recipe_File.create({recipe_id: recipeId, file_id: fileId})
        })

        await Promise.all(filesPromiseResults)

        return res.redirect(`recipes/${recipeId}`)
    },
    async show(req, res){

        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found!")

        return res.render("admin/recipes/show", {recipe})
    },
    async edit(req, res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Chef not found")

        results = await Recipe.chefSelectOptions()
        const options = results.rows

        results = await Recipe.file(recipe.id)
        let files = await results.rows

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/edit", {recipe, chefOptions: options, files})
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