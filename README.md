# imgproxy

https://websecret.by/blog/optimizaciya-izobrazhenij-na-krupnyh-proektah

#Install

- `cp config-example.js config.js` и указываем путь к конфигу картинок

- Далее создаем symbol ссылку к конфигам `mkdir projects && cd mkdir && ln -s ~/site.by/images.js centerfm.js`

- Настраиваем nginx и запускаем pm2 `cd ../ && pm2 start npm --name "imgproxy" -- start`
