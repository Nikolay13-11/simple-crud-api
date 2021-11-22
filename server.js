const http = require('http')
const dotenv = require('dotenv');

const server = http.createServer((req, res) => {
    res.statusCode = 200
})

dotenv.config();

const PORT = process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))