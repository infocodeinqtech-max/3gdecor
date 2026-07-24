# 3G Decorative Group

Monorepo layout:

```
3gdeco/
  frontend/   → React + Vite website & admin UI
  backend/    → Laravel API (auth + admin + CMS)
```

## Database

- Name: `3gdeco`
- MySQL: `127.0.0.1:3306`, user `root`, empty password

## Backend (Laravel)

```bash
cd backend
php artisan serve
```

API base: `http://127.0.0.1:8000/api`

### Seeded admin logins

| Role        | Email              | Password   |
|-------------|--------------------|------------|
| Super Admin | super@3gdeco.com   | ENV_SUPER_PASSWORD  |
| Admin       | admin@3gdeco.com   | ENV_ADMIN_PASSWORD  |

### Main API routes

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/login` | public |
| POST | `/auth/logout` | token |
| GET | `/auth/me` | token |
| GET | `/dashboard` | token |
| GET/PUT | `/cms/{key}` | GET public / PUT token |
| GET/POST | `/enquiries` | GET token / POST public |
| CRUD | `/admin/users` | superadmin |

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Set API URL in `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8000/api
```
