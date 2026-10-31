'use strict';
const $=i=>document.getElementById(i),W=1280,H=720,PW=64,R=Math.random,TAU=Math.PI*2;
const ORIG=[
[[-70,130],[1040,130],[1040,300],[240,300],[240,470],[1040,470],[1040,560],[1170,560]],
[[-70,170],[300,170],[300,430],[640,430],[640,170],[980,170],[980,520],[1170,520]],
[[-70,540],[220,540],[220,200],[520,200],[520,500],[820,500],[820,200],[1120,200],[1120,400],[1190,400]],
[[-70,350],[200,350],[200,160],[460,160],[460,520],[760,520],[760,160],[1040,160],[1040,540],[1180,540]]];
const THN=['grass','sand','snow','lava','swamp','autumn','canyon','city','toxic','void'],NW=THN.length,WI=['🌳','🏜️','🏔️','🌋','🐊','🍂','🏞️','🏙️','☢️','🌌'];
function mulb(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function genPath(i){const r=mulb(i*7919+101),fam=(i+(i>>2))%4,J=a=>(r()-.5)*2*a;let P=[];
if(fam==0){const rows=3+(r()<.5?1:0),y0=125+r()*15,y1=535+r()*10,g=(y1-y0)/(rows-1),ys=[];for(let k=0;k<rows;k++)ys.push(Math.round(y0+g*k+(k&&k<rows-1?J(g*.12):0)));
P.push([-70,ys[0]]);for(let k=0;k<rows-1;k++){const x=Math.round(k%2==0?900+r()*180:170+r()*160);P.push([x,ys[k]]);P.push([x,ys[k+1]])}P.push([(rows-1)%2==0?1170:110,ys[rows-1]])}
else if(fam==1||fam==3){const cols=fam==1?7:5,x0=150+r()*20,x1=1130-r()*20,g=(x1-x0)/(cols-1),xs=[];for(let k=0;k<cols;k++)xs.push(Math.round(x0+g*k+(k&&k<cols-1?J(g*.1):0)));
P.push([xs[0],-70]);for(let k=0;k<cols-1;k++){const y=Math.round(k%2==0?495+r()*45:125+r()*30);P.push([xs[k],y]);P.push([xs[k+1],y])}P.push([xs[cols-1],(cols-1)%2==0?525:135])}
else{const R_=1150+r()*20,L_=110+r()*25,t1=118+r()*12,b1=538+r()*8,t2=t1+135+r()*20,b2=b1-130-r()*15,R2=R_-150-r()*50,B=330+r()*120;
P=[[-70,t1],[R_,t1],[R_,b1],[L_,b1],[L_,t2],[R2,t2],[R2,b2],[B,b2]].map(p=>[Math.round(p[0]),Math.round(p[1])])}
if(r()<.5)P=P.map(p=>[1280-p[0],p[1]]);return P}
const LV=[];for(let i=0;i<NW*4;i++){const w=i>>2,j=i&3;LV.push({th:THN[w],wd:w,w:10+(i*.5|0),hm:+(1+i*.06).toFixed(2),gold:280+i*22,P:j==0&&w<4?ORIG[w]:genPath(i)})}
const TH={
grass:{g:['#2f6b3a','#3f8a47','#234f2c'],h:[95,130],bl:[55,22,50],bn:3600,dk:'rgba(10,40,15,.28)',lt:'rgba(140,210,100,.2)',rd:['#2f2118','#74553a','#86653f'],fl:['#fff','#ffd54a','#ff8a80','#b39ddb'],pr:'tree',vg:'rgba(0,10,5,.62)',am:'pollen'},
sand:{g:['#c9a368','#dcb87c','#a98450'],h:[32,42],bl:[40,45,66],bn:1400,dk:'rgba(120,80,30,.25)',lt:'rgba(255,232,175,.28)',rd:['#4a3a26','#8f7650','#a38a5e'],fl:['#b5803f','#8a5a2b'],pr:'cactus',vg:'rgba(50,25,0,.5)',am:'dust'},
snow:{g:['#cfdde8','#eef5fb','#a9bdcc'],h:[200,215],bl:[20,80,95],bn:900,dk:'rgba(90,120,160,.22)',lt:'rgba(255,255,255,.6)',rd:['#3d4650','#7b8794','#98a4b0'],fl:['#9fd3ff','#fff'],pr:'pine',vg:'rgba(5,15,40,.55)',am:'snow'},
lava:{g:['#2a2220','#3b2f2b','#1a1413'],h:[10,25],bl:[15,12,26],bn:1200,dk:'rgba(0,0,0,.4)',lt:'rgba(120,85,70,.24)',rd:['#120d0c','#4a3a34','#5d4a42'],fl:['#ff6a2b','#ffb300'],pr:'rock',vg:'rgba(25,0,0,.72)',am:'ember'}};
Object.assign(TH.grass,{cc:'#6bd46f'});Object.assign(TH.sand,{cc:'#e6b866'});Object.assign(TH.snow,{cc:'#8fd8ff'});Object.assign(TH.lava,{cc:'#ff6a2b'});
Object.assign(TH,{
swamp:{g:['#2c4a36','#3a5e40','#1e3626'],h:[110,160],bl:[40,20,42],bn:2400,dk:'rgba(5,25,15,.35)',lt:'rgba(120,170,110,.18)',rd:['#241d12','#5b4a30','#6e5a3a'],fl:['#9bd36a','#d6e86a'],pr:'dtree',vg:'rgba(0,15,10,.7)',am:'pollen',pl:['rgba(20,80,80,.65)',0],cc:'#7fd6a2'},
autumn:{g:['#6b4a28','#8a6030','#4f3720'],h:[20,45],bl:[55,28,52],bn:3200,dk:'rgba(60,25,5,.3)',lt:'rgba(255,190,90,.22)',rd:['#2a1c10','#7a5a3a','#8f6b45'],fl:['#ff8a3d','#ffc83d','#d4452a'],pr:'tree',tc:['#e8a23a','#8a3a12'],vg:'rgba(30,10,0,.6)',am:'leaf',cc:'#ff9a3d'},
canyon:{g:['#b5603a','#cf7a4b','#8f4a2c'],h:[10,25],bl:[50,30,50],bn:1100,dk:'rgba(80,25,5,.28)',lt:'rgba(255,190,140,.26)',rd:['#3a2216','#80563a','#946648'],fl:['#7a3a1c','#e0a070'],pr:'rock',vg:'rgba(45,10,0,.55)',am:'dust',cc:'#e0794a'},
city:{g:['#3a3f47','#4b515b','#2a2e35'],h:[210,230],bl:[8,25,40],bn:300,dk:'rgba(0,0,0,.4)',lt:'rgba(150,170,200,.18)',rd:['#14161a','#2e323a','#3e434c'],fl:['#8a93a0','#ffc83d'],pr:'crate',vg:'rgba(0,5,15,.68)',am:'rain',cc:'#9aa8ba'},
toxic:{g:['#2a3a1e','#3b5226','#1c2814'],h:[75,110],bl:[60,25,45],bn:1800,dk:'rgba(10,25,0,.35)',lt:'rgba(170,255,90,.16)',rd:['#1a1f12','#4a5a30','#5c6e3a'],fl:['#b6ff3d','#6aff9a'],pr:'crystal',pc:['#9dff4a','#2a6a10'],vg:'rgba(10,25,0,.7)',am:'ember',ac:'#9dff4a',pl:['rgba(150,255,60,.5)',1],cc:'#a6ff3d'},
void:{g:['#1a1530','#271f48','#120e22'],h:[250,290],bl:[45,22,40],bn:1000,dk:'rgba(0,0,10,.4)',lt:'rgba(150,120,255,.2)',rd:['#0a0818','#2b2650','#3b3470'],fl:['#7a5cff','#ff5ccf','#5cf0ff'],pr:'crystal',pc:['#c28aff','#3a1a7a'],vg:'rgba(5,0,20,.75)',am:'ember',ac:'#b78aff',pl:['rgba(140,90,255,.5)',1],cc:'#b78aff'}});
let L=0,P,SEG,TL,BASE,TM;
function setPath(i){L=i;TM=TH[LV[i].th];P=LV[i].P;BASE=P[P.length-1];SEG=[];TL=0;for(let k=0;k<P.length-1;k++){const l=Math.hypot(P[k+1][0]-P[k][0],P[k+1][1]-P[k][1]);SEG.push([TL,l]);TL+=l}}
function at(d){d=Math.min(d,TL);let i=0;while(i<SEG.length-1&&d>SEG[i][0]+SEG[i][1])i++;const t=(d-SEG[i][0])/SEG[i][1],a=P[i],b=P[i+1];return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,Math.atan2(b[1]-a[1],b[0]-a[0])]}
function pd(x,y){let m=1e9;for(let i=0;i<P.length-1;i++){const[a,b]=[P[i],P[i+1]],cx=b[0]-a[0],cy=b[1]-a[1];let t=((x-a[0])*cx+(y-a[1])*cy)/(cx*cx+cy*cy);t=Math.max(0,Math.min(1,t));m=Math.min(m,Math.hypot(x-a[0]-cx*t,y-a[1]-cy*t))}return m}
const TT=[
{n:'رشاش',i:'🔫',r:150,d:12,rt:.42,c:100,lim:2,col:'#f5b041'},
{n:'صاروخي',i:'🚀',r:230,d:45,rt:1.67,c:200,lim:2,col:'#e74c3c'},
{n:'كهربائي',i:'⚡',r:170,d:6,rt:.25,c:400,lim:1,col:'#f7e84a'},
{n:'تجميد',i:'❄️',r:130,d:3,rt:.8,c:450,lim:1,col:'#4fc3f7'},
{n:'سموم',i:'☠️',r:190,d:4,rt:.6,c:550,lim:1,col:'#b44cff'},
{n:'قناص',i:'🎯',r:340,d:95,rt:2.1,c:500,lim:1,col:'#9be564'},
{n:'لهب',i:'🔥',r:115,d:5,rt:.12,c:320,lim:2,col:'#ff7a2b'}];
const BX=()=>L/14|0,limOf=i=>TT[i].lim+BX(),MAXT=()=>8+2*BX();
const UP=[['⚔️','ضرر',150,50,5],['🎯','مدى',120,40,3],['⚡','سرعة',180,60,3]];
const cv=$('c'),ctx=cv.getContext('2d',{alpha:false});
let K=1,OX=0,OY=0,DPR=1,bg,G={};const APP=/TankDefenseApp/.test(navigator.userAgent);
const LN=['ar','en','fr','es','tr','ru'],LNAME=['العربية','English','Français','Español','Türkçe','Русский'];let LI=0;
const I={title:['دفاع الدبابات','Tank Defense','Défense de Chars','Defensa de Tanques','Tank Savunması','Оборона танков'],
sub:['اختر ساحة المعركة','Choose your battlefield','Choisissez le terrain','Elige el campo de batalla','Savaş alanını seç','Выберите поле боя'],
l0:['الوادي الأخضر','Green Valley','Vallée verte','Valle verde','Yeşil Vadi','Зелёная долина'],
l1:['صحراء الغبار','Dust Desert','Désert de poussière','Desierto de polvo','Toz Çölü','Пыльная пустыня'],
l2:['جبال الثلج','Frozen Peaks','Pics gelés','Picos helados','Buzlu Zirveler','Ледяные пики'],
l3:['فوهة البركان','Volcano Crater','Cratère du volcan','Cráter volcánico','Yanardağ Krateri','Кратер вулкана'],
wave:['الموجة','Wave','Vague','Oleada','Dalga','Волна'],
boss:['⚠️ زعيم قادم ⚠️','⚠️ BOSS INCOMING ⚠️','⚠️ BOSS EN APPROCHE ⚠️','⚠️ ¡JEFE EN CAMINO! ⚠️','⚠️ PATRON GELİYOR ⚠️','⚠️ БОСС БЛИЗКО ⚠️'],
done:['اكتملت الموجة','Wave cleared','Vague terminée','Oleada superada','Dalga tamam','Волна пройдена'],
ready:['استعد للمعركة!','Get ready!','Préparez-vous !','¡Prepárate!','Hazır ol!','Приготовьтесь!'],
nogold:['الذهب غير كافٍ','Not enough gold','Or insuffisant','Oro insuficiente','Yetersiz altın','Не хватает золота'],
hit:['القاعدة تتضرر','Base under attack','Base attaquée','Base atacada','Üs saldırı altında','База атакована'],
tn0:['رشاش','Gatling','Mitrailleuse','Ametralladora','Makineli','Пулемёт'],tn1:['صاروخي','Rocket','Roquette','Cohete','Roket','Ракета'],tn2:['كهربائي','Tesla','Tesla','Tesla','Tesla','Тесла'],tn3:['تجميد','Frost','Glace','Hielo','Buz','Холод'],tn4:['سموم','Toxic','Toxique','Tóxica','Zehir','Яд'],
tn5:['قناص','Sniper','Sniper','Francotirador','Keskin Nişancı','Снайпер'],tn6:['لهب','Flame','Flammes','Llamas','Alev','Огонь'],
l4:['المستنقع المظلم','Dark Swamp','Marais sombre','Pantano oscuro','Karanlık Bataklık','Тёмное болото'],
l5:['الغابة الخريفية','Autumn Forest','Forêt d\'automne','Bosque otoñal','Sonbahar Ormanı','Осенний лес'],
l6:['الوادي الأحمر','Red Canyon','Canyon rouge','Cañón rojo','Kızıl Kanyon','Красный каньон'],
l7:['المدينة المدمَّرة','Ruined City','Ville en ruines','Ciudad en ruinas','Harap Şehir','Разрушенный город'],
l8:['المنطقة السامة','Toxic Zone','Zone toxique','Zona tóxica','Zehirli Bölge','Токсичная зона'],
l9:['القاعدة النهائية','Final Fortress','Forteresse finale','Fortaleza final','Son Kale','Последняя крепость'],
un0:['ضرر','Damage','Dégâts','Daño','Hasar','Урон'],un1:['مدى','Range','Portée','Alcance','Menzil','Дальн.'],un2:['سرعة','Speed','Cadence','Cadencia','Hız','Скор.'],
lvl:['مستوى','Level','Niveau','Nivel','Seviye','Ур.'],max:['أقصى','MAX','MAX','MÁX','MAKS','МАКС'],sell:['بيع','Sell','Vendre','Vender','Sat','Продать'],
win:['النصر!','Victory!','Victoire !','¡Victoria!','Zafer!','Победа!'],lose:['سقطت القاعدة','Base destroyed','Base détruite','Base destruida','Üs yıkıldı','База уничтожена'],
retry:['إعادة','Retry','Réessayer','Reintentar','Tekrar','Заново'],next:['المستوى التالي','Next level','Niveau suivant','Siguiente nivel','Sonraki seviye','Дальше'],menu:['القائمة','Menu','Menu','Menú','Menü','Меню'],
credit:['برمجة وتصميم','Programming & design','Programmation et design','Programación y diseño','Programlama ve tasarım','Разработка и дизайн'],score:['النقاط','Score','Score','Puntos','Puan','Счёт']};
const t=k=>I[k][LI],tn=i=>I['tn'+i][LI];
let PR={u:0,s:[]};try{PR=Object.assign(PR,JSON.parse(localStorage.tdP))}catch(e){}if(PR.wd===undefined)PR.wd=Math.min(NW-1,PR.u>>2);const savePR=()=>{try{localStorage.tdP=JSON.stringify(PR)}catch(e){}};
/* ---------- sprites ---------- */
const GS={};function gs(c){return GS[c]||(GS[c]=(()=>{const k=document.createElement('canvas');k.width=k.height=64;const x=k.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,c);g.addColorStop(.35,c+'88');g.addColorStop(1,c+'00');x.fillStyle=g;x.fillRect(0,0,64,64);return k})())}
function glow(x,y,r,c,a=1){ctx.globalAlpha=a;ctx.drawImage(gs(c),x-r,y-r,r*2,r*2);ctx.globalAlpha=1}
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h)}
function lg(x,a,b,y0,y1,c0,c1){const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,c0);g.addColorStop(1,c1);return g}
/* ---------- background (pre-rendered per level) ---------- */
function buildBG(){bg=document.createElement('canvas');bg.width=Math.ceil(W*K);bg.height=Math.ceil(H*K);const x=bg.getContext('2d');x.scale(K,K);const T=TM,th=LV[L].th;
let g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,T.g[0]);g.addColorStop(.5,T.g[1]);g.addColorStop(1,T.g[2]);x.fillStyle=g;x.fillRect(0,0,W,H);
for(let i=0;i<80;i++){const px=R()*W,py=R()*H,r=60+R()*140,d=R()<.5;g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,d?T.dk:T.lt);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px-r,py-r,r*2,r*2)}
for(let i=0;i<T.bn;i++){const px=R()*W,py=R()*H,h=4+R()*8;x.strokeStyle=`hsla(${T.h[0]+R()*(T.h[1]-T.h[0])},${T.bl[0]}%,${T.bl[1]+R()*(T.bl[2]-T.bl[1])}%,.55)`;x.lineWidth=1.2;x.beginPath();x.moveTo(px,py);x.lineTo(px+(R()-.5)*5,py-h);x.stroke()}
if(th=='sand'){for(let i=0;i<46;i++){const px=R()*W,py=R()*H,rx=60+R()*90,ry=8+R()*14;x.lineWidth=2.5;x.strokeStyle='rgba(120,80,35,.3)';x.beginPath();x.ellipse(px,py,rx,ry,0,Math.PI*1.05,Math.PI*1.95);x.stroke();x.strokeStyle='rgba(255,240,190,.35)';x.beginPath();x.ellipse(px,py+4,rx,ry,0,Math.PI*1.1,Math.PI*1.9);x.stroke()}}
if(th=='snow'){for(let i=0;i<9;i++){const px=R()*W,py=R()*H;x.fillStyle='rgba(150,205,245,.4)';x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=2;x.beginPath();x.ellipse(px,py,40+R()*50,16+R()*18,R(),0,TAU);x.fill();x.stroke()}}
if(th=='lava'){x.globalCompositeOperation='lighter';x.shadowColor='#ff5a1a';x.shadowBlur=14;x.lineCap='round';for(let i=0;i<30;i++){let px=R()*W,py=R()*H;x.strokeStyle=R()<.5?'#ff5a1a':'#ffb300';x.lineWidth=1.5+R()*2.5;x.beginPath();x.moveTo(px,py);for(let k=0;k<6;k++){px+=(R()-.5)*60;py+=(R()-.5)*60;x.lineTo(px,py)}x.stroke()}x.shadowBlur=0;for(let i=0;i<7;i++){const px=R()*W,py=R()*H,r=30+R()*40;g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,120,30,.55)');g.addColorStop(1,'rgba(255,60,0,0)');x.fillStyle=g;x.fillRect(px-r,py-r,r*2,r*2)}x.globalCompositeOperation='source-over'}
if(T.pl){x.globalCompositeOperation=T.pl[1]?'lighter':'source-over';for(let i=0,c=0;i<160&&c<9;i++){const px=R()*W,py=R()*H,r=30+R()*50;if(pd(px,py)<r+40)continue;c++;g=x.createRadialGradient(px,py,2,px,py,r);g.addColorStop(0,T.pl[0]);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.beginPath();x.ellipse(px,py,r*1.4,r*.8,0,0,TAU);x.fill()}x.globalCompositeOperation='source-over'}
if(th=='city'){x.strokeStyle='rgba(255,255,255,.05)';x.lineWidth=2;for(let gx=0;gx<W;gx+=80){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,H);x.stroke()}for(let gy=0;gy<H;gy+=80){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke()}}
for(let i=0;i<70;i++){const px=R()*W,py=R()*H;if(pd(px,py)<50)continue;x.fillStyle=T.fl[i%T.fl.length];x.beginPath();x.arc(px,py,1.6+R()*2,0,TAU);x.fill()}
const road=(w,c,o=0)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap=x.lineJoin='round';x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0]+o,p[1]+o):x.moveTo(p[0]+o,p[1]+o));x.stroke()};
road(PW+26,'rgba(0,0,0,.14)');road(PW+16,'rgba(0,0,0,.38)',5);road(PW+10,T.rd[0]);road(PW,T.rd[1]);road(PW-16,T.rd[2]);
x.setLineDash([18,26]);road(5,'rgba(20,12,6,.45)',-14);road(5,'rgba(20,12,6,.45)',14);x.setLineDash([]);
for(let i=0;i<600;i++){const a=at(R()*TL);x.fillStyle=R()<.5?'rgba(0,0,0,.32)':'rgba(255,255,255,.16)';x.beginPath();x.arc(a[0]+(R()-.5)*PW*.9,a[1]+(R()-.5)*PW*.9,1+R()*2.4,0,TAU);x.fill()}
for(let i=0,c=0;i<200&&c<6;i++){const px=R()*W,py=80+R()*520;if(pd(px,py)<70)continue;c++;const r=16+R()*18;g=x.createRadialGradient(px,py,2,px,py,r);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.8,'rgba(0,0,0,.2)');g.addColorStop(1,'rgba(255,255,255,.18)');x.fillStyle=g;x.beginPath();x.ellipse(px,py,r*1.3,r,0,0,TAU);x.fill()}
let n=0;for(let k=0;k<500&&n<18;k++){const px=R()*W,py=R()*600+20;if(pd(px,py)<78||Math.hypot(px-BASE[0],py-BASE[1])<100)continue;n++;const rock=T.pr=='rock'||n%3==0;
x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(px+10,py+16,30,12,0,0,TAU);x.fill();
if(rock){g=x.createRadialGradient(px-5,py-6,2,px,py,20);g.addColorStop(0,th=='lava'?'#8a7770':'#b0b4bc');g.addColorStop(1,th=='lava'?'#1c1513':'#454a55');x.fillStyle=g;x.beginPath();x.ellipse(px,py,19,14,.3,0,TAU);x.fill();if(th=='lava'){x.strokeStyle='rgba(255,106,43,.6)';x.lineWidth=2;x.beginPath();x.ellipse(px,py,19,14,.3,.4,2.2);x.stroke()}}
else if(T.pr=='tree'){x.fillStyle='#4a2f1b';x.fillRect(px-4,py-4,8,18);for(let q=0;q<3;q++){g=x.createRadialGradient(px-6+q*6,py-12-q*6,2,px,py-14,26);g.addColorStop(0,(T.tc||['#7cc46a','#1d5a2b'])[0]);g.addColorStop(1,(T.tc||['#7cc46a','#1d5a2b'])[1]);x.fillStyle=g;x.beginPath();x.arc(px+(q-1)*8,py-8-(q==1?10:0),20-q*2,0,TAU);x.fill()}}
else if(T.pr=='cactus'){g=x.createLinearGradient(px-6,0,px+6,0);g.addColorStop(0,'#6fae4f');g.addColorStop(1,'#2f6a2a');x.fillStyle=g;for(const[a,b,w,h]of[[-5,-34,10,46],[-19,-22,8,20],[11,-28,8,22]]){x.beginPath();x.roundRect(px+a,py+b,w,h,4);x.fill()}x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=1;x.beginPath();x.moveTo(px,py-30);x.lineTo(px,py+8);x.stroke()}
else if(T.pr=='dtree'){x.strokeStyle='#2a1d12';x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(px,py+14);x.lineTo(px,py-24);x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(px,py-8);x.lineTo(px-16,py-24);x.moveTo(px,py-14);x.lineTo(px+15,py-30);x.moveTo(px,py-22);x.lineTo(px-8,py-38);x.stroke();x.fillStyle='rgba(90,150,90,.35)';x.beginPath();x.ellipse(px,py+14,22,7,0,0,TAU);x.fill()}
else if(T.pr=='crate'){const s=24+R()*10;x.fillStyle=lg(x,0,0,py-s,py+s,'#6b5a3a','#3a2f1e');x.fillRect(px-s/2,py-s/2,s,s);x.strokeStyle='#a89060';x.lineWidth=2;x.strokeRect(px-s/2,py-s/2,s,s);x.beginPath();x.moveTo(px-s/2,py-s/2);x.lineTo(px+s/2,py+s/2);x.moveTo(px+s/2,py-s/2);x.lineTo(px-s/2,py+s/2);x.stroke()}
else if(T.pr=='crystal'){g=x.createRadialGradient(px,py,2,px,py,44);g.addColorStop(0,T.pc[0]+'66');g.addColorStop(1,T.pc[0]+'00');x.fillStyle=g;x.fillRect(px-44,py-44,88,88);for(let q=0;q<3;q++){const h=20+R()*24,w=7+R()*5,ox=(q-1)*12;g=x.createLinearGradient(px+ox-w,0,px+ox+w,0);g.addColorStop(0,T.pc[0]);g.addColorStop(1,T.pc[1]);x.fillStyle=g;x.beginPath();x.moveTo(px+ox,py-h);x.lineTo(px+ox+w,py+6);x.lineTo(px+ox-w,py+6);x.closePath();x.fill();x.strokeStyle='rgba(255,255,255,.5)';x.lineWidth=1;x.stroke()}}
else{x.fillStyle='#3b2a1a';x.fillRect(px-3,py,6,14);for(let q=0;q<3;q++){const y0=py-8-q*15,w=30-q*7;g=x.createLinearGradient(px-w,0,px+w,0);g.addColorStop(0,'#1a4a38');g.addColorStop(1,'#0e2a22');x.fillStyle=g;x.beginPath();x.moveTo(px,y0-22);x.lineTo(px+w,y0+6);x.lineTo(px-w,y0+6);x.fill();x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.moveTo(px,y0-22);x.lineTo(px+w*.5,y0-8);x.lineTo(px-w*.5,y0-8);x.fill()}}}
const pv=P[P.length-2],ba=Math.atan2(pv[1]-BASE[1],pv[0]-BASE[0]);
for(let k=0;k<16;k++){const a=k*TAU/16,d=Math.atan2(Math.sin(a-ba),Math.cos(a-ba));if(Math.abs(d)<.55)continue;x.save();x.translate(BASE[0]+Math.cos(a)*68,BASE[1]+Math.sin(a)*68);x.rotate(a+Math.PI/2);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(-12,-2,26,13);x.fillStyle=lg(x,0,0,-6,8,'#d2bb84','#8a7448');x.beginPath();x.roundRect(-13,-6,26,12,5);x.fill();x.strokeStyle='rgba(0,0,0,.4)';x.stroke();x.restore()}
g=x.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.65);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,T.vg);x.fillStyle=g;x.fillRect(0,0,W,H)}
function resize(){DPR=Math.min(devicePixelRatio||1,2.5);const w=innerWidth,h=innerHeight;cv.width=w*DPR;cv.height=h*DPR;K=Math.min(w/W,h/H)*DPR;OX=(w*DPR-W*K)/2;OY=(h*DPR-H*K)/2;buildBG()}
function toW(e){const r=cv.getBoundingClientRect();return[((e.clientX-r.left)*DPR-OX)/K,((e.clientY-r.top)*DPR-OY)/K]}
/* ---------- audio / haptics ---------- */
let AC,SB,MB,RV,DL,NB,mute=false,musicOn=true;
try{const S=JSON.parse(localStorage.tdS);mute=!!S.mu;musicOn=S.mo!==0}catch(e){}
const saveS=()=>{try{localStorage.tdS=JSON.stringify({mu:mute?1:0,mo:musicOn?1:0})}catch(e){}};
function initAudio(){if(AC){if(AC.state==='suspended')AC.resume();return}
try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){AC=null;return}
const cp=AC.createDynamicsCompressor();cp.threshold.value=-16;cp.knee.value=24;cp.ratio.value=4;cp.attack.value=.01;cp.release.value=.3;cp.connect(AC.destination);
SB=AC.createGain();SB.gain.value=mute?0:.9;SB.connect(cp);MB=AC.createGain();MB.gain.value=0;MB.connect(cp);
RV=AC.createConvolver();const n=AC.sampleRate*2.2|0,ib=AC.createBuffer(2,n,AC.sampleRate);for(let c=0;c<2;c++){const d=ib.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}RV.buffer=ib;const rg=AC.createGain();rg.gain.value=.5;RV.connect(rg);rg.connect(MB);
DL=AC.createDelay(1);DL.delayTime.value=.36;const fb=AC.createGain();fb.gain.value=.3;const df=AC.createBiquadFilter();df.type='lowpass';df.frequency.value=2000;DL.connect(df);df.connect(fb);fb.connect(DL);df.connect(MB);
NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const nd=NB.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
AC.resume();setMusic(MU.k)}
function snd(f,d=.08,t='square',v=.04,sl=0){if(mute||!AC||!SB)return;const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(SB);o.start(n);o.stop(n+d)}
/* ---------- procedural background music ---------- */
const SC={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],dor:[0,2,3,5,7,9,10],phr:[0,1,3,5,7,8,10],lyd:[0,2,4,6,7,9,11],hmin:[0,2,3,5,7,8,11]};
const BSA=[4,0,0,0,0,0,2,0,4,0,0,0,0,0,2,0],BSB=[2,0,0,2,0,0,2,0,2,0,0,2,0,0,2,0],BSC=[8,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0],BSD=[3,0,0,1,0,0,2,0,3,0,0,1,0,2,0,0];
const APA=[0,-1,1,-1,2,-1,1,-1,0,-1,1,-1,3,-1,2,-1],APB=[0,1,2,1,3,2,1,2,0,1,2,1,3,2,4,2],APC=[0,-1,-1,2,-1,1,-1,-1,3,-1,-1,2,-1,1,-1,-1];
const MOODS={
menu:{r:53,s:'maj',bpm:76,pr:[0,4,5,3],bs:BSC,ap:APC,mp:[0,6,10],dr:0,seed:11,ld:'sine',lv:.045},
0:{r:50,s:'maj',bpm:100,pr:[0,5,3,4],bs:BSA,ap:APA,mp:[0,6,10,13],dr:1,seed:21,ld:'triangle',lv:.05},
1:{r:52,s:'phr',bpm:96,pr:[0,1,0,6],bs:BSD,ap:APC,mp:[0,3,6,10],dr:1,seed:22,ld:'triangle',lv:.05},
2:{r:57,s:'lyd',bpm:88,pr:[0,4,5,2],bs:BSA,ap:APC,mp:[0,6,10],dr:1,seed:23,ld:'sine',lv:.055},
3:{r:48,s:'dor',bpm:118,pr:[0,1,5,0],bs:BSB,ap:APB,mp:[0,3,6,10,12],dr:1,seed:24,ld:'triangle',lv:.05},
4:{r:49,s:'dor',bpm:82,pr:[0,3,0,4],bs:BSD,ap:APC,mp:[0,6,10],dr:1,seed:25,ld:'sine',lv:.05},
5:{r:55,s:'dor',bpm:94,pr:[0,3,4,0],bs:BSA,ap:APA,mp:[0,4,8,12],dr:1,seed:26,ld:'triangle',lv:.05},
6:{r:50,s:'hmin',bpm:104,pr:[0,5,4,0],bs:BSD,ap:APB,mp:[0,3,6,10],dr:1,seed:27,ld:'triangle',lv:.05},
7:{r:52,s:'min',bpm:108,pr:[0,5,2,6],bs:BSB,ap:APA,mp:[0,6,10,13],dr:1,seed:28,ld:'triangle',lv:.05},
8:{r:53,s:'phr',bpm:112,pr:[0,1,0,3],bs:BSB,ap:APB,mp:[0,3,6,10],dr:1,seed:29,ld:'sine',lv:.055},
9:{r:50,s:'min',bpm:120,pr:[0,5,3,6],bs:BSB,ap:APB,mp:[0,3,6,10,12],dr:1,seed:30,ld:'triangle',lv:.055}};
const MU={k:'menu',M:null,want:null,s:0,nt:0,int:0,tgt:0,tmr:null,ft:0};
const mtof=m=>440*Math.pow(2,(m-69)/12),degNote=(M,d)=>M.r+SC[M.s][((d%7)+7)%7]+12*Math.floor(d/7);
function genMel(M){const r=mulb(M.seed*97+5),a=new Array(64).fill(-1);for(let b=0;b<4;b++){const ch=M.pr[b];let pr=ch+[0,2,4][r()*3|0]+7;for(const st of M.mp){pr=Math.max(ch+4,Math.min(ch+11,pr+[-2,-1,0,1,2,3][r()*6|0]));a[b*16+st]=pr}}return a}
function note(f,t,d,ty,v,a,r,lp,sd,bus){const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;if(lp){const fl=AC.createBiquadFilter();fl.type='lowpass';fl.frequency.value=lp;o.connect(fl);fl.connect(g)}else o.connect(g);
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setValueAtTime(v,t+Math.max(a,d));g.gain.linearRampToValueAtTime(0,t+d+r);g.connect(bus||MB);if(sd){const s=AC.createGain();s.gain.value=sd;g.connect(s);s.connect(RV);s.connect(DL)}o.start(t);o.stop(t+d+r+.05)}
function kick(t,v){if(v<.003)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);o.connect(g);g.connect(MB);o.start(t);o.stop(t+.25)}
function nz(t,d,v,ft,fq,sd){if(v<.002)return;const s=AC.createBufferSource(),g=AC.createGain(),fl=AC.createBiquadFilter();s.buffer=NB;fl.type=ft;fl.frequency.value=fq;s.connect(fl);fl.connect(g);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);g.connect(MB);if(sd){const q=AC.createGain();q.gain.value=sd;g.connect(q);q.connect(RV)}s.start(t,Math.random()*.5);s.stop(t+d+.02)}
function schedStep(M,s,t){const bar=s>>4,st=s&15,ch=M.pr[bar],spb=60/M.bpm/4,I=MU.int,dr=M.dr?Math.max(0,(I-.15)/.85):0;
if(st==0){const bl=spb*16;for(const k of[0,2,4]){const f=mtof(degNote(M,ch+k)+12);note(f*.997,t,bl*.85,'triangle',.03,1.0,1.6,1200,.5);note(f*1.003,t,bl*.85,'sine',.024,1.0,1.6,0,.5)}}
if(M.bs[st]){note(mtof(degNote(M,ch)-12),t,spb*M.bs[st]*.9,'triangle',.1,.02,.25,520,0)}
const ai=M.ap[st];if(ai>=0){const off=[0,2,4,7,9][ai];note(mtof(degNote(M,ch+off)+12),t,spb*1.4,'triangle',st%4==0?.04:.028,.006,.4,2600,.55)}
const ml=M.mel[s];if(ml>=0){const lv=M.dr?M.lv*Math.max(0,(I-.3)/.7):M.lv;if(lv>.004){const f=mtof(degNote(M,ml));note(f,t,spb*3,M.ld,lv,.03,.6,2400,.6);note(f*1.004,t,spb*3,'sine',lv*.5,.03,.6,0,.6)}}
if(dr>0){if(st==0||st==8)kick(t,.2*dr);else if((st==4||st==12)&&I>.6)kick(t,.1*dr);else if(st==10&&I>.8)kick(t,.12*dr);
if(st%2==0)nz(t,.045,(st%4==2?.05:.028)*dr,'highpass',7000,.15);if((st==4||st==12)&&I>.5)nz(t,.14,.08*dr,'bandpass',1800,.3)}}
function musicTick(){if(!AC||!MU.M||AC.state!=='running')return;const M=MU.M,spb=60/M.bpm/4,act=!G.menu&&G.run;
MU.tgt=!act?0:((G.q.includes('boss')||G.en.some(e=>e.boss))?1:G.waveOn?.6:.3)+(G.hp<35?.15:0);MU.int+=(MU.tgt-MU.int)*.03;
if(MU.nt<AC.currentTime-.2)MU.nt=AC.currentTime+.05;while(MU.nt<AC.currentTime+.3){schedStep(M,MU.s,MU.nt);MU.nt+=spb;MU.s=(MU.s+1)&63}}
function mvol(){if(!AC||!MB)return;const n=AC.currentTime;MB.gain.cancelScheduledValues(n);MB.gain.setTargetAtTime(musicOn&&!mute?(G.pause?.22:.55):0,n,.35);SB.gain.setTargetAtTime(mute?0:.9,n,.05)}
function setMusic(k){MU.k=k;if(!AC||!MB)return;const M=MOODS[k];if(!M||MU.want===M)return;MU.want=M;MU.M=null;const n=AC.currentTime;MB.gain.cancelScheduledValues(n);MB.gain.setTargetAtTime(0,n,.12);clearTimeout(MU.ft);
MU.ft=setTimeout(()=>{if(!M.mel)M.mel=genMel(M);MU.s=0;MU.nt=AC.currentTime+.08;MU.M=M;mvol();if(!MU.tmr)MU.tmr=setInterval(musicTick,50)},450)}
function fanfare(win){if(!AC||!SB||mute)return;const t=AC.currentTime+.02,ns=win?[72,76,79,84,88]:[67,63,60,55];ns.forEach((m,i)=>note(mtof(m),t+i*.13,.16,win?'triangle':'sawtooth',win?.08:.06,.01,.5,win?3000:700,.3,SB))}
function togMute(){mute=!mute;saveS();$('bm').textContent=mute?'🔇':'🔊';mvol();const b=$('ts');if(b)b.classList.toggle('on',!mute)}
function togMusic(){musicOn=!musicOn;saveS();$('bmu').textContent=musicOn?'🎵':'🔕';mvol();const b=$('tm');if(b)b.classList.toggle('on',musicOn)}
function unlock(){initAudio();if(AC&&!MU.want)setMusic(MU.k)}
const vib=n=>{try{!mute&&navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
/* ---------- state ---------- */
function newG(m){return{gold:LV[L].gold,hp:100,wave:0,tw:[],en:[],bu:[],pa:[],fx:[],q:[],sp:0,inter:1.5,waveOn:false,run:!m,menu:!!m,pause:false,spd:1,sel:null,type:0,shake:0,t:0,gh:null,drag:false,score:0,cdA:0,cc:-1}}
function reset(){G=newG();$('bs').textContent='1×';$('bp').textContent='⏸';hud();closePanel();toast(I['l'+LV[L].wd][LI]+'  '+(LV[L].wd+1)+'-'+((L&3)+1),'#5fd4ff');initAmb();abil()}
const cnt=i=>G.tw.filter(t=>t.k===i).length;
function toast(s,c='#fff',boss){const e=$('toast');e.textContent=s;e.style.color=c;e.className='gl'+(boss?' boss':'');e.style.animation='none';void e.offsetWidth;e.style.animation='';e.classList.add('show')}
function buildShop(){$('shop').innerHTML=TT.map((x,i)=>`<button class="tb" data-i="${i}"><em></em><i>${x.i}</i>${tn(i)}<b>${x.c}</b></button>`).join('');
document.querySelectorAll('.tb').forEach(b=>b.onclick=()=>{G.type=+b.dataset.i;closePanel();hud();snd(520,.05,'triangle')})}
function setv(id,v){const e=$(id);if(e.textContent!=v){e.textContent=v;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}}
function hud(){setv('g',G.gold|0);setv('w',G.wave);$('wm').textContent='/'+LV[L].w;setv('tc',G.tw.length+'/'+MAXT());$('hpb').style.width=Math.max(0,G.hp)+'%';
abil();document.querySelectorAll('.tb').forEach((b,i)=>{const x=TT[i],c=cnt(i);b.classList.toggle('on',G.type===i);b.classList.toggle('off',c>=limOf(i)||G.tw.length>=MAXT()||G.gold<x.c);b.firstChild.textContent=c+'/'+limOf(i)});if(G.sel)panel()}
function canPlace(x,y,i=G.type){const T=TT[i];return x>40&&x<W-40&&y>70&&y<620&&G.tw.length<MAXT()&&cnt(i)<limOf(i)&&G.gold>=T.c&&pd(x,y)>PW/2+28&&!G.tw.some(o=>Math.hypot(o.x-x,o.y-y)<62)&&Math.hypot(x-BASE[0],y-BASE[1])>80}
function place(x,y){if(!canPlace(x,y)){if(G.gold<TT[G.type].c)toast(t('nogold'),'#ff8a80');return}const T=TT[G.type];G.tw.push({k:G.type,x,y,a:-1.57,cd:0,dm:T.d,rg:T.r,rt:T.rt,u:[0,0,0],paid:T.c,b:0,id:R()});G.gold-=T.c;burst(x,y,T.col,26,200,1);G.fx.push({k:'ring',x,y,r:10,m:90,c:T.col,l:.5,L:.5});snd(220,.18,'sawtooth',.05,300);vib(15);hud()}
function panel(){const o=G.sel;if(!o)return;const p=$('panel');p.style.display='flex';p.innerHTML=UP.map((u,i)=>{const c=u[2]+o.u[i]*u[3],mx=o.u[i]>=u[4];return`<button class="up${mx?' max':''}" data-u="${i}">${u[0]} ${I['un'+i][LI]}<br><small>${t('lvl')} ${o.u[i]}/${u[4]}</small><b>${mx?t('max'):c+' 🪙'}</b></button>`}).join('')+`<button class="up sell" data-u="s">💰 ${t('sell')}<br><small>${tn(o.k)}</small><b>${o.paid>>1} 🪙</b></button>`;
p.querySelectorAll('.up').forEach(b=>b.onclick=()=>{const u=b.dataset.u;if(u==='s')sell(o);else upg(o,+u)})}
function abil(){const c=Math.ceil(G.cdA||0),a=$('ba');a.classList.toggle('off',c>0);$('bat').textContent=c>0?c+'s':'✓';$('br').classList.toggle('off',G.gold<250||G.hp>=100)}
function airstrike(){if(!G.run||G.pause||G.cdA>0)return;G.cdA=45;const d=140+G.wave*14;for(const e of G.en){if(e.dead)continue;G.fx.push({k:'ring',x:e.x,y:e.y,r:10,m:70,c:'#ff9a3c',l:.5,L:.5});burst(e.x,e.y,'#ff6a2b',16,220,1);dmg(e,d,'#ffb74d')}G.shake=Math.max(G.shake,18);G.fx.push({k:'flash',l:.35,L:.35});snd(70,.7,'sawtooth',.1,-30);vib([60,40,100]);abil()}
function repair(){if(!G.run||G.pause||G.hp>=100)return;if(G.gold<250){toast(t('nogold'),'#ff8a80');return}G.gold-=250;G.hp=Math.min(100,G.hp+25);burst(BASE[0],BASE[1],'#43e07a',30,200,1);G.fx.push({k:'ring',x:BASE[0],y:BASE[1],r:20,m:120,c:'#43e07a',l:.6,L:.6});snd(520,.3,'triangle',.06,400);hud()}
function closePanel(){G.sel=null;$('panel').style.display='none'}
function upg(o,i){const u=UP[i],c=u[2]+o.u[i]*u[3];if(o.u[i]>=u[4])return;if(G.gold<c){toast(t('nogold'),'#ff8a80');return}G.gold-=c;o.paid+=c;o.u[i]++;if(i==0)o.dm*=1.5;else if(i==1)o.rg*=1.3;else o.rt=Math.max(.08,o.rt/1.4);burst(o.x,o.y,'#ffd54a',30,220,1);G.fx.push({k:'ring',x:o.x,y:o.y,r:20,m:110,c:'#ffd54a',l:.6,L:.6});snd(660,.2,'triangle',.05,500);hud()}
function sell(o){G.gold+=o.paid>>1;G.tw=G.tw.filter(z=>z!==o);burst(o.x,o.y,'#ffd54a',30,200,1);txt(o.x,o.y-30,'+'+(o.paid>>1),'#ffd54a',22);snd(400,.2,'sine',.05,-200);closePanel();hud()}
/* ---------- waves & enemies ---------- */
function startWave(){const w=++G.wave,n=4+w*2+(w/3|0);G.q=[];const wd=LV[L].wd,pool=['normal','fast','tank'];if(wd>=1)pool.push('swarm');if(wd>=2)pool.push('heavy');if(wd>=4)pool.push('heavy','swarm');
for(let i=0;i<n;i++){const k=pool[R()*pool.length|0];if(k==='swarm'){for(let q=0;q<3;q++)G.q.push('swarm')}else G.q.push(k)}
if(w%5==0||w==LV[L].w){G.q.splice((n*.7)|0,0,'boss');if(w==LV[L].w&&wd>=3)G.q.splice((n*.4)|0,0,'boss');toast(t('boss'),'#ff6a2b',1);snd(90,.7,'sawtooth',.08,-30);vib([80,60,80])}else toast(t('wave')+' '+w+'/'+LV[L].w,'#5fd4ff');G.sp=0;G.waveOn=true;hud()}
function spawn(k){const w=G.wave;let e;
if(k==='boss')e={hp:400+w*80,s:.7,rw:400,ar:.6};else if(k==='fast')e={hp:25+w*8,s:Math.min(2.3+w*.08,3.5),rw:20,ar:0};else if(k==='tank')e={hp:80+w*30,s:Math.min(.7+w*.04,1.3),rw:50,ar:.25};
else if(k==='heavy')e={hp:150+w*45,s:Math.min(.55+w*.025,.95),rw:70,ar:.45};else if(k==='swarm')e={hp:12+w*4,s:Math.min(2+w*.07,3.2),rw:9,ar:0};else e={hp:40+w*15,s:Math.min(1.4+w*.07,2.5),rw:35,ar:0};
e.rw=Math.round(e.rw*(1+(LV[L].hm-1)*.2));
e.hp=e.hp*LV[L].hm|0;G.en.push({...e,k,m:e.hp,v:e.s*84,d:0,x:P[0][0],y:P[0][1],a:0,st:0,pt:0,pd:0,pk:0,boss:k==='boss'})}
function dmg(e,d,c,q){if(e.dead)return;const v=d*(1-e.ar);e.hp-=v;if(!q)txt(e.x+(R()-.5)*16,e.y-24,v<10?v.toFixed(1):v|0,c||'#fff',e.boss?20:15);if(e.hp<=0)kill(e)}
function kill(e){e.dead=true;G.gold+=e.rw;G.score=(G.score||0)+e.rw;burst(e.x,e.y,e.boss?'#ff6a2b':'#ffb74d',e.boss?90:34,260,1);burst(e.x,e.y,'#222',14,140,0);G.fx.push({k:'ring',x:e.x,y:e.y,r:10,m:e.boss?200:80,c:'#ffb74d',l:.45,L:.45});G.shake=Math.max(G.shake,e.boss?16:4);snd(110,.22,'sawtooth',.05,-60);hud()}
/* ---------- fx ---------- */
function burst(x,y,c,n,sp,add){n=Math.min(n,G.pa.length>380?6:n);for(let i=0;i<n;i++){const a=R()*TAU,s=R()*sp;G.pa.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:.5+R()*.6,L:1.1,s:2+R()*5,c,add,g:add?0:120})}}
function txt(x,y,s,c,z=15){G.fx.push({k:'t',x,y,s,c,z,l:.8,L:.8})}
function bolt(a,b,l=.14){const pts=[[a[0],a[1]]],n=Math.max(3,Math.hypot(b[0]-a[0],b[1]-a[1])/18|0);for(let i=1;i<n;i++){const t=i/n;pts.push([a[0]+(b[0]-a[0])*t+(R()-.5)*22,a[1]+(b[1]-a[1])*t+(R()-.5)*22])}pts.push([b[0],b[1]]);G.fx.push({k:'b',pts,l,L:l})}
/* ---------- simulation ---------- */
function fire(t,e){const a=t.a,mx=t.x+Math.cos(a)*34,my=t.y+Math.sin(a)*34,col=TT[t.k].col;t.b=1;
if(t.k==6){for(const o of G.en){if(o.dead)continue;const dx=o.x-t.x,dy=o.y-t.y;if(Math.hypot(dx,dy)>t.rg)continue;let df=Math.atan2(dy,dx)-a;df=Math.atan2(Math.sin(df),Math.cos(df));if(Math.abs(df)<.5){dmg(o,t.dm,'#ff9a3c',1);if(!o.dead){o.pt=Math.max(o.pt,1.5);o.pd=Math.max(o.pd,t.dm*2.5)}}}
if(G.pa.length<420)for(let q=0;q<3;q++){const s=170+R()*150,aa=a+(R()-.5)*.55;G.pa.push({x:mx,y:my,vx:Math.cos(aa)*s,vy:Math.sin(aa)*s,l:.28+R()*.2,L:.48,s:5+R()*5,c:R()<.5?'#ff7a2b':'#ffd54a',add:1,g:0})}
if(R()<.25)snd(190,.07,'sawtooth',.02,-80);return}
if(t.k==2){bolt([mx,my],[e.x,e.y]);dmg(e,t.dm,'#f7e84a');let c=0;for(const o of G.en)if(o!==e&&!o.dead&&c<2&&Math.hypot(o.x-e.x,o.y-e.y)<120){bolt([e.x,e.y],[o.x,o.y]);dmg(o,t.dm*.5,'#f7e84a');c++}burst(e.x,e.y,'#fff7a0',6,120,1);snd(900,.07,'sawtooth',.03,-500);return}
G.bu.push({x:mx,y:my,px:mx,py:my,e,k:t.k,d:t.dm,c:col,sp:t.k==1?520:t.k==5?1700:900,z:t.k==1?7:4,vx:Math.cos(a),vy:Math.sin(a)});
burst(mx,my,col,6,160,1);glow(mx,my,30,col);t.k==5?snd(140,.22,'sawtooth',.06,-90):snd(t.k==1?150:t.k==0?420:600,.1,t.k==0?'square':'triangle',.04,-80)}
function hit(b){const e=b.e;burst(b.x,b.y,b.c,10,170,1);if(b.k==1){G.fx.push({k:'ring',x:b.x,y:b.y,r:10,m:90,c:'#ff9a3c',l:.4,L:.4});burst(b.x,b.y,'#ff6a2b',30,230,1);G.shake=Math.max(G.shake,6);for(const o of G.en)if(!o.dead&&Math.hypot(o.x-b.x,o.y-b.y)<75)dmg(o,b.d*(o===e?1:.6),'#ffb74d');snd(80,.3,'sawtooth',.07,-40);return}
if(b.k==5){const ar=e.ar;e.ar=ar*.4;dmg(e,b.d,'#c8ff8a');e.ar=ar;G.shake=Math.max(G.shake,3);G.fx.push({k:'ring',x:e.x,y:e.y,r:6,m:46,c:'#9be564',l:.3,L:.3});return}
dmg(e,b.d,b.c);if(e.dead)return;if(b.k==3){e.st=1.8;G.fx.push({k:'ring',x:e.x,y:e.y,r:8,m:50,c:'#4fc3f7',l:.4,L:.4})}if(b.k==4){e.pt=4;e.pd=Math.max(e.pd,8+b.d*3)}}
function step(dt){G.t+=dt;G.cdA=Math.max(0,G.cdA-dt);const cc=Math.ceil(G.cdA);if(cc!==G.cc){G.cc=cc;abil()}
if(G.q.length){G.sp-=dt;if(G.sp<=0){const nk=G.q.shift();spawn(nk);G.sp=nk==='swarm'?.2:Math.max(.4,(1200-Math.min(G.wave*25,800))/1000)}}
else if(G.waveOn&&!G.en.length){G.waveOn=false;const b=50+G.wave*10;G.gold+=b;hud();if(G.wave>=LV[L].w){showEnd(1);return}toast(`✅ ${t('done')} +${b}🪙`,'#ffd54a');G.inter=2.5}
if(G.inter>0){G.inter-=dt;if(G.inter<=0)startWave()}
for(const e of G.en){if(e.dead)continue;if(e.st>0)e.st-=dt;if(e.pt>0){e.pt-=dt;e.hp-=e.pd*dt;e.pk-=dt;if(e.pk<=0){e.pk=.5;txt(e.x,e.y-26,(e.pd*.5).toFixed(0),'#c77dff',13)}if(e.hp<=0){kill(e);continue}}
e.d+=e.v*(e.st>0?.4:1)*dt;const p=at(e.d);e.x=p[0];e.y=p[1];e.a=p[2];
if(e.d>=TL){e.dead=true;const d=e.boss?15:8;G.hp-=d;G.shake=14;burst(BASE[0],BASE[1],'#ff3d00',40,260,1);toast(`💔 ${t('hit')} −${d}`,'#ff6e6e');snd(70,.4,'sawtooth',.08,-30);vib(120);hud();if(G.hp<=0){end();return}}
if(R()<dt*(e.boss?14:6))G.pa.push({x:e.x-Math.cos(e.a)*22,y:e.y-Math.sin(e.a)*22,vx:(R()-.5)*20,vy:-10-R()*14,l:.7,L:.7,s:4+R()*4,c:'#6b5a46',g:0})}
for(const t of G.tw){t.cd-=dt;t.b=Math.max(0,t.b-dt*6);let tg=null,bd=-1;for(const e of G.en)if(!e.dead&&e.d>bd&&Math.hypot(e.x-t.x,e.y-t.y)<t.rg){bd=e.d;tg=e}
if(tg){const ta=Math.atan2(tg.y-t.y,tg.x-t.x);let df=ta-t.a;df=Math.atan2(Math.sin(df),Math.cos(df));t.a+=df*Math.min(1,dt*14);if(t.cd<=0&&Math.abs(df)<.5){fire(t,tg);t.cd=t.rt}}}
for(const b of G.bu){const e=b.e;if(e&&!e.dead){const dx=e.x-b.x,dy=e.y-b.y,l=Math.hypot(dx,dy)||1;b.vx=dx/l;b.vy=dy/l;if(l<16){hit(b);b.dead=true;continue}}else if(b.k===1){b.dead=true;continue}
b.px=b.x;b.py=b.y;b.x+=b.vx*b.sp*dt;b.y+=b.vy*b.sp*dt;if(b.k==1&&R()<.7)G.pa.push({x:b.x,y:b.y,vx:(R()-.5)*30,vy:(R()-.5)*30,l:.5,L:.5,s:5,c:'#ff9a3c',add:1,g:0});if(b.x<-60||b.x>W+60||b.y<-60||b.y>H+60)b.dead=true}
for(const p of G.pa){p.l-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.g*dt;p.vx*=.98}for(const f of G.fx){f.l-=dt;if(f.k=='t')f.y-=40*dt}
G.shake*=Math.pow(.02,dt);
G.en=G.en.filter(e=>!e.dead);G.bu=G.bu.filter(b=>!b.dead);G.pa=G.pa.filter(p=>p.l>0);G.fx=G.fx.filter(f=>f.l>0)}
function end(){showEnd(0)}
function showEnd(win){G.run=false;closePanel();const hp=G.hp,st=win?(hp>=70?3:hp>=35?2:1):0;if(win){PR.s[L]=Math.max(PR.s[L]||0,st);PR.u=Math.max(PR.u,Math.min(LV.length-1,L+1));savePR()}
$('eT').textContent=t(win?'win':'lose');$('stars').innerHTML=win?[1,2,3].map(i=>`<span class="${i>st?'z':''}">⭐</span>`).join(''):'💥';$('eP').innerHTML=`${t('wave')} <b>${G.wave}/${LV[L].w}</b> · ${t('score')} <b>${G.score}</b>`;$('eN').style.display=win&&L<LV.length-1?'':'none';$('end').classList.remove('hide');fanfare(win);vib(win?[60,40,60]:200)}
let AM=[];function initAmb(){AM=[];for(let i=0;i<70;i++)AM.push({x:R()*W,y:R()*H,v:.5+R(),s:1+R()*2.2,p:R()*TAU})}
function drawAmb(){const a=TM.am;for(const p of AM){if(a=='snow'){p.y+=p.v*1.3;p.x+=Math.sin(G.t*1.5+p.p)*.6+.5;if(p.y>H)p.y=-5;if(p.x>W)p.x=0;ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,TAU);ctx.fill()}
else if(a=='ember'){p.y-=p.v*1.1;p.x+=Math.sin(G.t*2+p.p)*.5;if(p.y<-5){p.y=H+5;p.x=R()*W}ctx.globalCompositeOperation='lighter';glow(p.x,p.y,p.s*4,TM.ac||'#ff8a2b',.75);ctx.globalCompositeOperation='source-over'}
else if(a=='dust'){p.x+=p.v*3.2;p.y+=Math.sin(G.t+p.p)*.25;if(p.x>W)p.x=-20;ctx.fillStyle='rgba(225,195,140,.22)';ctx.fillRect(p.x,p.y,16*p.v,1.3)}
else if(a=='rain'){p.y+=p.v*14;p.x-=3;if(p.y>H){p.y=-20;p.x=R()*W+80}ctx.strokeStyle='rgba(190,210,255,.35)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+3,p.y-14);ctx.stroke()}
else if(a=='leaf'){p.y+=p.v*.9;p.x+=Math.sin(G.t*1.2+p.p)*1.1+.4;if(p.y>H){p.y=-8;p.x=R()*W}if(p.x>W)p.x=0;ctx.fillStyle=p.s>2?'rgba(230,140,40,.85)':'rgba(190,80,30,.8)';ctx.beginPath();ctx.ellipse(p.x,p.y,p.s*1.8,p.s*.9,G.t+p.p,0,TAU);ctx.fill()}
else{p.x+=Math.sin(G.t*.6+p.p)*.35;p.y+=Math.cos(G.t*.5+p.p)*.25;ctx.globalCompositeOperation='lighter';glow(p.x,p.y,p.s*3,'#fff2a0',.3+Math.sin(G.t*2+p.p)*.25);ctx.globalCompositeOperation='source-over'}}}
/* ---------- rendering ---------- */
function drawTank(e){const s=e.boss?1.5:e.k=='heavy'?1.35:e.k=='tank'?1.2:e.k=='fast'?.85:e.k=='swarm'?.65:1,hue=e.boss?['#7b1111','#ff5a3c']:e.k=='heavy'?['#3a2a4a','#9a78c8']:e.k=='tank'?['#2a3b57','#5b7fb0']:e.k=='fast'?['#1f6b3a','#58c97a']:e.k=='swarm'?['#7a6a12','#f0d84a']:['#7a2a22','#d8695b'];
ctx.save();ctx.translate(e.x,e.y);ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(5,9,28*s,17*s,0,0,TAU);ctx.fill();
if(e.boss)glow(0,0,70,'#ff3d00',.35+Math.sin(G.t*6)*.15);ctx.rotate(e.a);ctx.scale(s,s);
ctx.fillStyle='#161616';rr(-25,-20,50,10,4);ctx.fill();rr(-25,10,50,10,4);ctx.fill();ctx.strokeStyle='#4a4a4a';ctx.lineWidth=2;const o=(e.d*.5)%6;ctx.beginPath();for(let i=-24+o;i<24;i+=6){ctx.moveTo(i,-19);ctx.lineTo(i,-11);ctx.moveTo(i,11);ctx.lineTo(i,19)}ctx.stroke();
ctx.fillStyle=lg(ctx,0,0,-14,14,hue[1],hue[0]);rr(-22,-14,44,28,7);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='rgba(0,0,0,.25)';rr(-18,-4,10,8,2);ctx.fill();
ctx.fillStyle='#2b2f36';rr(2,-3.5,34,7,2);ctx.fill();ctx.fillStyle='#555c68';ctx.fillRect(32,-5,6,10);
const g=ctx.createRadialGradient(-3,-4,1,0,0,13);g.addColorStop(0,hue[1]);g.addColorStop(1,hue[0]);ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,12,0,TAU);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.35)';ctx.stroke();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(-2,0,3,0,TAU);ctx.fill();
if(e.k=='tank'||e.k=='heavy'){ctx.strokeStyle='rgba(150,210,255,.7)';ctx.lineWidth=2;rr(-24,-16,48,32,9);ctx.stroke()}
ctx.restore();
if(e.st>0){ctx.globalCompositeOperation='lighter';glow(e.x,e.y,34*s,'#4fc3f7',.7);ctx.globalCompositeOperation='source-over'}
if(e.pt>0){ctx.globalCompositeOperation='lighter';glow(e.x,e.y,32*s,'#7dff4a',.5);ctx.globalCompositeOperation='source-over'}
const w=46*s,y=e.y-30*s,f=Math.max(0,e.hp/e.m);ctx.fillStyle='rgba(0,0,0,.7)';rr(e.x-w/2-1,y-1,w+2,8,4);ctx.fill();ctx.fillStyle=f>.6?'#43e07a':f>.3?'#ffd54a':'#ff5252';rr(e.x-w/2,y,w*f,6,3);ctx.fill();
if(e.boss){ctx.font='20px serif';ctx.textAlign='center';ctx.fillText('👑',e.x,y-5)}}
function drawTower(t,ghost){const T=TT[t.k],c=T.col,x=t.x,y=t.y;ctx.save();ctx.translate(x,y);
ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(4,8,30,22,0,0,TAU);ctx.fill();
let g=ctx.createRadialGradient(-8,-8,3,0,0,30);g.addColorStop(0,'#8a93a0');g.addColorStop(1,'#262b33');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,29,0,TAU);ctx.fill();ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,27,0,TAU);ctx.stroke();ctx.fillStyle='#3a414c';ctx.beginPath();ctx.arc(0,0,21,0,TAU);ctx.fill();
const lv=t.u[0]+t.u[1]+t.u[2];for(let i=0;i<Math.min(lv,9);i++){ctx.fillStyle='#ffd54a';ctx.beginPath();ctx.arc(-18+i*4.5,34,2,0,TAU);ctx.fill()}
ctx.rotate(t.a);const k=t.k,rc=-(t.b||0)*5;
if(k==0){ctx.fillStyle='#9aa4b0';rr(4+rc,-9,32,6,2);ctx.fill();rr(4+rc,3,32,6,2);ctx.fill();ctx.fillStyle=c;ctx.fillRect(34+rc,-10,5,8);ctx.fillRect(34+rc,2,5,8)}
else if(k==1){ctx.fillStyle='#6b2a22';rr(-12+rc,-14,34,28,5);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(24+rc,-7,5,0,TAU);ctx.arc(24+rc,7,5,0,TAU);ctx.fill();ctx.fillStyle='#ff6a2b';ctx.beginPath();ctx.arc(24+rc,-7,2.5,0,TAU);ctx.arc(24+rc,7,2.5,0,TAU);ctx.fill()}
else if(k==2){ctx.rotate(-t.a);ctx.fillStyle='#454b57';ctx.beginPath();ctx.arc(0,0,11,0,TAU);ctx.fill();ctx.fillStyle='#aab';ctx.fillRect(-2.5,-18,5,18);ctx.globalCompositeOperation='lighter';glow(0,-18,22+Math.sin(G.t*14)*5,'#f7e84a',.9);ctx.globalCompositeOperation='source-over'}
else if(k==3){ctx.rotate(-t.a+G.t);ctx.fillStyle=lg(ctx,0,0,-16,16,'#e1f5fe','#0288d1');ctx.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6,r=i%2?8:17;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.fill();ctx.globalCompositeOperation='lighter';glow(0,0,26,'#4fc3f7',.6);ctx.globalCompositeOperation='source-over'}
else if(k==5){ctx.fillStyle='#2e352f';rr(-8+rc,-5,54,10,3);ctx.fill();ctx.fillStyle='#9be564';ctx.fillRect(42+rc,-3.5,6,7);ctx.fillStyle='#1c211d';rr(-4,-11,18,9,3);ctx.fill();ctx.fillStyle='#ff4b4b';ctx.beginPath();ctx.arc(-6,0,3.2,0,TAU);ctx.fill();ctx.globalCompositeOperation='lighter';glow(-6,0,10,'#ff4b4b',.5+Math.sin(G.t*4)*.25);ctx.globalCompositeOperation='source-over'}
else if(k==6){ctx.fillStyle='#4a2a1a';rr(2+rc,-9,28,18,5);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(32+rc,0,8,0,TAU);ctx.fill();ctx.fillStyle='#ff7a2b';ctx.beginPath();ctx.arc(32+rc,0,4.5+Math.sin(G.t*22),0,TAU);ctx.fill();ctx.globalCompositeOperation='lighter';glow(32,0,20,'#ff7a2b',.65);ctx.globalCompositeOperation='source-over'}
else{ctx.fillStyle='#2f2340';ctx.beginPath();ctx.arc(0,0,14,0,TAU);ctx.fill();ctx.fillStyle='#8be04a';ctx.beginPath();ctx.arc(0,0,10,0,TAU);ctx.fill();ctx.fillStyle='#b44cff';ctx.fillRect(10+rc,-4,18,8);ctx.globalCompositeOperation='lighter';glow(0,0,24,'#b44cff',.5+Math.sin(G.t*5)*.2);ctx.globalCompositeOperation='source-over'}
ctx.restore()}
function render(){const sx=(R()-.5)*G.shake,sy=(R()-.5)*G.shake;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#07110b';ctx.fillRect(0,0,cv.width,cv.height);ctx.setTransform(K,0,0,K,OX+sx*K,OY+sy*K);
ctx.drawImage(bg,0,0,W,H);
const[bx,by]=BASE,lo=G.hp<35;glow(bx,by,90,lo?'#ff1d1d':'#ffb300',.35+Math.sin(G.t*(lo?9:2))*.12);
ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(bx+6,by+12,50,36,0,0,TAU);ctx.fill();let g=ctx.createRadialGradient(bx-10,by-12,4,bx,by,48);g.addColorStop(0,'#c9ced6');g.addColorStop(1,'#4b5260');ctx.fillStyle=g;rr(bx-40,by-40,80,80,16);ctx.fill();ctx.strokeStyle='#ffd54a';ctx.lineWidth=3;ctx.stroke();
for(const[ox,oy]of[[-40,-40],[40,-40],[-40,40],[40,40]]){ctx.fillStyle='#6a7280';ctx.beginPath();ctx.arc(bx+ox,by+oy,11,0,TAU);ctx.fill();ctx.strokeStyle='#ffd54a';ctx.lineWidth=2;ctx.stroke()}
ctx.fillStyle='#b71c1c';rr(bx-22,by-22,44,44,10);ctx.fill();ctx.font='28px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🏰',bx,by+1);
if(G.sel||G.gh){const t=G.sel||{x:G.gh.x,y:G.gh.y,rg:TT[G.type].r};ctx.fillStyle=G.gh&&!G.gh.ok?'rgba(255,60,60,.14)':'rgba(120,230,255,.13)';ctx.strokeStyle=G.gh&&!G.gh.ok?'rgba(255,90,90,.7)':'rgba(140,235,255,.7)';ctx.lineWidth=2;ctx.setLineDash([10,8]);ctx.lineDashOffset=-G.t*20;ctx.beginPath();ctx.arc(t.x,t.y,t.rg,0,TAU);ctx.fill();ctx.stroke();ctx.setLineDash([])}
[...G.en].sort((a,b)=>a.y-b.y).forEach(drawTank);
for(const t of G.tw){drawTower(t);if(t===G.sel){ctx.strokeStyle='#ffd54a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(t.x,t.y,34,0,TAU);ctx.stroke()}}
if(G.gh){ctx.globalAlpha=.72;drawTower({k:G.type,x:G.gh.x,y:G.gh.y,a:-1.2,u:[0,0,0],b:0});ctx.globalAlpha=1;ctx.strokeStyle=G.gh.ok?'#43e07a':'#ff5252';ctx.lineWidth=3;ctx.beginPath();ctx.arc(G.gh.x,G.gh.y,33,0,TAU);ctx.stroke()}
ctx.globalCompositeOperation='lighter';
for(const b of G.bu){const c=b.c;ctx.strokeStyle=c;ctx.lineWidth=b.z;ctx.lineCap='round';ctx.globalAlpha=.7;ctx.beginPath();ctx.moveTo(b.px-b.vx*14,b.py-b.vy*14);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=1;glow(b.x,b.y,b.z*4.5,c)}
for(const p of G.pa)if(p.add){glow(p.x,p.y,p.s*2.6,p.c,Math.max(0,p.l/p.L))}
for(const f of G.fx){const a=f.l/f.L;if(f.k=='b'){ctx.strokeStyle='#fff7a0';ctx.lineWidth=3;ctx.globalAlpha=a;ctx.beginPath();f.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.strokeStyle='#f7e84a';ctx.lineWidth=9;ctx.globalAlpha=a*.3;ctx.stroke();ctx.globalAlpha=1}
else if(f.k=='ring'){ctx.strokeStyle=f.c;ctx.lineWidth=4*a+1;ctx.globalAlpha=a;ctx.beginPath();ctx.arc(f.x,f.y,f.r+(f.m-f.r)*(1-a),0,TAU);ctx.stroke();ctx.globalAlpha=1}}
ctx.globalCompositeOperation='source-over';
for(const p of G.pa)if(!p.add){ctx.globalAlpha=Math.max(0,p.l/p.L)*.8;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s*(p.l/p.L),0,TAU);ctx.fill()}ctx.globalAlpha=1;
ctx.textAlign='center';ctx.lineJoin='round';for(const f of G.fx)if(f.k=='t'){const a=f.l/f.L;ctx.globalAlpha=a;ctx.font=`900 ${f.z}px system-ui`;ctx.lineWidth=4;ctx.strokeStyle='rgba(0,0,0,.8)';ctx.strokeText(f.s,f.x,f.y);ctx.fillStyle=f.c;ctx.fillText(f.s,f.x,f.y)}ctx.globalAlpha=1;drawAmb();for(const f of G.fx)if(f.k=='flash'){ctx.globalAlpha=Math.max(0,f.l/f.L)*.55;ctx.fillStyle='#fff7d6';ctx.fillRect(-3000,-3000,7000,7000);ctx.globalAlpha=1}}
/* ---------- input ---------- */
cv.addEventListener('pointerdown',e=>{if(!G.run)return;const[x,y]=toW(e),t=G.tw.find(o=>Math.hypot(o.x-x,o.y-y)<36);if(t){G.sel=t;G.gh=null;panel();snd(500,.05,'triangle');return}closePanel();G.drag=true;G.gh={x,y,ok:canPlace(x,y)};cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(!G.drag)return;const[x,y]=toW(e);G.gh={x,y,ok:canPlace(x,y)}});
cv.addEventListener('pointerup',e=>{if(!G.drag)return;G.drag=false;const[x,y]=toW(e);G.gh=null;place(x,y)});
cv.addEventListener('pointercancel',()=>{G.drag=false;G.gh=null});
$('bp').onclick=()=>{G.pause=!G.pause;$('bp').textContent=G.pause?'▶':'⏸';$('pz').classList.toggle('hide',!G.pause);mvol()};
$('ba').onclick=airstrike;$('br').onclick=repair;$('bmu').onclick=togMusic;
$('bs').onclick=()=>{G.spd=G.spd%3+1;$('bs').textContent=G.spd+'×'};
$('bm').onclick=togMute;
$('bh').onclick=()=>home();
function setLang(i){LI=i;try{localStorage.tdL=i}catch(e){}const d=document.documentElement;d.lang=LN[i];d.dir=i==0?'rtl':'ltr';document.title=t('title');$('ttl').textContent=t('title');$('sub').textContent=t('sub');$('cr').textContent=t('credit');$('cr2').textContent=t('credit');$('eN').textContent=t('next');$('eR').textContent=t('retry');$('eM').textContent=t('menu');
$('langs').innerHTML=LNAME.map((n,k)=>`<button class="lg${k==i?' on':''}" data-k="${k}">${n}</button>`).join('')+`<button class="lg tg${musicOn?' on':''}" id="tm">🎵</button><button class="lg tg${mute?'':' on'}" id="ts">🔊</button>`;$('langs').querySelectorAll('.lg[data-k]').forEach(b=>b.onclick=()=>{setLang(+b.dataset.k);snd(500,.05,'triangle')});$('tm').onclick=togMusic;$('ts').onclick=togMute;$('bm').textContent=mute?'🔇':'🔊';$('bmu').textContent=musicOn?'🎵':'🔕';
buildShop();renderMenu();hud()}
function preview(c,i){const x=c.getContext('2d'),T=TH[LV[i].th],p=LV[i].P,k=c.width/W;let g=x.createLinearGradient(0,0,c.width,c.height);g.addColorStop(0,T.g[1]);g.addColorStop(1,T.g[2]);x.fillStyle=g;x.fillRect(0,0,c.width,c.height);x.lineCap=x.lineJoin='round';
for(const[w,col]of[[16,T.rd[0]],[11,T.rd[1]],[5,T.rd[2]]]){x.strokeStyle=col;x.lineWidth=w*k*3;x.beginPath();p.forEach((q,j)=>j?x.lineTo(q[0]*k,q[1]*k):x.moveTo(q[0]*k,q[1]*k));x.stroke()}
const b=p[p.length-1];x.fillStyle='#ffc83d';x.beginPath();x.arc(b[0]*k,b[1]*k,6,0,TAU);x.fill()}
function renderMenu(){const w=PR.wd||0,T=TH[THN[w]];$('menu').style.setProperty('--cc',T.cc);
let tot=0;for(let i=0;i<LV.length;i++)tot+=PR.s[i]||0;$('sub').textContent=t('sub')+' · ⭐ '+tot+'/'+LV.length*3;
$('worlds').innerHTML=THN.map((n,k)=>{let s=0;for(let j=0;j<4;j++)s+=PR.s[k*4+j]||0;const lk=k*4>PR.u;return`<button class="wc${k==w?' on':''}${lk?' lk':''}" data-w="${k}" style="--cc:${TH[n].cc}"><i>${lk?'🔒':WI[k]}</i><span>${I['l'+k][LI]}</span><small>⭐ ${s}/12</small></button>`}).join('');
const e=$('lvls');e.innerHTML=[0,1,2,3].map(j=>{const i=w*4+j,l=LV[i],s=PR.s[i]||0,sk=Math.min(5,Math.max(1,Math.round(l.hm*1.15)));return`<div class="gl lc${i>PR.u?' lk':''}" data-i="${i}"><b class="ln">${w+1}-${j+1}</b><canvas width="170" height="96"></canvas><h3>${I['l'+w][LI]}</h3><small>🎯 ${l.w} · ${'💀'.repeat(sk)}</small><div class="s">${'★'.repeat(s)}${'☆'.repeat(3-s)}</div></div>`}).join('');
e.querySelectorAll('.lc').forEach(c=>{preview(c.querySelector('canvas'),+c.dataset.i);c.onclick=()=>{if(!c.classList.contains('lk'))start(+c.dataset.i)}});
$('worlds').querySelectorAll('.wc').forEach(c=>c.onclick=()=>selWorld(+c.dataset.w));const on=$('worlds').querySelector('.wc.on');try{on&&on.scrollIntoView({inline:'center',block:'nearest'})}catch(x){}}
function selWorld(k){if(k*4>PR.u)return;PR.wd=k;savePR();setPath(k*4);buildBG();G=newG(1);G.wave=3;initAmb();renderMenu();snd(520,.05,'triangle')}
function start(i){initAudio();if(!APP&&!document.fullscreenElement)try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen({navigationUI:'hide'}).then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})).catch(()=>{})}catch(e){}
setPath(i);buildBG();$('menu').classList.add('hide');$('end').classList.add('hide');$('pz').classList.add('hide');reset();snd(330,.25,'sawtooth',.05,300);setMusic(LV[i].wd)}
function home(){$('end').classList.add('hide');$('pz').classList.add('hide');PR.wd=LV[L].wd;savePR();setPath(L);buildBG();G=newG(1);G.wave=3;initAmb();closePanel();$('menu').classList.remove('hide');renderMenu();setMusic('menu')}

$('eR').onclick=()=>start(L);$('eN').onclick=()=>start(L+1);$('eM').onclick=home;
document.addEventListener('visibilitychange',()=>{if(document.hidden&&G.run&&!G.pause)$('bp').click();if(AC){try{document.hidden?AC.suspend():AC.resume()}catch(e){}}});
['pointerdown','touchstart','keydown'].forEach(ev=>addEventListener(ev,unlock,{passive:true}));
window.onBack=()=>{if(!$('end').classList.contains('hide')){home();return true}if(G.menu)return false;home();return true};
addEventListener('resize',resize);addEventListener('contextmenu',e=>e.preventDefault());
function demo(dt){G.t+=dt;if(G.en.length<5&&R()<.025)spawn(['normal','fast','tank'][R()*3|0]);for(const e of G.en){e.d+=e.v*dt;const p=at(e.d);e.x=p[0];e.y=p[1];e.a=p[2];if(e.d>=TL)e.dead=true}G.en=G.en.filter(e=>!e.dead)}
let last=0;function frame(t){requestAnimationFrame(frame);const dt=Math.min((t-last)/1000,.05);last=t;if(G.menu)demo(dt);else if(G.run&&!G.pause)for(let i=0;i<G.spd&&G.run;i++)step(dt);render()}
setPath((PR.wd||0)*4);G=newG(1);G.wave=3;initAmb();LI=Math.max(0,LN.indexOf((navigator.language||'ar').slice(0,2)));try{if(localStorage.tdL!==undefined)LI=+localStorage.tdL}catch(e){}
resize();setLang(LI);requestAnimationFrame(frame);
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
