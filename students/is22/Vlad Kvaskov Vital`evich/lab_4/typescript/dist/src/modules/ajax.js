class Ajax {
    post(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const data = JSON.parse(xhr.response);
                callback(data);
            }
        };
    }
}
export const ajax = new Ajax();
