/* ===========================
   ZOVRO TECH
   MAIN JAVASCRIPT
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       LOADER
    =========================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 800);

    });

    /* ===========================
       MOBILE MENU
    =========================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if(menuBtn){

        menuBtn.addEventListener("click", () =>{

            navLinks.classList.toggle("active");

        });

    }

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* ===========================
       STICKY NAVBAR
    =========================== */

    const header=document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            header.style.background="rgba(8,17,31,.97)";
            header.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

        }else{

            header.style.background="rgba(8,17,31,.90)";
            header.style.boxShadow="none";

        }

    });

    /* ===========================
       SCROLL TOP BUTTON
    =========================== */

    const scrollBtn=document.querySelector(".scroll-top");

    if(scrollBtn){

        window.addEventListener("scroll",()=>{

            if(window.scrollY>400){

                scrollBtn.classList.add("active");

            }else{

                scrollBtn.classList.remove("active");

            }

        });

        scrollBtn.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

});
/* ===========================
   FAQ TOGGLE
=========================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        faqItems.forEach(f => {

            if(f !== item){

                f.querySelector(".faq-answer").style.display = "none";

            }

        });

        if(answer.style.display === "block"){

            answer.style.display = "none";

        }else{

            answer.style.display = "block";

        }

    });

});

/* ===========================
   SCROLL ANIMATION
=========================== */

const fadeElements = document.querySelectorAll(".fade-up");

function revealElements(){

    fadeElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

/* ===========================
   ACTIVE NAVBAR LINK
=========================== */

const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinksAll.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

/* ===========================
   NUMBER COUNTER
=========================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;

        }

    }

    updateCounter();

});

/* ===========================
   TYPING EFFECT
=========================== */

const typing = document.querySelector(".typing");

if(typing){

const words = [

"Website Development",

"Meta Ads",

"Google Ads",

"SEO",

"AI Automation"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

let currentWord = words[wordIndex];

if(!deleting){

typing.textContent = currentWord.substring(0,charIndex++);

if(charIndex > currentWord.length){

deleting = true;

setTimeout(typeEffect,1500);

return;

}

}else{

typing.textContent = currentWord.substring(0,charIndex--);

if(charIndex < 0){

deleting = false;

wordIndex = (wordIndex + 1) % words.length;

}

}

setTimeout(typeEffect,deleting ? 50 : 100);

}

typeEffect();

}
/* ===========================
   TESTIMONIAL AUTO SLIDER
=========================== */

const testimonialContainer = document.querySelector(".testimonial-grid");

if(testimonialContainer){

    let scrollValue = 0;

    setInterval(()=>{

        scrollValue += 350;

        if(scrollValue >= testimonialContainer.scrollWidth){

            scrollValue = 0;
        }

        testimonialContainer.scrollTo({

            left:scrollValue,
            behavior:"smooth"

        });

    },4000);

}

/* ===========================
   PORTFOLIO FILTER
=========================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const filter = button.dataset.filter;

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        projects.forEach(project=>{

            if(filter==="all" || project.dataset.category===filter){

                project.style.display="block";

            }else{

                project.style.display="none";

            }

        });

    });

});

/* ===========================
   CONTACT FORM VALIDATION
=========================== */

const contactForm=document.querySelector(".contact-form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name=contactForm.querySelector("input[name='name']");
const email=contactForm.querySelector("input[name='email']");
const message=contactForm.querySelector("textarea");

if(name.value.trim()===""){

alert("Please enter your name.");
name.focus();
return;

}

if(email.value.trim()===""){

alert("Please enter your email.");
email.focus();
return;

}

if(message.value.trim()===""){

alert("Please enter your message.");
message.focus();
return;

}

alert("Thank you! Your message has been sent.");

contactForm.reset();

});

}

/* ===========================
   CLOSE MOBILE MENU
=========================== */

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

if(navLinks){

navLinks.classList.remove("active");

}

});

});

/* ===========================
   RIPPLE BUTTON EFFECT
=========================== */

document.querySelectorAll(".btn1,.btn2").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";
ripple.style.left=(e.clientX-rect.left-size/2)+"px";
ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/* ===========================
   CURRENT YEAR
=========================== */

const year=document.querySelector(".year");

if(year){

year.textContent=new Date().getFullYear();

}

/* ===========================
   END
=========================== */

console.log("✅ ZOVRO TECH Website Loaded Successfully");
/* ===========================
   SCROLL PROGRESS BAR
=========================== */

const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {

    if(progressBar){

        const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

        const progress =
        (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    }

});

/* ===========================
   WHATSAPP BUTTON
=========================== */

const whatsapp = document.querySelector(".whatsapp");

if(whatsapp){

    whatsapp.addEventListener("click", () => {

        window.open(
        "https://wa.me/91XXXXXXXXXX",
        "_blank"
        );

    });

}

/* ===========================
   STATS COUNTER
=========================== */

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const speed = target / 80;

const update = ()=>{

count += speed;

if(count < target){

counter.innerHTML = Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerHTML = target + "+";

}

};

update();

observer.unobserve(counter);

}

});

});

document.querySelectorAll(".counter").forEach(counter=>{

observer.observe(counter);

});

/* ===========================
   IMAGE LAZY LOAD
=========================== */

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img = entry.target;

img.src = img.dataset.src || img.src;

imageObserver.unobserve(img);

}

});

});

images.forEach(img=>{

imageObserver.observe(img);

});

/* ===========================
   DISABLE RIGHT CLICK
=========================== */

document.addEventListener("contextmenu",e=>{

e.preventDefault();

});

/* ===========================
   DISABLE F12
=========================== */

document.addEventListener("keydown",e=>{

if(

e.key==="F12" ||

(e.ctrlKey && e.shiftKey && e.key==="I") ||

(e.ctrlKey && e.shiftKey && e.key==="J") ||

(e.ctrlKey && e.key==="U")

){

e.preventDefault();

}

});

/* ===========================
   CONSOLE MESSAGE
=========================== */

console.log("%cZOVRO TECH",
"color:#0A84FF;font-size:28px;font-weight:bold;");

console.log("%cWebsite Developed by ZOVRO TECH",
"color:#38BDF8;font-size:14px;");

/* ===========================
   WEBSITE READY
=========================== */

window.addEventListener("load",()=>{

console.log("Website Loaded Successfully 🚀");

});
// Close DOMContentLoaded
});
