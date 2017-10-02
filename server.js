const process = require('./processor')
const config = require('./config')
const debug = require('debug')('app')
const http = require('http')

module.exports = () => {
    const server = http.createServer(async (req, res) => {
        log(req, res)

        const options = parseUrl(req.url)
        const result = await process(options)

        respond(res, result)
    })

    server.listen(config.port)
}

const notFound = res => {
    res.writeHead(404)
    res.end()
}

const log = (req, res) => {
    debug(`GET ${req.url}`)

    res.on('finish', function () {
        debug(res.statusCode == 404 ? '404' : 'OK')
    })
}

const parseUrl = url => {
    let [_, type, ...path] = url.split('/')
    path = path.join('/')

    return { type, path }
}

const respond = (res, result) => {
    if (!result) {
        notFound(res)
        return
    }

    result.on('error', function () {
        notFound(res)
    })

    result.pipe(res)
}
