# Guide: Setup React Native + Expo + Android Emulator in Ubuntu

## 1. Setup Node.js and Package Manager

Install Node.js and a package manager (yarn/npm).

## 2. Create Expo Project

### 2.1. Install Expo CLI

```bash
sudo npm install -g expo-cli
```

### 2.2. Create New Project

```bash
cd /path/to/project/folder
expo init MyProject
```

### 2.3. Check Versions

- Check Expo SDK version:

```bash
  npm show expo version
```

- Check Expo CLI version:

```bash
  expo --version
```

## 3. Install Java JDK

```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

## 4. Run Expo App in Emulator

### 4.1. Install Android Studio

1. Download Android Studio from [https://developer.android.com/studio/#downloads]

2. Extract and install:

```bash
   cd ~/Downloads
   tar -xzvf android-studio-*.tar.gz
   sudo mv android-studio /opt/
```

3. Install dependencies (for 64-bit Debian-based Linux):

```bash
   sudo apt-get install libc6 libncurses5 libstdc++6 lib32z1 libbz2-1.0
```

4. Run Android Studio:

```bash
   cd /opt/android-studio/bin
   sudo ./studio.sh
```

Follow the setup instructions.

### 4.2. Create Virtual Device

1. Open Android Studio
2. Click **More Actions** → **Virtual Device Manager**
3. Click **Create Virtual Device**
4. Follow the wizard to create your emulator

### 4.3. Run Expo App

```bash
cd MyProject
yarn start
# Press 'a' to open Android emulator
```

### 4.4. Troubleshooting (Optional)

**Error:** Failed to resolve the Android SDK path or `spawn adb ENOENT`

**Possible causes:**

- Android SDK is not installed
- `ANDROID_HOME` or `PATH` environment variables are not set correctly
- Terminal does not recognize Android environment variables

**Solution:**

1. Check Android SDK location and adb device availability

2. Create symbolic link (if needed):

```bash
   ln -s $HOME/Android/Sdk $HOME/Android/sdk
```

3. Configure environment variables:

```bash
   nano ~/.bashrc
```

4. Add the following lines at the end of the file:

```bash
   # Android SDK
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

5. Apply changes:

```bash
   source ~/.bashrc
```

---

## Quick Reference

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `expo init ProjectName` | Create new Expo project                            |
| `expo --version`        | Check Expo CLI version                             |
| `yarn start`            | Start development server                           |
| `a`                     | Open Android emulator (when dev server is running) |

## Setup Prettier + ESLint

```bash
yarn add -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-prettier eslint-config-prettier
```

- Create ESLint configuration (eslint.config.js) + Prettier configuration (.prettierrc.json)
- Add scripts to package.json

```bash
"scripts":
{
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
  "format": "prettier --write ."
}
```

- run lint & format

```bash
  yarn lint
  yarn lint:fix
  yarn format
```
