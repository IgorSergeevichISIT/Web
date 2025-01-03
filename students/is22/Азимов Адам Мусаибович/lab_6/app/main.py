from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel

import json

with open('app/asd.json', 'r', encoding='utf-8') as file:
    members = json.load(file)  
app = FastAPI()

# print(members.get("response").get("items"))
for user in members.get("response").get("items"):
    if user.get("id") == 32551726:
        print(user)

@app.post("/get-members")
async def get_members():
    return members

@app.post("/get-userInfo")
async def get_user_info(userId: str):
    print(userId)
    for user in members.get("response").get("items"):
        print(user.get("id"),userId)
        print(user.get("id")==userId)
        if user.get("id") == int(userId):
            return {"response":[user]}
    return None
