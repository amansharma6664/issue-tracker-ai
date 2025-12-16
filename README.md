# Issue & Feedback Tracker

A full-stack Issue & Feedback Tracker application built using **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB**.  
The platform allows users to securely manage issues with full CRUD functionality and generate **AI-powered issue summaries**.

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- JWT-based protected routes
- Create, Read, Update & Delete issues
- AI-powered issue summary generation using OpenAI
- Responsive and modern SaaS-style UI
- MongoDB database integration
- Global footer across all pages

---

## 🛠 Tech Stack

- **Frontend:** Next.js 16, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Authentication:** JWT
- **AI Integration:** OpenAI API

---

## 📂 Project Structure

src/
├── app/
│ ├── api/
│ ├── login/
│ ├── register/
│ ├── dashboard/
│ ├── layout.tsx
│ └── page.tsx
├── components/
├── lib/
├── models/
└── middleware.ts


---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

Getting Started

Clone the repository

git clone https://github.com/amansharma6664/issue-tracker-ai.git


Install dependencies

npm install


Run the development server

npm run dev


Open in browser

http://localhost:3000

🤖 AI Summary Feature

Users can paste an issue description and generate a concise, professional summary using OpenAI’s language model.
If API quota is unavailable, the app handles it gracefully with fallback messaging.

👤 Author

Aman Kumar Sharma
GitHub: https://github.com/amansharma6664
LinkedIn: https://www.linkedin.com/in/aman-kumar-sharma-876250212/