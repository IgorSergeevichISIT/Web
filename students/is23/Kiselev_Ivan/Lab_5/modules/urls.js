import { accessToken, version } from './consts.js';

class Urls {
  constructor() {
    this.url = 'https://api.vk.com/method';
    this.commonInfo = `access_token=${accessToken}&v=${version}`;
  }
    getUserInfo(userId) {
      return `${this.url}/users.get?user_ids=${userId}&fields=photo_200,photo_max_orig&${this.commonInfo}`;
    }

    getGroupMembers(groupId, sort = 'id_asc') {
    return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_max_orig&sort=${sort}&${this.commonInfo}`;
    }

    getUsersByIds(userIds) {
      const ids = Array.isArray(userIds) ? userIds.join(',') : userIds;
      return `${this.url}/users.get?user_ids=${ids}&fields=photo_200,first_name,last_name&${this.commonInfo}`;
    }
    getGroupMembersIdsOnly(groupId, sort = 'id_asc') {
      return `${this.url}/groups.getMembers?group_id=${groupId}&sort=${sort}&${this.commonInfo}`;
    }
    getUserInfo(userId) {
      return `${this.url}/users.get?user_ids=${userId}&fields=photo_200,first_name,last_name,bdate,domain&${this.commonInfo}`;
    }
}

export const urls = new Urls();