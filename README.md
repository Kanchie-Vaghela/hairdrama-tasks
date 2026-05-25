# HairDrama Task Management App

A full-stack task management application built using Next.js, Flask, and Supabase with Google OAuth authentication and email notifications.

## Live Demo

Frontend:
https://hairdrama-tasks-k7dv.vercel.app

Backend:
https://hairdrama-tasks.onrender.com



# Features

* Google OAuth Login using Supabase Auth
* Create and manage tasks
* Assign tasks to other users
* Mark tasks as completed
* Email notifications for task assignments
* Persistent PostgreSQL database using Supabase
* Fully deployed frontend and backend



# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Backend

* Flask
* Flask-CORS

## Database

* Supabase PostgreSQL

## Authentication

* Google OAuth 2.0
* Supabase Auth

## Deployment

* Vercel (Frontend)
* Render (Backend)



# Project Structure

```bash
root/
├── frontend/
├── backend/
├── migrations/
```



# Environment Variables

## Frontend

Create `frontend/.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=
```

## Backend

Create `backend/.env`

```env
SUPABASE_URL=
SUPABASE_KEY=
EMAIL_USER=
EMAIL_PASS=
```



# Running Locally

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python run.py
```


# Database Schema

## Users Table

* id
* email
* name
* avatar_url
* google_id

## Tasks Table

* id
* title
* description
* status
* created_by
* assigned_to


# Architecture Overview

Frontend communicates with Flask backend APIs.

The Flask backend interacts with Supabase PostgreSQL for persistent storage and uses Gmail SMTP for sending notifications.

Authentication is handled using Supabase Auth with Google OAuth integration.


# Known Limitation

Completion email notifications may occasionally timeout on the Render free tier because synchronous SMTP requests can exceed worker limits. In production, this would be handled using background jobs or transactional email providers.


# Future Improvements

* JWT verification middleware
* Background job queue for emails
* Better task filtering
* Loading states and notifications
* Improved UI/UX
