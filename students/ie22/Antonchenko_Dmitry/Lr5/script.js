let members = []; // Список участников группы

// Функция для получения информации о группе
function getGroupInfo() {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    const groupId = '175393616';
    const apiUrl = `https://api.vk.com/method/groups.getById?group_id=${groupId}&fields=name&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                const groupTitle = data.response[0].name;
                document.getElementById('group-title').textContent = groupTitle;
            }
        })
        .catch(error => console.error('Ошибка при получении информации о группе: ', error));
}

// Функция для получения участников группы
function getGroupMembers() {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    const groupId = '175393616';
    const apiUrl = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                const userIds = data.response.items;
                getUsersData(userIds);
            }
        })
        .catch(error => console.error('Ошибка: ', error));
}

// Функция для получения данных пользователей
function getUsersData(userIds) {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q'; 
    const apiUrl = `https://api.vk.com/method/users.get?user_ids=${userIds.join(',')}&fields=photo_200&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                members = data.response;
                displayGroupMembers(members);
            }
        })
        .catch(error => console.error('Ошибка при получении данных пользователей: ', error));
}

// Функция для отображения участников группы
function displayGroupMembers(userIds) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = ""; 

    userIds.forEach(user => {
        const userElement = document.createElement('div');
        userElement.setAttribute('data-user-id', user.id);
        userElement.classList.add('user-element');

        const userName = document.createElement('p');
        userName.textContent = `${user.first_name} ${user.last_name}`;
        
        const userPhoto = document.createElement('img');
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
    const sortType = document.getElementById('sort-filter').value;

    if (sortType === 'name') {
        members.sort((a, b) => {
            const nameA = `${a.first_name} ${a.last_name}`;
            const nameB = `${b.first_name} ${b.last_name}`;
            return nameA.localeCompare(nameB);
        });
    } else if (sortType === 'id') {
        members.sort((a, b) => a.id - b.id);
    }

    displayGroupMembers(members);
}

// Вызов функций при загрузке страницы
getGroupInfo();
getGroupMembers();
