// console.log('Response data:');
    // import axios from 'axios';

class Ajax {
    async post(url, callback) {
        try {
            const response = await axios.post(url);
            callback(response.data);
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    }
}

export const ajax = new Ajax();

