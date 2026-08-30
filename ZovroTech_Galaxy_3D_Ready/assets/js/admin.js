import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL="https://cgwosspbrvqffmixvaza.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd29zc3BicnZxZmZtaXh2YXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzQxNjMsImV4cCI6MjEwMjAxMDE2M30.VotRvLtnbtPy8-fQaQnHNzkjOHNAXN8I31HzjPMXXbc";
const supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

/* Simple front-end gate requested by the owner.
   For real production security, use Supabase Auth + RLS instead of a browser password. */
const ADMIN_USER="zovrotech";
const ADMIN_PASS="zovro@1234";

const $=s=>document.querySelector(s);
let leads=[], appointments=[];

$("#loginForm").addEventListener("submit",e=>{
 e.preventDefault();
 if($("#adminUser").value===ADMIN_USER && $("#adminPass").value===ADMIN_PASS){
   sessionStorage.setItem("zovro_admin","1"); $("#login").classList.add("hidden"); $("#app").classList.remove("hidden"); loadAll();
 }else $("#loginError").textContent="Invalid username or password.";
});
if(sessionStorage.getItem("zovro_admin")==="1"){ $("#login").classList.add("hidden"); $("#app").classList.remove("hidden"); loadAll(); }
$("#logout").onclick=()=>{sessionStorage.removeItem("zovro_admin");location.reload()};

document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{
 const tab=b.dataset.tab;
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
 $("#"+tab).classList.add("active");
 document.querySelectorAll("aside nav button").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));
 $("#pageTitle").textContent=tab[0].toUpperCase()+tab.slice(1);
});

$("#refresh").onclick=loadAll;
$("#leadSearch").oninput=()=>renderLeads($("#leadSearch").value);
$("#appointmentSearch").oninput=()=>renderAppointments($("#appointmentSearch").value);

async function loadAll(){
 $("#refresh").textContent="…";
 const [lr,ar]=await Promise.all([
   supabase.from("leads").select("*").order("created_at",{ascending:false}),
   supabase.from("appointments").select("*").order("created_at",{ascending:false})
 ]);
 if(lr.error){console.error(lr.error);leads=[]}else leads=lr.data||[];
 if(ar.error){console.error(ar.error);appointments=[]}else appointments=ar.data||[];
 renderAll(); $("#refresh").textContent="↻";
}

function safe(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function date(v){if(!v)return"—";try{return new Date(v).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}catch{return safe(v)}}

function renderAll(){
 $("#leadCount").textContent=leads.length;
 $("#appointmentCount").textContent=appointments.length;
 const today=new Date().toISOString().slice(0,10);
 $("#todayCount").textContent=[...leads,...appointments].filter(x=>String(x.created_at||"").slice(0,10)===today).length;
 $("#lastLead").textContent=leads[0]?date(leads[0].created_at):"—";
 renderRecent();renderLeads();renderAppointments();
}

function renderRecent(){
 const rows=leads.slice(0,6).map(x=>`<tr><td><b>${safe(x.name)}</b></td><td>${safe(x.email)}</td><td>${safe(x.phone)}</td><td><span class="badge">${safe(x.service)}</span></td><td>${date(x.created_at)}</td></tr>`).join("");
 $("#recentLeads").innerHTML=rows?`<table class="table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Received</th></tr></thead><tbody>${rows}</tbody></table>`:`<div class="empty">No enquiries yet.</div>`;
}
function renderLeads(q=""){
 q=q.toLowerCase(); const data=leads.filter(x=>`${x.name} ${x.email} ${x.phone} ${x.service} ${x.details}`.toLowerCase().includes(q));
 const rows=data.map(x=>`<tr><td><b>${safe(x.name)}</b></td><td>${safe(x.email)}</td><td>${safe(x.phone)}</td><td><span class="badge">${safe(x.service)}</span></td><td>${safe(x.details)}</td><td>${date(x.created_at)}</td></tr>`).join("");
 $("#leadTable").innerHTML=rows?`<table class="table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Details</th><th>Received</th></tr></thead><tbody>${rows}</tbody></table>`:`<div class="empty">No matching leads.</div>`;
}
function renderAppointments(q=""){
 q=q.toLowerCase(); const data=appointments.filter(x=>`${x.name} ${x.email} ${x.phone} ${x.service} ${x.date} ${x.time} ${x.message}`.toLowerCase().includes(q));
 const rows=data.map(x=>`<tr><td><b>${safe(x.name)}</b></td><td>${safe(x.email)}</td><td>${safe(x.phone)}</td><td><span class="badge">${safe(x.service)}</span></td><td>${safe(x.date)}</td><td>${safe(x.time)}</td><td>${safe(x.message)}</td><td>${date(x.created_at)}</td></tr>`).join("");
 $("#appointmentTable").innerHTML=rows?`<table class="table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Date</th><th>Time</th><th>Message</th><th>Created</th></tr></thead><tbody>${rows}</tbody></table>`:`<div class="empty">No appointments found.</div>`;
}
