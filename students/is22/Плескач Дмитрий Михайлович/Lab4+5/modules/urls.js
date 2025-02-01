import { accessToken, version } from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`;
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`;
    }

    getUserStatus(userId) {
        return `${this.url}/status.get?user_id=${userId}&${this.commonInfo}`;
    }

    getChatInfo(chatId) {
        return `${this.url}/messages.getConversationsById?peer_ids=${chatId}&${this.commonInfo}`;
    }

    getGroupChats(groupId) {
        return `${this.url}/messages.getConversations?group_id=${groupId}&${this.commonInfo}`;
    }

    getChatMessages(chatId) {
        return `${this.url}/messages.getHistory?peer_id=${chatId}&${this.commonInfo}`;
    }


    getUserFriends(userId) {
        return `${this.url}/friends.get?user_id=${userId}&fields=photo_50,city&${this.commonInfo}`;
    }


    getWallPosts(ownerId, count = 10) {
        return `${this.url}/wall.get?owner_id=${ownerId}&count=${count}&${this.commonInfo}`;
    }

    sendMessage(peerId, message) {
        return `${this.url}/messages.send?peer_id=${peerId}&message=${encodeURIComponent(message)}&random_id=${Math.random()}&${this.commonInfo}`;
    }

    getPostComments(ownerId, postId, count = 10) {
        return `${this.url}/wall.getComments?owner_id=${ownerId}&post_id=${postId}&count=${count}&${this.commonInfo}`;
    }


    createChat(userIds, title) {
        return `${this.url}/messages.createChat?user_ids=${userIds.join(',')}&title=${encodeURIComponent(title)}&${this.commonInfo}`;
    }
    getGroupInfo(groupId) {
        return `${this.url}/groups.getById?group_id=${groupId}&fields=description,activity&${this.commonInfo}`;
    }
    
    

    addUsersToChat(chatId, userIds) {
        return `${this.url}/messages.addChatUser?chat_id=${chatId}&user_id=${userIds}&${this.commonInfo}`;
    }
}

export const urls = new Urls();
