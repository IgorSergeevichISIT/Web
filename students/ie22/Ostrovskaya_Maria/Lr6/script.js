let members = []; // Список участников группы

// Функция для получения участников группы
function getGroupMembers() {
    var token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    var groupId = '175393616';
    var apiUrl = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Полученные данные:", data); // Логируем полученные данные
            if (data.response) {
                let userIds = data.response.items;
                // Получаем данные каждого пользователя
                getUsersData(userIds);
            }
        })
        .catch(error => console.error('Ошибка: ', error));
}

// Функция для получения данных пользователей
function getUsersData(userIds) {
    var token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q'; 
    var apiUrl = `https://api.vk.com/method/users.get?user_ids=${userIds.join(',')}&fields=photo_200&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Данные пользователей:", data);
            if (data.response) {
                members = data.response;  // Сохранение всего списка пользователей с именами
                displayGroupMembers(members);  // Отображение участников
            }
        })
        .catch(error => console.error('Ошибка при получении данных пользователей: ', error));
}

// Функция для отображения участников группы
function displayGroupMembers(userIds) {
    var userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = "";  // Очистить текущие данные

    console.log("Отображаем участников:", userIds); // Логируем участников

    userIds.forEach(user => {
        var userElement = document.createElement('div');
        userElement.setAttribute('data-user-id', user.id);
        userElement.classList.add('user-element');

        var userName = document.createElement('p');
        userName.textContent = `${user.first_name} ${user.last_name}`;
        
        var userPhoto = document.createElement('img');
        userPhoto.src = user.photo_200;

        userElement.appendChild(userPhoto);
        userElement.appendChild(userName);

        userElement.addEventListener('click', function() {
            window.location.href = `user-details.html?id=${user.id}`;
        });

        userInfoDiv.appendChild(userElement);
    });
}

// Функция для применения фильтра сортировки
function applySortFilter() {
    var sortType = document.getElementById('sort-filter').value;
    console.log("Тип сортировки:", sortType); // Логируем тип сортировки

    if (sortType === 'name') {
        members.sort((a, b) => {
            var nameA = `${a.first_name} ${a.last_name}`;
            var nameB = `${b.first_name} ${b.last_name}`;
            console.log("Сортировка по имени:", nameA, nameB); // Логируем сортировку
            return nameA.localeCompare(nameB); // Сортировка по имени
        });
    } else if (sortType === 'id') {
        members.sort((a, b) => a.id - b.id); // Сортировка по ID
    }

    console.log("Участники после сортировки:", members); // Логируем участников после сортировки
    displayGroupMembers(members); // Перерисовываем участников после сортировки
}

getGroupMembers(); // Запуск функции при загрузке страницы
