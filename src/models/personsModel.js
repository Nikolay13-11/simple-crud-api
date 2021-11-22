const persons = require('../data/persons.json')

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

module.exports = {
    findAll,
    findById
}