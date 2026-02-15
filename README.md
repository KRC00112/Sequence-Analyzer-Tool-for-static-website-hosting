# Secure Cloud-Hosted Bioinformatics Web App

---

## 📘 Project Overview

This project demonstrates how to deploy a static web application using a secure cloud architecture that prevents direct access to storage while improving performance through caching and edge delivery.

The application analyzes biological nucleotide sequences and determines whether the input is **DNA or RNA**. It performs sequence analysis such as generating complementary sequences, counting codons, translating protein sequences, and visualizing nucleotide and amino acid distributions.

The deployment architecture ensures:

- ✅ Private origin storage (not publicly accessible)
- ✅ Fast global delivery through Amazon CloudFront edge caching
- ✅ Secure resource access using origin access restrictions
- ✅ Reduced origin requests through caching, improving performance and efficiency

---


## ⚙️ Requirements

#### Frontend
- React (Vite) — component-based UI architecture
- JavaScript — sequence processing and validation logic
- CSS — layout and styling

#### Cloud & Deployment
- **Amazon S3** — hosts static website files
- **S3 Bucket Policies** — enforce secure access permissions
- **Amazon CloudFront** — global CDN distribution and caching
- **Origin Access Control (OAC)** — restricts direct access to S3 origin


#### Development Tools
- Node.js & npm
- Git & GitHub

---

##  🏗 Implementation

### 1. Build Frontend Application
Create a React application using Vite and implement sequence analysis logic.

