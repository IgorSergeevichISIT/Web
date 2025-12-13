class Ajax {
    /**
     * Выполнить GET запрос по URL и обработать ответ
     * @param {string} url - адрес, на который отправляем запрос
     * @param {function} callback - функция, которая будет выполнена после получения ответа
     */
    get(url, callback) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.send();
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const data = JSON.parse(xhr.response);
                
                callback(data);
            }
        };
        
        xhr.onerror = () => {
            console.error('Ошибка сети при запросе!');
            callback(null);
        };
    }
}

export const ajax = new Ajax();
