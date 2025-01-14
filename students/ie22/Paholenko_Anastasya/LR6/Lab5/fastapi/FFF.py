from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

ACCESS_TOKEN = 'vk1.a.gEWFPThXOOulXQHhfR1vAzkT6GS9VwTMDX04RQZjC20KBszxqWmxuKky1-mfNombc2_VPUt3iHTq3rsBV2w7vH4HQTUatkuJ1MlcjckmewxP_wCSwZcnFMok7OiPYkUKdgr2OY6qp47NBojTvTmZfb5N9XenzM-dftiWq-xP7x4h5dcxEmMOCl1zGgTng38j5TZCXI1Qq_zNG8TrQT6Yjg'
VERSION = "5.131"


class MemberInfo(BaseModel):
    id: int
    first_name: str
    last_name: str
    photo_400_orig: str

    
    
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
