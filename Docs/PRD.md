# 📝 Product Requirement Document (PRD)
## Research Publication & Academic Support Platform

---

## 1. Product Overview
This platform provides end-to-end academic and research support for students, PhD scholars, researchers, and professionals.

Users can access services including:
- Research Paper Editing  
- Graphical Abstract Design  
- Journal Submission Support  
- AI & Plagiarism Check  
- Thesis Writing Assistance  
- Project Abstract Support  

Also includes expanded services:  
Research Planning, Data Services, Editorial Support, Publication Support, Academic Presentations, and Consultation Support.

---

## 2. Target Users
- PhD Students  
- PG Students  
- Researchers  
- Scientists  
- Academic Professionals  
- Corporate R&D Teams  

---

## 3. Core Features

### 3.1 Home Page
- Hero banner with CTA  
- Featured services  
- Testimonials  
- Blog previews  
- FAQ highlights  
- Trust indicators (Confidential, Expert Editors, On-Time Delivery)

---

## 3.2 Main Services

### A. Research Paper Editing
- Substantive editing  
- Language polishing  
- Plagiarism correction  
- Formatting (APA, MLA, Chicago, IEEE)  
- Sample editing preview  

### B. Graphical Abstract Creation
- Custom vector illustrations  
- Journal-style graphical abstracts  
- Formats: PNG, PDF, SVG  

### C. Journal Submission Support
- Journal selection  
- Manuscript formatting  
- Submission assistance  
- Cover letter drafting  

### D. AI & Plagiarism Check
- AI detection percentage  
- Plagiarism score  
- Rewriting suggestions  
- Downloadable report  

### E. Thesis Writing Support
- Chapter assistance  
- Literature review  
- Methodology drafting  
- Citations management  

### F. Project Abstract (PhD/MSc/BTech)
- Concept notes  
- Abstract writing  
- Research idea generation  

---

## 4. Detailed Service Categories

### 4.1 Research Planning
- Topic Selection  
- Proposal Support  
- Research Design  
- Ethics & Feasibility Review  
- Timeline Creation  

### 4.2 Data Services
- Statistical Analysis  
- Data Cleaning  
- ML Modelling  
- Interpretation Support  

### 4.3 Editorial Support
- Substantive Editing  
- Polishing & Proofreading  
- Formatting Help  
- AI + Plagiarism Fix  

### 4.4 Publication Support
- Pre-Submission Review  
- Manuscript Enhancement  
- Journal Selection  
- Submission Guidance  

### 4.5 Academic Presentations
- PhD Viva Presentations  
- Conference Posters  
- Oral Slides  
- Visual Enhancements  

### 4.6 Consultation Support
- Research guidance  
- Data analysis walkthrough  
- Thesis structuring help  

---

## 5. Additional Modules

### 5.1 FAQ Section
Sample questions:
- What journals do you support?  
- How long does editing take?  
- Is my manuscript safe and confidential?  
- What plagiarism tools do you use?  

### 5.2 Blog Section
Topics:
- Reducing plagiarism in research papers  
- Scopus vs SCI journals  
- How to write a research proposal  
- Best tools for statistical analysis  

Blog features:
- Search  
- Categories  
- Social sharing  

---

## 6. Technical Requirements

### 6.1 Frontend
**Tech Stack:**
- Vite + React  
- Tailwind CSS  
- ShadCN UI  
- Axios  
- Zustand / Redux Toolkit  
- React Query (optional)

**Features:**
- Fully responsive  
- SEO optimized  
- Dashboard with service tracking  
- File uploads  
- Form validation  

---

### 6.2 Backend
**Tech Stack:**
- Node.js  
- Express.js  
- REST API  
- SQL Database  
- JWT Authentication  
- Multer/Cloud Storage for files  
- Turso SQL Lite DB

**Features:**
- Auth system  
- CRUD for blogs, FAQ, services  
- Order tracking  
- Payment gateway integration (Razorpay/Stripe)  
- Admin panel API  

---

### 6.3 Database Layer
- SQL DB (MySQL/PostgreSQL) 
- Turso SQL Lite DB
- Drizzle ORM used in frontend on Vercel/Netlify  

**Tables:**
- Users  
- Services  
- Service Requests  
- Blogs  
- FAQ  
- Payments   (Manual Process only show qr)
- Files  

---

## 7. Functional Requirements

### User Side
- Login/Register  
- View services  
- Place request & upload files  
- Make payment  
- Track service status  
- Download completed files  
- Read blogs  
- View FAQs  

### Admin Side
- Manage service requests  
- Assign experts  
- Upload outputs  
- Create/update blogs  
- Add/edit FAQs  
- Dashboard analytics  

---

## 8. Non-Functional Requirements
- API response: < 1 sec  
- Secure data encryption  
- Confidential file storage  
- Modular architecture  
- Vercel/Netlify-compatible  
- 99% uptime  

---

## 9. API Endpoints (Sample)

### Auth

POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile


### Services

GET /api/services
POST /api/service-request
GET /api/service-request/:id


### Blogs

GET /api/blogs
GET /api/blogs/:id
POST /api/blogs


### FAQ

GET /api/faq
POST /api/faq


---

## 10. User Flows

### User
1. Visit home page  
2. Select service  
3. Upload file & fill details  
4. Pay  
5. Track order  
6. Download completed work  

### Admin
1. Login  
2. View orders  
3. Assign editor  
4. Upload output  
5. Mark complete  

---

## 11. UI Pages List
- Home  
- Services  
- Service Detail  
- AI & Plagiarism Tool  
- Blog List  
- Blog Detail  
- FAQ  
- Dashboard  
- Login/Register  
- Checkout  
- Contact  
- Admin Login  
- Admin Dashboard  

---

## 12. Future Enhancements
- AI grammar enhancement  
- Journal finder AI  
- Automated thesis structuring  
- AI project idea generator  
- Chatbot for research guidance  

---

