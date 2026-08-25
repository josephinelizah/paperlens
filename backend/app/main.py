from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from app.pdf_service import extract_text
from app.analysis_service import analyze_paper

app = FastAPI(title="PaperLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def root():
    return {"message": "PaperLens API is running"}


@app.post("/api/papers/upload")
async def upload_paper(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    file_path = UPLOAD_DIR / file.filename
    contents = await file.read()
    file_path.write_bytes(contents)

    text = extract_text(str(file_path))
    analysis = analyze_paper(text)

    return {
        "filename": file.filename,
        "characters": len(text),
        "analysis": analysis
    }