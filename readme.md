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

## is-port-reachable

```js routes/index.js
const isPortReachable = require('is-port-reachable');

result = await isPortReachable(port, { host: ip });
```

- is-port-reachable 패키지를 사용해 포트 오픈 여부를 알아온다
- 당연한 말이지만 해당 포트를 리슨 하는 서버가 존재해야 한다
- host는 domain을 적어도 되고, ip로 적어도 된다.

## check all common ports

```js routes/index.js
const common_ports_list = [
  [21, 'FTP'],
  [22, 'SSH'],
  [23, 'TELNET'],
  [25, 'SMTP'],
  [53, 'DNS'],
  [80, 'HTTP'],
  [110, 'POP3'],
  [115, 'SFTP'],
  [135, 'RPC'],
  [139, 'NetBIOS'],
  [143, 'IMAP'],
  [194, 'IRC'],
  [443, 'SSL'],
  [445, 'SMB'],
  [1433, 'MSSQL'],
  [3306, 'MySQL'],
  [3389, 'Remote Desktop'],
  [5632, 'PCAnywhere'],
  [5900, 'VNC'],
  [25565, 'Minecraft'],
  [3000, 'node express'],
  [5500, 'vscode live server'],
];

router.get('/checkAll', async function (req, res) {
  console.log(req.query);

  const { ip } = req.query;

  let result = [];

  const reqPromiseArray = [];
  for (const item of common_ports_list) {
    const port = item[0];
    reqPromiseArray.push(isPortReachable(port, { host: ip }));
  }

  // result = await isPortReachable(port);

  result = await Promise.all(reqPromiseArray).then((promiseResult) => {
    return promiseResult.map((isOpen, idx) => {
      return {
        isOpen: isOpen,
        port: common_ports_list[idx][0],
        port_name: common_ports_list[idx][1],
      };
    });
  });

  res.json({ result: result, req: req.query });
});
```

- req로부터 ip를 가져오고,
- common_ports_list의 port를 가져와서 프로미스를 생성한다
- `await Promise.all(reqPromiseArray)`로 요청을 병렬 처리하였다
