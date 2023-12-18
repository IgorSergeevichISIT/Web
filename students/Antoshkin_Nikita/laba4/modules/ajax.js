class Ajax {
    post(url, callback) {
        fetch(url, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            // Обработка ошибок при запросе
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
}
export const ajax = new Ajax();
