import { accessToken, version } from "./consts.js";

class Urls {
    private url: string;
    private commonInfo: string;
    private peerId: string | undefined;

    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
        this.peerId = (window as any).peerId;
    }

    getUserInfo(userId: number): string {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`;
    }

    getGroupMembers(groupId: number): string {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`;
    }

    getConversations(groupId: number): string {
        return `${this.url}/messages.getConversations?group_id=${groupId}&filter=all&fields=photo_400_orig&${this.commonInfo}`;
    }

    getConversationsById(peerId: number, groupId: number): string {
        return `${this.url}/messages.getConversationsById?peer_ids=${peerId}&group_id=${groupId}&filter=all&fields=photo_400_orig&${this.commonInfo}`;
    }
}

export const urls = new Urls();

