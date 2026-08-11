(() => {
  const ADMIN_USER="zovrotech";
  const ADMIN_PASS="zovro@1234";
  let leads=[];

  const $=id=>document.getElementById(id);
  const loginView=$("loginView"), dashboardView=$("dashboardView");

  function showDash(){loginView.classList.add("hidden");dashboardView.classList.remove("hidden");loadLeads();}
  function showLogin(){dashboardView.classList.add("hidden");loginView.classList.remove("hidden");}

  $("loginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const u=$("username").value.trim(), p=$("password").value;
    if(u===ADMIN_USER && p===ADMIN_PASS){
      sessionStorage.setItem("zovro_admin","1"); $("loginMsg").textContent=""; showDash();
    }else $("loginMsg").textContent="Invalid username or password.";
  });
  $("logout").addEventListener("click",()=>{sessionStorage.removeItem("zovro_admin");showLogin();});
  if(sessionStorage.getItem("zovro_admin")==="1")showDash();

  async function loadLeads(){
    $("rows").innerHTML='<tr><td colspan="7" class="empty">Loading...</td></tr>';
    if(!window.supabase){
      $("rows").innerHTML='<tr><td colspan="7" class="empty">Supabase client unavailable.</td></tr>'; return;
    }
    const client=window.supabase.createClient(window.ZOVRO_SUPABASE_URL,window.ZOVRO_SUPABASE_KEY);
    const {data,error}=await client.from("leads").select("*").order("created_at",{ascending:false});
    if(error){
      console.error(error);
      $("rows").innerHTML='<tr><td colspan="7" class="empty">Could not read leads. Check Supabase RLS/admin policy.</td></tr>'; return;
    }
    leads=data||[]; render();
  }

  function render(){
    const q=($("search").value||"").toLowerCase();
    const f=$("filter").value;
    const filtered=leads.filter(x=>{
      const text=[x.name,x.email,x.phone,x.message,x.plan].join(" ").toLowerCase();
      return (!q||text.includes(q))&&(f==="All"||x.status===f);
    });
    $("total").textContent=leads.length;
    $("newCount").textContent=leads.filter(x=>x.status==="New").length;
    $("contacted").textContent=leads.filter(x=>x.status==="Contacted").length;
    $("converted").textContent=leads.filter(x=>x.status==="Converted").length;
    if(!filtered.length){$("rows").innerHTML='<tr><td colspan="7" class="empty">No leads found.</td></tr>';return;}
    $("rows").innerHTML=filtered.map(x=>`
      <tr>
        <td><span class="lead-name">${esc(x.name||"—")}</span><span class="sub">${esc(x.email||"")}</span></td>
        <td>${esc(x.phone||"—")}</td>
        <td>${esc(x.plan||"General Enquiry")}</td>
        <td>${esc((x.message||"").slice(0,90))}${(x.message||"").length>90?"…":""}</td>
        <td><select class="status-select" data-id="${x.id}"><option ${x.status==="New"?"selected":""}>New</option><option ${x.status==="Contacted"?"selected":""}>Contacted</option><option ${x.status==="Converted"?"selected":""}>Converted</option></select></td>
        <td>${x.created_at?new Date(x.created_at).toLocaleString():"—"}</td>
        <td><button class="view" data-view="${x.id}">View</button></td>
      </tr>`).join("");
    document.querySelectorAll(".status-select").forEach(s=>s.addEventListener("change",()=>updateStatus(s.dataset.id,s.value)));
    document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>viewLead(b.dataset.view)));
  }

  async function updateStatus(id,status){
    const client=window.supabase.createClient(window.ZOVRO_SUPABASE_URL,window.ZOVRO_SUPABASE_KEY);
    const {error}=await client.from("leads").update({status}).eq("id",id);
    if(error){alert("Status update failed. Check RLS.");return;}
    const item=leads.find(x=>String(x.id)===String(id)); if(item)item.status=status; render();
  }

  function viewLead(id){
    const x=leads.find(v=>String(v.id)===String(id)); if(!x)return;
    $("mName").textContent=x.name||"Lead";
    $("mBody").innerHTML=`<div class="detail-grid">
      <div class="detail"><small>Email</small><div>${esc(x.email)}</div></div>
      <div class="detail"><small>Phone</small><div>${esc(x.phone||"—")}</div></div>
      <div class="detail"><small>Plan</small><div>${esc(x.plan||"General Enquiry")}</div></div>
      <div class="detail"><small>Status</small><div>${esc(x.status||"New")}</div></div>
      <div class="detail"><small>Date</small><div>${x.created_at?new Date(x.created_at).toLocaleString():"—"}</div></div>
      <div class="detail"><small>Lead ID</small><div>${esc(String(x.id))}</div></div>
      <div class="detail" style="grid-column:1/-1"><small>Message</small><div>${esc(x.message||"")}</div></div>
    </div>`;
    $("modal").classList.remove("hidden");
  }
  $("closeModal").addEventListener("click",()=>$("modal").classList.add("hidden"));
  $("modal").addEventListener("click",e=>{if(e.target.id==="modal")$("modal").classList.add("hidden")});
  $("refresh").addEventListener("click",loadLeads);
  $("search").addEventListener("input",render); $("filter").addEventListener("change",render);

  function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
})();