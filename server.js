const process = require('./processor')
const config = require('./config')
const debug = require('debug')('app')
const http = require('http')

const notFound = res => {
    res.writeHead(404)
    res.end()
}

module.exports = () => {
    const server = http.createServer((req, res) => {
        res.on('finish', function () {
            debug(res.statusCode == 404 ? '404' : 'OK')
        })

        let [_, type, ...path] = req.url.split('/')
        path = path.join('/')

        debug(`GET ${req.url}`)

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
