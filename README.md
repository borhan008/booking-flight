# ✈️ FlyBook – Flight Booking App

**FlyBook** is a modern flight booking web application built with **Next.js**, providing features for users to explore, book, and manage flights. Admin users can create, update, and delete bookings with route-level protection.

## 🌐 Live Demo

🔗 [https://booking-flight-uuqr.vercel.app/](https://booking-flight-uuqr.vercel.app/)

## 🧰 Tech Stack

- **Next.js 15+** (App Router)
- **React Hook Form** – Form handling
- **Tailwind CSS** – Styling
- **React Toastify** – Notifications
- **Vercel** – Deployment

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── book/
│   │   └── flights/
│   │       ├── add/
│   │       ├── update/
│   │       └── page.tsx
│   ├── book/
│   ├── components/
│   │   ├── header.tsx
│   │   ├── heading.tsx
│   │   └── singleFlight.tsx
│   ├── flights/
│   ├── login/
│   └── register/
├── utils/
│   ├── AuthProvider.tsx
│   ├── types.ts
│   └── utils.ts
├── favicon.ico
├── globals.css
├── layout.tsx
├── loading.js
├── page.tsx
└── middleware.ts
```

## 🚀 Features

### 🧑‍💼 Authentication

- User Registration
- User Login
- Auth state via context
- Token-based route protection

### ✈️ Flights

- Get all flights from API
- Filter flights by origin/destination
- View flight details

### 🧾 Booking

- Book available seats
- Selecting seats
- 2 minutes reservation lock
- Confirm booking view

### 🛠️ Admin Panel

- Create new flights
- Update flights
- Manage all bookings

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/borhan008/booking-flight

# Navigate into the project
cd flybook

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📌 API Server

- The API [https://flight-server-six.vercel.app/](https://flight-server-six.vercel.app/)
- The API [documentation](https://documenter.getpostman.com/view/18671311/2sAYBYfAGi#64ebab8d-7177-4781-9b73-22379d9cafa6)

## 📄 License

This project is licensed under the MIT License.
