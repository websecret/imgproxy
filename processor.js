const sharp = require('sharp')
const config = require('./config')

module.exports = ({ type, path }) => {
    if (!type || !path) {
        return null
    }

    const imagePath = `${config.basePath}/${path}`
    const imageConfig = config[type]

    try {
        let image = sharp(imagePath)
            .resize(imageConfig.width, imageConfig.height)
            .max()

        if (imageConfig.quality) {
            image = image.jpeg({ quality : imageConfig.quality })
        }

        if (!imageConfig.upsize) {
            image = image.withoutEnlargement()
        }

        return image
    } catch (e) {
        return null
    }
}