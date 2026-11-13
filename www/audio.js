'use strict';
/* audio.js — محرك الصوت: مؤثرات واقعية + موسيقى حماسية مولّدة برمجياً (Web Audio) */
const CH=[[220,261.63,329.63],[174.61,220,261.63],[196,261.63,329.63],[196,246.94,293.66]],
BS=[55,43.65,65.41,49],
LD=[[[0,659.25],[6,523.25],[8,587.33],[12,523.25]],[[0,523.25],[6,440],[8,523.25],[12,698.46]],[[0,659.25],[6,783.99],[8,659.25],[12,523.25]],[[0,587.33],[6,493.88],[8,587.33],[12,783.99]]];
const Aud={ctx:null,mode:null,bpm:100,step:0,next:0,tm:null,mv:.7,sv:.9,muted:false,last:{},
init(){try{if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext,c=this.ctx=new C();
 this.master=c.createGain();const cp=c.createDynamicsCompressor();cp.threshold.value=-14;cp.ratio.value=6;this.master.connect(cp);cp.connect(c.destination);
 this.mus=c.createGain();this.sfxb=c.createGain();this.mus.connect(this.master);this.sfxb.connect(this.master);
 const d=c.createDelay(1),fb=c.createGain(),w=c.createGain();d.delayTime.value=.32;fb.gain.value=.3;w.gain.value=.32;this.mus.connect(d);d.connect(fb);fb.connect(d);d.connect(w);w.connect(this.master);
 const n=c.sampleRate,b=c.createBuffer(1,n,n),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;this.nb=b;this.apply()}
 if(this.ctx.state==='suspended')this.ctx.resume()}catch(e){}},
apply(){this.master.gain.value=this.muted?0:1;this.mus.gain.value=this.mv*.55;this.sfxb.gain.value=this.sv},
setMute(m){this.muted=m;if(this.ctx)this.apply()},
setVol(mv,sv){this.mv=mv;this.sv=sv;if(this.ctx)this.apply()},
tone(f,d,type,v,sl,at){const c=this.ctx;if(!c||this.muted)return;type=type||'square';v=v==null?.05:v;const o=c.createOscillator(),g=c.createGain(),n=c.currentTime+(at||0);
 o.type=type;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(this.sfxb);o.start(n);o.stop(n+d+.02)},
nz(t,d,f0,f1,v,type,bus){const c=this.ctx,s=c.createBufferSource(),q=c.createBiquadFilter(),g=c.createGain();s.buffer=this.nb;s.loop=true;q.type=type||'lowpass';q.frequency.setValueAtTime(f0,t);q.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+d);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(q);q.connect(g);g.connect(bus||this.sfxb);s.start(t,Math.random()*.5);s.stop(t+d+.02)},
noise(d,f0,f1,v,type,at){if(!this.ctx||this.muted)return;this.nz(this.ctx.currentTime+(at||0),d,f0,f1,v,type)},
sfx(n){if(!this.ctx||this.muted)return;const now=performance.now();if(now-(this.last[n]||0)<45)return;this.last[n]=now;
 switch(n){
 case'mg':this.noise(.05,3600,1500,.12,'bandpass');this.tone(190,.05,'square',.04,-70);break;
 case'rocket':this.noise(.35,1900,300,.15,'lowpass');this.tone(150,.3,'sawtooth',.05,-90);break;
 case'zap':this.noise(.12,6000,800,.1,'highpass');this.tone(1300,.1,'sawtooth',.035,-900);break;
 case'frost':this.tone(1500,.16,'sine',.06,-700);this.noise(.12,5200,3000,.06,'highpass');break;
 case'toxic':this.noise(.2,900,300,.1,'bandpass');this.tone(200,.2,'sine',.05,150);break;
 case'boom':this.noise(.5,1500,80,.34,'lowpass');this.tone(95,.4,'sine',.22,-60);break;
 case'boom_s':this.noise(.26,1900,200,.17,'lowpass');this.tone(115,.2,'sine',.1,-70);break;
 case'bigboom':this.noise(1.1,1300,50,.5,'lowpass');this.tone(62,.9,'sine',.36,-30);this.noise(.4,4000,500,.15,'highpass',.05);break;
 case'build':this.tone(220,.16,'square',.05,300);this.noise(.12,900,400,.1,'lowpass');this.tone(440,.1,'triangle',.04,0,.1);break;
 case'up':[523,659,784,1046].forEach((f,i)=>this.tone(f,.14,'triangle',.05,0,i*.06));break;
 case'sell':this.tone(660,.1,'triangle',.06,0);this.tone(880,.14,'triangle',.06,0,.08);break;
 case'hit':this.noise(.55,600,60,.42,'lowpass');this.tone(55,.5,'sawtooth',.2,-20);break;
 case'click':this.tone(520,.05,'triangle',.05,0);break;
 case'wave':this.tone(330,.25,'sawtooth',.05,200);this.tone(440,.3,'sawtooth',.05,260,.12);break;
 case'win':[523,659,784,1046,1318].forEach((f,i)=>this.tone(f,.28,'triangle',.07,0,i*.12));break;
 case'lose':[392,349,294,196].forEach((f,i)=>this.tone(f,.4,'sawtooth',.06,-20,i*.2));break}},
voice(f,type,t,d,v,cut,att){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),q=c.createBiquadFilter();o.type=type;o.frequency.value=f;q.type='lowpass';q.frequency.value=cut||2000;
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+(att||.005));g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(q);q.connect(g);g.connect(this.mus);o.start(t);o.stop(t+d+.05)},
kick(t){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(this.mus);o.start(t);o.stop(t+.22)},
play16(s,t){const m=this.mode,bar=s>>4,i=s&15,sp=60/this.bpm/4,boss=m=='boss',bt=m!='menu';
 if(i==0)for(const f of CH[bar])this.voice(f,'triangle',t,sp*16,.045,1400,sp*6);
 if(!bt){if(i==0||i==8)this.voice(BS[bar],'sine',t,sp*8,.12,400);if(i%4==0)this.voice(CH[bar][(i>>2)%3]*2,'sine',t,sp*3,.03,3000);return}
 if([0,3,6,8,11,14].includes(i))this.voice(BS[bar]*(i==14?2:1),'sawtooth',t,sp*2.2,.09,boss?800:520);
 if(boss||i%2==0)this.voice(CH[bar][(i>>1)%3]*2,'square',t,sp*1.6,.016,2600);
 for(const l of LD[bar])if(l[0]==i)this.voice(l[1],boss?'sawtooth':'triangle',t,sp*5,boss?.03:.05,3200);
 if(i%4==0||(boss&&(i==10||i==14)))this.kick(t);
 if(i==4||i==12){this.nz(t,.14,2200,900,.14,'bandpass',this.mus);this.voice(190,'triangle',t,.1,.07,1200)}
 if(boss||i%2==0)this.nz(t,.04,8000,6000,boss?.05:.035,'highpass',this.mus)},
sched(){const c=this.ctx;if(!c||!this.mode)return;while(this.next<c.currentTime+.15){this.play16(this.step,this.next);this.next+=60/this.bpm/4;this.step=(this.step+1)%64}},
music(m){this.want=m;if(!this.ctx||m===this.mode)return;this.mode=m;if(!m){clearInterval(this.tm);this.tm=null;return}
 this.bpm={menu:92,battle:118,boss:138}[m]||100;if(!this.tm){this.next=this.ctx.currentTime+.06;this.step=0;this.tm=setInterval(()=>this.sched(),40)}}};
function sfx(n){Aud.sfx(n)}
document.addEventListener('visibilitychange',()=>{const c=Aud.ctx;if(!c)return;if(document.hidden)c.suspend();else c.resume()});
