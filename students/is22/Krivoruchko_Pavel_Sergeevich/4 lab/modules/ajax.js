class Ajax {
    post(url, callback) {
        axios.post(url)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error occurred:', error);
                callback(null);
            });
    }
}

export const ajax = new Ajax();


//// Было

// class Ajax {
//     post(url, callback) {
//         let xhr = new XMLHttpRequest()
//         xhr.open('POST', url)
//         xhr.send()

//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 const data = JSON.parse(xhr.response)
//                 callback(data)
//             }
//         }
//     }
// }

// export const ajax = new Ajax();