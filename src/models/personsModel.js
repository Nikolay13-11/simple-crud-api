const persons = require('../data/persons.json')
const { v4: uuidv4 } =  require('uuid')
const { writeDataToFile } = require('../utils')
const path = require('path')

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
        console.log(newPerson)
        persons.push(newPerson)
        writeDataToFile(path.resolve('person.json'), persons)
        resolve(newPerson)
    })
}

module.exports = {
    findAll,
    findById,
    createNew
}

