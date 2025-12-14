import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,photo_200,photo_100,city,bdate,photo_max_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId, filter = null) {
        console.log('getGroupMembers вызван с параметрами:')
        console.log('- groupId:', groupId)
        console.log('- filter:', filter)
        
        // Начинаем формировать URL
        let url = `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig,photo_200,photo_100,photo_max_orig&${this.commonInfo}`;
        
        console.log('URL до фильтра:', url)
        
        // Поддерживаем только нужные фильтры
        const supportedFilters = ['friends', 'managers'];
        
        if (filter && filter !== 'all' && supportedFilters.includes(filter)) {
            url += `&filter=${filter}`;
            console.log('Добавлен фильтр:', filter)
        } else if (filter === 'all') {
            console.log('Фильтр "all" - не добавляем параметр filter')
        }
        
        console.log('Итоговый URL:', url)
        return url;
    }
}

export const urls = new Urls()