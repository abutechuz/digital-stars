const http = require('http')
const { PORT } = require('./config/config.js')
const app = require('./app/index.js')

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`http://localhost:` + PORT)
})
