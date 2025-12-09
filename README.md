# Researchedit4u Platform

Research Publication & Academic Support Platform built with React, Vercel Serverless Functions, and Turso Database.

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS + ShadCN UI
- **Backend**: Vercel Serverless Functions (Edge Runtime)
- **Database**: Turso (SQLite)
- **ORM**: Drizzle ORM
- **Storage**: Vercel Blob Storage
- **Authentication**: JWT

## Project Structure

```
.
├── app/
│   ├── frontend/     # Vite React frontend
│   ├── api/          # Vercel serverless functions
│   └── lib/          # Shared utilities and database
├── api/              # Symlink to app/api (for Vercel)
├── Docs/             # Documentation
└── vercel.json       # Vercel deployment configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Turso account (for database)
- Vercel account (for deployment and blob storage)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Turso database credentials
   - Add JWT secret
   - Configure Vercel Blob Storage token

4. Run development server:
   ```bash
   npm run dev
   ```

### Development

- Frontend runs on `http://localhost:5173`
- API routes are available at `http://localhost:5173/api/*`

### Project Structure

All application code is organized in the `app/` directory:
- `app/frontend/` - React frontend
- `app/api/` - Vercel serverless functions  
- `app/lib/` - Shared utilities and database

See `app/README.md` for detailed structure information.

### Deployment

1. Push to your Git repository
2. Connect to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Features

- ✅ User authentication (JWT)
- ✅ Service request management
- ✅ File uploads (Vercel Blob)
- ✅ Blog system
- ✅ FAQ management
- ✅ Admin dashboard
- ✅ User dashboard

## License

Private - Researchedit4u Platform
