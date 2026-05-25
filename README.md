# Portfolio Website

Personal portfolio built with React and EmailJS.

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router, TypeScript  
**Contact:** EmailJS, Google reCAPTCHA v2  
**Projects:** Static data in `src/data/projects.ts`

## Setup

### Prerequisites
- Node.js 18+
- An [EmailJS](https://www.emailjs.com/) account with a service and template
- A Google reCAPTCHA v2 site key ([Google reCAPTCHA admin](https://www.google.com/recaptcha/admin))

### 1. Clone & install

```bash
cd frontend
npm install
```

### 2. Environment variables

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

| Variable | Purpose |
|----------|---------|
| `VITE_EMAIL_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAIL_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAIL_PUBLIC_KEY` | EmailJS public key |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key |

Configure your EmailJS template to use `{{from_name}}`, `{{from_email}}`, and `{{message}}`.

### 3. Run

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
│   │   ├── components/    UI components
│   │   ├── data/          Static data (skills, about, projects)
│   │   ├── hooks/         Custom React hooks
│   │   ├── services/      EmailJS wrapper
│   │   ├── types/         TypeScript interfaces
│   │   └── utils/         Helpers & validation
│   └── ...
```

## Contact Form

The contact form sends email via EmailJS (`emailjs.sendForm`) with:

- Fields: `from_name`, `from_email`, `message`
- Hidden honeypot field: `website` (silent rejection if filled)
- Google reCAPTCHA v2 checkbox
- Client-side validation (name ≥ 2 chars, valid email, message ≥ 10 chars)
- Toast notifications for success, failure, and CAPTCHA errors
