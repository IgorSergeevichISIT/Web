class Ajax {
    constructor(maxRetries = 3, retryDelay = 1000) {
        this.maxRetries = maxRetries; // Максимальное количество попыток
        this.retryDelay = retryDelay; // Задержка между попытками в миллисекундах
    }

    async fetchWithRetry(url, options, retries = this.maxRetries) {
        try {
            console.log(`Attempting request to ${url}. Attempts left: ${retries}`);
            const response = await fetch(url, options);
    
            
            if (!response.ok) {
                // Если ответ не успешный, выбрасываем ошибку
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Парсим JSON и возвращаем данные
            return await response.json();
        } catch (error) {
            
            console.error(`Request failed: ${error.message}`);
    
            // Если остались попытки, повторяем запрос
            if (retries > 0) {
                console.log(`Retrying... Attempts left: ${retries - 1}`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay)); // Задержка перед повторной попыткой
                return this.fetchWithRetry(url, options, retries - 1); // Повторная попытка
            } else {
                // Если попытки закончились, выбрасываем ошибку
                console.error(`Max retries reached. Error: ${error.message}`);
                throw new Error(`Max retries reached. Error: ${error.message}`);
            }
        }
    }

    async get(url) {
        return this.fetchWithRetry(url, {
            method: 'GET'
        });
    }

    async post(url, body) {
        return this.fetchWithRetry(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
    }

    async delete(url, body) {
        return this.fetchWithRetry(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
    }
}

export const ajax = new Ajax();