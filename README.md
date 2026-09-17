# TechByte — Tech Store Demo

TechByte is a small full-stack portfolio project: a Next.js storefront that displays products from a Django REST Framework API backed by PostgreSQL. It was built collaboratively by two beginner developers and then cleaned up into a reproducible local-development project.

## Features

- Product catalogue, detail pages, and product variants in the frontend.
- Product list/detail API plus create, update, and delete endpoints.
- User registration, JWT login, profile endpoint, and authenticated cart API.
- Server-side validation: a product variant price cannot be negative.
- Django admin interface for reviewing and searching products.
- Docker Compose environment with PostgreSQL, backend, and frontend.
- Automated CI checks for backend tests, Ruff, frontend lint, frontend build, and Docker images.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Python 3.12, Django 6, Django REST Framework |
| Database | PostgreSQL 16 |
| Quality | Django test runner, Ruff, ESLint |
| Infrastructure | Docker, Docker Compose, GitHub Actions |

## Architecture

```text
Browser
  |
  v
Next.js frontend (:3000)  -->  Django REST API (:8000)  -->  PostgreSQL
```

When running with Docker, the frontend calls the backend by the internal service name `backend`; the backend connects to the database by the internal service name `postgres`.

## Run with Docker

Prerequisites: Docker Desktop with Docker Compose.

1. Create a local backend environment file:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

2. Replace the example values in `backend/.env`, especially `SECRET_KEY` and `POSTGRES_PASSWORD`.

3. Build and start the project:

   ```powershell
   docker compose up --build
   ```

The services will be available at:

- Frontend: <http://localhost:3000>
- API: <http://localhost:8000/api/products/>
- PostgreSQL from the host: `localhost:5433`

The backend container applies Django migrations on startup. To load the included demo catalogue, run in a second terminal:

```powershell
docker compose exec backend python manage.py loaddata products
```

Stop the stack with `docker compose down`. PostgreSQL data is kept in the named `postgres_data` volume.

## Local development without Docker

### Backend

Prerequisites: Python 3.12 and a reachable PostgreSQL instance.

```powershell
Copy-Item backend/.env.example backend/.env
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata products
python manage.py runserver
```

`backend/.env.example` is configured for connecting from the host to the PostgreSQL container exposed by Docker Compose on port `5433`. If you use a standalone local PostgreSQL server, set `POSTGRES_PORT=5432` in `backend/.env` instead.

### Frontend

Prerequisites: Node.js 20 or later and a running backend API.

```powershell
Copy-Item frontend/.env.example frontend/.env
cd frontend
npm ci
npm run dev
```

`frontend/.env` contains `BACKEND_API_URL`. For local development it defaults to `http://localhost:8000`; Docker Compose supplies `http://backend:8000` inside the frontend container.

## Environment variables

Use the templates as a starting point; do not commit the created `.env` files.

| Variable | Used by | Purpose |
| --- | --- | --- |
| `SECRET_KEY` | backend | Django secret key. Generate a unique value locally. |
| `DEBUG` | backend | Django debug mode (`True` or `False`). |
| `ALLOWED_HOSTS` | backend | Comma-separated Django host allowlist. |
| `POSTGRES_DB` | backend, PostgreSQL | Database name. |
| `POSTGRES_USER` | backend, PostgreSQL | Database user. |
| `POSTGRES_PASSWORD` | backend, PostgreSQL | Database password. |
| `POSTGRES_HOST` | backend | `localhost` on the host; `postgres` inside Compose. |
| `POSTGRES_PORT` | backend | `5433` for the Compose database from the host; `5432` between containers. |
| `BACKEND_API_URL` | frontend | Internal URL used by Next.js server components. |
| `NEXT_PUBLIC_BACKEND_API_URL` | frontend | Browser-reachable URL used by client components. |

## Migrations and demo data

Apply migrations with:

```powershell
cd backend
python manage.py migrate
```

The repository includes a small fictional product fixture at `backend/products/fixtures/products.json`. It contains no real user data and can be loaded with:

```powershell
python manage.py loaddata products
```

## API

Base URL: `http://localhost:8000/api/`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products/` | Return the product list. |
| `POST` | `/api/products/` | Create a product. Returns `201 Created` on success and `400 Bad Request` for invalid data. |
| `GET` | `/api/products/{id}/` | Return a product with its variants. |
| `PUT`, `DELETE` | `/api/products/{id}/` | Update or delete a product. |
| `POST` | `/api/users/register/` | Register a user. |
| `GET`, `PUT` | `/api/users/me/` | Read or update the authenticated user profile. |
| `POST` | `/api/token/`, `/api/token/refresh/` | Obtain or refresh JWT tokens. |
| `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | `/api/cart/items/` | Manage the authenticated user's cart. |

Example request body:

```json
{
  "name": "Demo mouse",
  "description": "A product created through the API."
}
```

Product responses expose `id`, `name`, `description`, computed `price` and `image`, `variants`, and `created_at`. Price, image, stock, and color belong to a product variant. The current product write endpoints are public, so they should be protected before production deployment.

The Django admin is available at `/admin/`. Create an administrator locally if needed:

```powershell
cd backend
python manage.py createsuperuser
```

## Quality checks

Backend:

```powershell
cd backend
python manage.py test
ruff check .
```

Frontend:

```powershell
cd frontend
npm run lint
npm run build
npm audit --omit=dev
```

Docker configuration and images:

```powershell
docker compose config --quiet
docker compose build
```

## CI

GitHub Actions runs on pushes and pull requests. The workflow checks Django tests and Ruff against a PostgreSQL service, then runs `npm ci`, frontend lint/build, and Docker image builds. See `.github/workflows/ci.yml`.

## Current MVP limitations

- Product write endpoints are public; role-based product management is not implemented.
- The frontend does not yet connect its cart, order, or profile UI to every available backend capability.
- Orders, payments, categories, filtering, pagination, search, and checkout are not implemented.
- Dockerfiles run development servers and are intended for local development, not production deployment.
- Demo images are loaded from external image hosts, so their availability is outside this project’s control.
- Frontend automated tests and deployment configuration have not yet been added.

## Roadmap

- Restrict product management to authorised roles.
- Connect the frontend cart and order flow to the backend.
- Add checkout, pagination, filtering, and search.
- Add frontend component/integration tests and deployment configuration.

## Contributors

Created collaboratively by Alex and Max.
