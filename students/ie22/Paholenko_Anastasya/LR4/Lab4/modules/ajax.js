class Ajax {
    post(url, callback) {
        fetch(url, {
            method: 'POST'
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

