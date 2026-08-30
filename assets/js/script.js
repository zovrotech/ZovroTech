import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* =========================
   ZOVRO TECH CONFIG
   Replace only these 2 values if you change Supabase.
========================= */
const SUPABASE_URL = "https://cgwosspbrvqffmixvaza.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd29zc3BicnZxZmZtaXh2YXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzQxNjMsImV4cCI6MjEwMjAxMDE2M30.VotRvLtnbtPy8-fQaQnHNzkjOHNAXN8I31HzjPMXXbc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

/* intro */
window.addEventListener("load",()=>setTimeout(()=>$("#intro")?.remove(),2600));

/* mobile nav */
$("#menuBtn")?.addEventListener("click",()=>$("#navLinks")?.classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>$("#navLinks")?.classList.remove("open")));

/* reveal */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}});
},{threshold:.08});
$$(".reveal").forEach(e=>observer.observe(e));

/* progress */
window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  $("#progress").style.width=(h>0?(scrollY/h)*100:0)+"%";
},{passive:true});

$("#year").textContent=new Date().getFullYear();

/* date minimum */
const dateInput=$('#appointmentForm input[name="date"]');
if(dateInput) dateInput.min=new Date().toISOString().split("T")[0];

function setStatus(el,msg,type=""){
  el.textContent=msg;
  el.className="status wide "+type;
}

function busy(btn,on,label){
  btn.disabled=on;
  btn.style.opacity=on?".65":"1";
  btn.innerHTML=on ? "Sending… <b>•</b>" : label;
}

/* Lead form */
$("#leadForm")?.addEventListener("submit",async e=>{
  e.preventDefault();
  const form=e.currentTarget, btn=$("#leadBtn"), status=$("#leadStatus");
  const data=Object.fromEntries(new FormData(form).entries());
  setStatus(status,"");
  busy(btn,true,"Send Enquiry <b>→</b>");
  try{
    const {error}=await supabase.from("leads").insert([{
      name:data.name.trim(),
      email:data.email.trim(),
      phone:data.phone.trim(),
      service:data.service,
      details:data.details.trim()
    }]);
    if(error) throw error;
    form.reset();
    setStatus(status,"✓ Enquiry received. We’ll contact you soon.","success");
  }catch(err){
    console.error(err);
    setStatus(status,"Could not send. Please check your Supabase leads table/RLS policy.","error");
  }finally{busy(btn,false,"Send Enquiry <b>→</b>")}
});

/* Appointment form */
$("#appointmentForm")?.addEventListener("submit",async e=>{
  e.preventDefault();
  const form=e.currentTarget, btn=$("#appointmentBtn"), status=$("#appointmentStatus");
  const data=Object.fromEntries(new FormData(form).entries());
  setStatus(status,"");
  busy(btn,true,"Request Appointment <b>→</b>");
  try{
    const {error}=await supabase.from("appointments").insert([{
      name:data.name.trim(),
      email:data.email.trim(),
      phone:data.phone.trim(),
      service:data.service,
      date:data.date,
      time:data.time,
      message:(data.message||"").trim()
    }]);
    if(error) throw error;
    form.reset();
    if(dateInput) dateInput.min=new Date().toISOString().split("T")[0];
    setStatus(status,"✓ Appointment request received.","success");
  }catch(err){
    console.error(err);
    setStatus(status,"Could not book. Please check your Supabase appointments table/RLS policy.","error");
  }finally{busy(btn,false,"Request Appointment <b>→</b>")}
});
