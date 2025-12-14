class Ajax {
    post(url, callback) {
        console.log('Отправка реального запроса:', url);
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function() {
            console.log('readyState:', xhr.readyState, 'status:', xhr.status);
            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        console.log('Данные получены:', data);
                        callback(data);
                    } catch (e) {
                        console.error('Ошибка парсинга JSON:', e);
                        console.error('Ответ сервера:', xhr.responseText);
                        callback({ error: 'Parse error', response: { items: [] } });
                    }
                } else {
                    console.error('HTTP ошибка:', xhr.status);
                    callback({ error: 'HTTP error', response: { items: [] } });
                }
            }
        };
        
        xhr.onerror = function() {
            console.error('Network error при запросе к VK API');
            callback({ error: 'Network error', response: { items: [] } });
        };
        
        xhr.send();
    }
}

export const ajax = new Ajax();