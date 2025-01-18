// Получение параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function getUserDetails(userId) {
    const token = 'vk1.a.aPmxVuW2EWXUEFKitEUg6c9QhKd_sVHxAU7LIx1ahNlvaKsNgsZqQMGtjxG2UaTNxg9gSO1Yl7-vjPI9zJ9aiQqaSlLIK6Y4gb3jdg9L4YkZ9nHrcvofFDyhrodek4fiaZxvf7_T2mu0HxJe3m1DPLli0D0d7e3Ii4z-0wbC2WmPYLTbGaY8vDcDQT0stEZw4kurym5rnKSYZh6_xwWesA';

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
