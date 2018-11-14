# Imgproxy

https://websecret.by/blog/optimizaciya-izobrazhenij-na-krupnyh-proektah

# Install

- `npm i`

- `cp config-example.js config.js` и указываем путь к конфигу картинок

- `mkdir projects && cd mkdir && ln -s ~/site.by/images.js site.js` - создаем symbol ссылку к конфигам

```
    small: {
        width: 211,
        height: 130,
        quality: 100,
    }
```

- Настраиваем nginx и запускаем pm2 

```
server {
    listen 80;
    server_name imgproxy.localhost;
    
    location / {
        proxy_cache imgproxy;
        proxy_cache_valid 200 30d;
        expires 30d;
        proxy_pass http://127.0.0.1:1337;
    }
}
```

- Стартуем pm2 `cd ../ && pm2 start npm --name "imgproxy" -- start`
