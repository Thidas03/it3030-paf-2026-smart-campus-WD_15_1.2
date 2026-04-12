# Smart Campus Operations Hub

Full-stack university system for managing campus facilities, bookings, maintenance tickets, and notifications.

### Tech Stack

- **Backend**: Spring Boot (Java 17), MongoDB, Spring Security, OAuth2 (Google), JWT
- **Frontend**: React (Vite), React Router, Context API, Axios, TailwindCSS
- **DevOps**: GitHub Actions CI, MongoDB service

### Modules

1. **Facilities & Assets** – Resource catalogue of campus assets.
2. **Booking Management** – Booking resources like rooms and labs.
3. **Maintenance & Incident Ticketing** – Create, assign, and resolve tickets.
4. **Notifications & Role Management** – User notifications and RBAC (USER, ADMIN, TECHNICIAN).

### Getting Started

#### Backend

```bash
cd backend
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure environment variables using `.env.example` in the project root.
