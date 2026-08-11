document.addEventListener("DOMContentLoaded", () => {
  const menu=document.getElementById("menu"), links=document.getElementById("links");
  if(menu) menu.addEventListener("click",()=>links.classList.toggle("open"));
  document.querySelectorAll(".links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));

  const observer=new IntersectionObserver(entries=>{
    entries.forEach((entry,i)=>{
      if(entry.isIntersecting){
        entry.target.style.transitionDelay=(i%4)*70+"ms";
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  const form=document.getElementById("contactForm");
  const status=document.getElementById("formStatus");
  const msg=(text,ok=false)=>{
    if(!status)return;
    status.textContent=text;
    status.className=ok?"success":"error";
  };

  if(form) form.addEventListener("submit",async e=>{
    e.preventDefault();
    const button=form.querySelector("button[type=submit]");
    const data=new FormData(form);
    const payload={
      name:(data.get("name")||"").trim(),
      email:(data.get("email")||"").trim(),
      phone:(data.get("phone")||"").trim(),
      plan:(data.get("plan")||"").trim()||"General Enquiry",
      message:(data.get("message")||"").trim()
    };
    if(!payload.name||!payload.email||!payload.message){
      msg("Please fill in your name, email and project details."); return;
    }
    if(!window.supabaseClient){
      msg("Supabase is not configured."); return;
    }
    button.disabled=true; button.innerHTML="<span>Sending...</span>";
    const {error}=await window.supabaseClient.from("leads").insert(payload);
    if(error){
      console.error(error);
      msg("Could not send your enquiry. Please try again.");
      button.disabled=false; button.innerHTML="<span>Send Enquiry</span><span>→</span>";
      return;
    }
    msg("Enquiry received successfully. We'll contact you soon.",true);
    form.reset(); button.innerHTML="<span>Sent ✓</span>";
    setTimeout(()=>{button.disabled=false;button.innerHTML="<span>Send Enquiry</span><span>→</span>";},2200);
  });

  const year=document.getElementById("year");
  if(year)year.textContent=new Date().getFullYear();
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target)target.scrollIntoView({behavior:"smooth"});
  }));
});