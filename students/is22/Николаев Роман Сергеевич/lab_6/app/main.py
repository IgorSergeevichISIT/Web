from fastapi import FastAPI

import json

with open('app/data.json', 'r', encoding='utf-8') as file:
    members = json.load(file)  
app = FastAPI()

@app.post("/get-members")
async def get_members():
    return members

@app.post("/get-userInfo")
async def get_user_info(userId: str):
    # print(userId)
    for user in members.get("response").get("items"):
        if user.get("id") == int(userId):
            return {"response":[user]}
    return None
