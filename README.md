# SportSnap AI

### Shazam for Sports Truth

## AI-Powered Sports Media Authenticity Verification Platform

SportSnap AI helps users instantly verify whether sports content seen on Instagram, X, YouTube Shorts, WhatsApp, and other social platforms is real or fake.

From fake transfer rumors and misleading breaking news to manipulated screenshots, edited highlight clips, and AI-generated misinformation, SportSnap AI helps users determine what is FACT, SUS, or CAP using Gemini-powered verification and evidence-based reasoning.

---

# Live Demo

## Firebase Hosting

https://sportsnap-ai.web.app

Prototype deployed and accessible for judges and demonstration purposes.

---

# Problem Statement

Sports misinformation spreads faster than truth.

Fake transfer rumors, manipulated sports highlights, misleading social media posts, false injury reports, and AI-generated content regularly go viral across multiple platforms.

Fans often rely on repost pages, meme accounts, and unverified sources, making authenticity verification difficult during live content consumption.

Existing verification methods are slow, manual, fragmented, and inaccessible to everyday users.

There is a need for a fast, user-friendly system that allows users to instantly verify suspicious sports content directly where misinformation spreads.

---

# Our Solution

SportSnap AI is an AI-powered verification platform designed specifically for sports media authenticity.

Users can:

* Verify suspicious sports claims
* Upload screenshots and images
* Use Live Scan workflows to capture suspicious content
* Analyze transfer rumors and breaking news
* Review verification history
* Generate downloadable audit reports
* Monitor verification insights through a dynamic analytics dashboard

The platform then generates a verification verdict:

## FACT / SUS / CAP

Along with:

* Confidence Score
* AI-Powered Explanation
* Verification Reasoning
* Historical Verification Tracking
* Audit Report Generation

This creates a fast and intuitive “Shazam for Sports Truth” experience.

---

# Core Features

## AI-Powered Verification

Uses Google Gemini to analyze sports-related claims and classify them into:

* FACT
* SUS
* CAP

with supporting reasoning and confidence scoring.

---

## Image Verification

Users can upload screenshots, social media posts, and sports-related images for verification.

---

## Live Scan

Capture suspicious content directly from the screen using browser-supported screen sharing APIs for rapid verification workflows.

---

## Verification Archive

All verification sessions are automatically stored in Cloud Firestore and can be reviewed later through the Archives page.

---

## Dynamic Insights Dashboard

Provides real-time analytics including:

* Total Verifications
* Fact Count
* Cap Count
* Verification Metrics
* Verification History
* Archive Analytics

---

## PDF Audit Reports

Generate downloadable verification reports containing verification statistics and verification history.

---

## User Authentication

Secure login and user session management powered by Firebase Authentication.

---

# Demo Flow

User encounters suspicious sports content

→ Uploads image / enters claim / starts Live Scan

→ Gemini analyzes the content

→ Result page displays:

# FACT / SUS / CAP

with:

* Confidence Score
* Verification Reasoning
* Verdict Explanation

→ Verification automatically saved to Archive

→ Insights Dashboard updates dynamically

→ User can export verification reports as PDF

Fast. Simple. Reliable.

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

---

## AI Engine

* Google Gemini API

---

## Backend & Cloud

* Firebase Authentication
* Cloud Firestore
* Firebase Hosting

---

## Data Visualization

* Recharts
* React Circular Progressbar

---

## Report Generation

* jsPDF

---

# System Architecture

1. User submits a claim, image, or Live Scan.
2. Gemini processes and evaluates the content.
3. Verification verdict is generated.
4. Result is stored in Firestore.
5. Archives update automatically.
6. Insights dashboard refreshes dynamically.
7. Users can export audit reports as PDF.

---

# Why This Matters

Sports fans consume breaking news in seconds.

Verification should not take hours.

SportSnap AI reduces misinformation spread by making authenticity verification instant, accessible, and trustworthy.

Instead of asking:

"Is this real?"

Users get:

# FACT, SUS, or CAP

instantly.

---

# Prototype Notes

This project was developed as a hackathon prototype focused on demonstrating a complete end-to-end verification workflow.

Current implementation includes:

* Firebase Authentication
* Cloud Firestore Integration
* Verification Archive
* Dynamic Insights Dashboard
* PDF Report Export
* Gemini-Powered Verification
* Firebase Hosting Deployment

For demonstration purposes:

* Firestore security rules are configured for rapid prototyping and evaluation.
* Live Scan functionality depends on browser-supported screen capture APIs and is recommended for desktop browsers.
* AI verification availability depends on Google Gemini API quota and service availability.

---

# Future Scope

* Advanced deepfake detection
* OCR-powered screenshot analysis
* Browser extension integration
* Mobile application support
* Real-time misinformation monitoring
* Multi-language support
* Enhanced forensic media analysis
* Administrative moderation dashboard

---

# Team

## Team Name

Jhon Chili Hacks🌶️🐷

## Hackathon

Google Solution Challenge

---

# Final Pitch

## SportSnap AI helps users instantly verify whether viral sports content is FACT, SUS, or CAP by combining AI-powered verification, image analysis, live scan workflows, verification archives, dynamic analytics, and downloadable audit reports.

---

# Because in sports...

## Hype is temporary.

## Truth matters.
