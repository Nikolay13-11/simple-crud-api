const http = require('http')
const dotenv = require('dotenv')
const { getAllPersons, getPerson } = require('./controls/personController')



const server = http.createServer((req, res) => {
    if(req.url === '/person' && req.method === 'GET') {
        getAllPersons(req, res)
    } else if(req.url.match(/\/person\/([a-z0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getPerson(req, res, id)
    }
    else {
        console.log(req.headers)
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