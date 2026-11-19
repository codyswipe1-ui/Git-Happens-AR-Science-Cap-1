from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.lesson import Lesson

router = APIRouter(prefix="/lessons", tags=["Lessons"])


# Get all published lessons
@router.get("/")
def get_lessons(db: Session = Depends(get_db)):
    lessons = (
        db.query(Lesson)
        .filter(Lesson.is_published.is_(True))
        .all()
    )

    return lessons


# Get a specific published lesson
@router.get("/{lesson_id}")
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = (
        db.query(Lesson)
        .filter(
            Lesson.id == lesson_id,
            Lesson.is_published.is_(True)
        )
        .first()
    )

    if lesson is None:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    return lesson
