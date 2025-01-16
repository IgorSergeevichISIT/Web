"use strict";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
function getUserDetails(userId) {
    const token = 'vk1.a.DMbYC2lxDoIO0ERWbsLN6U752n1GGbanrElUv1ehb76o3WFkqE8gkjRk0JqPKSFO5fg4eXJrVAnxeTBCzWyyRSFNqNAi0UGcykbUNAe2xFLCGi4au43481uGahylVfhY2SABGBgFwmYJ-AOHDsvJ1jIu7K2yBMDvx3rnUGXaCji5zL06dwViJF1RRZbdYHklCvR47Fhu1pB0Q56l8gTm5Q';
    const apiUrl = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=city,sex,bdate,status,home_town&access_token=${token}&v=5.131`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response) {
                const user = response.response[0];
                const userDetailsDiv = document.getElementById('user-details');
                if (userDetailsDiv) {
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
            }
        }
    };
    xhr.send();
}
if (userId) {
    getUserDetails(userId);
}
