const http = require('http')
const dotenv = require('dotenv')
const { 
    getAllPersons,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
    } = require('./src/controls/personController')
    
    // /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const server = http.createServer((req, res) => {
    if(req.url === '/person' && req.method === 'GET') {
        getAllPersons(req, res)
    } else if(req.url.match(/\/person\/([a-z0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getPerson(req, res, id)
    } 
    else if ( req.url === '/person' && req.method === 'POST') {
        addPerson(req, res)
    }
    else if(req.url.match(/\/person\/([a-z0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updatePerson(req, res, id)
    } 
    else if(req.url.match(/\/person\/([a-z0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        deletePerson(req, res, id)
    }
    else {
        res.writeHead(404,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Route Not Found'
        }))
    }
})

dotenv.config({
    path:'.env'
});

const PORT = process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))