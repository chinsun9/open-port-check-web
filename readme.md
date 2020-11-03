# open-port-check-web

- https://www.yougetsignal.com/tools/open-ports/ 을 따라만들기, 클론 코딩

## 데모

[![시연영상](https://img.youtube.com/vi/4IMSpyKuhL4/0.jpg)](https://www.youtube.com/watch?v=4IMSpyKuhL4)

## 기능

- 접속자의 공인아이피 알려줌
- 포트포워딩 테스트
- common ports 목록
- 모든 common port 테스트

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
