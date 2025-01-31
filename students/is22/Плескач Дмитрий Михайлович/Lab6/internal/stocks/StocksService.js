const axios = require('axios');
const { accessToken, version } = require('../../modules/consts');

class StocksService {
    static async findMembers() {
        const response = await axios.get(`https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${accessToken}&v=${version}`);
        return response.data.response.items;
    }

    static async findChats() {
        const response = await axios.get(`https://api.vk.com/method/messages.getConversations?group_id=${groupId}&access_token=${accessToken}&v=${version}`);
        return response.data.response.items;
    }

    static async getUserInfo(userId) {
        const response = await axios.get(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_400_orig&access_token=${accessToken}&v=${version}`);
        return response.data.response[0];
    }
}

module.exports = { StocksService };
