# Sequence Analyzer tool for Static Website hosting using AWS S3 and CloudFront 

---

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat-square)](https://d2ch06ekyv8s8r.cloudfront.net/index.html)

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

### Frontend
- React (Vite) — component-based UI architecture
- JavaScript — sequence processing and validation logic
- CSS — layout and styling

### Cloud & Deployment
- **Amazon S3** — hosts static website files
- **S3 Bucket Policies** — enforce secure access permissions
- **Amazon CloudFront** — global CDN distribution and caching
- **Origin Access Control (OAC)** — restricts direct access to S3 origin


### Development Tools
- Node.js & npm
- Git & GitHub

---
## 🏛 System Architecture & Request Flow

The following diagram illustrates the secure delivery pipeline for the static website, utilizing Amazon CloudFront as a CDN and Amazon S3 as the private origin.

<p align="center">
  <img src="https://docs.aws.amazon.com/images/AmazonCloudFront/latest/DeveloperGuide/images/cloudfront-secure-static-website-overview-github.png" alt="AWS Architecture Diagram" width="600">
</p>

This project implements a Least-Privilege Security Model by disabling all public access to the S3 bucket and enforcing access through CloudFront's Origin Access Control (OAC).

**Viewer Request (1-2):** A user requests the site via HTTPS. The request is routed to the geographically closest CloudFront Edge Location to minimize latency.

**Origin Fetch & OAC (3-4):** If the requested content is not in the cache (a "cache miss"), CloudFront sends a signed request to the Private S3 Bucket. S3 validates the Origin Access Control (OAC) signature and serves the requested objects.

**Edge Caching (5):** CloudFront caches the objects at the Edge Location. Subsequent requests for the same content are served directly from the cache, significantly reducing the load on the S3 origin.

**Viewer Response (6):** The requested content is delivered back to the user's browser with low latency and high transfer speeds.

---

##  🏗 Implementation

### 1. Build Frontend Application
Created a React application using Vite and implemented DNA/RNA sequence analysis logic.

### 2. Configure Amazon S3

1. Successfully created a uniquely named, general-purpose S3 bucket.
2. Ensured all public access settings were disabled and stayed enforced.
3. Completed the bucket setup using default configuration.
4. Uploaded static website build files and assets.
5. Enabled static website hosting from the Properties section.
6. Set the index and error documents for proper hosting behavior.

### 3. CloudFront Distribution Setup with S3

1. Created a CloudFront distribution.
2. Set the origin as the S3 bucket.
3. Created an Origin Access Control (OAC).
4. Attached the OAC to the distribution origin.
5. Updated the S3 bucket policy to allow access only from CloudFront.

### 4. Test Deployment

1. Verified CloudFront URL works
2. Confirmed direct S3 access is blocked

---

## 🧠 Conclusion

### Key outcomes

- How secure static hosting works in cloud environments.
- How Amazon CloudFront caching improves performance.
- How origin restrictions protect storage resources.
- How distributed edge delivery reduces latency.  

### Future Improvements

- Implement CI/CD deployment pipeline.
- Add advanced biological sequence analysis features.
- Add monitoring and logging.

---

## 🤝 Credits

- **ag-charts-react & ag-charts-enterprise** — Used for the Amino Acid Distribution bar chart. [AG Charts](https://www.ag-grid.com/charts/react/bar-series/)
- **react-donut-chart** — Used for the Nucleotide Distribution donut chart. [React Donut Chart](https://www.npmjs.com/package/react-donut-chart)

These react packages made it easy to create interactive, customizable charts for the application.
