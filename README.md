# ImmerseED — AR Science Capstone

University of North Texas | CSCE 4901 Capstone
Team: **Git Happens**

ImmerseED is an interactive science app that helps students in grades 4–8 understand cell structures and their functions through 3D models and augmented reality (AR). Students can explore cells beyond 2D textbook diagrams, take guided lessons, and check what they learned with quizzes.

**Who it's for:** students in grades 4–8, teachers of introductory cell biology, and anyone curious about cells.

---

## What's in this repo

| Folder | What it is |
| --- | --- |
| `frontend/ImmerseED/` | The app (Expo + React Native). Runs in a web browser for now. |
| `backend/` | The API (Python + FastAPI). Serves lessons and quizzes. |
| `docs/` | Architecture and requirements documents. |

---

## Before you start

Install these once:

- **Git**
- **Node.js** (the LTS version from [nodejs.org](https://nodejs.org)). Comes with `npm`.
- **Python 3** (for the backend)

Then clone the repo:

```bash
git clone https://github.com/codyswipe1-ui/Git-Happens-AR-Science-Cap-1.git
cd Git-Happens-AR-Science-Cap-1
```

---

## Run it in a web browser

You'll use **two terminal windows**: one for the backend, one for the app.

### Terminal 1: start the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API is now running at **http://localhost:8000**. Open **http://localhost:8000/docs** to see and try every endpoint.

Next time, you only need `source venv/bin/activate` and `uvicorn main:app --reload`.

### Terminal 2: start the app

```bash
cd frontend/ImmerseED
npm install
cp .env.example .env.local        # first time only
npx expo start --web
```

The app opens at **http://localhost:8081**. Edits to the code reload the page automatically.

> **Tip:** to see the phone layout in the browser, open your browser's developer tools (`Cmd + Option + I` on Mac, `F12` on Windows) and turn on the device toolbar.

**What works right now:** Home, Model Library, and the 3D model viewer. Running on a phone (with AR) is coming later.

---

## Command cheat sheet

| When | Where | Command |
| --- | --- | --- |
| Start the backend | `backend/` | `uvicorn main:app --reload` |
| Run backend tests | `backend/` | `pytest` |
| After cloning, or after someone adds packages | `frontend/ImmerseED/` | `npm install` |
| Start the app | `frontend/ImmerseED/` | `npx expo start --web` |
| Add a package | `frontend/ImmerseED/` | `npx expo install <package>` |

---

## Team workflow

1. Pull the latest `main`: `git checkout main && git pull`
2. Make a branch for your work: `git checkout -b feature/short-name`
3. Commit small, clear changes, then push: `git push -u origin feature/short-name`
4. Open a pull request into `main` and ask a teammate to review it.
5. After it's merged, delete the branch.

Never commit `.env.local`, `node_modules/`, or `venv/`.

---

## Features (planned and in progress)

- **Interactive 3D models:** rotate, zoom, and tap any part to learn what it is.
- **Exploded view:** separate and hide parts of a cell to see its structure.
- **Augmented reality:** place a cell in your room using your phone's camera.
- **Guided lessons:** learn the parts of a cell, one step at a time. Lessons unlock in order.
- **Quizzes:** check what you learned at the end of each lesson.
- **Cell types:** animal, plant, and human cells, with more to come.
- **Progress tracking:** track completed lessons and quizzes.
