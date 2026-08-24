# 🚀 Career Prep AI

> An AI-powered career preparation platform that helps students prepare for resumes, technical interviews, mock interviews, and career development in one place.

## 📌 Overview

**Career Prep AI** is a full-stack web application built to help students and job seekers prepare for technical and professional interviews.

The platform combines:

* 🔐 Secure user authentication
* 👤 Professional profiles
* 📄 AI-powered resume analysis
* 🤖 AI-generated interview questions
* 🎤 AI-powered interview answer evaluation
* 📊 Interview performance analytics
* 📈 Interview history tracking
* 🤝 Professional connections
* 📋 Career preparation dashboard

The main goal is to give students a single platform where they can **analyze their resume, practice interviews, receive AI feedback, and track their preparation progress.**

---

# 🎯 Problem Statement

Students preparing for placements often use multiple platforms for different activities:

```text
Resume Analysis       → One Platform
Interview Questions   → Another Platform
Mock Interviews       → Another Platform
Performance Tracking  → Spreadsheets
Professional Profile  → Another Platform
```

This makes career preparation fragmented and difficult to track.

**Career Prep AI brings several of these activities together into one platform.**

---

# 💡 Solution

Career Prep AI provides a centralized career-preparation environment where users can:

1. Create an account.
2. Build a professional profile.
3. Upload and analyze their resume.
4. Receive AI-generated resume feedback.
5. Start technical interview practice.
6. Receive AI-generated interview questions.
7. Submit answers for AI evaluation.
8. Receive scores and improvement suggestions.
9. Review previous interview performance.
10. Connect with other users.

---

# ✨ Features

## 🔐 1. Authentication

The application provides secure user authentication using:

* Registration
* Login
* JWT authentication
* BCrypt password hashing
* Protected API routes
* Protected frontend routes

### Authentication Flow

```text
User
  ↓
Register / Login
  ↓
Spring Security
  ↓
Credentials Validation
  ↓
JWT Token
  ↓
Frontend
  ↓
Authorization: Bearer <token>
  ↓
Protected Backend APIs
```

---

# 👤 2. Professional Profile

Users can create and maintain a professional profile containing information such as:

* Name
* Email
* Headline
* Bio
* Location
* College
* Skills
* Experience
* Projects
* Achievements
* LinkedIn
* GitHub
* LeetCode
* CodeChef
* Portfolio
* Career goal

The profile also tracks:

* Followers
* Following
* Connections
* Profile completion
* Resume score
* Number of interviews

---

# 📄 3. AI Resume Analyzer

Users can upload their resume in **PDF format**.

The backend extracts text from the PDF using **Apache PDFBox** and sends the extracted content to the AI analysis service.

### Resume Analysis Flow

```text
PDF Resume
    ↓
File Upload
    ↓
Spring Boot Backend
    ↓
Apache PDFBox
    ↓
Extract Resume Text
    ↓
Groq AI
    ↓
Resume Analysis
    ↓
Database
    ↓
Frontend Results
```

### Resume analysis includes:

* ATS score
* Job-match score
* Detected skills
* Resume strengths
* Weaknesses
* Missing keywords
* Improvement suggestions
* Suggested job role

The analysis result is stored in MySQL so users can access previous analyses.

---

# 🤖 4. AI Interview Question Generation

Users can configure an interview by selecting:

* Role
* Category
* Difficulty
* Number of questions

The application then uses the Groq API to generate interview questions dynamically.

### Example

```text
Role:
Software Engineer

Category:
React

Difficulty:
Medium

Questions:
AI-generated interview questions
```

The questions are generated specifically according to the selected interview configuration.

---

# 🎤 5. AI Interview Evaluation

After receiving an interview question, the user submits an answer.

The AI evaluates the response based on:

* Technical knowledge
* Communication
* Confidence
* Overall quality

The system also generates:

* Strengths
* Weaknesses
* Suggestions
* Summary
* Detailed feedback

### Interview Flow

```text
Start Interview
      ↓
Generate Questions
      ↓
Question 1
      ↓
User Answer
      ↓
AI Evaluation
      ↓
Question 2
      ↓
User Answer
      ↓
AI Evaluation
      ↓
...
      ↓
Interview Completed
      ↓
Save Interview History
```

---

# 📊 6. Interview Performance Tracking

The platform stores interview results and provides historical analytics.

Users can see:

* Total interviews
* Average score
* Best score
* Interview timeline
* Topic/category performance
* Previous interview results
* Performance graph

This allows users to understand whether their interview performance is improving over time.

---

# 📈 7. Dashboard

The dashboard provides a centralized overview of the user's preparation.

It can display:

* Profile completion
* Resume score
* Interview count
* Interview performance
* Recent activity
* Suggestions
* Performance charts
* Recent interviews

The dashboard acts as the main entry point after login.

---

# 🤝 8. Professional Connections

Users can discover other users and search by:

* Name
* Headline
* Email

Users can also send connection requests.

This provides a basic professional-networking feature inside the platform.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │ React + Vite +       │
                    │ Tailwind CSS         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ↓
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼──────────────────┐
             │                 │                  │
             ↓                 ↓                  ↓
       Controllers         Services          Security
             │                 │                  │
             ↓                 ↓                  ↓
            DTOs          Business Logic       JWT
             │                 │
             └─────────────────┼──────────────────┘
                               ↓
                         Spring Data JPA
                               │
                               ↓
                         MySQL Database

                               │
                               ↓
                           Groq API
                               │
                               ↓
                       AI Capabilities
```

---

# 🛠️ Technology Stack

## Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **Recharts**
* **Framer Motion**
* **Lucide React**
* **React Hot Toast**

---

## Backend

* **Java 17**
* **Spring Boot 3.5**
* **Spring Web**
* **Spring Data JPA**
* **Spring Security**
* **JWT**
* **BCrypt**
* **Spring WebFlux**

---

## Database

* **MySQL**
* **Hibernate / JPA**

---

## AI & Document Processing

* **Groq API**
* **Llama 3.1 8B Instant**
* **Apache PDFBox**

---

# 📂 Project Structure

## Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── interview/
│   │   ├── layout/
│   │   ├── profile/
│   │   └── resume/
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Interview.jsx
│   │   ├── ResumeAnalysis.jsx
│   │   ├── History.jsx
│   │   ├── Connections.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
└── vite.config.js
```

---

## Backend

```text
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── airesume/
│   │   │           └── backend/
│   │   │
│   │   │               ├── config/
│   │   │               ├── controller/
│   │   │               ├── dto/
│   │   │               ├── entity/
│   │   │               ├── exception/
│   │   │               ├── repository/
│   │   │               ├── security/
│   │   │               └── service/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
└── pom.xml
```

---

# 🔌 REST API

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Dashboard

```text
GET /api/dashboard
```

## Profile

```text
GET /api/profile
PUT /api/profile/update
GET /api/profile/{email}
```

## Resume

```text
POST /api/resume/analyze
GET  /api/resume/latest
GET  /api/resume/history
```

## Interview

```text
POST /api/interview/start
POST /api/interview/questions

POST /api/interview/submit
POST /api/interview/evaluate
```

## History

```text
GET /api/history
```

## Connections

```text
GET  /api/connections
GET  /api/connections/search
POST /api/connections/request
```

---

# 🔐 Security Architecture

The backend uses:

```text
Spring Security
       ↓
JWT Authentication Filter
       ↓
JWT Validation
       ↓
UserDetailsService
       ↓
Authenticated User
       ↓
Protected REST API
```

Passwords are stored using **BCrypt hashing**.

The frontend automatically attaches the JWT token to authenticated API requests using an Axios interceptor.

---

# 🗄️ Database Design

The current backend uses MySQL with JPA/Hibernate.

Main entities include:

```text
User
 │
 ├── Profile Information
 ├── Skills
 ├── Experience
 ├── Projects
 ├── Achievements
 ├── Resume Score
 └── Career Information

ResumeAnalysis
 │
 ├── ATS Score
 ├── Job Match
 ├── Strengths
 ├── Weaknesses
 ├── Missing Keywords
 ├── Suggestions
 ├── Skills
 └── Extracted Resume Text

InterviewHistory
 │
 ├── Role
 ├── Category
 ├── Difficulty
 ├── Question
 ├── Answer
 ├── Technical Score
 ├── Communication Score
 ├── Confidence Score
 ├── Overall Score
 └── Feedback
```

---

# 🔄 Complete Application Flow

```text
                  USER
                   │
                   ↓
              Register/Login
                   │
                   ↓
             JWT Authentication
                   │
                   ↓
              Dashboard
                   │
       ┌───────────┼────────────┐
       │           │            │
       ↓           ↓            ↓
    Profile     Resume       Interview
       │        Analysis       │
       │           │            ↓
       │           │       AI Questions
       │           │            │
       │           │            ↓
       │           │       User Answers
       │           │            │
       │           │            ↓
       │           │       AI Evaluation
       │           │            │
       └───────────┼────────────┘
                   ↓
             MySQL Database
                   │
                   ↓
           History & Analytics
```

---

# 🧠 AI Architecture

The application uses the **Groq API** as its AI provider.

### Resume AI

```text
Resume PDF
   ↓
PDFBox
   ↓
Extracted Text
   ↓
Prompt
   ↓
Groq
   ↓
Structured JSON
   ↓
ResumeAnalysisResponse
```

### Interview AI

```text
Role + Category + Difficulty
             ↓
          Groq API
             ↓
    Interview Questions
             ↓
        User Answer
             ↓
          Groq API
             ↓
     Evaluation JSON
             ↓
Scores + Feedback
```

The application also contains fallback logic so that the system can still return basic results when AI processing fails.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

```text
Java 17+
Node.js
npm
MySQL
Maven
```

You also need a Groq API key.

---

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd Career-Prep-AI
```

---

# 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE ai_resume;
```

Configure your local database credentials using environment variables or a local configuration file.

---

# 3. Configure Backend

Set:

```text
GROQ_API_KEY=your_groq_api_key
```

Do not commit API keys or database passwords to GitHub.

---

# 4. Start Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# 5. Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on the Vite development server.

---

# ⚠️ Security Before Publishing

Before pushing this project to a public GitHub repository:

* Remove database passwords from `application.properties`.
* Move secrets into environment variables.
* Move the JWT signing secret into environment configuration.
* Rotate any credential that has already been exposed.
* Never commit `.env` files containing real secrets.
* Add appropriate secret files to `.gitignore`.

Example:

```text
GROQ_API_KEY=your_secret_key
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

---

# 📸 Screenshots

Add screenshots of:

```text
Landing Page
Login
Dashboard
Profile
Resume Analysis
Interview Setup
Interview Questions
Interview Evaluation
Interview History
Connections
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)

![Resume Analysis](screenshots/resume-analysis.png)

![Interview](screenshots/interview.png)

![History](screenshots/history.png)
```

---

# 🔮 Future Enhancements

The following features can be added in future versions:

* Job description vs resume matching
* Job recommendation system
* Personalized career roadmap
* Personalized DSA practice
* Company-specific interview preparation
* Voice-based mock interviews
* Speech-to-text interview answers
* Resume improvement generation
* Advanced skill-gap analysis
* Real-time interview sessions
* Persistent interview sessions using Redis/database
* Proper connection-request management
* Admin dashboard
* Automated job application tracking

---

# 🎯 Project Objective

Career Prep AI aims to help students move from:

```text
"I don't know how to prepare for placements."
```

to:

```text
"I know my weaknesses,
I know what to improve,
and I can track my interview preparation."
```

The project combines **full-stack development, authentication, database management, document processing, REST APIs, and generative AI** into a practical career-preparation application.

---

# 👩‍💻 Project Highlights

### Full-Stack Development

```text
React
+
Spring Boot
+
MySQL
+
REST APIs
```

### AI Integration

```text
Groq API
+
Resume Analysis
+
Interview Generation
+
Interview Evaluation
```

### Security

```text
Spring Security
+
JWT
+
BCrypt
```

### Document Processing

```text
PDF
↓
Apache PDFBox
↓
Text Extraction
↓
AI Analysis
```

---

# 📌 Tech Stack Summary

```text
Frontend       → React, Vite, Tailwind CSS
Backend        → Java, Spring Boot
Database       → MySQL
ORM            → JPA / Hibernate
Security       → Spring Security, JWT, BCrypt
AI             → Groq API
PDF Processing → Apache PDFBox
HTTP Client    → WebClient / Axios
Charts         → Recharts
UI             → Tailwind CSS, Lucide React
```

---

# 📄 License

This project is developed for educational, portfolio, and career-development purposes.

