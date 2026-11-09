from fastapi import FastAPI
from routes.lessons import router as lessons_router
from routes.quizzes import router as quizzes_router
from fastapi.middleware.cors import CORSMiddleware

# Initialize the ImmerseED API
# Creating instance of FastAPI class and storing it in a var called app
app = FastAPI(
    title="ImmerseED API",
    description="Backend API for the ImmerseED AR Science application",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Connecting the lessons routes to app
app.include_router(lessons_router)
app.include_router(quizzes_router)

# Decorator saying execute function below when HTTP request is pulled
@app.get("/")
def home():
    return {
        "message": "Welcome to ImmerseED!"
    }

# Decorator for when someone visits /health to ensure program is responding
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }