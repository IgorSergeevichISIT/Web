import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,status&${this.commonInfo}`;
    }

    getUserInfo2(userId) {
        return `http://127.0.0.1:8000/get-userInfo?userId=${userId}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}&filter=friends`
    } 

    getGroupMembers2(groupId) {
        return `http://127.0.0.1:8000/get-members/`
    } 
}
export const urls = new Urls()
