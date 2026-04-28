class Ajax {
    post(url, callback) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.response)
                callback(data)
            }
        }
    }
}

export const ajax = new Ajax()