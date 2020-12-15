const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY title ASC`, function (err, results) {
                if(err) throw `Database error ${err}`

                callback(results.rows)
            })
    },

    create(data) {
        const query = `
            INSERT INTO recipes(
                chef_id,
                title,
                ingredients,
                preparations,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)

    },

    find(id) {
        return db.query (`
            SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
    },
    
    update(data, callback) {
        const query = (`
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparations = ($5),
                information = ($6)
            WHERE id = $7
        `)

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if(err) throw `Database error ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`
            DELETE FROM recipes
            WHERE id = $1`, [id], function (err, results) {
                if(err) throw `Database error ${err}`

                return callback()
            })
    },

    chefSelectOptions() {
        return db.query(`
            SELECT name, id
            FROM chefs`)
    },

    findBy(filter, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            `, function(err, results) {
                if (err) throw `Database error ${err}`

                    callback(results.rows)
        })
    },

    file(id){
        return db.query(`
                SELECT * 
                FROM recipe_files 
                LEFT JOIN files ON (files.id = recipe_files.file_id)
                WHERE recipe_id = $1`, [id])
    }
}