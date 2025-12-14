import { accessToken, version } from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

   getGroupMembers(groupId) {
    return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400&${this.commonInfo}`;
}


getUserInfo(userId) {
    const fields = [
        'photo_400',
        'city',
        'country',
        'verified',
        'sex',
        'bdate', 
        'status',
        'online',
        'last_seen',
        'followers_count',
        'home_town',
        'screen_name' 
    ].join(',');
    return `${this.url}/users.get?user_ids=${userId}&fields=${fields}&${this.commonInfo}`;
}
}

export const urls = new Urls();