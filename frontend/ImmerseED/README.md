# ImmerseED app (Expo / React Native)

The ImmerseED front end: one codebase that runs as an iPhone/Android app and in a web browser.

| Screen | File | Phone app | Browser |
| --- | --- | --- | --- |
| Home (login) | `src/app/index.tsx` | Yes | Yes |
| Explore (AR) | `src/app/explore.tsx` (phone), `src/app/explore.web.tsx` (browser) | Full AR with ViroReact | Placeholder message |

Expo picks `explore.web.tsx` automatically when running in a browser, so the AR library never loads there.

## Quick start: browser only (no Xcode needed)

Use this for building screens, or for back-end work.

```bash
cd frontend/ImmerseED
npm install
npx expo start --web
```

## Full setup: iPhone app with AR

AR needs a real iPhone or iPad (the simulator has no camera) and a Mac with Xcode. A free Apple ID is enough; no paid developer account is needed.

### One-time setup

1. Install **Xcode** from the Mac App Store. Open it once, accept the license, and let it install components.
2. In Xcode, go to **Settings → Accounts** and sign in with your Apple ID.
3. Plug in your iPhone and tap **Trust**. On the iPhone, turn on **Settings → Privacy & Security → Developer Mode** and restart.
4. Create your environment file:
   ```bash
   cd frontend/ImmerseED
   cp .env.example .env.local
   ```
   Then fill in `.env.local`:
   - `RV_API_KEY`: ask Aminat privately. Never commit it.
   - `IOS_BUNDLE_ID`: your own, for example `com.yourname.immerseed` (each person needs a different one).
   - `APPLE_TEAM_ID`: Xcode → Settings → Accounts → your Apple ID → Team ID (10 characters).

   Format is `NAME=value`, one per line: no quotes, colons, or commas.

### Build to your phone

```bash
npm install
npx expo run:ios --device
```

**First build only:** if you get *"No profiles for '…' were found"*, open the project in Xcode once so it can create a signing profile:

```bash
open ios/ImmerseED.xcworkspace
```

Click the blue **ImmerseED** project → **TARGETS: ImmerseED** → **Signing & Capabilities**. Make sure **Automatically manage signing** is checked and your Team is selected, wait for the red errors to clear, then close Xcode and run `npx expo run:ios --device` again.

Pick your iPhone from the list. The first build takes several minutes. If the phone says **Untrusted Developer**, go to **Settings → General → VPN & Device Management**, trust your Apple ID, and open the app again.

### Everyday development

Once the app is on your phone:

```bash
npx expo start
```

Open the ImmerseED app on your phone; code changes reload automatically.

## Command cheat sheet

| When | Command |
| --- | --- |
| After cloning, or after someone adds packages | `npm install` |
| Adding a package | `npx expo install <package>` |
| First phone build, or after adding a native package | `npx expo run:ios --device` |
| Everyday coding (app already on phone) | `npx expo start` |
| Working in the browser | `npx expo start --web` |
| Build is broken after big changes | `npx expo prebuild --clean`, then `npx expo run:ios --device` |
| App stops opening after 7 days (free Apple ID limit) | `npx expo run:ios --device` again |

## Notes

- **Expo Go doesn't work** for the phone app, because ViroReact includes native code. Use the device build above.
- `ios/`, `android/`, `node_modules/`, and `.env.local` are generated or private and are ignored by Git.
- `app.json` holds the shared app settings. `app.config.js` adds the AR settings and reads private values from `.env.local`.
- The AR scene currently comes from ReactVision Studio (scene ID in `src/app/explore.tsx`).
