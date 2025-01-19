class Ajax {
    get(url, callback, headers = {}) {
        const customHeaders = {
            'Zagolovok-Nastya': 'MyCustomHeaderValue',
            'Content-Type': 'application/json',
            ...headers
        };

        fetch(url, {
            method: 'GET',
            headers: customHeaders
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблема с соединением');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Проблема с fetch:', error);
        });
    }
}
export const ajax = new Ajax();