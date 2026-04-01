# IT Services & CCTV Business Website with Online Ticket System

A full-stack production-ready starter project for an IT Services and CCTV business website.

## Tech Stack
- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Architecture: MVC
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

## Project Structure

```text
it-cctv-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeders/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── public/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

### Public Website
- Home page with hero banner, support highlight, and CTA
- About page
- Services page
- Ticket generation form
- Ticket status tracking page
- Contact page with map embed and inquiry form
- Floating WhatsApp and Call Now buttons
- Responsive business UI

### Admin Panel
- Secure JWT login
- Dashboard stats
- View all tickets
- Filter tickets by status, service, search
- View single ticket
- Assign technician
- Update status
- Add notes/comments

## Backend API Endpoints

### Customer APIs
- `POST /api/customer/tickets`
- `POST /api/customer/tickets/status`
- `POST /api/customer/contact`

### Admin APIs
- `POST /api/admin/login`
- `GET /api/admin/dashboard/stats`
- `GET /api/admin/tickets`
- `GET /api/admin/tickets/:id`
- `PUT /api/admin/tickets/:id`

## MongoDB Models
- Admin
- Ticket
- ContactInquiry

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)

### 1) Install Dependencies
```bash
npm run install:all
```

### 2) Environment Setup
```bash
# Backend
cd backend
cp .env.example .env
# Update .env with your MongoDB URI and other settings

# Frontend (optional - uses proxy by default)
cd ../frontend
cp .env.example .env
```

### 3) Run Development Servers
```bash
# Start both backend and frontend simultaneously
npm run dev

# Or start individually:
npm run dev:backend  # Backend on http://localhost:3001
npm run dev:frontend # Frontend on http://localhost:5174 (or next available port)
```

### 4) Create Admin User
```bash
cd backend
npm run seed:admin
```

## Development URLs
- **Frontend**: http://localhost:5174 (or next available port)
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## Manual Setup Instructions

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Update `.env` values as needed.

Run backend:
```bash
npm run dev
```

Create admin user:
```bash
npm run seed:admin
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

Run frontend:
```bash
npm run dev
```

## Default Admin Credentials
After seeding with the example values:
- Email: `admin@example.com`
- Password: `Admin@123`

## Production Notes
- Replace example company details in `frontend/src/data/siteData.js`
- Replace the Google Maps embed URL with your actual office location
- Use a strong `JWT_SECRET`
- Add HTTPS, logging, monitoring, and email/SMS notifications for production deployment
- Add pagination and technician management if the ticket volume will be large

## Suggested Next Improvements
- Email notification on ticket creation
- SMS or WhatsApp notifications
- Technician user roles
- File upload for ticket images
- Ticket timeline activity log
- Pagination and export filters
