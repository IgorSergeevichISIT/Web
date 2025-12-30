import { groupId, accessToken, version } from './consts.js';

class Urls {
    constructor() {
        // Используем наш локальный сервер для ВСЕХ запросов
        this.baseUrl = 'http://localhost:8000/api';
    }

    getUserInfo(userId) {
        // Используем наш эмуляцию VK API
        return `${this.baseUrl}/users.get?user_ids=${userId}`;
    }

    getGroupMembers(groupId, filter = null) {
        // Используем нашу эмуляцию VK API groups.getMembers
        let url = `${this.baseUrl}/groups.getMembers`;
        if (filter && filter !== 'all') {
            url += `?filter=${filter}`;
        }
        console.log('🌐 Используем локальный API:', url);
        return url;
    }
}

export const urls = new Urls();