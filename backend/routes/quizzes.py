from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from quiz_data import QUIZZES

router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)


@router.get("/{quiz_id}")
def get_quiz(quiz_id: str):
    quiz = QUIZZES.get(quiz_id)

    if quiz is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )

    questions = []

    for question in quiz["questions"]:
        questions.append({
            "id": question["id"],
            "question": question["question"],
            "choices": question["choices"]
        })

    return {
        "id": quiz_id,
        "title": quiz["title"],
        "questions": questions
    }

   
class QuizSubmission(BaseModel):
    answers: dict[int, str]


@router.post("/{quiz_id}/submit")
def submit_quiz(quiz_id: str, submission: QuizSubmission):
    quiz = QUIZZES.get(quiz_id)

    if quiz is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )

    questions_by_id = {
        question["id"]: question
        for question in quiz["questions"]
    }

    for question_id, answer in submission.answers.items():
        if question_id not in questions_by_id:
            raise HTTPException(
                status_code=400,
                detail=f"Unknown question ID: {question_id}"
            )

        if answer not in questions_by_id[question_id]["choices"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid choice for question {question_id}"
            )

    score = 0
    results = []

    for question in quiz["questions"]:
        selected_answer = submission.answers.get(question["id"])
        is_correct = selected_answer == question["correct_answer"]

        if is_correct:
            score += 1

        results.append({
            "question_id": question["id"],
            "selected_answer": selected_answer,
            "correct_answer": question["correct_answer"],
            "is_correct": is_correct,
            "explanation": question["explanation"]
        })

    total = len(quiz["questions"])

    return {
        "quiz_id": quiz_id,
        "score": score,
        "total": total,
        "percentage": round(score / total * 100, 2),
        "results": results
    }