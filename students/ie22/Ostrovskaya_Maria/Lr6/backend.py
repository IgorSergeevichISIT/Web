from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Разрешение запросов с любого источника (из браузера)
origins = [
    "http://localhost",  # Если ваш фронтенд работает на localhost
    "http://localhost:8000",  # Для клиента, работающего на этом же порту
    "*",  # Разрешить запросы со всех источников
]

# Добавляем CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешаем доступ с указанных источников
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Модель пользователя
class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    photo_200: str

# Список участников
members = [
    User(id=1, first_name="Масик", last_name="Ананасик", photo_200="https://fotoblik.ru/wp-content/uploads/2023/09/faia-feeviun-2020-2.webp"),
    User(id=2, first_name="Какульчик", last_name="Васюльчик", photo_200="https://fotoblik.ru/wp-content/uploads/2023/09/devushka-v-girliande-4.webp")
]

# Получение списка участников
@app.get("/members", response_model=List[User])
def get_members():
    return members  

# Добавление участника
@app.post("/members", response_model=User)
def add_member(member: User):
    members.append(member)
    return member

# Удаление участника по ID
@app.delete("/members/{user_id}", response_model=User)
def delete_member(user_id: int):
    global members
    member_to_delete = next((member for member in members if member.id == user_id), None)
    if member_to_delete:
        members = [member for member in members if member.id != user_id]
        return member_to_delete
    return {"error": "Участник не найден"}
