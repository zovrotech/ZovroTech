const db=window.supabaseClient;
const $=s=>document.querySelector(s);
document.getElementById("year").textContent=new Date().getFullYear();
const introCanvas=$("#introCanvas"), ictx=introCanvas.getContext("2d"), space=$("#space"), ctx=space.getContext("2d");
function size(c,x){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
size(introCanvas,ictx);size(space,ctx);
let pts=Array.from({length:70},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.7+.3,v:Math.random()*.35+.05}));
function animate(c,x,arr){x.clearRect(0,0,innerWidth,innerHeight);for(const p of arr){p.y-=p.v;if(p.y<0)p.y=innerHeight;x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle="#b765ff99";x.fill();}requestAnimationFrame(()=>animate(c,x,arr))}
animate(space,ctx,pts);animate(introCanvas,ictx,pts.map(p=>({...p,v:p.v+.2})));
window.addEventListener("resize",()=>{size(introCanvas,ictx);size(space,ctx)});
setTimeout(()=>document.body.classList.add("loaded"),2200);
const menuBtn=$("#menuBtn"),navLinks=$("#navLinks");menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));
document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",()=>{$("#leadService").value=a.dataset.service}));
async function insert(table,payload,statusEl,button){
  statusEl.className="form-status";statusEl.textContent="Sending...";
  button.disabled=true;
  try{const {error}=await db.from(table).insert(payload);if(error)throw error;statusEl.className="form-status success";statusEl.textContent=table==="leads"?"Enquiry sent successfully. We'll contact you soon.":"Appointment request sent successfully.";return true}
  catch(e){console.error(e);statusEl.className="form-status error";statusEl.textContent="Could not send. Please check your Supabase table/RLS setup.";return false}
  finally{button.disabled=false}
}
$("#leadForm").addEventListener("submit",async e=>{e.preventDefault();const b=e.submitter;await insert("leads",{name:$("#leadName").value.trim(),email:$("#leadEmail").value.trim(),phone:$("#leadPhone").value.trim(),service:$("#leadService").value,message:$("#leadMessage").value.trim(),status:"new"},$("#leadStatus"),b)});
$("#appointmentForm").addEventListener("submit",async e=>{e.preventDefault();const b=e.submitter;await insert("appointments",{name:$("#appName").value.trim(),email:$("#appEmail").value.trim(),phone:$("#appPhone").value.trim(),service:$("#appService").value,preferred_date:$("#appDate").value,preferred_time:$("#appTime").value,message:$("#appMessage").value.trim(),status:"pending"},$("#appointmentStatus"),b)});
const today=new Date();$("#appDate").min=today.toISOString().split("T")[0];
