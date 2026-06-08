# Huawei Technical Test 1 Frontend

React frontend untuk Express REST API CRUD user.

## Menjalankan Dengan Docker Compose

Jalankan aplikasi backend dan frontend dengan satu command:

```bash
docker compose up --build
```

Frontend tersedia di:

```bash
http://localhost:3000
```

Backend tersedia di:

```bash
http://localhost:8888
```

## Environment

Frontend menggunakan base URL API dari environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8888
```

Compose juga mengatur environment backend:

```bash
APP_ENV=development
DEBUG=true
PORT=8888
FRONTEND_URL=http://localhost:3000
```

## Development Lokal

Install dependency:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

Pastikan backend berjalan di `http://localhost:8888`.
