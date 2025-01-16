import { urls } from "../modules/urls.js"
import axios from "axios"
import { groupId, filterByAdmins, filterByFriends } from "../modules/consts.js"

class controller {
    async getAll(req, res){
        try {
            let response = await axios.get(urls.getGroupMembers(groupId, ""))
            res.send(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(req, res){
        try {
            const id = req.params.id
            let response = await axios.get(urls.getUserInfo(id))
            res.send(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async getAdmins(req, res){
        try {
            let response = await axios.get(urls.getGroupMembers(groupId, filterByAdmins))
            res.send(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async getFriends(req, res){
        try {
            let response = await axios.get(urls.getGroupMembers(groupId, filterByFriends))
            res.send(response.data)
        } catch (error) {
            console.log(error)
        }
    }
}
export default new controller()