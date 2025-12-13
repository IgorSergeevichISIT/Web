import { API_BASE_URL } from './consts.js';

class Urls {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Получить членов группы с опциональной фильтрацией
   * @param {string} filter - фильтр (friends, unsure, managers, donut, invites)
   * @returns {string} - готовый URL для запроса
   */
  getGroupMembers(filter = 'all') {
    let url = `${this.baseUrl}/users`;
    if (filter && filter !== '') {
      url += `?filter=${filter}`;
    }
    return url;
  }

  /**
   * Получить информацию о пользователе
   * @param {number} userId - ID пользователя
   * @returns {string} - готовый URL для запроса
   */
  getUserInfo(userId) {
    return `${this.baseUrl}/users/${userId}`;
  }

  /**
   * Добавить нового пользователя
   * @returns {string} - готовый URL
   */
  addUser() {
    return `${this.baseUrl}/users`;
  }

  /**
   * Удалить пользователя
   * @param {number} userId - ID пользователя
   * @returns {string} - готовый URL
   */
  deleteUser(userId) {
    return `${this.baseUrl}/users/${userId}`;
  }
}

export const urls = new Urls();
