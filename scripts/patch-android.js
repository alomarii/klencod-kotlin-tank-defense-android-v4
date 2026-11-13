// يضبط مشروع أندرويد: شاشة أفقية + ملء الشاشة (يعمل تلقائياً مع npm run android)
const fs=require('fs'),A='android/app/src/main/';
const m=A+'AndroidManifest.xml';
if(fs.existsSync(m)){let s=fs.readFileSync(m,'utf8');if(!s.includes('screenOrientation'))s=s.replace('<activity','<activity android:screenOrientation="sensorLandscape"');fs.writeFileSync(m,s)}
const st=A+'res/values/styles.xml';
if(fs.existsSync(st)){let s=fs.readFileSync(st,'utf8');if(!s.includes('windowFullscreen'))s=s.replace('<item name="windowNoTitle">true</item>','<item name="windowNoTitle">true</item>\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>');fs.writeFileSync(st,s)}
console.log('Android project patched: landscape + fullscreen');
