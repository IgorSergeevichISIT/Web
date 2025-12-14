class Ajax {
  async post(url) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: '',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка запроса:', error);
      return { error: { error_msg: error.message } };
    }
  }
}
export const ajax = new Ajax();