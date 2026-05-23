# Portfolio Website

Personal portfolio built with React and Supabase.

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router, TypeScript  
**Backend:** Supabase (PostgreSQL, Row-Level Security)

## Setup

### Prerequisites
- Node.js 18+
- A Supabase project ([supabase.com](https://supabase.com))

### 1. Clone & install

```bash
cd frontend
npm install
```

### 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open the SQL Editor and run `supabase-schema.sql` to create the tables
3. Run `supabase-seed.sql` to populate sample projects (optional — the frontend has local fallback data)

### 3. Environment variables

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env` with your Supabase project URL and anon key (found in Project Settings → API).

### 4. Run

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`

## Project Structure

```
portfolio-website/
├── frontend/              React + Vite frontend
│   ├── src/
│   │   ├── assets/        Images
│   │   ├── components/    UI components (one per file)
│   │   ├── data/          Static data (skills, about)
│   │   ├── hooks/         Custom React hooks
│   │   ├── lib/           Supabase client
│   │   ├── services/      Supabase query wrappers
│   │   ├── types/         TypeScript interfaces
│   │   └── utils/         Helpers
│   └── ...
├── supabase-schema.sql    Database schema
└── supabase-seed.sql      Sample project data
```

## Supabase Tables

| Table | RLS Policy | Description |
|-------|-----------|-------------|
| `projects` | Anonymous reads | Portfolio projects |
| `contacts` | Anonymous inserts | Contact form submissions |

## Contact Form

Contact form submissions are stored in the Supabase `contacts` table. Validation is performed client-side (name ≥ 2 chars, valid email, message ≥ 10 chars). The form includes loading, success, and error states.
