function getFetchResponse(url) {
  const fetchResponsePromise = fetch(url);
  return fetchResponsePromise
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

function genQueryString(form) {
  let result_qeury_str = '?';

  Array.prototype.forEach.call(form.elements, function (item, idx) {
    const { name, value } = item;

    if (!name) {
      return result_qeury_str;
    }

    if (idx != 0) {
      result_qeury_str += '&';
    }

    result_qeury_str += `${name}=${value}`;
  });

  // document.querySelector("body > div > div > div.col-10 > form").elements.ip
  //   console.info(result_qeury_str);
  return result_qeury_str;
}
