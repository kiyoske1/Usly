@echo off
chcp 65001 >nul
cd /d "%~dp0"
call npm i || goto err
call npm run fb || goto err
if not exist android (call npx cap add android || goto err)
call npx cap sync android || goto err
xcopy /E /Y /I "android-res\*" "android\app\src\main\res\" >nul
echo Готово. В Android Studio: Build - Build APK(s)
pause & exit /b 0
:err
echo ОШИБКА. Пришли текст.
pause & exit /b 1
