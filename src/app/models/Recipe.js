const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    create(data, callback) {
        const query = `
            INSERT INTO recipes(
                chef_id,
                image,
                title,
                ingredients,
                preparations,
                information,
                created_at 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    }
}