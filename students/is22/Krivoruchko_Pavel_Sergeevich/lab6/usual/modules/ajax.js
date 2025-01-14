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

    async get(url, callback) { //
        try {
            const response = await fetch(`${urls.getLocalServer()[0]}${url}`, {headers: {
                'Content-Type': 'application/json',
                'X-Request-Name': 'MyCustomRequestName' 
            }});            // доп

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            callback(data);

        } catch (error) {
            console.error('Request failed', error);
        }
    }
}

export const ajax = new Ajax();
