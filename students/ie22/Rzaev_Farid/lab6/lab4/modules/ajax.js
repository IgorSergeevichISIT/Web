class Ajax {
    get(url, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                callback(null, data); 
            })
            .catch(error => {
                callback(error, null); 
            });
    }
    post(url,data)
    {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data) 
        })
            .then(response => response.json()) // Получаем ответ в формате JSON
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }
    delete(url)
    {
        fetch(url, {
            method: 'DELETE', // Метод запроса
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении элемента');
            }
            return response.text();
        })
        .catch(error => {
            console.error('Ошибка:', error);  
        });
    }
    
}

export const ajax = new Ajax();
