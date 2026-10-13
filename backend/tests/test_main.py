# Test files created with AI in order to ensure everything works during development 

from fastapi.testclient import TestClient
from main import app

# Create a test client for our FastAPI application
client = TestClient(app)


# Test the homepage
def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Welcome to ImmerseED!"
    }


# Test the health check
def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy"
    }


# Test the lessons endpoint
def test_get_lessons():
    response = client.get("/lessons/")

    assert response.status_code == 200

    lessons = response.json()

    assert isinstance(lessons, list)
    assert len(lessons) == 2
    assert lessons[0]["title"] == "Solar System"
    assert lessons[1]["title"] == "Human Heart"


# Test an endpoint that does not exist
def test_invalid_route():
    response = client.get("/does-not-exist")

    assert response.status_code == 404


# These tests use a simulated client to send GET requests to our API endpoints
# They verify that each endpoint returns the expected HTTP status code and data