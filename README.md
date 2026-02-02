DevOps Portfolio Platform



A self-hosted, production-style portfolio platform designed to demonstrate

DevOps fundamentals such as reverse proxying, CI pipelines, containerization,

observability, and API hardening.



This project focuses on \*\*correct architecture and automation\*\*, not just UI.



---



\## 🚀 **Features**



\- NGINX reverse proxy serving frontend and routing API traffic

\- Node.js backend with modular route and service design

\- Dynamic GitHub repository analysis (activity, health, metadata)

\- Built-in observability (uptime, request count, cache metrics)

\- Rate limiting and payload validation on public APIs

\- Monorepo structure (frontend + backend)

\- CI pipelines with GitHub Actions

\- Docker build validation in CI (cloud-ready)



---



\## 🧱 **Architecture**



Browser

↓

NGINX

├── Static Frontend

└── /api → Node.js Backend

├── System health \& stats

├── Portfolio (GitHub API)

├── Intent \& contact tracking

└── Observability + hardening



NGINX acts as a reverse proxy and static file server.

The backend exposes internal health and metrics endpoints and integrates with

the GitHub REST API.



---



\## 🔁 **CI / DevOps Workflows**



This repository uses \*\*GitHub Actions\*\* for continuous integration:



\### **Backend CI**

\- Runs on every push and pull request

\- Installs dependencies using `npm ci`

\- Verifies backend startup



\### **Docker Build Validation**

\- Builds backend and NGINX Docker images

\- Fails early if Dockerfiles or paths are invalid

\- No deployment or registry push (safe by design)



---



▶ **Running Locally (Without Docker)**



```bash

cd portfolio-backend

npm install

npm start



NGINX can be run separately to serve the frontend and proxy API traffic.



🐳 **Running with Docker**



docker compose up --build



This starts:



Backend API service



NGINX reverse proxy + frontend





🧠 Design Decisions



* No managed cloud services to avoid cost and vendor lock-in



* In-memory caching to protect GitHub API usage



* Lightweight observability instead of external monitoring tools



* CI-first approach before public deployment







📌 Future Improvements



* External metrics backend (Prometheus-style)



* Persistent storage for intent events



* Cloud deployment (VM or container platform)



* Authentication for admin endpoints
