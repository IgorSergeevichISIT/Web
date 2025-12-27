class Ajax {
    async post(url, callback) {
        console.log('AJAX запрос:', url);
        
        try {
            // Пробуем стандартный fetch
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Данные получены');
            callback(data);
            
        } catch (error) {
            console.error('Ошибка:', error.message);
            
            // Fallback: пробуем JSONP
            this.tryJsonp(url, callback);
        }
    }
    
    tryJsonp(url, callback) {
        console.log('Пробуем JSONP...');
        
        const callbackName = 'jsonp_' + Date.now();
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
            console.log('JSONP успешен');
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };
        
        // Добавляем callback параметр
        const jsonpUrl = url.includes('?') 
            ? `${url}&callback=${callbackName}`
            : `${url}?callback=${callbackName}`;
        
        script.src = jsonpUrl;
        
        script.onerror = () => {
            console.error('JSONP тоже не работает');
            delete window[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            
            // Показываем ошибку
            callback({ 
                error: {
                    error_code: 0,
                    error_msg: 'Не удалось загрузить данные'
                }
            });
        };
        
        document.body.appendChild(script);
    }
}

export const ajax = new Ajax();