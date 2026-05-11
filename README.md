# Linkerex

Linkerex is a job board built with Next.js that connects **students** looking for work with **companies** looking to hire. Students browse and apply to listings; companies post jobs, manage their listings, and review applicants from a dedicated dashboard.

Built with the Next.js App Router (with a legacy `pages/api/` directory for API routes), MongoDB via Mongoose, and NextAuth for session-based authentication.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [API routes](#api-routes)
- [Data models](#data-models)
- [Deployment](#deployment)

---

## Features

- **Two account types**: `student` and `company` (an `admin` role is also defined on the user model).
- **Authentication** with NextAuth (Credentials provider) using JWT sessions.
- **Password reset flow** with signed reset tokens delivered by email (Nodemailer).
- **Job listings**: companies create, edit, and delete jobs; students browse and search them.
- **Job applications**: students apply to listings and track applied jobs; companies view applicants per job.
- **Company dashboard** for managing job posts, company details, and applicants.
- **File uploads** (e.g. resumes / supporting documents) handled via `formidable` / `multer`.
- **Email sending** for password resets and notifications via Gmail SMTP (configurable).

## Tech stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router + legacy Pages API), React 18
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) (Credentials, JWT sessions) + `bcrypt`
- **Email**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP by default)
- **JWT**: `jsonwebtoken` for password-reset tokens
- **File uploads**: `formidable`, `multer`, `form-data`
- **UI**: [NextUI](https://nextui.org/), Tailwind CSS, Framer Motion, Heroicons / Lucide / `react-icons` / Iconify
- **HTTP client**: `axios`

## Project structure

```
.
├── app/                       # Next.js App Router pages
│   ├── (home)/                # Public landing page
│   ├── (student)/             # Student-facing routes (jobs, apply, payment)
│   ├── (company)/desk/        # Company dashboard (jobs, applicants, details)
│   ├── (system)/              # Auth pages: login, sign_up, forgot_pswd, reset_password
│   ├── layout.js              # Root layout
│   ├── providers.js           # Client-side providers (NextUI, NextAuth session)
│   └── globals.css            # Global styles
├── pages/api/                 # API routes (legacy pages directory)
│   ├── auth/                  # NextAuth handler + forgot/reset password
│   ├── jobs/                  # CRUD for jobs
│   ├── applied/               # Apply to a job, list/manage applications
│   ├── users/                 # User CRUD
│   ├── dashboard.js           # Aggregated dashboard data
│   ├── files.js               # File upload handler
│   └── send_email.js          # Generic email sender
├── components/                # Reusable React components grouped by area
│   ├── homePage/
│   ├── jobsPage/
│   ├── desk/                  # Company desk UI
│   └── general/
├── models/                    # Mongoose models (User, Job, AppliedJobs, PasswordReset)
├── lib/mongodb.js             # MongoDB connection helper
├── public/                    # Static assets
├── uploads/                   # Uploaded files (resumes etc.)
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## Prerequisites

- **Node.js** 18.18+ (Next.js 15 minimum)
- **Yarn** (the repo pins `yarn@1.22.22` via `packageManager`) — `npm` or `pnpm` also work
- A **MongoDB** instance (local or hosted, e.g. MongoDB Atlas)
- A **Gmail account with an App Password** if you want password-reset / notification emails to work (or swap the transport in `pages/api/auth/forgot-password.js` and `pages/api/send_email.js`)

## Getting started

1. **Clone and install**

   ```bash
   git clone <your-fork-url>
   cd Linkerex
   yarn install
   # or: npm install / pnpm install
   ```

2. **Configure environment variables**

   Copy the sample below into `.env.local` at the project root and fill in real values. See the [Environment variables](#environment-variables) section for a description of each.

3. **Run the dev server**

   ```bash
   yarn dev
   # or: npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app. Turbopack is enabled via the `dev` script.

4. **Build for production**

   ```bash
   yarn build
   yarn start
   ```

## Environment variables

All variables go in `.env.local` (which is gitignored). A ready-to-copy sample is also shipped as **`.env.example`** in the repo root.

### `.env.local` sample

```env
# ─── MongoDB ──────────────────────────────────────────────────────────────────
# Connection string for your MongoDB database.
# Local example:   mongodb://127.0.0.1:27017/linkerex
# Atlas example:   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/linkerex
MONGO_URI=mongodb://127.0.0.1:27017/linkerex

# ─── NextAuth ─────────────────────────────────────────────────────────────────
# Secret used to sign NextAuth JWTs / cookies. Generate with:
#   openssl rand -base64 32
NEXTAUTH_SECRET=replace-me-with-a-long-random-string

# Public base URL of the site. Used by NextAuth callbacks.
NEXTAUTH_URL=http://localhost:3000

# ─── Password reset / JWT ────────────────────────────────────────────────────
# Secret used to sign password-reset tokens (separate from NEXTAUTH_SECRET).
JWT_SECRET=another-long-random-string

# Base URL injected into password-reset emails (the reset link target).
FRONTEND_URL=http://localhost:3000

# ─── Email (Nodemailer / Gmail SMTP) ─────────────────────────────────────────
# Gmail address used as the SMTP sender for reset / notification emails.
EMAIL=your.address@gmail.com

# Gmail App Password (NOT your normal Gmail password).
# Create one at: https://myaccount.google.com/apppasswords
EMAIL_PASS=xxxxxxxxxxxxxxxx
```

### Where each variable is used

| Variable          | Used in                                                                 | Purpose                                                      |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| `MONGO_URI`       | `lib/mongodb.js`, `pages/api/auth/forgot-password.js`, reset-password   | MongoDB connection string                                    |
| `NEXTAUTH_SECRET` | `pages/api/auth/[...nextauth].js`                                       | Signs NextAuth session JWTs                                  |
| `NEXTAUTH_URL`    | NextAuth runtime                                                        | Canonical site URL for auth callbacks                        |
| `JWT_SECRET`      | `pages/api/auth/forgot-password.js`, `pages/api/auth/reset-password.js` | Signs / verifies password-reset tokens                       |
| `FRONTEND_URL`    | `pages/api/auth/forgot-password.js`                                     | Base URL embedded in the reset-password email link           |
| `EMAIL`           | `pages/api/auth/forgot-password.js`, `pages/api/send_email.js`          | SMTP username + `From` address                               |
| `EMAIL_PASS`      | `pages/api/auth/forgot-password.js`, `pages/api/send_email.js`          | Gmail **App Password** for SMTP auth                         |

> **Security note**: `NEXTAUTH_SECRET` falls back to a hard-coded string if unset — do **not** rely on that in production. Always set a real secret. Likewise, never commit `.env.local`.

## Scripts

Defined in `package.json`:

| Command       | Description                                       |
| ------------- | ------------------------------------------------- |
| `yarn dev`    | Start the dev server with Turbopack on port 3000  |
| `yarn build`  | Production build                                  |
| `yarn start`  | Start the production server (after `build`)       |
| `yarn lint`   | Run `next lint`                                   |

## API routes

All API routes live under `pages/api/`.

### Auth

- `POST /api/auth/[...nextauth]` — NextAuth handler (sign-in via Credentials, session, etc.)
- `POST /api/auth/forgot-password` — Sends a password-reset email with a signed token
- `POST /api/auth/reset-password` — Verifies the token and updates the password

### Jobs

- `GET  /api/jobs` — List jobs
- `POST /api/jobs` — Create a job (company)
- `GET  /api/jobs/[id]` — Fetch a job
- `PUT  /api/jobs/[id]` — Update a job
- `DELETE /api/jobs/[id]` — Delete a job

### Applications

- `GET  /api/applied` — List applications
- `POST /api/applied/apply` — Apply to a job
- `GET  /api/applied/[id]` — Application details / applications for a job

### Users

- `GET  /api/users` — List users
- `POST /api/users` — Create a user (sign-up)
- `GET  /api/users/[id]` — Fetch a user
- `PUT  /api/users/[id]` — Update a user
- `DELETE /api/users/[id]` — Delete a user

### Misc

- `GET  /api/dashboard` — Aggregated dashboard data for the company desk
- `POST /api/files` — File upload (resumes, etc.)
- `POST /api/send_email` — Generic email sender (uses the same Gmail SMTP config)

## Data models

Located in `models/` and managed via Mongoose.

- **User** (`SignUp` collection) — username, email, hashed password, `account_type` (`student | company | admin`), plus `companyName` / `companyLocation` when the account is a company. Passwords are hashed with `bcrypt` via a pre-save hook.
- **Job** — title, company, location, category, `jobType` (`Full-Time | Part-Time | Internship`), payment timeline, amount, description, requirements, `createdby`.
- **AppliedJobs** — links a student to a job they've applied to.
- **PasswordReset** — tracks issued password-reset tokens.

## Deployment

The easiest path is [Vercel](https://vercel.com/new):

1. Push the repo to GitHub.
2. Import the project on Vercel.
3. Add every variable from [Environment variables](#environment-variables) to the Vercel project (Production + Preview).
4. Set `NEXTAUTH_URL` and `FRONTEND_URL` to your deployed domain (e.g. `https://linkerex.vercel.app`).
5. Make sure your MongoDB instance accepts connections from Vercel (e.g. allowlist `0.0.0.0/0` on Atlas, or use a private peering setup).

For other platforms, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
