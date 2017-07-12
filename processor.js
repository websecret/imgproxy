const sharp = require('sharp')
const config = require('./config')

module.exports = ({ type, path }) => {
    if (!type || !path || !config[type]) {
        return null
    }

    const imagePath = `${config.basePath}/${path}`
    const imageConfig = config[type]

    const image = sharp(imagePath)
        .resize(imageConfig.width, imageConfig.height)
        .max()

    if (imageConfig.quality) {
        image.jpeg({ quality : imageConfig.quality })
    }

    if (!imageConfig.upsize) {
        image.withoutEnlargement()
    }

    return image
}