const result_box = document.querySelector('div.result');

async function commonPortCheckAll() {
  const ip = document.myForm.ip.value;
  const url = `/checkAll?ip=${ip}`;
  result_box.innerHTML = 'pending...';

  const { result, req } = await getFetchResponse(url);

  let tmpHtmlString = '';

  for (const item of result) {
    const { isOpen, port, port_name } = item;
    const isOpenStr = isOpen ? 'opend' : 'closed';

    tmpHtmlString += `<i class="fas fa-flag ${isOpenStr}"></i> Port ${port}(${port_name}) is ${isOpenStr}
  on ${req.ip} <br> `;
  }

  result_box.innerHTML = tmpHtmlString;
}

function commonPortCheck(target) {
  console.log(target.innerHTML.trim());
  document.myForm.port.value = target.innerHTML.trim();
  portCheck();
}

async function portCheck() {
  console.log(123);
  console.log(document.myForm);

  const qeury_str = genQueryString(document.myForm);
  const url = '/check';
  result_box.innerHTML = 'pending...';
  const { isOpen, req } = await getFetchResponse(url + qeury_str);

  // Port 21 is closed on 211.118.206.200.
  const isOpenStr = isOpen ? 'opend' : 'closed';
  result_box.innerHTML = `<i class="fas fa-flag ${isOpenStr}"></i> Port ${req.port} is ${isOpenStr}
   on ${req.ip} `;
}
