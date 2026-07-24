# 3G Deco Backend (Laravel)

Simple API for admin login and dashboard CMS.

## Setup

1. MySQL database `3gdeco` must exist (already configured in `.env`).
2. Install deps (already done if you used composer create-project).
3. Migrate + seed:

```bash
php artisan migrate:fresh --seed
php artisan serve
```

## Tables

| Table | Purpose |
|-------|---------|
| `users` | Admin accounts (role, permissions, password) |
| `personal_access_tokens` | Sanctum API tokens |
| `cms_contents` | Website CMS JSON by key (`hero`, `about`, …) |
| `enquiries` | Contact form submissions |
| `sessions` / `cache` / `jobs` | Laravel defaults |

## Flow

1. Frontend `POST /api/auth/login` with email + password (+ optional role).
2. Backend returns Sanctum token + user.
3. Frontend sends `Authorization: Bearer {token}` on admin API calls.
4. CMS pages can `PUT /api/cms/{key}` with JSON body `{ "data": ... }`.

## Default users

- `super@3gdeco.com` / `ENV_SUPER_PASSWORD` (superadmin)
- `admin@3gdeco.com` / `ENV_ADMIN_PASSWORD` (admin)
