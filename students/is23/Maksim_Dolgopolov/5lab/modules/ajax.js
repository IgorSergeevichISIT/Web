class Ajax {
    async post(url, callback) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (callback && typeof callback === 'function') {
                callback(data);
            }
            
            return data;
        } catch (error) {
            console.error('Ajax request failed:', error);
            
            if (callback && typeof callback === 'function') {
                callback({ error: error.message });
            }
        }
    }
}

export const ajax = new Ajax();