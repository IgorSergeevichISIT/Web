class Ajax {
    async post(url, callback) {
        console.log('📡 Fetch запрос к VK API');
        
        try {
            // 1. Пробуем простой fetch без заголовков (чтобы избежать preflight)
            console.log('Попытка 1: Простой fetch...');
            const response = await fetch(url, {
                method: 'GET',
            });
            
            console.log('Статус ответа:', response.status);
            
            if (response.status === 0) {
                throw new Error('CORS ошибка. Включите CORS Unblock расширение в браузере.');
            }
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }
            
            const data = await response.json();
            console.log('✅ Fetch успешен!');
            callback(data);
            
        } catch (error) {
            console.error('❌ Ошибка fetch:', error.message);
            
            // 2. Пробуем fetch с mode: 'no-cors'
            console.log('Попытка 2: Fetch с mode: no-cors...');
            try {
                const noCorsResponse = await fetch(url, {
                    method: 'GET',
                    mode: 'no-cors'
                });
                
                console.log('no-cors тип ответа:', noCorsResponse.type);
                
                // В режиме no-cors нельзя читать ответ
                callback({ 
                    error: {
                        error_code: 0,
                        error_msg: 'CORS ошибка. Fetch выполнен в режиме \'no-cors\'. Для чтения ответа необходимо установить CORS расширение.'
                    }
                });
                
            } catch (noCorsError) {
                console.error('❌ no-cors тоже не работает:', noCorsError);
                
                // 3. Пробуем через JSONP (работает без CORS)
                console.log('Попытка 3: JSONP...');
                this.tryJsonp(url, callback);
            }
        }
    }
    
    tryJsonp(url, callback) {
        console.log('Используем JSONP для обхода CORS...');
        
        const callbackName = 'jsonp_' + Date.now();
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
            console.log('✅ JSONP успешен!');
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };
        
        script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName;
        
        script.onerror = () => {
            console.error('❌ JSONP ошибка');
            delete window[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            
            callback({ 
                error: {
                    error_code: 0,
                    error_msg: 'Все методы fetch не работают из-за CORS.'
                }
            });
        };
        
        document.body.appendChild(script);
    }
}

export const ajax = new Ajax();