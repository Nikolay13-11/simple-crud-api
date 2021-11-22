const http = require('http')
const dotenv = require('dotenv')
const { getAllPersons } = require('./controls/personController')



const server = http.createServer((req, res) => {
    if(req.url === '/person' && req.method === 'GET') {
        getAllPersons(req, res)
    } 
    else {
        res.writeHead(404,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Route Not Found'
        }))
    }
    // res.statusCode = 200
    // res.write(JSON.stringify(persons))
    // res.end()
})

dotenv.config({
    path:'../.env'
});



const PORT = process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))