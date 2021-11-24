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

async function addPerson(req, res) {
    try {
        // const person = {
        //     name: 'someName',
        //     age: 30,
        //     hobbies: []
        // }

        let body = ''
        req.on('data', (chunck) => {
            body += chunck.toString()
        })

        req.on('end', () => {
            const {id, name, age, hobbies} = JSON.parse(body)
            console.log('id', id)
            console.log('name', name)
            console.log('age', age)
            console.log('hobbies', hobbies)
            const newPerson = await Person.createNew({
                name: name,
                age: age,
                hobbies: hobbies
            })
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newPerson))

        })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPersons,
    getPerson,
    addPerson
}

