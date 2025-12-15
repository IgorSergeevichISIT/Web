class Ajax {
  post(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          callback(data);
        } else {
          console.error('Ошибка запроса:', xhr.status, xhr.statusText);
          callback(null);
        }
      }
    };
  }
}

export const ajax = new Ajax();