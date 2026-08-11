const { createClient } = window.supabase;
const supabase = createClient(window.ZOVRO_CONFIG.supabaseUrl, window.ZOVRO_CONFIG.supabaseKey);

const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

/* Intro */
const intro = $('#intro');
const introCanvas = $('#introCanvas');
if (introCanvas) {
  const ctx = introCanvas.getContext('2d'); let w=0,h=0; const pts=[];
  const resize=()=>{w=introCanvas.width=innerWidth;h=introCanvas.height=innerHeight}; resize(); addEventListener('resize',resize);
  for(let i=0;i<70;i++) pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.5+.3});
  const draw=()=>{ctx.clearRect(0,0,w,h); for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(216,180,254,.65)';ctx.fill();} requestAnimationFrame(draw)}; draw();
}
setTimeout(()=>intro?.classList.add('hide'),1700); setTimeout(()=>intro?.remove(),2400);

/* Live background */
const bg=$('#backgroundCanvas');
if(bg){const ctx=bg.getContext('2d');let w=0,h=0,mx=0,my=0,tx=0,ty=0;const mobile=innerWidth<768;const pts=[];const resize=()=>{w=bg.width=innerWidth;h=bg.height=innerHeight};resize();addEventListener('resize',resize);addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});for(let i=0;i<(mobile?45:90);i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.4+.3});function draw(){ctx.clearRect(0,0,w,h);mx+=(tx-mx)*.02;my+=(ty-my)*.02;for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x+(mx-w/2)*.01,p.y+(my-h/2)*.01,p.r,0,Math.PI*2);ctx.fillStyle='rgba(192,132,252,.55)';ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<100){ctx.strokeStyle=`rgba(168,85,247,${(1-d/100)*.09})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}draw()}

/* Mobile menu */
$('#menuBtn')?.addEventListener('click',()=>$('#navLinks')?.classList.toggle('open'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('#navLinks')?.classList.remove('open')));

/* Pricing/service -> contact */
$$('.plan-btn').forEach(b=>b.addEventListener('click',()=>{const s=$('#planSelect'); if(s)s.value=b.dataset.plan}));
$$('[data-service]').forEach(b=>b.addEventListener('click',()=>{const s=$('#planSelect');if(s)s.value=b.dataset.service}));

/* Contact form -> Supabase */
const form=$('#contactForm'); const msg=$('#formMessage');
function showMsg(text,type){if(!msg)return;msg.textContent=text;msg.className=type;}
form?.addEventListener('submit',async e=>{
  e.preventDefault(); const btn=$('button[type="submit"]',form); const fd=new FormData(form);
  const lead={name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim(),phone:String(fd.get('phone')).trim(),plan:String(fd.get('plan')).trim(),message:String(fd.get('message')).trim()};
  if(!lead.name||!lead.email||!lead.phone||!lead.plan||!lead.message){showMsg('Please complete all fields.','error');return}
  btn.disabled=true;btn.querySelector('span').textContent='Sending...';
  const {error}=await supabase.from('leads').insert(lead);
  if(error){console.error(error);showMsg('Could not send right now. Please try again.','error');btn.disabled=false;btn.querySelector('span').textContent='Send Request';return}
  form.reset();showMsg('Request received — we will contact you soon.','success');btn.querySelector('span').textContent='Sent ✓';setTimeout(()=>{btn.disabled=false;btn.querySelector('span').textContent='Send Request'},2500);
});

/* Scroll reveal */
const reveal=()=>{$$('.section,.final-cta').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.88)el.classList.add('visible')})};addEventListener('scroll',reveal,{passive:true});reveal();
