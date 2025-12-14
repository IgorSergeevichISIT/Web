class Ajax {
    get(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        callback(data);
                    } catch (error) {
                        console.error('Ошибка парсинга JSON:', error);
                        callback({ error: 'Invalid JSON' });
                    }
                } else {
                    console.error('Ошибка запроса:', xhr.status);
                    callback({ error: `HTTP Error: ${xhr.status}` });
                }
            }
        };

        xhr.onerror = () => {
            console.error('Ошибка сети');
            callback({ error: 'Network Error' });
        };
    }

    post(url, callback) {
        this.get(url, callback); 
    }
}

export const ajax = new Ajax();