class Ajax {
    post(url, callback) {
        axios.post(url)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Ошибыч:', error);
                callback(null);
            });
    }
}

export const ajax = new Ajax();
