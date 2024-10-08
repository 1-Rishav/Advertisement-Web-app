'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and Inserting Elements
/* const header =document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `we use cookie.<button class='btn btn--close-cookie'>Got it</button>`; 
header.append(message)
message.style.backgroundColor = 'red';
console.log(getComputedStyle(message).color);
message.style.height=Number.parseFloat((getComputedStyle(message).height)) +30+'px';
console.log(getComputedStyle(message).height); */

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
logo.alt = 'Beautiful';

//Non-standard
console.log(logo.getAttribute('src'));
logo.setAttribute('company', 'Betty');
console.log(logo.getAttribute('company'));
// DataSet

console.log(logo.dataset.versionNumber);

// Implementing Smooth Scrolling

btnScroll.addEventListener('click', function (e) {
  const scoord = section1.getBoundingClientRect();
  // window.scrollTo({left:scoord.left + window.scrollX,top:scoord.top + window.scrollY,behavior:'smooth'});
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Types of Events and Event Handlers

/* const h1= document.querySelector('h1')
h1.addEventListener('mouseenter' , function(e){
  alert('addhi')
});

const alertH1=function(e){
alert('hadi');
h1.removeEventListener('mouseenter' , alertH1);
}
h1.addEventListener('mouseleave' , alertH1); */

/* Event Propagation in Practice. */

/* const randInt = (min , max)=>
Math.floor(Math.random()*(max-min+1)+min);
const randomColor=()=>
  `rgb(${randInt(0,255)},${randInt(0,255)} , ${randInt(0,255)})`;
console.log(randomColor());
document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})
document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();

},true); */

/* Event Delegation: Implementing Page Navigation */
// Page Navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//Page Navigation using delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

/* DOM Traversing */
const h2 = document.querySelector('h1');
//Going downwards:child

console.log(h2.querySelectorAll('.highlight'));
console.log(h2.childNode);
console.log(h2.children);
h2.firstElementChild.style.color = 'white';
h2.firstElementChild.style.color = 'orangered';

//Going upwards:parents;
console.log(h2.parentNode);
/* h2.closest('.header').style.background = 'var(--gradient-primary)'; */

//Going sideways
console.log(h2.previousElementSibling);
console.log(h2.nextElementSibling);
console.log(h2.parentElement.children);
[...h2.parentElement.children].forEach(function (el) {
  if (el !== h2) el.style.transform = 'scale(0.5)';
});

/* ************** Building A Tabbed Component *************** */
// Tabbed components

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //Guart clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  console.log(tabs);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab

  clicked.classList.add('operations__tab--active');

  //Active content area
console.log(clicked.dataset.tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

/* ***************** Passing Arguments to Event Handlers *******************
 */

// Menu fade animation
const handleHover = (e)=>{
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el!==link)el.style.opacity=this;
    })
    logo.style.opacity=this
  }
}

// Passing 'argument' into handler
nav.addEventListener('mouseover' ,/* function(e){
  handleHover(e,0.5)
} */ // We can use this 
handleHover.bind(0.5) // This is better 
// In this we use bind method create copy of function that called on and set this keyword in this function call whatever value we pass in bind
)

nav.addEventListener('mouseout',handleHover.bind(1))

/* ******************* Implementing a Sticky Navigation : The scroll event ******************* */

// Sticky Navigation
const initialCoords=section1.getBoundingClientRect('.nav');

window.addEventListener('scroll',(e)=>{
  if(window.scrollY>initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})

// Sticky navigation:Intersection Observer API
/* const obsCallback = function (entries, observer){
  entries.forEach(entry=>{
    console.log(entry);
  })
}
const obsOptions = {
  root:null,
  threshold:[0,0.2],
}
const observer=new IntersectionObserver(obsCallback,obsOptions);
observer.observe(section1); */
const header = document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;
const stickyNav= function(entries){
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`${navHeight}px`
})
headerObserver.observe(header);

/* **************** Revealing Elements on Scroll *************** */

// Reveal Sections

const allSections = document.querySelectorAll('.section');
const revealSection=function(entries,observer){
  const [entry] = entries;
  console.log(entry)
if(!entry.isIntersecting)return;
entry.target.classList.remove('section--hidden');
observer.unobserve(entry.target)
}
const sectionObserver= new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

/* Lazy Loading Images */

const imgTargets=document.querySelectorAll('img[data-src]');
const loadImg=function(entries , observer){
  const [entry]=entries;
console.log(entry);
if(!entry.isIntersecting) return;

//Replace src with datasrc
entry.target.src = entry.target.dataset.src;
entry.target.addEventListener('load',()=>{
  entry.target.classList.remove('lazy-img')

});
observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg , {
  root:null,
  threshold:0,
  rootMargin:'-100px'
});
imgTargets.forEach(img=>imgObserver.observe(img));

/* Building a Slider Component */
// Slider

  const slides= document.querySelectorAll('.slide');
  const btnLeft=document.querySelector('.slider__btn--left');
  const btnRight=document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots')

let curSlide =0;
const maxSlide = slides.length;
/* activateDot();
 */
const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class = 'dots__dot' data-slide='${i}'></button>`)
  })
};
createDots();

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activateDot(0);
const goToSlide= function(slide){
  slides.forEach((s,i)=>(s.style.transform = `translateX(${100*(i-slide)}%)`));
}
goToSlide(0);

const nextSlide = ()=>{
  if(curSlide===maxSlide-1){
    curSlide=0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
   activateDot(curSlide);
 }
const prevSlide = ()=>{
  if(curSlide ===0){
    curSlide = maxSlide-1
  }else{
    curSlide--
  }
  goToSlide(curSlide);
  activateDot(curSlide)
}
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)
document.addEventListener('keydown', (e)=>{
if(e.key ==='ArrowLeft')prevSlide();
e.key==='ArrowRight' && nextSlide()
});

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide)
  }
})
