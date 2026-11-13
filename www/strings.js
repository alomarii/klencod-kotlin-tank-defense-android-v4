'use strict';
/* strings.js — نصوص إضافية بـ 6 لغات (ar, en, fr, es, tr, ru) */
const NEWSTR={
l4:['غابة الظلال','Shadow Forest','Forêt des ombres','Bosque sombra','Gölge Ormanı','Лес теней'],
l5:['واحة السراب','Mirage Oasis','Oasis mirage','Oasis espejismo','Seraplı Vaha','Оазис миражей'],
l6:['حلزون الجليد','Glacier Spiral','Spirale glaciaire','Espiral glacial','Buzul Sarmalı','Ледяная спираль'],
l7:['قلب الجحيم','Inferno Core','Cœur infernal','Núcleo infernal','Cehennem Çekirdeği','Адское ядро'],
settings:['الإعدادات','Settings','Paramètres','Ajustes','Ayarlar','Настройки'],
music:['الموسيقى','Music','Musique','Música','Müzik','Музыка'],
sfx:['المؤثرات الصوتية','Sound FX','Effets sonores','Efectos','Ses efektleri','Эффекты'],
lang:['اللغة','Language','Langue','Idioma','Dil','Язык'],
resume:['متابعة','Resume','Reprendre','Continuar','Devam','Продолжить'],
paused:['إيقاف مؤقت','Paused','Pause','Pausa','Duraklatıldı','Пауза'],
best:['الأفضل','Best','Record','Mejor','En iyi','Рекорд'],
nextw:['الموجة التالية','Next wave','Vague suivante','Siguiente oleada','Sonraki dalga','След. волна'],
tap:['المس الشاشة للبدء','Tap to start','Touchez pour commencer','Toca para empezar','Başlamak için dokun','Нажмите, чтобы начать'],
hint:['اسحب وأفلت لبناء برج · المس البرج لتطويره','Drag & drop to build · Tap a turret to upgrade','Glissez pour construire · Touchez une tourelle pour l’améliorer','Arrastra para construir · Toca una torreta para mejorarla','Sürükle ve bırak, inşa et · Geliştirmek için kuleye dokun','Перетащите, чтобы построить · Нажмите на башню для улучшения'],
close:['إغلاق','Close','Fermer','Cerrar','Kapat','Закрыть']};
const NEWLV=[
{th:'grass',w:18,hm:2.0,gold:450,P:[[-70,600],[300,600],[300,200],[600,200],[600,520],[900,520],[900,150],[1190,150]]},
{th:'sand',w:20,hm:2.2,gold:480,P:[[-70,330],[160,330],[160,580],[480,580],[480,150],[800,150],[800,580],[1100,580],[1100,330],[1190,330]]},
{th:'snow',w:22,hm:2.4,gold:520,P:[[-70,130],[1100,130],[1100,580],[180,580],[180,280],[860,280],[860,430],[520,430]]},
{th:'lava',w:25,hm:2.7,gold:560,P:[[-70,600],[240,600],[240,330],[520,330],[520,600],[800,600],[800,330],[1060,330],[1060,150],[1190,150]]}];
