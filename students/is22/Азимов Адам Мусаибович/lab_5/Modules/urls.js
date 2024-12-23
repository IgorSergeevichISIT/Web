import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId, sortType) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&sort=${sortType}&fields=photo_400_orig&${this.commonInfo}`
    }
}

export const urls = new Urls()