const db = require('../../config/db')

module.exports = {
    create(callback) {
        db.query = (`
            SELECT recipes .*, count
        `
        )
    }
}