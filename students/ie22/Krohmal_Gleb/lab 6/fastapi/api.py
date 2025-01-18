from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

ACCESS_TOKEN = 'vk1.a.YbJI7P33cyT-rDgbuCJQg0RhMKvkari_6P3wg9EvnFGpjlW5LgPC1yJsPwWV0hm827zyBACVTiAIaC6MnwxhlSJo_ZtQ0NUark7cH7d6Uvj6lmqTPgOc5k1oUMyDi7VKG9POBgHmgwDuYi-MS22NKl3XOi_TivXUCfxMxaM0xqJ7Jg8EoNLAxY2R_m8uplaPBzAUq5_T7xk9ev9KtB62AQ'
VERSION = "5.199"


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
