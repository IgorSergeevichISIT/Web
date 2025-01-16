let members = []; // Список участников группы

// Функция для получения участников группы
function getGroupMembers() {
    var token = 'vk1.a.aPmxVuW2EWXUEFKitEUg6c9QhKd_sVHxAU7LIx1ahNlvaKsNgsZqQMGtjxG2UaTNxg9gSO1Yl7-vjPI9zJ9aiQqaSlLIK6Y4gb3jdg9L4YkZ9nHrcvofFDyhrodek4fiaZxvf7_T2mu0HxJe3m1DPLli0D0d7e3Ii4z-0wbC2WmPYLTbGaY8vDcDQT0stEZw4kurym5rnKSYZh6_xwWesA';
    var groupId = '228855264';
    var apiUrl = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${token}&v=5.131`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.response) {
                // Получаем IDs участников
                let userIds = response.response.items;
                // Получаем полные данные о пользователях
                getUsersData(userIds);
            }
        }
    };
    xhr.send();
}

// Функция для получения полных данных о пользователях
function getUsersData(userIds) {
    var token = 'vk1.a.aPmxVuW2EWXUEFKitEUg6c9QhKd_sVHxAU7LIx1ahNlvaKsNgsZqQMGtjxG2UaTNxg9gSO1Yl7-vjPI9zJ9aiQqaSlLIK6Y4gb3jdg9L4YkZ9nHrcvofFDyhrodek4fiaZxvf7_T2mu0HxJe3m1DPLli0D0d7e3Ii4z-0wbC2WmPYLTbGaY8vDcDQT0stEZw4kurym5rnKSYZh6_xwWesA';
    var ids = userIds.join(',');  // Соединяем IDs в строку через запятую
    var apiUrl = `https://api.vk.com/method/users.get?user_ids=${ids}&fields=first_name,last_name,photo_200&access_token=${token}&v=5.131`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.response) {
                members = response.response; // Массив с полными данными пользователей
                displayGroupMembers(members);
            }
        }
    };
    xhr.send();
}

// Функция для отображения участников группы(кодогенератор)
function displayGroupMembers(users) {
    var userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = "";  // Очистить текущие данные

    users.forEach(user => {
        var userElement = document.createElement('div');
        userElement.setAttribute('data-user-id', user.id);
        userElement.classList.add('user-element');
        
        var userName = document.createElement('p');
        userName.textContent = `${user.first_name} ${user.last_name}`;
        
        var userPhoto = document.createElement('img');
        userPhoto.src = user.photo_200;

        // Добавление события клика для перехода на страницу с подробной информацией о пользователе
        userElement.addEventListener('click', function() {
            window.location.href = `user-details.html?id=${user.id}`;
        });

        userElement.appendChild(userPhoto);
        userElement.appendChild(userName);

        userInfoDiv.appendChild(userElement);
    });
}

// Функция для применения фильтра сортировки
function applySortFilter() {
    var sortType = document.getElementById('sort-filter').value;
    if (sortType === 'name') {
        members.sort((a, b) => {
            return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        });
    } else if (sortType === 'id') {
        members.sort((a, b) => a.id - b.id); // Сортировка по ID
    }
    displayGroupMembers(members); // Обновление отображения после сортировки
}

getGroupMembers(); // Запуск функции при загрузке страницы
