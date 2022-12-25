### Используемые пакеты:

- **And Design Vue** - UI библиотека (https://1x.antdv.com/docs/vue/introduce/)
- **@nuxtjs/auth-next** - Пакет для каркаса аутентификации в приложении (https://auth.nuxtjs.org/)
- **@nuxtjs/proxy** - Для проксирования запросов с фронта на бэк (https://github.com/nuxt-community/proxy-module#readme)

### Установка проекта

Минимальные требования:

**NodeJS**: v16.17.0

**NPM**: 8.17.0

*На версиях ниже не тестировалось*

Установка зависимостей:
```shell
npm i
```

Создание файла `.env`
```shell
cp .env.example .env
```

Необходимо прописать в .env актуальный url бэкенда

```dotenv
BACKEND_URL=http://127.0.0.1:8000
```

Запуск проекта:
```shell
npm run dev
```
