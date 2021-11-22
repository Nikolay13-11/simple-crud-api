const Person = require('../models/personsModel')

async function getAllPersons(req, res) {
    try {
        const persons = await Person.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(persons))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPersons
}