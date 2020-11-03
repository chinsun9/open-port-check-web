const isPortReachable = require('is-port-reachable');
const express = require('express');
const router = express.Router();

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

/* GET home page. */
router.get('/', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.render('index', {
    title: 'findip',
    ip: ip,
    common_ports_list: common_ports_list,
  });
});

/* api */
router.all('/api', function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip: ip });
});

router.get('/check', async function (req, res) {
  console.log(req.query);

  const { ip, port } = req.query;

  let result = false;

  // result = await isPortReachable(port);
  result = await isPortReachable(port, { host: ip });
  console.log(result);

  res.json({ isOpen: result, req: req.query });
});

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

module.exports = router;
