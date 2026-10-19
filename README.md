# 🌾 AgriTech — Empowering Farmers Through Digital Technology

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://react.dev/)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-brightgreen.svg)](https://nodejs.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Status: Production Ready](https://img.shields.io/badge/Status-Evaluation%20Ready-emerald.svg)]()

> **Live Demo:** [https://ais-dev-aay23fp7u3hex4kt2625gc-978904214745.asia-east1.run.app](https://ais-dev-aay23fp7u3hex4kt2625gc-978904214745.asia-east1.run.app)

---

## 📌 Project Overview

**AgriTech** is a smart, scalable, and multilingual agricultural management system designed to empower farmers with data-driven decision-making tools. Built using the **MERN stack (MongoDB, Express.js, React, Node.js)**, the platform bridges the gap between traditional agricultural practices and modern precision farming.

It integrates **live Open-Meteo atmospheric telemetry**, **soil health analytics (N-P-K & pH)**, **predictive pest heuristics**, an **e-commerce input marketplace**, and a **peer-to-expert consultation forum** into a unified, responsive interface available in **English, Hindi (हिंदी), and Telugu (తెలుగు)**.

---

## 🚀 Key Modules & Epics

### 1. 📊 Farmer Dashboard & Telemetry
- Real-time land holdings acreage counter and active crop tracking.
- Live ambient weather telemetry (Temperature, Humidity, Wind speed, Precipitation).
- High-level soil nutrition status and proactive pest risk indicators.

### 2. 🚜 Farm Parcel & Crop Lifecycle Management
- **Farm Setup:** Register land plots with GPS coordinates, acreage, and irrigation modes (*Drip, Sprinkler, Canal, Rainfed*).
- **Crop Cycles:** Track sowing and harvest timelines across lifecycle phases (*Sowing → Vegetative → Flowering → Harvest-Ready → Harvested*).
- **Soil Testing:** Interactive calibration of Nitrogen (N), Phosphorus (P), Potassium (K), pH balance, and soil moisture percentage.

### 3. 🌦️ Weather Forecasting & Smart Pest Prediction Engine
- Integration with the **Open-Meteo API** across major agricultural belts (Nashik, Ludhiana, Guntur, Indore, Mandya, Varanasi).
- Rule-based agro-pathogen heuristic engine detecting:
  - **Fungal Blight & Downy Mildew** (Humidity > 70% & 20°C–32°C).
  - **Red Spider Mites & Thrips** (High heat index & low humidity).
  - **Pythium Root Rot & Waterlogging** (Rainfall > 10mm).
  - **Yellow Stem Borer & Leaf Folders** (Optimal temperature & canopy density).
- Prescribed IPM biological controls (*Trichoderma viride*, *Neem Oil 10,000 PPM*) and systemic treatments.

### 4. 🛒 Certified Agricultural Inputs Marketplace
- Searchable catalog of certified hybrid seeds, bio-fertilizers, bio-pesticides, and drip equipment.
- Shopping cart, farm delivery address selection, and immediate order placement.
- Real-time order dispatch tracking pipeline (*Processing → Shipped → Delivered*).

### 5. 💬 Expert Consultation & Community Forum
- Farmers can describe crop symptoms, attach symptom categories, and solicit advice.
- Agronomists and scientists can reply with verified **"Expert Verified Solution"** badges.

### 6. 🛡️ Role-Based Security & Admin Governance
- Secure authentication powered by **JSON Web Tokens (JWT)** and **bcrypt** password encryption.
- Multi-role authorization (**Farmer** vs. **Admin / Agronomist**).
- Admin console to manage registered farmers, catalog items, and order fulfillment states.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18/19, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, RESTful Architecture |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | JWT (JSON Web Tokens), bcryptjs, Role-Based Access Control (RBAC) |
| **External APIs** | Open-Meteo Free Public Meteorological API |
| **Localization** | Multi-language engine (English, Hindi, Telugu) |

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/chhiroliyashraddheya/agritech-smart-farming-mern.git
cd agritech-smart-farming-mern
