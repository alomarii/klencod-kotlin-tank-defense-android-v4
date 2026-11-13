const {execSync}=require('child_process'),fs=require('fs'),r=c=>execSync(c,{stdio:'inherit'});
if(!fs.existsSync('android'))r('npx cap add android');
require('./patch-android.js');
r('npx cap sync android');r('npx cap open android');
