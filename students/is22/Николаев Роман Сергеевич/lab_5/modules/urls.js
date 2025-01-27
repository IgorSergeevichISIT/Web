const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const version = import.meta.env.VITE_API_VERSION;

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId, filter = '') {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}&filter=${filter}`
    }
}

export const urls = new Urls()