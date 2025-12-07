import { ajax } from './modules/ajax.js';
import { urls } from './modules/urls.js';
import { GROUP_ID } from './modules/consts.js';
import { Filter } from './components/Filter.js';
import { UserCard } from './components/UserCard.js';
import { UserPage } from './components/UserPage.js';

let currentFilter = '';
let currentPage = 'list'; 

const filter = new Filter('#filter-container', onFilterChange);
const userCard = new UserCard('#users-list', onUserClick);
const userPage = new UserPage('#app-container', backToList);

function onFilterChange(selectedFilter) {
    currentFilter = selectedFilter;
    console.log(`Фильтр изменён на: "${selectedFilter}"`);
    loadGroupMembers();
}

function loadGroupMembers() {
    const url = urls.getGroupMembers(GROUP_ID, currentFilter);
    
    console.log(`Запрашиваю URL: ${url}`);
    
    ajax.get(url, (data) => {
        if (data && data.response) {
            console.log('Полученные данные:', data.response);
            
            userCard.clear();
            
            data.response.items.forEach(user => {
                userCard.renderUser(user);
            });
        } else {
            console.error('Ошибка при получении данных!', data);
        }
    });
}

function onUserClick(userId) {
    console.log(`Клик на пользователя с ID: ${userId}`);
    showUserDetails(userId);
}

function showUserDetails(userId) {
    const url = urls.getUserInfo(userId);
    
    console.log(`Запрашиваю URL: ${url}`);
    
    ajax.get(url, (data) => {
        if (data && data.response && data.response.length > 0) {
            const user = data.response[0];
            console.log('Информация о пользователе:', user);
            console.log('ВСЕ ПОЛЯ:', Object.keys(user));
            console.log('ПОЛНЫЙ ОБЪЕКТ:', JSON.stringify(user, null, 2));
            
            currentPage = 'details';
            userPage.render(user);

            document.getElementById('filter-container').style.display = 'none';
            document.getElementById('users-list').style.display = 'none';
            document.getElementById('app-container').classList.add('visible');
        } else {
            console.error('Ошибка при получении информации о пользователе!', data);
        }
    });
}

function backToList() {
    console.log('Возвращаемся к списку');
    
    currentPage = 'list';
    
    document.getElementById('filter-container').style.display = 'block';
    document.getElementById('users-list').style.display = 'grid';
    document.getElementById('app-container').classList.remove('visible');

    userPage.clear();
}

function init() {
    console.log('Приложение загружено!');
    
    filter.render();
    
    loadGroupMembers();
}

document.addEventListener('DOMContentLoaded', init);
