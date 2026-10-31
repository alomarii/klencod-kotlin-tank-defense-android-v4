# دفاع الدبابات v4 — 40 مرحلة · 10 عوالم · 7 أبراج · 6 لغات
برمجة وتصميم: محمد العمري 730215825

## بناء ملف APK (مشروع أندرويد أصلي — بدون Node ولا Capacitor)
- من Klencod / GitHub Actions: شغّل `./gradlew assembleDebug` (أو `gradle assembleDebug`) من جذر المشروع.
- الملف الناتج: `app/build/outputs/apk/debug/app-debug.apk`
- من Android Studio: افتح المجلد ثم Build ← Build APK(s).

## مكان ملفات اللعبة
- ملفات اللعبة داخل التطبيق: `app/src/main/assets/` (index.html و game.js).
- نسخة `www/` مطابقة لها لتشغيل اللعبة كتطبيق ويب (PWA) على أي استضافة HTTPS.
- عند تعديل game.js عدّله في المكانين (أو انسخه).
