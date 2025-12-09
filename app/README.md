# App Directory

This directory contains all application code organized in a clean structure.

## Structure

```
app/
├── frontend/     # React frontend application
├── api/          # Vercel serverless API functions
└── lib/          # Shared utilities, database, and middleware
```

## Frontend

Located in `app/frontend/` - Vite + React + TypeScript application.

- **Entry**: `app/frontend/src/main.tsx`
- **Dev Server**: `npm run dev` (runs on port 5173)
- **Build**: `npm run build`

## API

Located in `app/api/` - Vercel serverless functions.

- **Auth**: `app/api/auth/` - Authentication endpoints
- **Services**: `app/api/services/` - Service management
- **Blogs**: `app/api/blogs/` - Blog endpoints
- **FAQ**: `app/api/faq/` - FAQ endpoints

All API routes are accessible at `/api/*` via Vercel routing.

## Shared Library

Located in `app/lib/` - Shared code used by API functions.

- **Database**: `app/lib/db/` - Turso database connection and schema
- **Middleware**: `app/lib/middleware/` - Auth middleware
- **Utils**: `app/lib/utils/` - Utility functions

## Import Paths

### In API files:
```typescript
import { db } from '@/lib/db/index.js'
import { getAuthUser } from '@/lib/middleware/auth.js'
```

### In Frontend files:
```typescript
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
```
