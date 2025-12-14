const axios = require('axios');
const { groupId, accessToken, version } = require('../db/config');

class VKAPI {
    constructor() {
        this.baseURL = 'https://api.vk.com/method';
    }

    async getGroupMembers(sort = '') {
        try {
            let url = `${this.baseURL}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig,city,bdate,sex,online,last_seen&access_token=${accessToken}&v=${version}`;
            
            if (sort) {
                url += `&sort=${sort}`;
            }
            
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Ошибка VK API:', error.message);
            return { error: error.message };
        }
    }

    async getUserInfo(userId) {
        try {
            const url = `${this.baseURL}/users.get?user_ids=${userId}&fields=photo_400_orig,city,bdate,sex,online,last_seen,counters,personal&access_token=${accessToken}&v=${version}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Ошибка VK API:', error.message);
            return { error: error.message };
        }
    }
}

module.exports = {
    VKAPI,
};