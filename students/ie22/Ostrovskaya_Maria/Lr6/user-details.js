// Получение параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function getUserDetails(userId) {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';

    const apiUrl = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=city,sex,bdate,status,home_town&access_token=${token}&v=5.131`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                const user = data.response[0];
                
                const userDetailsDiv = document.getElementById('user-details');
                userDetailsDiv.innerHTML = `
                    <h3>Подробности о пользователе:</h3>
                    <p>Имя: ${user.first_name} ${user.last_name}</p>
                    <p>Пол: ${user.sex === 1 ? 'Женский' : 'Мужской'}</p>
                    <p>Город: ${user.city ? user.city.title : 'Не указан'}</p>
                    <p>Дата рождения: ${user.bdate || 'Не указана'}</p>
                    <p>Статус: ${user.status || 'Не указан'}</p>
                    <p>Родной город: ${user.home_town || 'Не указан'}</p>
                `;
            }
        })
        .catch(error => console.error('Ошибка при получении данных о пользователе: ', error));
}

getUserDetails(userId); // Запуск функции при загрузке страницы
