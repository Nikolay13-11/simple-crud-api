const http = require('http')
const dotenv = require('dotenv')
const { 
    getAllPersons,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
    } = require('./src/controls/personController')
const { regExpAll, regExpUUID } = require('./src/data/helper')    
    
const server = http.createServer((req, res) => {
    let ID = req.url.split('/')[2]
    if(ID && !ID.match(regExpUUID)) {
        res.writeHead(400,  { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'ID not valid'
        }))
    }
    else {
        if(req.url === '/person' && req.method === 'GET') {
            console.log(req.url.split('/'));
            getAllPersons(req, res)
        } else if(req.url.match(regExpAll) && req.method === 'GET') {
            const id = req.url.split('/')[2]
            getPerson(req, res, id)
        }
        else if ( req.url === '/person' && req.method === 'POST') {
            addPerson(req, res)
        }
        else if(req.url.match(regExpAll) && req.method === 'PUT') {
            const id = req.url.split('/')[2]
            updatePerson(req, res, id)
        } 
        else if(req.url.match(regExpAll) && req.method === 'DELETE') {
            const id = req.url.split('/')[2]
            deletePerson(req, res, id)
        }
        else {
            res.writeHead(404,  { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                message: 'Route Not Found'
            }))
        }    
    }
})

dotenv.config({
    path:'.env'
});

const PORT = process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))