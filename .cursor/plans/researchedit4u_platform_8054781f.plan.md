---
name: Researchedit4u Platform
overview: Build Researchedit4u - a Vercel-optimized research publication platform with React frontend, Vercel serverless API routes, Turso database, and all core features. No payment integration required.
todos:
  - id: setup-monorepo
    content: Initialize monorepo structure with root package.json, vercel.json, and workspace configuration
    status: pending
  - id: setup-frontend
    content: Set up Vite + React + TypeScript frontend with Tailwind CSS, ShadCN UI, and Researchedit4u branding
    status: pending
    dependencies:
      - setup-monorepo
  - id: setup-backend
    content: Set up Vercel serverless functions structure in api/ directory with TypeScript and edge runtime support
    status: pending
    dependencies:
      - setup-monorepo
  - id: setup-database
    content: Configure Turso database connection and Drizzle ORM with edge-compatible schema definitions
    status: pending
    dependencies:
      - setup-backend
  - id: implement-auth
    content: Implement JWT-based authentication system with Vercel serverless functions (register, login, protected routes)
    status: pending
    dependencies:
      - setup-database
      - setup-frontend
  - id: build-home-page
    content: Create home page with Researchedit4u branding, hero, services, testimonials, blog preview, and FAQ sections
    status: pending
    dependencies:
      - setup-frontend
  - id: implement-services
    content: Build services listing, detail pages, and service request form with Vercel Blob file upload
    status: pending
    dependencies:
      - implement-auth
  - id: implement-blog
    content: Create blog listing, detail pages, and admin blog management interface
    status: pending
    dependencies:
      - implement-auth
  - id: implement-faq
    content: Build FAQ page with search and category filtering
    status: pending
    dependencies:
      - setup-frontend
  - id: build-dashboard
    content: Create user dashboard with service request tracking and file downloads (no payment integration)
    status: pending
    dependencies:
      - implement-services
  - id: build-admin
    content: Build admin dashboard with request management, file uploads, and content management
    status: pending
    dependencies:
      - implement-auth
  - id: configure-vercel
    content: Configure Vercel deployment with vercel.json, environment variables, Vercel Blob Storage, and edge runtime setup
    status: pending
    dependencies:
      - setup-database
      - setup-backend
  - id: polish-ux
    content: Ensure responsive design, error handling, loading states, SEO optimization with Researchedit4u branding
    status: pending
    dependencies:
      - build-dashboard
      - build-admin
---

# Researchedit4u - Research Publication & Academic Support Platform

## Project Structure

Vercel-optimized monorepo with `frontend/` (Vite React) and `api/` (Vercel serverless functions), shared types/config where needed.

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Monorepo Structure

- Create root `package.json` with workspace configuration
- Set up `frontend/` directory with Vite + React + TypeScript
- Set up `api/` directory for Vercel serverless functions
- Configure shared TypeScript configs
- Add root-level scripts for dev/build
- Add `vercel.json` for Vercel deployment configuration

### 1.2 Frontend Foundation (`frontend/`)

- Initialize Vite React TypeScript project
- Set site name/title to "Researchedit4u" in all metadata, HTML title, and branding
- Install and configure Tailwind CSS
- Set up ShadCN UI with theme configuration
- Install dependencies: Axios, Zustand, React Router, React Hook Form, Zod
- Configure path aliases (`@/components`, `@/lib`, etc.)
- Set up folder structure: `components/`, `pages/`, `lib/`, `store/`, `types/`, `hooks/`
- Add `vercel.json` configuration for frontend deployment

### 1.3 Backend Foundation (`api/`)

- Set up Vercel serverless functions structure (`api/` directory at root)
- Create API route handlers compatible with Vercel serverless functions
- Configure environment variables with `.env.example` (Vercel-compatible)
- Set up CORS, error handling in each serverless function
- Install dependencies: JWT, bcrypt, Zod, Drizzle ORM
- Use Vercel Blob Storage for file uploads (instead of local Multer storage)
- Ensure edge runtime compatibility where needed

### 1.4 Database Setup

- Set up Turso database connection (edge-compatible for Vercel)
- Configure Drizzle ORM schema with edge runtime support
- Create database schema files for:
- Users (id, email, password, name, role, createdAt)
- Services (id, name, description, category, price)
- ServiceRequests (id, userId, serviceId, status, details, files, createdAt)
- Blogs (id, title, content, author, category, createdAt)
- FAQ (id, question, answer, category)
- Files (id, requestId, filename, path, type, uploadedAt)
- Configure Drizzle to work with Vercel edge runtime

## Phase 2: Authentication System

### 2.1 Backend Auth (`api/auth/`)

- Create Vercel serverless function routes: `api/auth/register.ts`, `api/auth/login.ts`, `api/auth/profile.ts`
- Implement JWT token generation and validation middleware
- Add password hashing with bcrypt
- Create user registration/login handlers
- Add role-based access control (user/admin)
- Ensure edge runtime compatibility

### 2.2 Frontend Auth (`frontend/`)

- Create auth store with Zustand
- Build Login and Register pages with form validation
- Implement protected route wrapper
- Add auth context and token management
- Create auth API service functions
- Use "Researchedit4u" branding in auth pages

## Phase 3: Core Pages & Components

### 3.1 Layout & Navigation

- Create main layout component with header/footer
- Build responsive navigation with mobile menu
- Add "Researchedit4u" logo and branding throughout
- Add loading states and error boundaries

### 3.2 Home Page (`frontend/src/pages/Home.tsx`)

- Hero banner with CTA (Researchedit4u branding)
- Featured services section
- Testimonials carousel
- Blog preview cards
- FAQ highlights
- Trust indicators section

### 3.3 Services Pages

- Services listing page with categories
- Service detail page with description and pricing
- Service request form with file upload
- Service status tracking component

### 3.4 Blog System

- Blog listing page with search and categories
- Blog detail page with social sharing
- Admin blog creation/editing interface

### 3.5 FAQ Page

- FAQ accordion component
- Category filtering
- Search functionality

## Phase 4: Backend API Implementation

### 4.1 Services API (`api/services/`)

- `GET /api/services` - List all services (serverless function)
- `GET /api/services/[id].ts` - Get service details
- `POST /api/service-request.ts` - Create service request (with file upload to Vercel Blob)
- `GET /api/service-request/[id].ts` - Get request details
- `GET /api/service-request.ts` - List user's requests

### 4.2 Blog API (`api/blogs/`)

- `GET /api/blogs.ts` - List blogs with pagination
- `GET /api/blogs/[id].ts` - Get blog details
- `POST /api/blogs.ts` - Create blog (admin only)
- `PUT /api/blogs/[id].ts` - Update blog (admin only)
- `DELETE /api/blogs/[id].ts` - Delete blog (admin only)

### 4.3 FAQ API (`api/faq/`)

- `GET /api/faq.ts` - List all FAQs
- `POST /api/faq.ts` - Create FAQ (admin only)
- `PUT /api/faq/[id].ts` - Update FAQ (admin only)

### 4.4 File Upload Handling

- Use Vercel Blob Storage for file uploads
- Create upload API route handler (`api/upload.ts`)
- Implement file validation (type, size)
- Store file metadata in Turso database
- Add file download endpoints that serve from blob storage

## Phase 5: User Dashboard

### 5.1 Dashboard Page (`frontend/src/pages/Dashboard.tsx`)

- Service request tracking table
- Status indicators (Pending, In Progress, Completed)
- File download functionality
- Remove payment status display (no payment integration)

### 5.2 Service Request Flow

- Request creation form with file upload
- Order tracking interface
- Download completed files
- Note: Payment integration removed per requirements

## Phase 6: Admin Panel

### 6.1 Admin Dashboard (`frontend/src/pages/admin/`)

- Overview with analytics (total requests, pending, completed)
- Service request management table
- Assign expert functionality
- Upload output files interface
- Mark requests as complete

### 6.2 Admin Content Management

- Blog CRUD interface
- FAQ management interface
- Services management (optional)

## Phase 7: Vercel Deployment Configuration

### 7.1 Vercel Setup

- Configure `vercel.json` for proper routing (frontend and API routes)
- Set up environment variables structure for Vercel dashboard
- Configure Turso database connection for edge runtime
- Set up Vercel Blob Storage for file uploads
- Configure build settings for frontend and API routes
- Add proper CORS headers for API routes
- Test deployment locally with `vercel dev`

## Phase 8: Styling & UX

### 8.1 Responsive Design

- Ensure all pages are mobile-responsive
- Test on multiple screen sizes
- Optimize images and assets
- Use "Researchedit4u" branding consistently

### 8.2 SEO Optimization

- Add meta tags to all pages with "Researchedit4u" branding
- Implement proper heading structure
- Add sitemap and robots.txt
- Configure Open Graph tags

## Phase 9: Testing & Polish

### 9.1 Error Handling

- Global error boundary
- API error handling
- Form validation messages
- Loading states throughout

### 9.2 Security

- Input validation on all endpoints
- SQL injection prevention (Drizzle handles this)
- XSS protection
- Secure file upload validation
- Environment variable security

## Key Files to Create

**Frontend:**

- `frontend/vite.config.ts` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind setup
- `frontend/src/main.tsx` - App entry point
- `frontend/src/App.tsx` - Main app component with routing
- `frontend/src/store/authStore.ts` - Zustand auth store
- `frontend/src/lib/api.ts` - Axios instance and API functions
- `frontend/src/components/ui/` - ShadCN components
- `frontend/src/pages/` - All page components
- `frontend/index.html` - HTML with "Researchedit4u" title

**Backend/API:**

- `api/` - Vercel serverless functions directory
- `api/auth/register.ts`, `api/auth/login.ts`, `api/auth/profile.ts` - Auth endpoints
- `api/services/` - Service-related endpoints
- `api/blogs/` - Blog endpoints
- `api/faq/` - FAQ endpoints
- `api/upload.ts` - File upload handler (Vercel Blob)
- `lib/db/schema.ts` - Drizzle schema definitions
- `lib/db/index.ts` - Database connection (edge-compatible)
- `lib/middleware/auth.ts` - JWT middleware
- `lib/utils/` - Shared utilities

**Root:**

- `package.json` - Workspace configuration
- `vercel.json` - Vercel deployment configuration
- `README.md` - Project documentation with Vercel deployment instructions
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variable template (Turso, JWT secret, Vercel Blob, etc.)