class Ajax {

    async get(url) {
        try {
            let response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async post(url, body) {
        try {
            const response = await axios.post(url, body)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async delete(url, id) {
        try {
            const response = await axios.delete(url, id)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const ajax = new Ajax();