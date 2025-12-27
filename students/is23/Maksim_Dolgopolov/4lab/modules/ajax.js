class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.response)
                        callback(data)
                    } catch (error) {
                        console.error('Ошибка парсинга JSON:', error)
                    }
                } else {
                    console.error('Ошибка запроса:', xhr.status)
                }
            }
        }
    }
}

export const ajax = new Ajax();