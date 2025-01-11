from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

ACCESS_TOKEN = 'vk1.a.V8QmRxBlYk95c7Ab1b6Z1Wu9L96MAgE-IOshcds4QTvCacuq6g82CgOmA7Y1LEDAbAIuhPvhI3JJTAZPbo9uIDPT5UmpdazcQDJibuCXFlezzaLaBxA_r8ZlNg82GTm1em3z3RT2nziFCGDmdv25xyYD6_H5zA3HlNnYFP6M9PfiY4vqAYPHMe18YaEszW9SSjYJODQ_fejDICeddERqtA'
VERSION = "5.131"

class ChatInfo(BaseModel):
    id: int
    title: str

class MemberInfo(BaseModel):
    id: int
    first_name: str
    last_name: str
    photo_400_orig: str

@app.get("/chats/{group_id}")
async def get_chats(group_id: int):
    url = f"https://api.vk.com/method/messages.getConversations?group_id={group_id}&access_token={ACCESS_TOKEN}&v={VERSION}"
    response = requests.get(url)
    data = response.json()
    
    if 'response' in data and 'items' in data['response']:
        chats = []
        for item in data['response']['items']:
            if 'conversation' in item and 'chat_settings' in item['conversation']:
                chat_info = ChatInfo(
                    id=item['conversation']['peer']['id'],
                    title=item['conversation']['chat_settings']['title'] or "Без названия"
                )
                chats.append(chat_info)
        return chats
    else:
        return {"error": "Не удалось получить чаты"}

@app.get("/members/{group_id}")
async def get_members(group_id: int):
    url = f"https://api.vk.com/method/groups.getMembers?group_id={group_id}&fields=photo_400_orig&access_token={ACCESS_TOKEN}&v={VERSION}"
    response = requests.get(url)
    data = response.json()
    
    if 'response' in data and 'items' in data['response']:
        members = []
        for item in data['response']['items']:
            member_info = MemberInfo(
                id=item['id'],
                first_name=item['first_name'],
                last_name=item['last_name'],
                photo_400_orig=item['photo_400_orig']
            )
            members.append(member_info)
        return members
    else:
        return {"error": "Не удалось получить членов группы"}


@app.delete("/members/{member_id}")
async def delete_member(member_id: int):
    return {"message": f"Член с ID {member_id} удален"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

