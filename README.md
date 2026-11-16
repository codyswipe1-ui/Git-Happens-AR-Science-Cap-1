# ImmerseED — AR Science Capstone

University of North Texas | CSCE 4901 Capstone
Team: **Git Happens**

ImmerseED is an interactive science app that helps students in grades 4–8 understand cell structures and their functions through 3D models and augmented reality (AR). Students can explore cells beyond 2D textbook diagrams, take guided lessons, and check what they learned with quizzes.

**Who it's for:** students in grades 4–8, teachers of introductory cell biology, and anyone curious about cells.

---

## What's in this repo

| Folder | What it is |
| --- | --- |
| `frontend/ImmerseED/` | The app (Expo + React Native). One codebase runs on iPhone, Android, and in a web browser. |
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

## Run it in a web browser (quickest way to see the app)

No Xcode or phone needed. You'll use **two terminal windows**: one for the backend, one for the app.

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

**What works in the browser:** Home, Model Library, and the 3D model viewer. **AR does not run in a browser**; it needs the phone app below.

---

## Run it on your phone (iPhone)

AR uses ViroReact, which has native code, so the **Expo Go app will not work**. You build the app onto your own phone instead. You need a **Mac with Xcode** and a **real iPhone or iPad** (the simulator has no camera). A free Apple ID is enough.

### One-time setup

1. Install **Xcode** from the Mac App Store. Open it once and accept the license.
2. In Xcode, go to **Settings → Accounts** and sign in with your Apple ID.
3. Plug in your iPhone with a cable and tap **Trust**. On the iPhone, turn on **Settings → Privacy & Security → Developer Mode** and restart it.
4. In `frontend/ImmerseED/.env.local`, fill in:
   - `RV_API_KEY`: ask Aminat privately. **Never commit it.**
   - `IOS_BUNDLE_ID`: your own, for example `com.yourname.immerseed` (everyone needs a different one).
   - `APPLE_TEAM_ID`: Xcode → Settings → Accounts → your Apple ID → Team ID (10 characters).

### Build the app onto your phone

```bash
cd frontend/ImmerseED
npm install
npx expo run:ios --device
```

Pick your iPhone from the list. The first build takes several minutes.

- **"No profiles for '…' were found":** run `open ios/ImmerseED.xcworkspace`, click **ImmerseED → Signing & Capabilities**, check **Automatically manage signing**, pick your Team, close Xcode, and run the command again.
- **"Untrusted Developer" on the phone:** go to **Settings → General → VPN & Device Management**, trust your Apple ID, and open the app again.

### Everyday use (app already on your phone)

```bash
cd frontend/ImmerseED
npx expo start
```

Open ImmerseED on your phone. Code changes reload automatically.

### Connecting the phone to the backend

On a phone, `localhost` means the phone itself, not your computer. To reach the backend:

1. Find your computer's network address: **System Settings → Wi-Fi → Details** (looks like `192.168.1.23`).
2. In `.env.local`, set `EXPO_PUBLIC_API_URL=http://192.168.1.23:8000` (your address).
3. Start the backend so other devices can reach it:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0
   ```
4. Restart `npx expo start` so it picks up the new address.

### Phone can't find your computer?

- Your phone and computer must be on the **same Wi-Fi**.
- **School or public Wi-Fi often blocks devices from seeing each other.** Use your phone's hotspot, or keep the phone plugged in with a cable.
- If `npx expo run:ios --device` shows a QR code instead of building, you ran `npx expo start` by mistake.
- The free Apple ID only lasts 7 days. If the app stops opening, run `npx expo run:ios --device` again.

---

## Command cheat sheet

| When | Where | Command |
| --- | --- | --- |
| Start the backend | `backend/` | `uvicorn main:app --reload` |
| Run backend tests | `backend/` | `pytest` |
| After cloning, or after someone adds packages | `frontend/ImmerseED/` | `npm install` |
| Work in the browser | `frontend/ImmerseED/` | `npx expo start --web` |
| First phone build, or after adding a native package | `frontend/ImmerseED/` | `npx expo run:ios --device` |
| Everyday phone development | `frontend/ImmerseED/` | `npx expo start` |
| Add a package | `frontend/ImmerseED/` | `npx expo install <package>` |
| Build broken after big changes | `frontend/ImmerseED/` | `npx expo prebuild --clean`, then `npx expo run:ios --device` |

More detail on the app: [`frontend/ImmerseED/README.md`](frontend/ImmerseED/README.md).

---

## Team workflow

1. Pull the latest `main`: `git checkout main && git pull`
2. Make a branch for your work: `git checkout -b feature/short-name`
3. Commit small, clear changes, then push: `git push -u origin feature/short-name`
4. Open a pull request into `main` and ask a teammate to review it.
5. After it's merged, delete the branch.

Never commit `.env.local`, `node_modules/`, `ios/`, `android/`, or `venv/`.

---

## Features (planned and in progress)

- **Interactive 3D models:** rotate, zoom, and tap any part to learn what it is.
- **Exploded view:** separate and hide parts of a cell to see its structure.
- **Augmented reality:** place a cell in your room using your phone's camera.
- **Guided lessons:** learn the parts of a cell, one step at a time. Lessons unlock in order.
- **Quizzes:** check what you learned at the end of each lesson.
- **Cell types:** animal, plant, and human cells, with more to come.
- **Progress tracking:** track completed lessons and quizzes.
