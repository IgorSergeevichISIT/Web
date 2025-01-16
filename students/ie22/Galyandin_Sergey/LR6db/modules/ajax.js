class Ajax {

    async get(url) {
        let response = await fetch(url, {
            method: 'GET'
        })
        return response.json()
    }

    async post(url, body) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
        location.reload()
        return response.json()
    }

    async delete(url, body) {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
        location.reload()
        return response.json()
    }
}

export const ajax = new Ajax();