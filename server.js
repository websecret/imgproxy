const process = require('./processor')
const config = require('./config')
const http = require('http')

const notFound = res => {
    res.writeHead(404)
    res.end()
}

module.exports = () => {
    const server = http.createServer((req, res) => {
        console.log(req.url)
        let [_, type, ...path] = req.url.split('/')
        path = path.join('/')
        let result = process({ type, path })

        if (!result) {
            notFound(res)
            return
        }

        result.on('error', function () {
            notFound(res)
        })

        result.pipe(res)
    })

    server.listen(config.port)
}
