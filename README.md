# PaperLens

PaperLens is a research paper assistant that helps users understand academic papers faster by extracting key ideas, methodology, results, and overall meaning.

## Live Demo

https://paperlens-olive.vercel.app

## Features

- Upload research papers as PDFs
- Extract text from papers
- Analyse key ideas and concepts
- Identify methodology and results
- Generate concise paper summaries

## Tech Stack

Frontend: React, TypeScript, Vite  
Backend: Python, FastAPI, PyMuPDF

## Project Structure

paperlens/
├── frontend/
├── backend/
└── README.md

## Running Locally

# Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Frontend
cd frontend
npm run dev
