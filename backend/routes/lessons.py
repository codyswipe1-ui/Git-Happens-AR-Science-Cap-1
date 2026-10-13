from fastapi import APIRouter

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)

# Decorator calling function when / is visited to display functions (temp for now)
@router.get("/")
def get_lessons():
    return [
        {
            "id": 1,
            "title": "Solar System",
            "subject": "Astronomy"
        },
        {
            "id": 2,
            "title": "Human Heart",
            "subject": "Biology"
        }
    ]
