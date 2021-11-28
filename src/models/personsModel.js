const { v4: uuidv4 } =  require('uuid')

let BD = []

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(BD)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const person = BD.find((p) => p.id === id)
        resolve(person)
    })
}

function createNew(person) {
    return new Promise((resolve, reject) => {
        const newPerson = {id: uuidv4() ,...person}
        BD.push(newPerson)
        resolve(newPerson)
    })
}

function update(id, person) {
    return new Promise((resolve, reject) => {
        const index = BD.findIndex(i => i.id === id)
        BD[index] = {
            id,
            ...person
        }
        resolve(BD[index])
    })
}


function remove(id) {
    return new Promise((resolve, reject) => {
        BD = BD.filter(i => i.id !== id)
        resolve()
    })
}























module.exports = {
    findAll,
    findById,
    createNew,
    update,
    remove
}
