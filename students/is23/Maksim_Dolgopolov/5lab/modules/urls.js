import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_max,status,last_seen&${this.commonInfo}`
    }

    getGroupMembers(groupId, filter = 'friends') {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_max,status&filter=${filter}&${this.commonInfo}`
    }
}

export const urls = new Urls()