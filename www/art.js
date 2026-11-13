'use strict';
/* art.js — رسومات المركبات والأبراج والقاعدة والأيقونات (كلها رسم برمجي، بدون صور) */
const svgI=(p,c)=>`<svg viewBox="0 0 24 24" class="${c||'ic'}">${p}</svg>`;
const COIN='<svg class="ci" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="#ffc83d" stroke="#9a5d00" stroke-width="1.6"/><circle cx="12" cy="12" r="7" fill="none" stroke="#fff0a8" stroke-width="1.6"/><path d="M12 7.5v9" stroke="#b36b00" stroke-width="2" stroke-linecap="round"/></svg>';
const ICN={pause:svgI('<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>'),play:svgI('<path d="M8 5v14l11-7z"/>'),home:svgI('<path d="M12 3 2 12h3v9h5v-6h4v6h5v-9h3z"/>'),
snd:svgI('<path d="M3 9v6h4l5 4V5L7 9z"/><path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
mut:svgI('<path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
gear:svgI('<path d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 00-1.7-1L15 3h-4l-.4 3a7.6 7.6 0 00-1.7 1l-2.4-1-2 3.4 2 1.6a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 001.7 1l.4 3h4l.4-3a7.6 7.6 0 001.7-1l2.4 1 2-3.4zM13 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" transform="translate(-1 0)"/>'),
fwd:svgI('<path d="M4 5v14l8-7zM12 5v14l8-7z"/>'),
wave:svgI('<path d="M5 3v18M5 4h13l-3 4 3 4H5" fill="#5fd4ff" stroke="#c8f1ff" stroke-width="2" stroke-linejoin="round"/>','ci'),
tow:svgI('<path d="M4 20h16v-3H4zM6 17V9h12v8zM9 9V5h6v4zM15 6h6v2h-6z" fill="#cfd8bd"/>','ci'),
sh:svgI('<path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z" fill="#ff6a2b" stroke="#ffd0b0" stroke-width="1.6"/>','ci')};
const UPI=[svgI('<path d="M12 2l2.6 6.4L21.5 9l-5.2 4.6L18 21l-6-3.7L6 21l1.7-7.4L2.5 9l6.9-.6z"/>','ui'),svgI('<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="3"/>','ui'),svgI('<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>','ui')];
const STAR='<svg viewBox="0 0 24 24"><path d="M12 1.5l3.2 6.9 7.5.9-5.5 5.1 1.5 7.4L12 18l-6.7 3.8 1.5-7.4L1.3 9.3l7.5-.9z" fill="#ffc83d" stroke="#fff3b0" stroke-width="1.2" stroke-linejoin="round"/></svg>';
const BOOM='<svg viewBox="0 0 24 24"><path d="M12 1l2.4 6 5.8-3-2.4 6 5.9 2.2-5.6 2.8 3 5.6-6.2-1.5L12 23l-2.9-5.9-6.2 1.5 3-5.6L.4 11.2 6.3 9 3.9 3l5.8 3z" fill="#ff6a2b" stroke="#ffd54a" stroke-width="1.2" stroke-linejoin="round"/></svg>';

function glowX(X,x,y,r,c,a){X.globalAlpha=a==null?1:a;X.drawImage(gs(c),x-r,y-r,r*2,r*2);X.globalAlpha=1}
function rX(X,x,y,w,h,r){X.beginPath();if(X.roundRect)X.roundRect(x,y,w,h,r);else X.rect(x,y,w,h)}
function vg(X,y0,y1,a,b,m){const g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,a);if(m)g.addColorStop(.5,m);g.addColorStop(1,b);return g}
function oct(X,r,o){X.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8+o;X.lineTo(Math.cos(a)*r,Math.sin(a)*r)}X.closePath()}
function flashX(X,x,y,r,c){X.save();X.globalCompositeOperation='lighter';glowX(X,x,y,r*1.7,c,.9);X.fillStyle='#fff6c0';X.beginPath();for(let i=0;i<10;i++){const a=i*TAU/10,q=i%2?r*.35:r;X.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}X.closePath();X.fill();X.restore()}

/* ---------- enemy tanks ---------- */
const TPAL={boss:['#ffa08a','#b5322a','#4a0b0b','#ff3d00'],tank:['#a9c8f0','#41689e','#16233a','#5fd4ff'],fast:['#a9f0c4','#2f9e57','#0f3d20','#7dff4a'],normal:['#f0b3a8','#a8443a','#4a1812','#ffb300']};
function tankArt(e){const X=ctx,s=e.boss?1.55:e.k=='tank'?1.22:e.k=='fast'?.86:1,pl=TPAL[e.boss?'boss':e.k];
X.save();X.translate(e.x,e.y);X.fillStyle='rgba(0,0,0,.34)';X.beginPath();X.ellipse(6,10,30*s,19*s,0,0,TAU);X.fill();
if(e.boss)glowX(X,0,0,86,'#ff3d00',.28+Math.sin(G.t*6)*.12);
X.rotate(e.a);X.scale(s,s);X.lineJoin='round';
const L=e.k=='fast'?24:28,hw=e.k=='tank'||e.boss?14:12;
for(const sy of[-1,1]){const y0=sy<0?-hw-9:hw-1;X.fillStyle='#0f1114';rX(X,-L,y0,L*2,10,5);X.fill();
 X.strokeStyle='#3b4048';X.lineWidth=1.6;X.beginPath();const o=(e.d*.6)%5;for(let i=-L+3+o;i<L-2;i+=5){X.moveTo(i,y0+1);X.lineTo(i,y0+9)}X.stroke();
 X.fillStyle='#5a616d';for(let i=-L+7;i<L-4;i+=11){X.beginPath();X.arc(i,y0+5,3.4,0,TAU);X.fill()}
 X.fillStyle='#8b94a1';X.beginPath();X.arc(-L+5,y0+5,2,0,TAU);X.arc(L-5,y0+5,2,0,TAU);X.fill()}
X.beginPath();X.moveTo(-L+2,-hw);X.lineTo(L-8,-hw);X.lineTo(L+2,-hw+5);X.lineTo(L+2,hw-5);X.lineTo(L-8,hw);X.lineTo(-L+2,hw);X.closePath();
X.fillStyle=vg(X,-hw,hw,pl[0],pl[2],pl[1]);X.fill();X.strokeStyle='rgba(0,0,0,.6)';X.lineWidth=1.6;X.stroke();
X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=1;X.beginPath();X.moveTo(-L+4,-hw+2.5);X.lineTo(L-9,-hw+2.5);X.stroke();
X.fillStyle='rgba(0,0,0,.35)';rX(X,-L+4,-hw+4,12,hw*2-8,2);X.fill();X.strokeStyle='rgba(255,255,255,.15)';X.beginPath();for(let i=-hw+7;i<hw-5;i+=3){X.moveTo(-L+5,i);X.lineTo(-L+15,i)}X.stroke();
X.fillStyle=pl[3];X.fillRect(L-1,-hw+6,2.5,2.5);X.fillRect(L-1,hw-8.5,2.5,2.5);
if(e.k=='tank'){X.fillStyle='rgba(15,25,45,.65)';for(let i=-14;i<=10;i+=8){rX(X,i,-hw+1,6,4,1);X.fill();rX(X,i,hw-5,6,4,1);X.fill()}}
const tr=e.boss?15:e.k=='fast'?9:12,bl=e.boss?40:e.k=='fast'?34:36;
X.fillStyle=vg(X,-3,3,'#7a8391','#1b1f26');
if(e.boss){rX(X,6,-8,bl,5,2);X.fill();rX(X,6,3,bl,5,2);X.fill();X.fillStyle='#2b2f36';X.fillRect(bl-2,-9.5,7,8);X.fillRect(bl-2,1.5,7,8)}
else{rX(X,4,-3,bl,6,2);X.fill();X.fillStyle='#2b2f36';rX(X,bl-3,-4.5,7,9,2);X.fill()}
X.beginPath();X.moveTo(-tr,-tr*.7);X.lineTo(tr*.6,-tr*.85);X.lineTo(tr*1.15,-tr*.35);X.lineTo(tr*1.15,tr*.35);X.lineTo(tr*.6,tr*.85);X.lineTo(-tr,tr*.7);X.closePath();
X.fillStyle=vg(X,-tr,tr,pl[0],pl[2],pl[1]);X.fill();X.strokeStyle='rgba(0,0,0,.6)';X.lineWidth=1.6;X.stroke();
X.fillStyle='#14171c';X.beginPath();X.arc(-tr*.25,0,tr*.32,0,TAU);X.fill();X.fillStyle=pl[1];X.beginPath();X.arc(-tr*.25,0,tr*.2,0,TAU);X.fill();
if(e.k=='normal'){X.strokeStyle='#aab';X.lineWidth=1;X.beginPath();X.moveTo(-tr,tr*.5);X.lineTo(-tr-14,tr*.5+6);X.stroke()}
if(e.boss){X.fillStyle='#2b0a0a';for(const sy of[-1,1])for(let i=-18;i<=12;i+=10){X.beginPath();X.moveTo(i,sy*(hw-1));X.lineTo(i+4,sy*(hw+5));X.lineTo(i+8,sy*(hw-1));X.fill()}
 X.globalCompositeOperation='lighter';glowX(X,tr*.5,0,15,'#ff3d00',.7+Math.sin(G.t*8)*.3);X.globalCompositeOperation='source-over'}
X.restore();
if(e.st>0){X.globalCompositeOperation='lighter';glowX(X,e.x,e.y,36*s,'#4fc3f7',.7);X.globalCompositeOperation='source-over'}
if(e.pt>0){X.globalCompositeOperation='lighter';glowX(X,e.x,e.y,34*s,'#7dff4a',.5);X.globalCompositeOperation='source-over'}
const w=46*s,y=e.y-31*s,f=Math.max(0,e.hp/e.m);X.fillStyle='rgba(0,0,0,.72)';rX(X,e.x-w/2-1.5,y-1.5,w+3,9,4.5);X.fill();
X.fillStyle=f>.6?'#43e07a':f>.3?'#ffd54a':'#ff5252';rX(X,e.x-w/2,y,Math.max(2,w*f),6,3);X.fill();X.fillStyle='rgba(255,255,255,.35)';rX(X,e.x-w/2,y,Math.max(2,w*f),2.5,2);X.fill();
if(e.boss){const cx=e.x,cy=y-9;X.fillStyle='#ffd54a';X.strokeStyle='#8a5a00';X.lineWidth=1.2;X.beginPath();X.moveTo(cx-9,cy+5);X.lineTo(cx-9,cy-3);X.lineTo(cx-4.5,cy+1);X.lineTo(cx,cy-6);X.lineTo(cx+4.5,cy+1);X.lineTo(cx+9,cy-3);X.lineTo(cx+9,cy+5);X.closePath();X.fill();X.stroke()}}

/* ---------- player turrets ---------- */
function towerArt(X,t){const T=TT[t.k],c=T.col,lv=t.u[0]+t.u[1]+t.u[2],gd=lv>=6,k=t.k,rc=-(t.b||0)*5;
X.save();X.translate(t.x,t.y);X.lineJoin='round';
X.fillStyle='rgba(0,0,0,.38)';X.beginPath();X.ellipse(6,10,32,24,0,0,TAU);X.fill();
oct(X,32,TAU/16);let g=X.createRadialGradient(-11,-11,3,0,0,36);g.addColorStop(0,'#a3acb8');g.addColorStop(1,'#272c35');X.fillStyle=g;X.fill();X.strokeStyle=gd?'#ffd54a':'#0e1116';X.lineWidth=3;X.stroke();
X.fillStyle='#8a93a0';for(let i=0;i<8;i++){const a=i*TAU/8;X.beginPath();X.arc(Math.cos(a)*27,Math.sin(a)*27,1.8,0,TAU);X.fill()}
X.strokeStyle=c;X.lineWidth=2.5;X.beginPath();X.arc(0,0,22,0,TAU);X.stroke();
g=X.createRadialGradient(-6,-6,2,0,0,20);g.addColorStop(0,'#59616e');g.addColorStop(1,'#232830');X.fillStyle=g;X.beginPath();X.arc(0,0,20,0,TAU);X.fill();
for(let i=0;i<Math.min(lv,9);i++){X.fillStyle=gd?'#ffd54a':'#ffb300';X.beginPath();X.moveTo(-20+i*5,37);X.lineTo(-17.5+i*5,33);X.lineTo(-15+i*5,37);X.fill()}
X.rotate(t.a);
if(k==0){t.sp=(t.sp||0)+(t.b||0)*.8+.02;
 X.fillStyle='#2b3038';rX(X,-12,-11,24,22,6);X.fill();X.strokeStyle='#0e1116';X.lineWidth=1.5;X.stroke();
 X.fillStyle='#b98a2c';X.beginPath();X.arc(-6,0,8,0,TAU);X.fill();X.strokeStyle='#6b4d12';X.stroke();
 for(let i=0;i<6;i++){const a=t.sp+i*TAU/6,yy=Math.sin(a)*6.5,sh=.45+Math.cos(a)*.35;X.fillStyle=`rgb(${110*sh+60|0},${118*sh+62|0},${130*sh+66|0})`;X.fillRect(8+rc,yy-1.6,30,3.2)}
 X.fillStyle='#454c57';X.fillRect(30+rc,-9,4,18);X.fillStyle=c;X.fillRect(36+rc,-9,2.5,18);
 if(t.b>.55)flashX(X,43+rc,0,13,c)}
else if(k==1){X.fillStyle='#4b2a24';rX(X,-14,-17,36,34,6);X.fill();X.strokeStyle='#14100f';X.lineWidth=1.5;X.stroke();
 X.save();X.beginPath();X.rect(-14,-17,8,34);X.clip();X.fillStyle='#ffc83d';X.fillRect(-14,-17,8,34);X.strokeStyle='#17190f';X.lineWidth=4;for(let i=-34;i<40;i+=9){X.beginPath();X.moveTo(-14,i);X.lineTo(-6,i+8);X.stroke()}X.restore();
 for(const sy of[-1,1]){X.fillStyle='#6b3a30';rX(X,-4+rc,sy*9-8,28,16,3);X.fill();X.strokeStyle='#14100f';X.lineWidth=1.2;X.stroke();
  for(const q of[-4,4]){X.fillStyle='#120d0c';X.beginPath();X.arc(24+rc,sy*9+q,3.5,0,TAU);X.fill();X.fillStyle=t.cd<=.05?'#ff7a2b':'#5a2a20';X.beginPath();X.arc(24+rc,sy*9+q,2.1,0,TAU);X.fill()}
  if(t.b>.55)flashX(X,29+rc,sy*9,8,'#ff9a3c')}}
else if(k==2){X.rotate(-t.a);X.fillStyle='#3d4452';X.beginPath();X.arc(0,0,13,0,TAU);X.fill();X.strokeStyle='#0e1116';X.lineWidth=1.5;X.stroke();
 for(let i=0;i<3;i++){X.strokeStyle='#d58a45';X.lineWidth=2.4;X.beginPath();X.arc(0,0,11-i*3,0,TAU);X.stroke()}
 X.fillStyle='#cfd6e0';X.beginPath();X.arc(0,0,3.2,0,TAU);X.fill();
 X.globalCompositeOperation='lighter';const ch=1+(t.b||0)*1.2;glowX(X,0,0,(20+Math.sin(G.t*14)*4)*ch,'#f7e84a',.85);
 for(let j=0;j<3;j++){const a=G.t*3+j*2.1,r1=17+Math.sin(G.t*20+j*3)*5;X.strokeStyle='rgba(210,245,255,.85)';X.lineWidth=1.4;X.beginPath();X.moveTo(Math.cos(a)*5,Math.sin(a)*5);X.lineTo(Math.cos(a+.3)*r1*.6,Math.sin(a+.3)*r1*.6);X.lineTo(Math.cos(a-.1)*r1,Math.sin(a-.1)*r1);X.stroke()}
 X.globalCompositeOperation='source-over'}
else if(k==3){X.fillStyle='#2a6f94';rX(X,-12,-10,22,20,5);X.fill();X.strokeStyle='#0a2a3d';X.lineWidth=1.5;X.stroke();
 X.fillStyle='#4fc3f7';rX(X,-10,-15,14,5,2);X.fill();rX(X,-10,10,14,5,2);X.fill();
 X.fillStyle=vg(X,-5,5,'#e1f5fe','#0b6fa8');rX(X,6+rc,-5,26,10,4);X.fill();X.stroke();
 X.fillStyle='#e8fbff';X.beginPath();X.moveTo(41+rc,0);X.lineTo(32+rc,-8);X.lineTo(35+rc,0);X.lineTo(32+rc,8);X.closePath();X.fill();
 X.globalCompositeOperation='lighter';glowX(X,38+rc,0,16+(t.b||0)*12,'#4fc3f7',.7);X.globalCompositeOperation='source-over'}
else{X.fillStyle='#35294a';rX(X,-12,-10,24,20,5);X.fill();X.strokeStyle='#120c1c';X.lineWidth=1.5;X.stroke();
 g=X.createRadialGradient(-7,-3,1,-5,0,11);g.addColorStop(0,'#c8ff8a');g.addColorStop(1,'#3b7a1a');X.fillStyle=g;X.beginPath();X.arc(-5,0,10,0,TAU);X.fill();X.stroke();
 X.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<3;i++){X.beginPath();X.arc(-5+Math.sin(G.t*2+i*2)*4,Math.cos(G.t*1.7+i*2.4)*4,1.4,0,TAU);X.fill()}
 X.strokeStyle='#120c1c';X.lineWidth=3;X.beginPath();X.moveTo(3,0);X.lineTo(14,0);X.stroke();
 X.fillStyle='#3b2b4d';rX(X,12+rc,-6,22,12,3);X.fill();X.stroke();X.fillStyle='#b44cff';rX(X,32+rc,-8,5,16,2);X.fill();
 X.globalCompositeOperation='lighter';glowX(X,37+rc,0,14+(t.b||0)*14+Math.sin(G.t*5)*2,'#b44cff',.7);X.globalCompositeOperation='source-over'}
X.restore()}
const ICO={};function towerIcon(k){if(ICO[k])return ICO[k];const c=document.createElement('canvas');c.width=c.height=84;const x=c.getContext('2d');x.translate(42,42);x.scale(1.05,1.05);towerArt(x,{k,x:0,y:0,a:-.55,u:[0,0,0],b:0,sp:0,cd:1});return ICO[k]=c.toDataURL()}

/* ---------- base / decals / clouds ---------- */
function baseArt(){const[bx,by]=BASE,X=ctx,lo=G.hp<35,tt=G.t;
glowX(X,bx,by,106,lo?'#ff1d1d':'#ffb300',.28+Math.sin(tt*(lo?9:2))*.1);
X.save();X.translate(bx,by);X.lineJoin='round';X.fillStyle='rgba(0,0,0,.4)';X.beginPath();X.ellipse(8,14,58,44,0,0,TAU);X.fill();
oct(X,52,TAU/16);let g=X.createRadialGradient(-14,-16,6,0,0,58);g.addColorStop(0,'#d3d8df');g.addColorStop(1,'#475060');X.fillStyle=g;X.fill();X.strokeStyle='#1a1e25';X.lineWidth=4;X.stroke();X.strokeStyle='#ffd54a';X.lineWidth=1.8;X.stroke();
for(const[ox,oy]of[[-40,-40],[40,-40],[-40,40],[40,40]]){g=X.createRadialGradient(ox-3,oy-3,1,ox,oy,12);g.addColorStop(0,'#9aa4b0');g.addColorStop(1,'#3a414c');X.fillStyle=g;X.beginPath();X.arc(ox,oy,11,0,TAU);X.fill();X.strokeStyle='#ffd54a';X.lineWidth=2;X.stroke();X.fillStyle='#1a1e25';X.beginPath();X.arc(ox,oy,4,0,TAU);X.fill()}
oct(X,36,TAU/16);X.fillStyle='#2b313b';X.fill();X.strokeStyle='#0e1116';X.lineWidth=2;X.stroke();
g=X.createLinearGradient(0,-22,0,22);g.addColorStop(0,'#d84a3a');g.addColorStop(1,'#6d0f0f');X.fillStyle=g;rX(X,-22,-22,44,44,9);X.fill();X.strokeStyle='#2a0505';X.lineWidth=2;X.stroke();
X.strokeStyle='rgba(255,255,255,.18)';X.lineWidth=1;X.beginPath();for(let i=-14;i<=14;i+=7){X.moveTo(-18,i);X.lineTo(18,i)}X.stroke();
X.fillStyle='#ffd54a';X.strokeStyle='#8a5a00';X.lineWidth=1;X.beginPath();for(let i=0;i<10;i++){const a=i*TAU/10-Math.PI/2,r=i%2?4.5:11;X.lineTo(Math.cos(a)*r,Math.sin(a)*r)}X.closePath();X.fill();X.stroke();
X.save();X.translate(24,-24);X.rotate(tt*1.5);X.fillStyle='#aab3be';X.beginPath();X.ellipse(0,0,10,3.6,0,0,TAU);X.fill();X.fillStyle='#ff5252';X.beginPath();X.arc(8,0,1.6,0,TAU);X.fill();X.restore();
X.strokeStyle='#cfd6e0';X.lineWidth=2;X.beginPath();X.moveTo(-26,-24);X.lineTo(-26,-50);X.stroke();X.fillStyle='#e53935';X.beginPath();X.moveTo(-26,-50);for(let i=0;i<=8;i++)X.lineTo(-26+i*2.3,-50+Math.sin(tt*4+i*.7)*1.8);for(let i=8;i>=0;i--)X.lineTo(-26+i*2.3,-40+Math.sin(tt*4+i*.7)*1.8);X.closePath();X.fill();
if(G.hp<65){X.strokeStyle='rgba(0,0,0,.6)';X.lineWidth=1.6;X.beginPath();X.moveTo(-8,-22);X.lineTo(-3,-10);X.lineTo(-11,-2);X.moveTo(14,22);X.lineTo(9,10);X.lineTo(16,2);X.stroke()}
if(lo){X.globalCompositeOperation='lighter';glowX(X,-14,8,26+Math.sin(tt*12)*6,'#ff6a2b',.85);glowX(X,16,-6,22+Math.sin(tt*10+1)*5,'#ffb300',.75);X.globalCompositeOperation='source-over';glowX(X,-12,-18-(tt*20%30),20,'#000000',.25)}
X.restore()}
function decalArt(){for(const d of G.dc){glowX(ctx,d.x,d.y,d.r,'#000000',Math.min(1,d.l/5)*.5)}}
function cloudsArt(){const t=G.t;for(let i=0;i<3;i++){const x=((t*14+i*520)%(W+700))-350,y=160+i*220+Math.sin(t*.1+i)*40;glowX(ctx,x,y,260,'#000000',.07)}}
