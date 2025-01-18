"use strict";
let members = []; // Список участников группы
// Функция для получения участников группы
function getGroupMembers() {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    const groupId = '175393616';
    const apiUrl = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${token}&v=5.131`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response) {
                let userIds = response.response.items;
                getUsersData(userIds);
            }
        }
    };
    xhr.send();
}
// Функция для получения полных данных о пользователях
function getUsersData(userIds) {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    const ids = userIds.join(',');
    const apiUrl = `https://api.vk.com/method/users.get?user_ids=${ids}&fields=first_name,last_name,photo_200&access_token=${token}&v=5.131`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response) {
                members = response.response;
                displayGroupMembers(members);
            }
        }
    };
    xhr.send();
}
// Функция для отображения участников группы
function displayGroupMembers(users) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = ""; // Очистить текущие данные
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.setAttribute('data-user-id', user.id.toString());
        userElement.classList.add('user-element');
        const userName = document.createElement('p');
        userName.textContent = `${user.first_name} ${user.last_name}`;
        const userPhoto = document.createElement('img');
        userPhoto.src = user.photo_200;
        userElement.appendChild(userPhoto);
        userElement.appendChild(userName);
        userElement.addEventListener('click', function () {
            window.location.href = `user-details.html?id=${user.id}`;
        });
        userInfoDiv.appendChild(userElement);
    });
}
// Функция для применения фильтра сортировки
function applySortFilter() {
    const sortType = document.getElementById('sort-filter').value;
    if (sortType === 'name') {
        members.sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
    }
    else if (sortType === 'id') {
        members.sort((a, b) => a.id - b.id);
    }
    displayGroupMembers(members);
}
getGroupMembers(); // Запуск функции при загрузке страницы
