const sharp = require('sharp')
const config = require('./config')

module.exports = async ({ type, path }) => {
    if (!type || !path || !config[type]) {
        return null
    }

    const imagePath = `${config.basePath}/${path}`
    const imageConfig = config[type]

    const image = sharp(imagePath)
    let metadata = await image.metadata()

    if (imageConfig.width && imageConfig.height) {
        image.resize(imageConfig.width, imageConfig.height).max()
    }

    if (imageConfig.quality && ['jpeg', 'tiff', 'webp'].includes(metadata.format)) {
        image[metadata.format]({ quality : imageConfig.quality })
    }

    if (!imageConfig.upsize) {
        image.withoutEnlargement()
    }

    return image
}