const sharp = require('sharp')
const config = require('./config')

module.exports = async ({ type, path }) => {
    if (!type || !path || !config[type]) {
        return null
    }

    const imagePath = `${config.basePath}/${path}`
	console.log(imagePath)
    const imageConfig = config[type]

    const image = sharp(imagePath)
    let metadata = await image.metadata()

    if (imageConfig.width && imageConfig.height) {
        image.resize(imageConfig.width, imageConfig.height, { fit: 'inside', withoutEnlargement: !imageConfig.upsize })
    }

    if (imageConfig.quality && ['jpeg', 'tiff', 'webp'].includes(metadata.format)) {
        image[metadata.format]({ quality : imageConfig.quality })
    }

    return image
}
