import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getConversations(groupId) {
        return `${this.url}/messages.getConversations?group_id=${groupId}&filter=all&${this.commonInfo}`
    }    
    
    getConversationsById(peerId, groupId) {
        return `${this.url}/messages.getConversationsById?peer_ids=${peerId}&group_id=${groupId}&filter=all&fields=photo_400_orig&${this.commonInfo}`
    }
    
    deleteConversation(peerId, groupId) {
        return `${this.url}/messages.deleteConversation?peer_id=${peerId}&group_id=${groupId}&${this.commonInfo}`;
    }
}

export const urls = new Urls()

