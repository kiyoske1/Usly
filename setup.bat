@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1 || (echo Установи Node.js 20+ LTS с nodejs.org и запусти снова & pause & exit /b 1)
echo [1/4] Установка Capacitor...
call npm i || goto err
echo [2/4] Сборка Firebase-бандла...
call npm run fb || goto err
echo [3/4] Android-проект...
if not exist android (call npx cap add android || goto err)
call npx cap sync android || goto err
echo [4/4] Открываю Android Studio...
call npx cap open android
echo Готово. В Android Studio: Build - Build Bundle(s) / APK(s) - Build APK(s)
pause & exit /b 0
:err
echo ОШИБКА на шаге выше. Пришли текст ошибки.
pause & exit /b 1
