import { accessToken, version } from "./consts";

class Urls {
  private url: string;
  private commonInfo: string;

  constructor() {
    this.url = "https://api.vk.com/method";
    this.commonInfo = `access_token=${accessToken}&v=${version}`;
  }

  getUserInfo(userId: string): string {
    return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`;
  }

  getGroupMembers(groupId: number, sort: string): string {
    return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}&sort=${sort}`;
  }
}

export const urls = new Urls();