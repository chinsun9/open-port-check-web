# findip-nodejs

- https://www.findip.kr/ 을 따라만들기

## express generator로 프로젝트 생성

```
express findip-nodejs --view=ejs
```

## IPv4 방식으로 보기

```js bin/www
server.listen(port, '0.0.0.0');
```

```js routes/index.js
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
console.log(ip);
res.render('index', { title: 'findip', ip: ip });
```

- ip를 index view에 렌더링하여 보냄
