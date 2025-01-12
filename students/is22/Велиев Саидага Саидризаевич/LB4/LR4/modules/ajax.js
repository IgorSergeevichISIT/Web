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