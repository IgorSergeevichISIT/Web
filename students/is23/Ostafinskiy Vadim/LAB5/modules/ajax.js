// DRY: Вся логика обработки ошибок, проверки ответов и парсинга JSON
// инкапсулирована в одном месте, а не повторяется при каждом запросе.

// KISS: Упрощение HTTP-запросов с fetch вместо XMLHttpRequest


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


// ISP (Interface Segregation Principle): раздельные методы в Ajax классе. Клиенты не зависят
// от методов, которые они не используют. Например, если нужен только GET, можно использовать только метод get()

// L — Liskov Substitution: если бы существовал AdvancedAjax extends Ajax, то везде, где используется Ajax, можно использовать AdvancedAjax