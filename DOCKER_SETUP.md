# Docker Setup Guide - Auth Services

## 📋 Overview

This guide covers how to build, run, and manage the Auth Services application using Docker. The setup includes:
- Express.js backend application
- PostgreSQL database
- Docker Compose orchestration
- Health checks and auto-restart policies
- Development and production configurations

---

## 🚀 Quick Start

### Prerequisites
- Docker (v20.10+)
- Docker Compose (v2.0+)

### Setup & Run

1. **Clone environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Build and start containers:**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations:**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

4. **Verify services are running:**
   ```bash
   docker-compose ps
   ```

5. **Access the application:**
   - API: `http://localhost:5000`
   - Health Check: `http://localhost:5000/health`
   - API Docs: `http://localhost:5000/api/docs`

---

## 📝 Common Docker Commands

### Start Services
```bash
# Start in background (detached mode)
docker-compose up -d

# Start with live logs
docker-compose up

# Rebuild images and start
docker-compose up -d --build
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: data loss)
docker-compose down -v
```

### View Logs
```bash
# View all service logs
docker-compose logs -f

# View app logs only
docker-compose logs -f app

# View database logs
docker-compose logs -f postgres

# View last 100 lines
docker-compose logs --tail=100
```

### Execute Commands Inside Container
```bash
# Run Prisma commands
docker-compose exec app npx prisma migrate dev
docker-compose exec app npx prisma studio

# Run tests
docker-compose exec app npm test
docker-compose exec app npm run test:coverage

# Run shell in container
docker-compose exec app sh
```

### Database Management
```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d auth_service_db

# View database tables
\dt

# Exit PostgreSQL
\q
```

---

## 🔧 Configuration

### Environment Variables (.env)

Key variables to configure:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | production | Application environment |
| `APP_PORT` | 5000 | Application port |
| `DB_USER` | postgres | Database username |
| `DB_PASSWORD` | postgres | Database password |
| `DB_NAME` | auth_service_db | Database name |
| `JWT_SECRET` | dev-secret | JWT signing secret |
| `JWT_EXPIRES_IN` | 1h | JWT token expiration |

**⚠️ Security Note:** Change `DB_PASSWORD` and `JWT_SECRET` in production!

---

## 🐳 Dockerfile Explanation

The Dockerfile uses **multi-stage build** for optimization:

```
Build Stage:
├─ Base: node:22-alpine
├─ Install dependencies
└─ Build TypeScript → dist/

Production Stage:
├─ Base: node:22-alpine (fresh, smaller image)
├─ Copy only built dist/ and node_modules
├─ Run as non-root user (security)
├─ Add health checks
└─ Use dumb-init for signal handling
```

**Benefits:**
- ✅ Smaller final image size
- ✅ Faster builds (layer caching)
- ✅ Secure (non-root user)
- ✅ Production-ready

---

## 🏥 Health Checks

Both services have health checks enabled:

### Application Health Check
- **Endpoint:** `GET /health`
- **Interval:** 30 seconds
- **Timeout:** 10 seconds
- **Start Period:** 10 seconds
- **Retries:** 3

### Database Health Check
- **Command:** `pg_isready`
- **Interval:** 10 seconds
- **Timeout:** 5 seconds
- **Retries:** 5

View health status:
```bash
docker-compose ps
```

---

## 📊 Services Architecture

```
┌─────────────────────────────────────────┐
│      Docker Compose Network             │
│      (auth-network - bridge)            │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
    ┌───▼────┐          ┌────▼────┐
    │   App   │◄────────┤ Postgres │
    │ :5000  │ TCP:5432 │  :5432   │
    └────┬───┘          └────┬─────┘
         │                   │
         │              postgres_data
         │              (named volume)
         │
    Mount: ./logs
```

---

## 🔐 Production Deployment

### Pre-Deployment Checklist

1. **Update .env variables:**
   ```bash
   # Use strong passwords
   DB_PASSWORD=<strong_random_password>
   JWT_SECRET=<32_char_random_string>
   ```

2. **Build optimized image:**
   ```bash
   docker build -t auth-service:1.0.0 .
   ```

3. **Run migrations:**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

4. **Enable SSL/TLS** (reverse proxy recommended)

5. **Set up backups:**
   ```bash
   # Backup database
   docker-compose exec postgres pg_dump -U postgres auth_service_db > backup.sql
   
   # Restore from backup
   docker-compose exec -T postgres psql -U postgres auth_service_db < backup.sql
   ```

### Recommended Production Setup

- Use environment-specific `.env` files
- Add reverse proxy (nginx/traefik)
- Enable Docker logging drivers (splunk, datadog, etc.)
- Set resource limits in docker-compose
- Use named volumes for persistence
- Implement container registry (Docker Hub, ECR, etc.)

---

## 🛠️ Troubleshooting

### Container fails to start
```bash
docker-compose logs app
```

### Database connection refused
```bash
# Check if postgres is healthy
docker-compose ps

# Restart services
docker-compose restart postgres app
```

### Port already in use
```bash
# Change port in .env or docker-compose.yml
APP_PORT=5001
```

### Permission denied (non-root user)
- Check file permissions in volumes
- Ensure `./logs` directory exists and is writable

### Out of disk space
```bash
# Clean up unused images/volumes
docker system prune -a
docker volume prune
```

---

## 📦 Advanced Features

### Custom Network
Services communicate via hostname (no localhost):
- App connects to: `postgresql://user:pass@postgres:5432/db`

### Volume Persistence
- **postgres_data:** Survives container recreation
- **./logs:** Mapped from host machine

### Restart Policy
- `unless-stopped` - Auto-restart except when explicitly stopped

---

## 🔄 Development Workflow

### Local Development (with hot reload)
```bash
npm run dev
```

### Docker Development
```bash
# Rebuild and restart with latest code
docker-compose up -d --build

# Watch logs
docker-compose logs -f app
```

### Run Tests in Docker
```bash
docker-compose exec app npm test
docker-compose exec app npm run test:coverage
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres/)

---

## ✅ Implementation Checklist

- [x] Dockerfile with multi-stage build
- [x] docker-compose.yml with database
- [x] Health checks for both services
- [x] Volume persistence for database
- [x] .env configuration
- [x] .dockerignore for build optimization
- [x] Non-root user for security
- [x] Proper signal handling (dumb-init)

---

**Last Updated:** 2026-06-15  
**Auth Services Version:** 1.0.0
