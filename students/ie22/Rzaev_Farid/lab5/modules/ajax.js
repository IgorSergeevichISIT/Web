class Ajax {
    post(url, data, callback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            callback(responseData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
}

export const ajax = new Ajax();
