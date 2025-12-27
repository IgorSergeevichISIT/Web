
import { ApiClient } from '../../internal/api/api-client.js';

export class ImageGallery {
    constructor(parent) {
        this.parent = parent;
        this.images = [];
    }

    
    async fetchData() {
        try {
            this.images = await ApiClient.getAll();
            return this.images;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.showError('Не удалось загрузить данные с сервера');
            return [];
        }
    }

    
    async getImageById(id) {
        try {
            return await ApiClient.getById(id);
        } catch (error) {
            console.error('Ошибка получения картинки:', error);
            this.showError(`Не удалось получить картинку с ID: ${id}`);
            return null;
        }
    }

    
    async addImage(stock) {
        try {
            const newImage = await ApiClient.create(stock);
            this.images.push(newImage);
            this.render(); 
            return newImage;
        } catch (error) {
            console.error('Ошибка добавления картинки:', error);
            this.showError('Не удалось добавить картинку');
            return null;
        }
    }

    
    async deleteImage(id) {
        try {
            await ApiClient.delete(id);
            this.images = this.images.filter(img => img.id !== id);
            this.render(); 
            return true;
        } catch (error) {
            console.error('Ошибка удаления картинки:', error);
            this.showError(`Не удалось удалить картинку с ID: ${id}`);
            return false;
        }
    }

    
    getCardHTML(item) {
        return `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card image-card" style="border: 3px solid #ccc; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <img 
                        src="${item.src}" 
                        class="card-img-top" 
                        alt="${item.title}"
                        style="width: 100%; height: 200px; object-fit: cover;"
                        data-id="${item.id}"
                    >
                    <div class="card-body text-center" style="background: white;">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.text}</p>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    
    getAddFormHTML() {
        return `
            <div class="container mt-4">
                <div class="card">
                    <div class="card-header">
                        <h4>Добавить новую картинку</h4>
                    </div>
                    <div class="card-body">
                        <form id="add-image-form">
                            <div class="mb-3">
                                <label class="form-label">URL изображения</label>
                                <input type="text" class="form-control" id="image-url" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Заголовок</label>
                                <input type="text" class="form-control" id="image-title" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Описание</label>
                                <textarea class="form-control" id="image-text" rows="2" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ID</label>
                                <input type="number" class="form-control" id="image-id" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    
    async render() {
        await this.fetchData();
        
        const cardsHTML = this.images.map(item => this.getCardHTML(item)).join('');
        
        const galleryHTML = `
            <div class="container">
                <div class="d-flex justify-content-between align-items-center my-4">
                    <h2>Галерея изображений</h2>
                    <button class="btn btn-primary" id="show-add-form">
                        Добавить картинку
                    </button>
                </div>
                <div class="row justify-content-center" id="images-container">
                    ${cardsHTML}
                </div>
                <div id="form-container"></div>
            </div>
        `;
        
        this.parent.innerHTML = galleryHTML;
        this.setupListeners();
    }

    setupListeners() {
        
        const addButton = this.parent.querySelector('#show-add-form');
        if (addButton) {
            addButton.addEventListener('click', () => {
                const formContainer = this.parent.querySelector('#form-container');
                formContainer.innerHTML = this.getAddFormHTML();
                this.setupFormListener();
            });
        }

        
        const deleteButtons = this.parent.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Вы уверены, что хотите удалить эту картинку?')) {
                    await this.deleteImage(id);
                }
            });
        });

        
        const images = this.parent.querySelectorAll('.image-card img');
        images.forEach(img => {
            img.addEventListener('click', async (e) => {
                const imageId = parseInt(e.target.dataset.id);
                const image = await this.getImageById(imageId);
                if (image) {
                    alert(`
                        Детали картинки:
                        ID: ${image.id}
                        Заголовок: ${image.title}
                        Описание: ${image.text}
                        URL: ${image.src}
                    `);
                }
            });
        });
    }

    setupFormListener() {
        const form = this.parent.querySelector('#add-image-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const newStock = {
                    id: parseInt(document.getElementById('image-id').value),
                    src: document.getElementById('image-url').value,
                    title: document.getElementById('image-title').value,
                    text: document.getElementById('image-text').value
                };

                await this.addImage(newStock);
                
                
                form.reset();
                document.getElementById('form-container').innerHTML = '';
            });
        }
    }

    showError(message) {
        const errorHTML = `
            <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', errorHTML);
    }
}