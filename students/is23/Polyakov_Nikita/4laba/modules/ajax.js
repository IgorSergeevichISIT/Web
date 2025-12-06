class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.error) {
                        console.error('VK API Error:', data.error);
                        callback({ error: data.error });
                    } else {
                        callback(data);
                    }
                } catch (e) {
                    console.error('Parse Error:', e);
                    callback({ error: e });
                }
            }
        };
    }
}

export const ajax = new Ajax();