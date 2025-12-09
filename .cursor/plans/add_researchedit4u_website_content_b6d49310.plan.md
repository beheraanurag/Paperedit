---
name: Add Researchedit4u Website Content
overview: Replace the existing Home.tsx content with all content from researchedit4u.in website, including hero sections, service descriptions, pricing, and navigation updates.
todos:
  - id: update-home-hero
    content: Replace hero section in Home.tsx with main headline, sub-headline, CTAs, and feature highlights from researchedit4u.in
    status: completed
  - id: add-service-sections
    content: Add three main service sections (Abstract/Manuscript, Graphical Abstracts, Research Paper Editing) with descriptions and features
    status: completed
  - id: add-promotional-banner
    content: Add promotional banner section with 50% OFF message
    status: completed
  - id: add-popular-services
    content: Create Popular Services grid with 6 service cards (Research Planning, Data Service, Editorial Support, Publication Support, Academic Presentation, Consultation Support) with pricing
    status: completed
  - id: add-process-section
    content: Add process section with heading and CTA button
    status: completed
  - id: update-navigation
    content: Update Layout.tsx navigation to include About and Contact links
    status: completed
---

# Add Content from Researchedit4u.in Website

## Overview

Replace existing content in `app/frontend/src/pages/Home.tsx` with all content from the researchedit4u.in website, including hero sections, service descriptions, pricing information, and promotional banners.

## Content to Add

### 1. Main Hero Section

- **Headline:** "Pass AI and Plagiarism Checks Confidently Everytime"
- **Sub-headline:** "We rewrite AI-generated or copied content to pass GPTZero and Turnitin—humanised by real editors with 95%+ success."
- **CTAs:** "See Sample" and "Book Now" buttons
- **Feature highlights:**
- Rewrite + De-plag in 24 hrs
- Human editors, no bot
- Trusted by 5M+ researchers
- Affordable checks start at ₹500

### 2. Service Sections (Three main service cards)

- **Service 1:** Abstract, Introduction and Manuscript Expert Help
- Description: "Struggling with writing flow, structure, or clarity? We help you write better without losing your voice expert support only."
- Features: Complete guidance by subject, Logical flow presentation, 1:1 consult with PhD specialist, Track changes & comment

- **Service 2:** Graphical Abstracts and Figures That Impress Editors
- Description: "Get scientific figures and graphical abstracts that impress editors designed for clarity, impact, and publication success."
- Features: Flat Infographic Design, Enhanced Presentation Graphic, Journal & Conference Ready, 10K+ Visuals Delivered

- **Service 3:** Research Paper Editing & Journal Submission Support
- Description: "From editing to journal submission—get published faster in Scopus/SCI journals with support from PhD experts."
- Features: Language + formatting by PhD, Journal matching & submission, Submission-ready in <48 hr, Supported 20,000+ researchers

### 3. Promotional Banner

- **Text:** "Expert editing ensures clarity, precision, and success in global publications. Upto 50% OFF! 🎉 Book Now!"

### 4. Popular Services Section

Grid of 6 service cards with pricing:

- **Research Planning** - Start at ₹2,999
- Features: Validate topic and objective, Outline methodology clearly, Provide supervisor-ready brief

- **Data Service** - Start at ₹4,999
- Features: Analyze in SPSS / R / Python, Clean data with visual, Explain results clearly

- **Editorial Support** - Start at ₹4,999
- Features: Edit language and structure, Format to journal style, Suggest reviewer-style fixes

- **Publication Support** - Start at ₹8,999
- Features: Target suitable journal, Check ethics and policies, Prepare letters and response

- **Academic Presentation** - Start at ₹3,999
- Features: Design slides and poster, Build charts and infographic, Provide speaker note

- **Consultation Support** - Start at ₹2,499
- Features: One-on-one project discussion, Clarify methodology doubt, Personalized research advice

### 5. Process Section

- **Heading:** "A Simple Process with Powerful Result"
- **CTA:** "Get Started in 2 Minute" button

## Implementation Steps

### Step 1: Update Home.tsx

- Replace the entire content of `app/frontend/src/pages/Home.tsx`
- Implement the new hero section with dark blue gradient background
- Add three main service sections with proper styling
- Add promotional banner section
- Implement Popular Services grid (6 cards)
- Add process section with CTA
- Maintain responsive design using Tailwind CSS
- Use existing ShadCN UI components (Card, Button) where appropriate

### Step 2: Update Layout.tsx Navigation

- Update `app/frontend/src/components/Layout.tsx` navigation to match website:
- Add "About" link
- Add "Contact" link
- Update Services to have dropdown (optional, can be simple link for now)
- Keep existing Blog and FAQ links

### Step 3: Styling Adjustments

- Use dark blue gradient backgrounds for hero sections (similar to website)
- Ensure proper spacing and typography
- Add WhatsApp floating button (optional, can be added later)
- Ensure mobile responsiveness

## Files to Modify

1. `app/frontend/src/pages/Home.tsx` - Complete replacement
2. `app/frontend/src/components/Layout.tsx` - Navigation updates

## Notes

- Keep existing routing structure intact
- Maintain TypeScript types
- Use existing UI components from ShadCN
- Ensure all text content matches the website exactly
- Pricing should be displayed in Indian Rupees (₹)
- All CTAs should link to appropriate routes (register, services, etc.)