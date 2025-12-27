import {ProductCardComponent} from "../../components/product-card/index.js"
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class MainPage {
    
    constructor (parent) {
        this.parent = parent;
    }

    getData(filter = 'friends') {
        ajax.post(urls.getGroupMembers(groupId, filter), (data) => {
            if (data.response) {
                this.renderData(data.response.items)
            } else {
                console.error('Ошибка получения данных:', data.error)
                this.renderError()
            }
        })
    }

    renderData(items) {
        const cardsContainer = this.pageRoot.querySelector('.cards-container');
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
        }
        
        if (items.length === 0) {
            this.pageRoot.insertAdjacentHTML('beforeend', 
                '<div class="alert alert-info">Нет пользователей по выбранному фильтру</div>'
            );
            return;
        }
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(cardsContainer || this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    
    renderError() {
        this.pageRoot.insertAdjacentHTML('beforeend',
            '<div class="alert alert-danger">Ошибка загрузки данных. Проверьте CORS расширение и доступы.</div>'
        );
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (`
            <div id="main-page">
                <h1 class="mb-4" style="text-align: center; color: white">Участники группы VK</h1>
                
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Фильтр участников</h5>
                        <p class="card-text">Выберите тип участников для отображения:</p>
                        
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-primary filter-btn" data-filter="friends">Друзья</button>
                            <button type="button" class="btn btn-outline-primary filter-btn" data-filter="unsure">Не уверены</button>
                            <button type="button" class="btn btn-outline-primary filter-btn" data-filter="managers">Руководители</button>
                            <button type="button" class="btn btn-outline-primary filter-btn" data-filter="donut">Подписчики Donut</button>
                        </div>
                        
                        <div class="mt-3">
                            <span id="current-filter" class="badge bg-info">Текущий фильтр: друзья</span>
                        </div>
                    </div>
                </div>
                
                <div class="cards-container d-flex flex-wrap"></div>
            </div>
        `)
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                
                
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                
                document.getElementById('current-filter').textContent = `Текущий фильтр: ${this.getFilterName(filter)}`;
                
                
                this.getData(filter);
            });
        });
        
        
        document.querySelector('.filter-btn[data-filter="friends"]').classList.add('active');
        
        
        this.getData('friends');
    }
    
    getFilterName(filter) {
        const names = {
            'friends': 'друзья',
            'unsure': 'не уверены',
            'managers': 'руководители',
            'donut': 'подписчики Donut'
        };
        return names[filter] || filter;
    }
}