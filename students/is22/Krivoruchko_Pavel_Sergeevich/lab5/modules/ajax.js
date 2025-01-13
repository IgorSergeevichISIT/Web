class Ajax {
    async post(url, callback) 
    {
        try
        {
            const result = await fetch(url,{method:"POST"})

            if(!result.ok)
            {
                throw new Error(`Error: ${result.statusText}`);
            }

            const data = await result.json();
            callback(data);

        }
        
        catch(error)
        {
            console.error('Request failed', error)
        }
    }
}

export const ajax = new Ajax();

// class Ajax {
//     post(url, callback) {
//         axios.post(url)
//             .then(response => {
//                 callback(response.data);
//             })
//             .catch(error => {
//                 console.error('Error occurred:', error);
//                 callback(null);
//             });
//     }
// }

// export const ajax = new Ajax();


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

