# Fitistic Android automation — JavaScript, Cucumber BDD, Appium

Targets the installed Play Store app `com.yuviso.fitistic` using WebdriverIO and UiAutomator2. This is native Android automation, so Playwright is not used.

## Windows prerequisites

1. Install Node.js 22 LTS (22.12 or newer) and JDK 17; configure JAVA_HOME.
2. Install Android Studio. In SDK Manager install Android SDK Platform Tools, Command-line Tools, an SDK Platform and (for emulators) Android Emulator plus a Google Play system image.
3. Set ANDROID_HOME to your Android SDK directory (usually `%LOCALAPPDATA%\Android\Sdk`). Add its `platform-tools` and `emulator` directories to PATH. Open a new PowerShell terminal.
4. On a phone, enable Developer Options and USB debugging, connect USB, authorize the computer, and install the manufacturer's USB driver if necessary. Or start a Google Play enabled emulator and install Fitistic from the Play Store.
5. Check `java -version`, `node --version` and `adb devices`. The target must be listed as `device`, not `unauthorized` or `offline`.

## Install and start (PowerShell, repository directory)

```powershell
npm ci
npx appium driver install uiautomator2
npx appium driver doctor uiautomator2
Copy-Item .env.example .env
```

Edit `.env`: set ANDROID_UDID to the serial from `adb devices` and set test email/password locally if testing email login. Never commit credentials. Run `adb shell pm path com.yuviso.fitistic` (add `-s SERIAL` after `adb` with multiple devices) to confirm installation.

In one terminal, run `npm run appium`. Keep it running. In another, check:

```powershell
Invoke-RestMethod http://127.0.0.1:4723/status
npm run check
```

Install Appium Inspector separately. Connect to host `127.0.0.1`, port `4723`, path `/`, with capabilities:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:udid": "YOUR_DEVICE_SERIAL",
  "appium:appPackage": "com.yuviso.fitistic",
  "appium:noReset": true,
  "appium:autoLaunch": false
}
```

Open Fitistic manually before inspection. Replace the screenshot-derived candidates in `config/selectors.js` with verified accessibility or resource IDs. If the app exposes no useful elements, investigate its accessibility tree rather than assuming screenshot text is a valid locator. End the Inspector session before running tests on that device.

## Run scenarios

**Email login:** manually handle notification permission and introductory screens, then open the email login form with a logged-out dedicated test account. Run:

```powershell
npm run test:login
```

**Post-Google signup:** manually tap Sign in with Google and select a dedicated new test account. Stop at Terms & Guidelines, then run:

```powershell
npm run test:onboarding
```

This scenario accepts the app's terms and saves the test profile: Build Muscle & Strength, 175 cm, 70 kg, Moderately Active. Use a test account for which these actions are intended. It checks BMI 22.9 and the home dashboard. It does not automate Google credentials or the Google account picker.

`noReset` preserves the installed app and session. Onboarding is not repeatable with an already-onboarded account unless the app provides a supported profile reset or another new test account is used. Login and onboarding scenarios have different starting states and run separately by tag. Class booking is not implemented because no booking screens have been provided.

## Validation status

JavaScript syntax, Gherkin parsing, dependency installation and local Appium readiness can be checked in cloud. Actual Android scenarios remain unverified until a device is connected and selectors are confirmed. No Android device/emulator is available in the current cloud environment; run device tests on Windows. A passing `npm run check` is not an end-to-end test result.
