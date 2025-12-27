// modules/urls.js
import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,photo_200,photo_100,city,bdate,sex,photo_max_orig&${this.commonInfo}`;
    }

    getGroupMembers(groupId, sort = 'id_asc') {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig,photo_200,photo_100,city,bdate&sort=${sort}&${this.commonInfo}`;
    }
}

// ОБЯЗАТЕЛЬНО экспортируем!
export const urls = new Urls();