class Axios {
    findstocks(callback) {
        axios.get('http://localhost:8000/dogs/')
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
            callback(null);
        });
    }

    findstockbyid(id, callback) {
        axios.get(`http://localhost:8000/dogs/${id}`)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
            callback(null);
        });
    }

    addstock(stock, callback) {
        axios.post('http://localhost:8000/dogs/', stock)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
            callback(null);
        });
    }

    deletestock(id, callback) {
        axios.delete(`http://localhost:8000/dogs/${id}`)
        .then(response => {
            callback(null)
        })
        .catch(error => {
            console.error('Ошибка:', error.response.data);
            callback(error.response.data.message)
        });
    }
}

export const axioss = new Axios;