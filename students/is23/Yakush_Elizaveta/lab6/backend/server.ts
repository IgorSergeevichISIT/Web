import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs/promises";
import { groupId, accessToken, version } from "./consts";

interface ReqAddUser {
    id: number;
    first_name: string;
    last_name: string;
    sex?: number;
}


interface User {
    id: number;
    "photo_200": "https://sun33-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200",
    first_name: string;
    last_name: string;
    sex?: number;
    "can_access_closed": true,
    "is_closed": false
}

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

app.get("/api/members", async (req: Request, res: Response) => {
    try {
        const refresh = String(req.query.refresh) === "true";
        console.log(refresh);
        let users: User[] = [];
        if (!refresh) {
            let usersData;
            try {
                usersData = await fs.readFile(USERS_FILE, "utf-8");
            } catch {
                usersData = "";
            }
            if (usersData.length > 0) {
                users = JSON.parse(usersData);
            }
            if (users.length > 0) {
                return res.json(users);
            }
        }

        // Если refresh=true или файл пустой — получаем данные из VK
        const url = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&fields=photo_200,sex&access_token=${accessToken}&v=${version}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(400).json(data.error);
        }

        await fs.writeFile(USERS_FILE, JSON.stringify(data.response.items, null, 2));
        res.json(data.response.items);
    } catch (err: any) {
        res.status(500);
    }
});


// ---------- Добавление пользователя ----------
app.post("/api/addUser", async (req: Request, res: Response) => {
    try {
        const reqUser: ReqAddUser = req.body;
        console.log(reqUser)
        const users: User[] = JSON.parse(await fs.readFile(USERS_FILE, "utf-8"));
        const newUser: User = {
            id: reqUser.id,
            photo_200: "https://sun33-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200",
            first_name: reqUser.first_name,
            last_name: reqUser.last_name,
            sex: reqUser.sex,
            can_access_closed: true,
            is_closed: false
        };
        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.json(newUser);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// ---------- Удаление пользователя ----------
app.post("/api/removeUser", async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        let users =JSON.parse(await fs.readFile(USERS_FILE, "utf-8"))
                .filter((u: User) => u.id !== userId);

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.json({ success: true });
    } catch (err: any) {
        res.status(500);
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
