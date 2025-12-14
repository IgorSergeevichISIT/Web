import { accessToken, version } from "./consts.js";

// DRY: Вместо того чтобы писать полные URL в каждом месте кода, мы создаем централизованный класс,
// который генерирует URL. Если изменится структура URL, нужно будет поменять только в одном месте.

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId) {
        const fields = [
            'photo_400_orig',
            'city',
            'bdate',
            'sex',
            'relation',
            'online',
            'last_seen',
            'counters',
            'personal'    
        ].join(',');
        
        return `${this.url}/users.get?user_ids=${userId}&fields=${fields}&${this.commonInfo}`;
    }

    getGroupMembers(groupId, sort = '') {
        let url = `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`;

        if (sort) {
            url += `&sort=${sort}`;
        }
        
        return url;
    }
}

export const urls = new Urls();


// OCP (Open/Closed Principle): Можно легко добавить новые методы без изменения существующих class Urls. Класс открыт для расширения (добавления новых методов),
// но закрыт для модификации (существующие методы не меняются)
    //getFriends(userId) {
        //return `${this.url}/friends.get?user_id=${userId}&${this.commonInfo}`;
    //}
    
    //getWallPosts(ownerId) {
       // return `${this.url}/wall.get?owner_id=${ownerId}&${this.commonInfo}`;
    //}