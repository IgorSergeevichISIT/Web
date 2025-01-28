import { urls } from './urls.js'; 

class Ajax {
    async post(url) {
        try {
            const response = await fetch(url, { method: 'POST' });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Request failed:', error);
            return { error: true, message: error.message };
        }
    }

    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error('Request failed:', error);
            return { error: true, message: error.message };
        }
    }
}

export const ajax = new Ajax();

