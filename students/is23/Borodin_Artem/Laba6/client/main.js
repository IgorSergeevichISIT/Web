import { urls } from './modules/urls.js';
import { Filter } from '../components/Filter.js';
import { UserCard } from '../components/UserCard.js';
import { UserPage } from '../components/UserPage.js';
import { AddUserModal } from '../components/AddUserModal.js';

let currentFilter = '';
let currentPage = 'list';

const filter = new Filter('#filter-container', onFilterChange);
const userCard = new UserCard('#users-list', onUserClick, onDeleteUser);
const userPage = new UserPage('#app-container', backToList);
const addUserModal = new AddUserModal('#modals-container', onAddUser);

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    return null;
  }
}

function onFilterChange(selectedFilter) {
  currentFilter = selectedFilter;
  console.log(`Фильтр изменён на: "${selectedFilter}"`);
  loadGroupMembers();
}

async function loadGroupMembers() {
  const url = urls.getGroupMembers(currentFilter);
  console.log(`📥 Запрашиваю: ${url}`);

  const data = await fetchData(url);

  if (data && data.response) {
    console.log('✅ Полученные данные:', data.response);
    userCard.clear();
    data.response.items.forEach(user => {
      userCard.renderUser(user);
    });
    userCard.attachEventListeners();
  } else {
    console.error('❌ Ошибка при получении данных!');
  }
}

function onUserClick(userId) {
  console.log(`👤 Клик на пользователя с ID: ${userId}`);
  showUserDetails(userId);
}

async function showUserDetails(userId) {
  const url = urls.getUserInfo(userId);
  console.log(`📥 Запрашиваю: ${url}`);

  const data = await fetchData(url);

  if (data && data.response && data.response.length > 0) {
    const user = data.response[0];
    console.log('✅ Информация о пользователе:', user);

    currentPage = 'details';
    userPage.render(user);

    document.getElementById('filter-container').style.display = 'none';
    document.getElementById('users-list').style.display = 'none';
    document.getElementById('app-container').classList.add('visible');
  } else {
    console.error('❌ Ошибка при получении информации о пользователе!');
  }
}

async function onAddUser(userData) {
  const url = urls.addUser();
  console.log(`📤 Добавляю пользователя:`, userData);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };

  const response = await fetchData(url, options);

  if (response && response.status === 'success') {
    console.log('✅ Пользователь успешно добавлен:', response.user);
    alert('✅ Пользователь добавлен!');
    loadGroupMembers(); 
  } else {
    console.error('❌ Ошибка при добавлении пользователя!', response);
    alert('❌ Ошибка при добавлении пользователя');
  }
}

async function onDeleteUser(userId) {
  const url = urls.deleteUser(userId);
  console.log(`🗑️  Удаляю пользователя с ID: ${userId}`);

  const options = {
    method: 'DELETE'
  };

  const response = await fetchData(url, options);

  if (response && response.status === 'success') {
    console.log('✅ Пользователь успешно удалён');
    alert('✅ Пользователь удалён!');
    loadGroupMembers(); 
  } else {
    console.error('❌ Ошибка при удалении пользователя!', response);
    alert('❌ Ошибка при удалении пользователя');
  }
}

function backToList() {
  console.log('↩️  Возвращаемся к списку');
  currentPage = 'list';

  document.getElementById('filter-container').style.display = 'block';
  document.getElementById('users-list').style.display = 'grid';
  document.getElementById('app-container').classList.remove('visible');

  userPage.clear();
}

function init() {
  console.log('🚀 Приложение загружено!');
  
  fetch('http://localhost:3000/api/health')
    .then(r => r.json())
    .then(data => console.log('✅ Сервер доступен:', data))
    .catch(err => console.warn('⚠️  Сервер недоступен! Убедитесь, что запущен: npm start'));

  filter.render();
  addUserModal.render();

  const addBtn = document.getElementById('add-user-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => addUserModal.open());
  }

  loadGroupMembers();
}

document.addEventListener('DOMContentLoaded', init);
