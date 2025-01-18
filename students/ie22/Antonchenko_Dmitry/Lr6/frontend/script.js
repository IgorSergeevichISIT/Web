let members = []; // Список участников

// Функция для получения информации о группе
function getGroupInfo() {
    const token = 'vk1.a.aPmxVuW2EWXUEFKitEUg6c9QhKd_sVHxAU7LIx1ahNlvaKsNgsZqQMGtjxG2UaTNxg9gSO1Yl7-vjPI9zJ9aiQqaSlLIK6Y4gb3jdg9L4YkZ9nHrcvofFDyhrodek4fiaZxvf7_T2mu0HxJe3m1DPLli0D0d7e3Ii4z-0wbC2WmPYLTbGaY8vDcDQT0stEZw4kurym5rnKSYZh6_xwWesA'; // Замените на ваш токен
    const groupId = '228855264'; // Замените на ваш ID группы
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
    fetch('http://127.0.0.1:8000/members')  // Отправка GET запроса на сервер
        .then(response => response.json())
        .then(data => {
            members = data;
            displayGroupMembers(members); // Обновляем отображение
        })
        .catch(error => console.error('Ошибка при получении участников: ', error));
}

// Функция для отображения участников группы
function displayGroupMembers(userIds) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = ""; // Очищаем список перед новым выводом

    userIds.forEach(user => {
        const userElement = document.createElement('div');
        userElement.setAttribute('data-user-id', user.id);
        userElement.classList.add('user-element');

        const userName = document.createElement('p');
        userName.textContent = `${user.first_name} ${user.last_name}`;
        
        const userPhoto = document.createElement('img');
        userPhoto.src = user.photo_200;

        // Кнопка для удаления участника
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();  // Остановить всплытие события
            deleteMember(user.id);  // Отправка запроса на удаление
        });

        userElement.appendChild(userPhoto);
        userElement.appendChild(userName);
        userElement.appendChild(deleteButton);

        userElement.addEventListener('click', function() {
            window.location.href = `user-details.html?id=${user.id}`;
        });

        userInfoDiv.appendChild(userElement);
    });
}

// Функция для добавления нового участника
document.getElementById('add-member-button').addEventListener('click', () => {
    const newMember = {
        id: Math.floor(Math.random() * 10000),  // Просто для примера
        first_name: "Новый",
        last_name: "Участник",
        photo_200: "https://via.placeholder.com/200"
    };

    fetch('http://127.0.0.1:8000/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Участник добавлен:', data);
        getGroupMembers();  // Обновить список участников
    })
    .catch(error => console.error('Ошибка при добавлении участника:', error));
});

// Функция для удаления участника
function deleteMember(userId) {
    fetch(`http://127.0.0.1:8000/members/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Участник удален:', data);
        getGroupMembers();  // Обновить список участников
    })
    .catch(error => console.error('Ошибка при удалении участника:', error));
}

// Вызов функций при загрузке страницы
getGroupInfo();
getGroupMembers();
