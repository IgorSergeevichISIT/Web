// modules/ajax.js
export class Ajax {
    // Основной метод для запросов к VK API
    async vkRequest(url) {
        console.log('Fetch запрос к:', url.split('?')[0]); // Логируем без токена
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Fetch ответ получен:', data);
            return data;
            
        } catch (error) {
            console.error('Ошибка fetch запроса:', error);
            return {
                error: error.message,
                error_code: 0
            };
        }
    }
    
    // Для обратной совместимости с существующим кодом
    async post(url, callback) {
        try {
            const data = await this.vkRequest(url);
            callback(data);
        } catch (error) {
            console.error('Ошибка в post методе:', error);
            callback({
                error: error.message,
                error_code: 0,
                response: { items: [] }
            });
        }
    }
}

export const ajax = new Ajax();