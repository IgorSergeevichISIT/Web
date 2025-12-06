// modules/urls.js
import { accessToken, version } from "./consts.js";

export const buildVkUrl = (method, params = {}) => {
    const url = `https://api.vk.com/method/${method}`;
    const defaultParams = {
        access_token: accessToken,
        v: version,
        ...params
    };
    return { url, params: defaultParams };
};

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
    }

    getGroupMembersUrl(groupId) {
        return `${this.url}/groups.getMembers`;
    }

    getUserInfoUrl(userId) {
        return `${this.url}/users.get`;
    }

    getGroupMembersParams(groupId) {
        return {
            group_id: groupId,
            fields: 'photo_400,city,country,sex,bdate,status,followers_count,verified,online',
            access_token: accessToken,
            v: version
        };
    }

    getUserInfoParams(userId) {
        return {
            user_ids: userId,
            fields: 'photo_400,city,country,sex,bdate,status,followers_count,verified,online',
            access_token: accessToken,
            v: version
        };
    }
}

export const urls = new Urls();