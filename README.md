# usly для Android Studio
1. Нужны Node.js 20+ и Android Studio.
2. Запусти `setup.bat` двойным кликом (ставит Capacitor, собирает Firebase-бандл, создаёт папку android, открывает Android Studio).
3. В Android Studio дождись окончания Gradle sync, затем Build → Build Bundle(s) / APK(s) → Build APK(s). Готовый файл: android/app/build/outputs/apk/debug/app-debug.apk
4. Пока не публикуй `firestore.rules`: сначала проверь на телефоне создание пары и подключение второго устройства. Anonymous в Firebase Authentication должен быть включён.
После правки файлов в www: `npx cap sync android` и пересобрать APK.
