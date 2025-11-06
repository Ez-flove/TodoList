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

**Solution:** Config environment variables:

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

# Structure:

```bash
src
 ┣ assets
 ┃ ┗ images
 ┃ ┃ ┗ logo.png
 ┣ components
 ┃ ┣ EmptyState.tsx
 ┃ ┣ FilterTabs.tsx
 ┃ ┣ SearchBar.tsx
 ┃ ┣ TodoInput.tsx
 ┃ ┗ TodoItem.tsx
 ┣ const
 ┃ ┗ utils.ts
 ┣ screens
 ┃ ┗ HomeScreen.tsx
 ┣ store
 ┃ ┣ hooks.ts
 ┃ ┣ store.ts
 ┃ ┗ todoSlice.ts
 ┗ types
 ┃ ┗ todo.ts
```

- assets/ : các tài nguyên tĩnh như ảnh, icon, fonts,...
- component/ : chứa UI components độc lập, có thể tái sử dụng trong toàn app.
- const/ : hằng số hoặc function(utils) dùng chung, tránh lặp lại logic ở nhiều nơi.
- screens/ : UI các screen của app (HomeScreen)
- store/: quản lý global state (dùng Redux Toolkit.) :
  - store.ts: tạo store chính (configureStore của Redux Toolkit).
  - todoSlice.ts: chứa logic cho danh sách todo (state + reducers + actions).
  - hooks.ts : custom hooks giúp type safety, gọn code
- types/ : định nghĩa type, interface, enum

# Coding Standard:

General

- Hạn chế để lại các import, variable không sử dụng trong file.
- Sử dụng const và let, hạn chế sử dụng var
- Đặt tên, comment có ý nghĩa.
- Sử dụng Functional Component thay vì Class Component
- No any type
- Tách logic ra khỏi UI (sử dụng hooks hoặc helper functions nếu cần)
- nguyên tắc Single Responsibility Principle (SRP) — mỗi component/hàm nên chỉ có 1 nhiệm vụ rõ ràng.

Naming convention:

- Đặt tên rõ ràng, có ngữ nghĩa. Tránh viết tắt trừ khi là ký hiệu quen thuộc (như id, url)
- PascalCase: component/interface/type/enum/type
- camelCase: variable/parameter/function/method
- CONSTANT_CASE: global_constant/enum_member

Import:

- Ưu tiên sử dụng absolute path
- Sử dụng relative path trong case file ở cùng thư mục.

Style:

- Ưu tiên sử dụng base style.
- Tránh sử dụng inline style, ưu tiên sử dụng StyleSheet.

File & Folder Structure:

- tổ chức có thể bảo trì, dễ đọc và có khả năng mở rộng.

Code Formatting:

- Config Prettier và ESLint để tự động format.

# React Native Best Practices:

- Khả năng mở rộng
- Tính nhất quán
- Dễ bảo trì
- Dễ đọc

1. Folder structure: 
   - Tùy theo yêu cầu kiến trúc cụ thể cho lĩnh vực hoặc tính năng

2. Performance Optimization:
   - Sử dụng React.memo() cho components không cần re-render thường xuyên
   - Tránh inline styles trong render method
   - Sử dụng useMemo và useCallback để tối ưu performance
   - Lazy loading components và images
   - Sử dụng FlatList thay vì ScrollView cho danh sách dài

3. State Management:
   - Sử dụng Redux Toolkit cho global state
   - Local state nên sử dụng useState hook
   - Tránh prop drilling bằng cách sử dụng Context API hoặc Redux

4. Components:
   - Chia nhỏ components theo nguyên tắc Single Responsibility
   - Sử dụng React.memo() cho các component pure
   - Tránh nested ternary operators
   - Sử dụng TypeScript để type checking

5. Navigation:
   - Sử dụng React Navigation
   - Tổ chức navigation theo stack/tab rõ ràng
   - Tránh deep nesting navigation
   - Xử lý navigation params type-safe

6. Error Handling:
   - Logging errors đầy đủ
   - Hiển thị user-friendly error messages

7. Assets Management:
   - Tối ưu kích thước images
   - Sử dụng proper image formats (webp, png)
   - Lazy load không cần thiết assets

8. Security:
   - Input validation
   - API security

9. Styling Best Practices:
    - Sử dụng StyleSheet.create:
    - Tách styles ra file riêng cho components lớn
    - Sử dụng theme system cho colors, spacing, typography
    - Tránh magic numbers, sử dụng constants
    - Tổ chức styles theo logical groups
    - Tránh position: absolute khi không cần thiết
    - Sử dụng scale factor cho responsive font sizes

12. Props Best Practices:
    - TypeScript interface cho props
    - Props spreading hạn chế:
      ```typescript
      // Không nên
      <Component {...props} />
      // Nên
      <Component
        title={props.title}
        onPress={props.onPress}
      />
      ```
    - Props validation với TypeScript/PropTypes
    - Destructure props ở đầu component
    - Required vs Optional props rõ ràng
    - Memoize callback props với useCallback
    - Linting (ESLint)
    - Code formatting (Prettier)
    - Documentation

