from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_get_quiz_hides_answers():
    response = client.get("/quizzes/animal-cell")

    assert response.status_code == 200

    quiz = response.json()
    assert quiz["id"] == "animal-cell"
    assert len(quiz["questions"]) == 3

    for question in quiz["questions"]:
        assert set(question) == {"id", "question", "choices"}
        assert set(question["choices"]) == {"A", "B", "C", "D"}


def test_get_unknown_quiz():
    response = client.get("/quizzes/unknown-quiz")

    assert response.status_code == 404
    assert response.json() == {"detail": "Quiz not found"}


def test_submit_all_correct():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {"1": "B", "2": "C", "3": "A"}}
    )

    assert response.status_code == 200

    result = response.json()
    assert result["score"] == 3
    assert result["total"] == 3
    assert result["percentage"] == 100
    assert len(result["results"]) == 3
    assert all(item["is_correct"] for item in result["results"])


def test_submit_one_wrong():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {"1": "A", "2": "C", "3": "A"}}
    )

    assert response.status_code == 200

    result = response.json()
    assert result["score"] == 2
    assert result["percentage"] == 66.67

    first = result["results"][0]
    assert first["is_correct"] is False
    assert first["selected_answer"] == "A"
    assert first["correct_answer"] == "B"
    assert first["explanation"]


def test_submit_invalid_choice():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {"1": "Z"}}
    )

    assert response.status_code == 400
    assert response.json() == {
        "detail": "Invalid choice for question 1"
    }


def test_submit_unknown_question():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {"99": "A"}}
    )

    assert response.status_code == 400
    assert response.json() == {"detail": "Unknown question ID: 99"}


def test_submit_missing_answers():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {"1": "B"}}
    )

    assert response.status_code == 200

    result = response.json()
    assert result["score"] == 1
    assert result["total"] == 3
    assert result["percentage"] == 33.33

    for item in result["results"][1:]:
        assert item["selected_answer"] is None
        assert item["is_correct"] is False


def test_submit_empty_answers():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={"answers": {}}
    )

    assert response.status_code == 200

    result = response.json()
    assert result["score"] == 0
    assert result["percentage"] == 0
    assert len(result["results"]) == 3
    assert all(not item["is_correct"] for item in result["results"])


def test_submit_unknown_quiz():
    response = client.post(
        "/quizzes/unknown-quiz/submit",
        json={"answers": {}}
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Quiz not found"}


def test_submit_missing_answers_field():
    response = client.post(
        "/quizzes/animal-cell/submit",
        json={}
    )

    assert response.status_code == 422