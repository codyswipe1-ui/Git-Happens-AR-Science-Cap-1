from database import Base, engine, SessionLocal
from models.lesson import Lesson

# Make sure the lessons table exists
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # Check if the Animal Cells lesson already exists
    existing_lesson = (
        db.query(Lesson)
        .filter(Lesson.title == "Animal Cells")
        .first()
    )

    if existing_lesson:
        print("Animal Cells lesson already exists.")
    else:
        lesson = Lesson(
            title="Animal Cells",
            subject="Biology",
            grade_level=6,
            description="Introduction to animal cell structures and functions.",
            content=(
                "Animal cells are the basic building blocks of animals. "
                "They contain a nucleus, cell membrane, cytoplasm, "
                "mitochondria, and other organelles that help the cell function."
            ),
            model_url=None,
            is_published=True
        )

        db.add(lesson)
        db.commit()
        db.refresh(lesson)

        print(f"Created Animal Cells lesson with ID: {lesson.id}")

finally:
    db.close()
