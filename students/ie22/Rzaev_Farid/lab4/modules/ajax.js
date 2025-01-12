class Ajax {
    post(url, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const responseData = JSON.parse(xhr.response);
                callback(responseData);
                console.log(responseData);
            }
        };
    }
}

export const ajax = new Ajax();
