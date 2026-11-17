from contextlib import asynccontextmanager

from fastapi import FastAPI

from database import Base, engine
from models.lesson import Lesson
from models.user import User
from routes.lessons import router as lessons_router
from routes.quizzes import router as quizzes_router
from routes.auth import router as auth_router


# Create any missing database tables when the API starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


# Initialize the ImmerseED API
app = FastAPI(
    title="ImmerseED API",
    description="Backend API for the ImmerseED AR Science application",
    version="0.1.0",
    lifespan=lifespan
)

# Connect the routes
app.include_router(lessons_router)
app.include_router(quizzes_router)
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ImmerseED!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
