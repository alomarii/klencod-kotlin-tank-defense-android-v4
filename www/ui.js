'use strict';
/* ui.js — التحكم بالواجهة: شاشة البداية، الإيقاف المؤقت، الإعدادات، ربط الموسيقى */
(function(){
const $$=$;
/* HUD icons */
$$('bp').innerHTML=ICN.pause;$$('bm').innerHTML=ICN.snd;$$('bh').innerHTML=ICN.home;$$('gear').innerHTML=ICN.gear;
$$('bn').innerHTML=ICN.fwd+'<span></span>';
$$('g').parentNode.insertAdjacentHTML('afterbegin',COIN+' ');$$('w').parentNode.insertAdjacentHTML('afterbegin',ICN.wave+' ');$$('tc').parentNode.insertAdjacentHTML('afterbegin',ICN.tow+' ');$$('hpw').insertAdjacentHTML('afterbegin',ICN.sh);
/* saved volumes */
Aud.setVol(PR.mv==null?.7:PR.mv,PR.sv==null?.9:PR.sv);
$$('mv').value=Math.round(Aud.mv*100);$$('sv').value=Math.round(Aud.sv*100);
const saveVol=()=>{PR.mv=Aud.mv;PR.sv=Aud.sv;savePR()};
$$('mv').oninput=e=>{Aud.setVol(e.target.value/100,Aud.sv)};$$('mv').onchange=saveVol;
$$('sv').oninput=e=>{Aud.setVol(Aud.mv,e.target.value/100);sfx('click')};$$('sv').onchange=saveVol;
/* texts */
function texts(){$$('spT').textContent=t('title');$$('spC').textContent=t('credit');$$('spH').textContent=t('tap');
$$('pzT').textContent=t('paused');$$('pzR').textContent=t('resume');$$('pzQ').textContent=t('retry');$$('pzM').textContent=t('menu');
$$('setT').textContent=t('settings');$$('mvL').textContent=t('music');$$('svL').textContent=t('sfx');$$('lgL').textContent=t('lang');$$('setX').textContent=t('close');
$$('bn').lastChild.textContent=t('nextw')}
const _sl=setLang;setLang=function(i){_sl(i);texts()};texts();
/* splash: first tap unlocks audio */
$$('spl').addEventListener('pointerdown',()=>{Aud.init();Aud.music('menu');sfx('click');$$('spl').classList.add('out');setTimeout(()=>$$('spl').classList.add('hide'),650)},{once:true});
/* settings */
$$('gear').onclick=()=>{sfx('click');$$('set').classList.remove('hide')};
$$('setX').onclick=()=>{sfx('click');$$('set').classList.add('hide')};
/* pause sheet */
function pauseUI(){$$('pz').classList.toggle('hide',!G.pause)}
$$('bp').onclick=()=>{if(!G.run)return;G.pause=!G.pause;$$('bp').innerHTML=G.pause?ICN.play:ICN.pause;pauseUI();sfx('click')};
$$('pzR').onclick=()=>$$('bp').click();
$$('pzQ').onclick=()=>{G.pause=false;pauseUI();start(L)};
$$('pzM').onclick=()=>{G.pause=false;pauseUI();home()};
/* music / flow hooks (wrap game functions) */
const _start=start;start=function(i){G.pause=false;pauseUI();_start(i);Aud.init();Aud.music('battle')};
const _home=home;home=function(){_home();G.pause=false;pauseUI();Aud.music('menu')};
const _sw=startWave;startWave=function(){_sw();Aud.music(G.q.includes('boss')?'boss':'battle')};
const _se=showEnd;showEnd=function(w){_se(w);Aud.music('menu')};
const _rs=reset;reset=function(){_rs();if(!PR.h){PR.h=1;savePR();setTimeout(()=>toast(t('hint'),'#ffd54a'),1900)}};
/* skip-to-next-wave button */
let bnv=false;setInterval(()=>{const v=!!(G.run&&!G.pause&&!G.menu&&!G.waveOn&&G.inter>0.4&&G.wave>0&&G.wave<LV[L].w);if(v!==bnv){bnv=v;$$('bn').classList.toggle('hide',!v)}},200);
$$('bn').onclick=()=>{if(G.inter>0){G.gold+=15;G.inter=.01;hud();sfx('click')}};
/* Android back button / gesture */
try{history.pushState(null,'');addEventListener('popstate',()=>{history.pushState(null,'');if(!$$('set').classList.contains('hide'))$$('setX').click();else if(G.run&&!G.pause)$$('bp').click()})}catch(e){}
})();
