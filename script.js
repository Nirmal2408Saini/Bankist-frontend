"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const logo = document.querySelector(".nav__logo");
const learn = document.querySelector(".btn--scroll-to");
const section = document.querySelector("#section--1");
const tap=document.querySelectorAll('.operations__tab');
const data=document.querySelectorAll('.operations__content');
const message = document.createElement("div");
const navBar=document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////////


message.classList.add("cookie-message");
message.textContent =
  "We use cookies for improved functionality and analytics.";
message.innerHTML += '<button class="btn btn--close-cookie">Got it!</button>';
document.body.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
message.style.backgroundColor = "#111111";
message.style.width = "120%";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + "px";
console.log(logo.src);
console.log(logo.getAttribute("src"));
const imgi = document.querySelector(".lazy-img");
console.log(getComputedStyle(imgi).opacity);


//////////////  SMART SCROLL ///////////////


learn.addEventListener("click", function (e) {
  console.log(e.target);
  const s1coordinate = section.getBoundingClientRect();
  console.log(s1coordinate);
  console.log(window.scrollX, window.scrollY);
  window.scrollTo({
    left: s1coordinate,
    top: 713,
    behavior: "smooth",
  });
});



/////////////   PAGE NAVIGATION    ///////////


document.querySelector('.nav__links').addEventListener('click',function(e)
{
  e.preventDefault();
  const sec=e.target;
  if(sec.getAttribute('href')!=='#'){
  const scrollToSection=sec.getAttribute('href');
  
  const goto=document.querySelector(scrollToSection);
  const coordinateToScroll=goto.getBoundingClientRect();
 
  window.scrollTo({
      left:coordinateToScroll,
      top:coordinateToScroll.top,
      behavior:'smooth',
    });
  }
})


/////////// NIGHT MODE OF WEBSITE  ///////////


const mode=document.querySelector('.mode');
mode.addEventListener('click',function(e)
{
    e.preventDefault();
    let textMode=this.textContent.trim();
    if(textMode==='Day')
    {
      mode.textContent='Night';
     document.body.style.backgroundColor = 'black';
     document.body.style.color = 'white';  

    }
    else
    {
      mode.textContent='Day';
     document.body.style.backgroundColor = 'white';
     document.body.style.color = 'black'; 
    }
})




////////////   TAB CONTENT   ///////////////

document.querySelector('.operations__tab-container').addEventListener('click',function(e)
{
  e.preventDefault();
  const src=e.target.closest('.operations__tab');
  if(!src)return ;
  tap.forEach(tb=>tb.classList.remove('operations__tab--active'))
  src.classList.add('operations__tab--active');
  data.forEach(db=> db.classList.remove('operations__content--active'));
  const content=document.querySelector(`.operations__content--${src.getAttribute('data-tab')}`);
  content.classList.add('operations__content--active');
})


////////////////   MENU FADE   //////////////////

navBar.addEventListener('mouseover',function(e)
{
  e.preventDefault();
  if(e.target.classList.contains('nav__link'))
  {
    const link =e.target;
    const sibling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    sibling.forEach(sb=>{
      if(sb!==link)
        {sb.style.opacity=0.5;
        }
    }
    );
    logo.style.opacity=0.5;
  }
});
navBar.addEventListener('mouseout',function(e)
{
  e.preventDefault();
  if(e.target.classList.contains('nav__link'))
  {
    const link =e.target;
    const sibling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    sibling.forEach(sb=>{
      if(sb!==link)
        {sb.style.opacity=1;
        }
    }
    );
    logo.style.opacity=1;
  }
})



//////////////////   STICKY NAVBAR   ////////////////////

// console.log(section.getBoundingClientRect().top);
// window.addEventListener('scroll',function(e)
// {
//     if(this.window.scrollY>section.getBoundingClientRect().top)navBar.classList.add('sticky');
//     else navBar.classList.remove('sticky');
// })

/////////////   STICKY NAVBAR BY INTERSECTION API  //////////////


const header=document.querySelector('.header');
 
const callBack=function(entries)
{
    const [entry]=entries;
    if(!entry.isIntersecting)navBar.classList.add('sticky');
    else navBar.classList.remove('sticky');
}
const observer=new IntersectionObserver(callBack,{
  root:null,
  threshold:0.1,
  rootMargin:'-20px',
});
observer.observe(header);


////////////  SECTION REVEAL  //////////

const  allSection=document.querySelectorAll('.section')
const revealSection=function(entries,observer)
{
    entries.forEach(entry=>
    {
 if(!entry.isIntersecting)return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
    }
    )
   
}
const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
})
allSection.forEach(function (section)
{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})



////////////   LAZY LOAD IN=MAGE   /////////////
const imgTarget=document.querySelectorAll('img[data-src]');
const loading=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting)return ;
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img');
  })
};
const imageObserver=new IntersectionObserver(loading,{
  root:null,
  threshold:0,
  rootMargin:'-200px'
})
imgTarget.forEach(img=>
{
  imageObserver.observe(img);
}
)



/////////////  SLIDER PART   ////////////////


const slide=document.querySelectorAll('.slide');
const slider=document.querySelector('.slider');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
let current=0;
slide.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-current)}%)`));

// slider.style.transform='scale(0.4)';
// slider.style.overflow='visible';

btnLeft.addEventListener('click',function(e)
{
  e.preventDefault();
    if(current==0)current=2;
      else current--;

  slide.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-current)}%)`));
})
btnRight.addEventListener('click',function(e)
{
  e.preventDefault();
  if(current===2)
  {
    current=0;
  }
  else{
  current=(current+1);
  }
   slide.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-current)}%)`));
 
})

