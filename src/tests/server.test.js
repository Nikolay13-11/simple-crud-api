const request = require('supertest')
const { server } = require('../../server')
const persons = require('../data/persons.json')
const { v4: uuidv4 } =  require('uuid')


describe('HTTP Server Test', () => {
  test('Get all users', (done) => {
    request(server)
    .get('/person')
    .expect('Content-Type', 'application/json')
    .expect(200)
    .expect([], done)
})
test('Post new person', (done) => {
  let obj = {
    name: "Ivan",
    age: 13,
    hobbies: ["ten", "pool", "mount"]
  }
  let person = JSON.stringify(obj)
  request(server)
  .post('/person')
  .send(person)
  .expect(201, done)
})
})

