


const menuLinks = document.querySelectorAll(".menu-link");
const menu = document.querySelector(".lowerNav");
const line = document.createElement("div");

line.className = "line-effects";

document.body.appendChild(line);

menuLinks.forEach((link) =>
  link.addEventListener("mouseenter", handleLinkHover)
);
menu.addEventListener("mouseleave", handleLeaveMenu);
function handleLeaveMenu() {
  line.style.width = 0;
}
function handleLinkHover(event) {
  const elm = event.target;
  const elmRect = elm.getBoundingClientRect();
  const { width, left, height, top } = elmRect;
  const offsetBottom = 15;
  line.style.width = `${width}px`;
  line.style.left = `${left}px`;
  line.style.top = `${top + height + offsetBottom}px`;
}




const myslide = document.querySelectorAll('.myslide'),
	  dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
	
	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
}







    document.querySelector('.menu-link').addEventListener('mouseover', function() {
        const svgDoc = this.querySelector('.svg-object').contentDocument;
        svgDoc.querySelector('svg').style.fill = 'red';
		// svgDoc.setAttribute('data', './home.svg' );
    });
  

    document.querySelector('.menu-link').addEventListener('mouseout', function() {
        const svgDoc = this.querySelector('object').contentDocument;
        svgDoc.querySelector('svg').style.fill = 'black';
		// svgDoc.setAttribute('data', "./science.svg" );
    });






	  

//   document.addEventListener('DOMContentLoaded', () => {
//     // Get the current page URL
//     const currentPage = window.location.href;

//     // Define page-to-ID mapping
//     const pageMapping = {
//       'home.html': 'home',
//       'research.html': 'research',
//       'about.html': 'about',
//       'center.html': 'center',
//       'contact.html': 'contact'
//     };

//     // Determine the current page ID based on the URL
//     for (const [page, id] of Object.entries(pageMapping)) {
//       if (currentPage.includes(page)) {
//         document.getElementById(id).classList.add('active');
//         break;
//       }
//     }
//   });

// user sign up button
document.getElementById('signUpButton').onclick = function() {
	window.location.href = 'public/form.html';
};