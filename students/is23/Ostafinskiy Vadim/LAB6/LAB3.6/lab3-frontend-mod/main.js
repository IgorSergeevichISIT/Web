import { MainPage } from "./pages/main/index.js";

const API_URL = 'http://localhost:8000/dogs';

window.dogsAPI = {
    async getAllDogs() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return await response.json();
        } catch (error) {
            console.error('Ошибка при загрузке собак:', error);
            alert('Не удалось загрузить данные о собаках');
            return [];
        }
    },

    async getDogById(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Собака не найдена');
                }
                throw new Error('Ошибка загрузки данных');
            }
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при загрузке собаки ID=${id}:`, error);
            alert(error.message);
            return null;
        }
    },

    async addDog(dogData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dogData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка добавления');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при добавлении собаки:', error);
            throw error;
        }
    },

    async deleteDog(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка удаления');
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при удалении собаки ID=${id}:`, error);
            throw error;
        }
    }
};

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();