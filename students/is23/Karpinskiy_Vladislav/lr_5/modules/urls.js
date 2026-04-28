import {accessToken, version} from "/Web-lab/lr_5/modules/consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getGroupMembers(groupId, filter = 'friends') {
        return `${this.url}/groups.getMembers?group_id=${groupId}&filter=${filter}&fields=photo_400_orig&${this.commonInfo}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }
}

export const urls = new Urls()