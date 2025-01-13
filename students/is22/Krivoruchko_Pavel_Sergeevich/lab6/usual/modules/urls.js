import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
        this.port=8000 //
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,sex,bdate,city&${this.commonInfo}`;
    }    

    getGroupMembers(groupId, sort) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}&sort=${sort}`
    }

    getLocalServer() //
    {
        return [`http://localhost:${this.port}`, this.port];
    }
}

export const urls = new Urls()
