const request = require('supertest')
const { server } = require('../../server')
const persons = require('../data/persons.json')


describe('HTTP Server Test Scenario 1', () => {
  let id
  let person = {
    "name": "Ivan",
    "age": 13,
    "hobbies": ["tennis", "swim", "climbing"]
  }

test('Get all users', (done) => {

    request(server)
    .get('/person')
    .expect('Content-Type', 'application/json')
    .expect(200)
    .expect([], done)
})

test('Post new person', async () => {
  let res = await request(server).post('/person').send(person)
  id = res.body.id
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Get person by id', async () => {
  let res = await request(server).get(`/person/${id}`)

  expect(res.body.id).toBe(id)
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Change person by id', async () => {
  let res = await request(server).put(`/person/${id}`).send(
    {
      "name": "Petr",
      "age": 30,
    }
  )

  expect(res.body.id).toBe(id)
  expect(res.body.age).toBe(30)
  expect(res.body.name).toBe("Petr")
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Delete person by id', async () => {
  request(server).delete(`/person/${id}`)
  .then(res => {
    expect(res.statusCode).toBe(204)
  })

  
})
})

// describe('HTTP Server Test Scenario 2', () => {
//   let id
//   let person = {
//     "name": "Ivan",
//     "age": 13,
//     "hobbies": ["tennis", "swim", "climbing"]
//   }

// test('Get all users', (done) => {

//     request(server)
//     .get('/person')
//     .expect('Content-Type', 'application/json')
//     .expect(200)
//     .expect([], done)
// })
// })