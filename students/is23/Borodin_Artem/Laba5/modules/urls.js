import { ACCESS_TOKEN, API_VERSION } from './consts.js';

class Urls {
    constructor() {
        this.baseUrl = 'https://api.vk.com/method/';
        
        this.commonParams = `access_token=${ACCESS_TOKEN}&v=${API_VERSION}`;
    }

    /**
     * Получить членов группы с опциональной фильтрацией
     * @param {string} groupId - ID группы
     * @param {string} filter - фильтр (friends, unsure, managers, donut, invites)
     * @returns {string} - готовый URL для запроса
     */
    getGroupMembers(groupId, filter = '') {
        let url = `${this.baseUrl}groups.getMembers?group_id=${groupId}&fields=photo_400_orig,photo_200_orig,photo_100,photo_50`;
        if (filter) {
            url += `&filter=${filter}`;
        }
        
        url += `&${this.commonParams}`;
        
        return url; 
    }

    /**
     * Получить информацию о пользователе
     * @param {number} userId - ID пользователя
     * @returns {string} - готовый URL для запроса
     */
    getUserInfo(userId) {
        const url = `${this.baseUrl}users.get?user_ids=${userId}&fields=photo_max,photo_200_orig,photo_100,bdate,city,about&${this.commonParams}`;
        return url;
    }
}

export const urls = new Urls();
