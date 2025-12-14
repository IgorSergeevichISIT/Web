class Ajax {
    async get(url, callback) {
        try {
            console.log("Fetch запрос к:", url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            callback(data);
            
        } catch (error) {
            console.error('Ошибка Fetch запроса:', error);

            callback({ 
                error: error.message || 'Network Error',
                status: 'error'
            });
        }
    }

    async post(url, body = {}, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            
            const data = await response.json();
            callback(data);
            
        } catch (error) {
            console.error('Ошибка POST запроса:', error);
            callback({ error: error.message });
        }
    }
}

export const ajax = new Ajax();