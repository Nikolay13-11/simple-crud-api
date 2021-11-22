const persons = require('../data/persons.json')
const { v4: uuidv4 } =  require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(persons)
    })
}

function findById(id) {
    const person = persons.find((p) => p.id === id)
    return new Promise((resolve, reject) => {
        resolve(person)
    })
}

function createNew(person) {
    return new Promise((resolve, reject) => {
        const newPerson = {id: uuidv4() ,...person}
        persons.push(newPerson)
        writeDataToFile('../date/person.json', persons)
        resolve(newPerson)
    })
}

module.exports = {
    findAll,
    findById,
    createNew
}