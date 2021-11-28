const Person = require('../models/personsModel')

async function getAllPersons(req, res) {
    try {
        const persons = await Person.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(persons))
    } catch (error) {
        res.writeHead(500,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Something went wrong'
        }))
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
        res.writeHead(500,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Something went wrong'
        }))
    }
}

async function addPerson(req, res) {
    try {

        let body = ''

        req.on('data',  (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const { name, age, hobbies } = JSON.parse(body)

            if(name && age && hobbies){
                const newPerson = await Person.createNew({
                    name,
                    age,
                    hobbies
                })
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(newPerson))
            }
            else {
                res.writeHead(400,  { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    message: `Don't pass required params`
                }))
            }
        })

    } catch (error) {
        res.writeHead(500,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Something went wrong'
        }))
    }
}
            
async function updatePerson(req, res, id) {
    try {

        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404,  { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                message: 'Person Not Found'
            }))
        } else {
            
        let body = ''

        req.on('data',  (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const { name, age, hobbies } = JSON.parse(body)

            const personUpd = {
                name: name || person.name,
                age: age || person.age,
                hobbies: hobbies || person.hobbies
            }

                const updPerson = await Person.update(id, personUpd)

                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(updPerson))
        })
        }


    } catch (error) {
        res.writeHead(500,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Something went wrong'
        }))    }
}

async function deletePerson(req, res, id) {
    try {
        const person = await Person.findById(id)
        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                message: 'Person Not Found'
            }))
        } 
        else {
            await Person.remove(id)
            res.writeHead(204, { 'Content-Type': 'application/json' })
            res.end()
            }

    } catch (error) {
        res.writeHead(500,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Something went wrong'
        }))    }
}

module.exports = {
    getAllPersons,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
}

