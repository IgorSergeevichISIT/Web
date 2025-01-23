class Urls {
    getUserInfo2(userId) {
        return `http://127.0.0.1:8000/get-userInfo?userId=${userId}`
    }

    getGroupMembers2(groupId) {
        return `http://127.0.0.1:8000/get-members/`
    }
}
export const urls = new Urls()
