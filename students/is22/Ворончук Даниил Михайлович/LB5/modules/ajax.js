class Ajax {
    async post(url, callback, retries = 2, delay = 1000) {
        let attempt = 0; // Счётчик попыток

        while (attempt < retries) {
            try {
                const response = await fetch(url, { method: 'POST' });

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.json();
                callback(data);
                return;

            } catch (error) {
                console.error(`Попытка ${attempt + 1} не удалась. Ошибка:`, error);

                attempt++;

                if (attempt < retries) {

                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    console.error("Все попытки не удались");
                }
            }
        }
    }
}

export const ajax = new Ajax();
