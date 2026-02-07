# Portfolio Platform 

This is a self-hosted portfolio platform designed to demonstrate **backend engineering** and **DevOps fundamentals**. Instead of focusing on frontend visuals, this project focuses on how real services are structured, configured, deployed, and operated.

The goal is to showcase production-style thinking at a small but realistic scale.

---

## 🚀 Why this project exists

Most portfolios emphasize UI and frameworks. This project intentionally emphasizes **systems thinking**.

It demonstrates:
- Backend API design
- Environment-driven configuration
- Containerized deployment
- Reverse proxy architecture
- Observability, health, and readiness signaling

Every architectural decision is deliberate and explainable.

---

## 🏗️ Architecture overview

The application is split into three main components:

### NGINX (Reverse Proxy)
- Serves the static frontend
- Acts as the **single public entry point**
- Proxies API requests to the backend
- Applies security headers and timeouts
- Blocks internal-only routes at the edge

### Backend (Node.js / Express)
- Provides portfolio and system APIs
- Uses modular controllers, services, and engines
- Implements request correlation IDs
- Exposes health and readiness endpoints
- Uses fail-fast environment configuration

### Frontend
- Simple static HTML/CSS/JS
- Served directly by NGINX
- Keeps focus on backend and infrastructure

### High-level flow

```
Internet
   |
   v
NGINX (Reverse Proxy)
   |        \
   |         --> Static Frontend
   |
   --> Backend API (Docker, internal network)
```

---

## 🔁 Request flow

1. A request enters through NGINX (single public URL)
2. NGINX applies security rules and routing
3. API requests are forwarded to the backend container
4. The backend assigns a request ID and logs timing
5. The response is returned through NGINX to the client

Each request can be traced end-to-end using the `X-Request-ID` header.

---

## ❤️ Health vs Readiness

The backend exposes two system endpoints with different responsibilities:

### `/api/system/health`
- Indicates that the process is running
- Performs no dependency checks
- Used for liveness monitoring

### `/api/system/ready`
- Indicates that the service can safely accept traffic
- Validates configuration and required dependencies
- Returns **503** if the service is not ready

This separation mirrors how production systems integrate with load balancers and orchestration platforms.

---

## ⚙️ Configuration strategy

Environment configuration is centralized and validated at startup:

- `.env` is loaded once during boot
- Required variables are validated in production mode
- The application fails fast if misconfigured
- Application code consumes a structured config object

This prevents silent runtime failures caused by missing or incorrect configuration.

---

## 🔐 Security & reliability practices

- Backend services are not directly exposed to the internet
- Internal APIs are blocked at the NGINX layer (defense in depth)
- Security headers are applied at the edge
- Conservative timeouts prevent resource exhaustion
- Request correlation IDs enable observability and debugging
- Rate limiting and payload validation are applied on public APIs

---

## 🔁 CI / DevOps Workflows

This repository uses **GitHub Actions** for continuous integration.

### Backend CI
- Runs on every push and pull request
- Installs dependencies using `npm ci`
- Verifies backend startup

### Docker Build Validation
- Builds backend and NGINX Docker images
- Fails early if Dockerfiles or paths are invalid
- No deployment or registry push (safe by design)

---

## 🧪 Running locally

Start the full stack using Docker:

```
docker compose up --build
```

The application will be available via a single entry point served by NGINX.

For local public testing, a temporary HTTPS URL can be created using **Cloudflare Tunnel**, without requiring a VPS.

---

## 🧠 Design Decisions

- No managed cloud services to avoid cost and vendor lock-in
- In-memory caching to protect GitHub API usage
- Lightweight observability instead of external monitoring tools
- CI-first approach before public deployment

---

## 📌 Future Improvements

- External metrics backend (Prometheus-style)
- Persistent storage for intent events
- Cloud deployment (VM or container platform)
- Authentication for admin endpoints

---

## 🎯 What this project demonstrates

This project demonstrates how a backend service can be built and deployed with **production-style thinking**, even at a small scale.

It focuses on:
- Correctness over complexity
- Observability over guesswork
- Clear separation of responsibilities
- Infrastructure-aware backend design

The emphasis is on building systems that are understandable, operable, and explainable — not just functional.

