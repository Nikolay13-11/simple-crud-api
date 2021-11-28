const request = require('supertest')
const { server } = require('../../server')


describe('HTTP Server Test Scenario 1', () => {
  let id
  let person = {
    "name": "Ivan",
    "age": 13,
    "hobbies": ["tennis", "swim", "climbing"]
  }

test('Get all users', async () => {
  let res = await request(server).get(`/person`)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toEqual([])

})

test('Post new person', async () => {
  let res = await request(server).post('/person').send(person)

  id = res.body.id
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Get person by id', async () => {
  let res = await request(server).get(`/person/${id}`)

  expect(res.statusCode).toBe(200)
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

  expect(res.statusCode).toBe(200)
  expect(res.body.id).toBe(id)
  expect(res.body.age).toBe(30)
  expect(res.body.name).toBe("Petr")
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Delete person by id', async () => {
  let res = await request(server).delete(`/person/${id}`)
  expect(res.statusCode).toBe(204)
})

test('Get delete person by id',  async () => {
  let res = await request(server).get(`/person/${id}`)

  expect(res.statusCode).toBe(404)
  expect(res.body.message).toBe("Person Not Found")
  })
})


describe('HTTP Server Test Scenario 2', () => {
  let id = []
  let person1 = {
    "name": "Ivan",
    "age": 13,
    "hobbies": ["tennis", "swim", "climbing"]
  }
  let person2 = {
    "name": "Jon",
    "age": 46,
    "hobbies": ["driving", "moto", "repare"]
  }
  let person3 = {
    "name": "Drow",
    "age": 76,
    "hobbies": []
  }

test('Get all users', async () => {
  let res = await request(server).get(`/person`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toEqual([])
})

test('Post new person1', async () => {
  let res = await request(server).post('/person').send(person1)
  
  id.push(res.body.id)
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Post new person2', async () => {
  let res = await request(server).post('/person').send(person2)

  id.push(res.body.id)
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Jon')
  expect(res.body.age).toBe(46)
  expect(res.body.hobbies).toEqual(["driving", "moto", "repare"])
})

test('Post new person3', async () => {
  let res = await request(server).post('/person').send(person3)

  id.push(res.body.id)
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Drow')
  expect(res.body.age).toBe(76)
  expect(res.body.hobbies).toEqual([])
})

test('Get all users', async () => {
  let res = await request(server).get(`/person`)
    expect((res.body).length).toBe(3)
})

test('Delete person2 by id', async () => {
  let res = await request(server).delete(`/person/${id[1]}`)
  expect(res.statusCode).toBe(204)
})

test('Get delete person2 by id',  async () => {
  let res = await request(server).get(`/person/${id[1]}`)

  expect(res.statusCode).toBe(404)
  expect(res.body.message).toBe("Person Not Found")
  })

test('Delete person3 by id', async () => {
  let res = await request(server).delete(`/person/${id[2]}`)
  expect(res.statusCode).toBe(204)
})

test('Get delete person3 by id',  async () => {
  let res = await request(server).get(`/person/${id[2]}`)

  expect(res.statusCode).toBe(404)
  expect(res.body.message).toBe("Person Not Found")
  })

test('Delete person1 by id', async () => {
  let res = await request(server).delete(`/person/${id[0]}`)
  expect(res.statusCode).toBe(204)
})

test('Get delete person0 by id',  async () => {
  let res = await request(server).get(`/person/${id[0]}`)

  expect(res.statusCode).toBe(404)
  expect(res.body.message).toBe("Person Not Found")
  })

test('Get all users', async () => {
  let res = await request(server).get(`/person`)

  expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
})
})

describe('HTTP Server Test Scenario 3', () => {
  let id = []
  let person1 = {
    "name": "Ivan",
    "age": 13,
    "hobbies": ["tennis", "swim", "climbing"]
  }
  let person2 = {
    "name": "Jon",
    "age": 46,
    "hobbies": ["driving", "moto", "repare"]
  }

  test('Post new person1', async () => {
  let res = await request(server).post('/person').send(person1)

  id.push(res.body.id)
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Get all users', async () => {
  let res = await request(server).get(`/person`)

    expect(res.statusCode).toBe(200)
    expect((res.body).length).toBe(1)
})

test('Get person1 by id', async () => {
  let res = await request(server).get(`/person/${id[0]}`)

  expect(res.body.id).toBe(id[0])
  expect(res.body.name).toBe('Ivan')
  expect(res.body.age).toBe(13)
  expect(res.body.hobbies).toEqual(["tennis", "swim", "climbing"])
})

test('Change person by id', async () => {
  let res = await request(server).put(`/person/${id[0]}`).send(
    {
      "name": "Jon Snow",
      "age": 23,
      "hobbies": ["walk", "love", "kill", "snow"]
    }
  )
  
  expect(res.statusCode).toBe(200)
  expect(res.body.name).toBe('Jon Snow')
  expect(res.body.age).toBe(23)
  expect(res.body.hobbies).toEqual(["walk", "love", "kill", "snow"])
})

test('Get upgrade person1 by id', async () => {
  let res = await request(server).get(`/person/${id[0]}`)

  expect(res.body.id).toBe(id[0])
  expect(res.statusCode).toBe(200)
  expect(res.body.name).toBe('Jon Snow')
  expect(res.body.age).toBe(23)
  expect(res.body.hobbies).toEqual(["walk", "love", "kill", "snow"])
})

test('Delete upgrade person1 by id', async () => {
  let res = await request(server).delete(`/person/${id[0]}`)

  expect(res.statusCode).toBe(204)
})

test('Post new person2', async () => {
  let res = await request(server).post('/person').send(person2)

  id.push(res.body.id)
  expect(res.statusCode).toBe(201)
  expect(res.body.name).toBe('Jon')
  expect(res.body.age).toBe(46)
  expect(res.body.hobbies).toEqual(["driving", "moto", "repare"])
})

test('Delete person2 by id', async () => {
  let res = await request(server).delete(`/person/${id[1]}`)

  expect(res.statusCode).toBe(204)
})

test('Get all users', async () => {
  let res = await request(server).get(`/person`)

  expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
})
})
