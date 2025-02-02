import { urls } from './urls.js';


class Ajax {
    async post(url) {
        try {
            const response = await fetch(url, { method: 'POST' });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            return response;

        } catch (error) {
            console.error('Request failed', error);
        }
    }

    // Метод get с async/await
    async get(url) {
        try {
            const response = await fetch(`${urls.getLocalServer()[0]}${url}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request failed', error);
            throw error;
        }
    }
}

export const ajax = new Ajax();

