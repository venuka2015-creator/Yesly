# DateMe — Dating Request MVP

Production-oriented starter app with:
- React + Vite frontend
- Spring Boot 3 + Java 21 backend
- MySQL + Flyway
- JWT authentication for senders
- Secure random public request tokens
- Five main screens: Landing, Create Request, Request Created, Recipient, Dashboard
- YES/NO interaction with escalating funny messages
- Server-side response persistence
- CORS, validation, BCrypt password hashing

## Run backend
1. Create MySQL database: `CREATE DATABASE dating_request;`
2. Copy `backend/.env.example` values into environment variables (or configure application.yml).
3. From `backend`: `mvn spring-boot:run`

Backend runs on `http://localhost:8080`.

## Run frontend
From `frontend`:
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Production notes
- Set a strong `JWT_SECRET` (at least 32 random bytes/base64).
- Set `APP_FRONTEND_URL` to your real HTTPS frontend URL.
- Use HTTPS and a managed MySQL database.
- Put the backend behind a reverse proxy/API gateway and configure restrictive CORS.
- Add an email/SMS provider later if you want instant sender notifications.
