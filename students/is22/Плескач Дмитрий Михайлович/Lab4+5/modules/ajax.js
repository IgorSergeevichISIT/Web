class Ajax {
    post(url, callback, retries = 3, delay = 1000) {
        const axiosInstance = axios.create();

        axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const config = error.config;

                if (!config.__retryCount) {
                    config.__retryCount = 0;
                }

                if (config.__retryCount < retries) {
                    config.__retryCount += 1;
                    console.warn(`Попытка ${config.__retryCount} не удалась. Повтор через ${delay} мс...`);

                    await new Promise(resolve => setTimeout(resolve, delay));
                    return axiosInstance(config);
                }

                return Promise.reject(error);
            }
        );

        axiosInstance.post(url)
            .then(response => {
                callback(response.data); 
            })
            .catch(error => {
                console.error('Все попытки завершились ошибкой:', error);
            });
    }
}

export const ajax = new Ajax();
