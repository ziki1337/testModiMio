### Начало работы

## 1 Установка проекта

```
git clone https://github.com/ziki1337/testModiMio.git
npm i
docker-compose up -d
```
Открываем другой терминал

```
npm run start
```

## 2 Работа с роутами

# Регистрация пользователя

```
POST http://localhost:3000/auth/register

json:
{
  "login": "newuser4",
  "email": "newuser4@example.com",
  "password": "password123"
}
```

Получаем ответ:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoibmV3dXNlcjRAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDYwODAwOSwiZXhwIjoxNzM0NjExNjA5fQ.-4HR5nDnn7hRgOMo-Dc4twgERa9jwbqxfl1HMGSGvMg"
}
```

# Логин пользователя

```
POST http://localhost:3000/auth/login

json:
{
  "login": "newuser4",
  "password": "password123"
}
```

Получаем ответ:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoibmV3dXNlcjRAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDYwODAwOSwiZXhwIjoxNzM0NjExNjA5fQ.-4HR5nDnn7hRgOMo-Dc4twgERa9jwbqxfl1HMGSGvMg"
}
```

# Профиль пользователя

```
GET http://localhost:3000/profile

Authorization - Bearer Token
Вставляем токен, полученный ранее
```

# ЛогАут пользователя

```
POST http://localhost:3000/auth/user/logout

Authorization - Bearer Token
Вставляем токен, полученный ранее
```

# Логин администратора

```
POST http://localhost:3000/admin/login

json:
{
  "email": "myEmail@gmail.com",
  "password": "123456789"
}
```

Получаем ответ:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoibmV3dXNlcjRAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDYwODAwOSwiZXhwIjoxNzM0NjExNjA5fQ.-4HR5nDnn7hRgOMo-Dc4twgERa9jwbqxfl1HMGSGvMg"
}
```

# Просмотр пользователей для админов

```
POST http://localhost:3000/admin/protected?page=1&limit=10

Authorization - Bearer Token
Вставляем токен, полученный ранее
```

# ЛогАут администратора

```
POST http://localhost:3000/auth/admin/logout

Authorization - Bearer Token
Вставляем токен, полученный ранее
```

## 3 Регистрация администратора

Открываем новый терминал и прописываем:
```
npm run register-admin
```
Вводим email и пароль.

### Готово, вы прекрасны!