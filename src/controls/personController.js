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

async function getPerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                message: 'Person Not Found'
            }))
        } 
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(person))
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPersons,
    getPerson
}