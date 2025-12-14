import { accessToken, version } from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId) {
        const fields = [
            'photo_400_orig',
            'city',
            'bdate',
            'sex',
            'relation',
            'online',
            'last_seen',
            'counters',
            'personal'   
        ].join(',');
        
        return `${this.url}/users.get?user_ids=${userId}&fields=${fields}&${this.commonInfo}`;
    }

    getGroupMembers(groupId, sort = '') {
        let url = `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`;

        if (sort) {
            url += `&sort=${sort}`;
        }
        
        return url;
    }
}

export const urls = new Urls();