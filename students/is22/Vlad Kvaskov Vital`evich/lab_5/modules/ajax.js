class Ajax {
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
