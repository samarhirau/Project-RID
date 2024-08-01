  // add script to profile section
  document.addEventListener("DOMContentLoaded", function() {
    fetch('./component/profile.html')
        .then(response => response.text())
        .then(data => {
            const profileSection = document.getElementById('profile-sectionn');
            profileSection.innerHTML = data;

        
            const scriptElement = document.createElement('script');
            scriptElement.src = './component/js/script.js';
            document.body.appendChild(scriptElement);
        });
});


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
// menuLinks.style.color = 'red';
  const elm = event.target;
  const elmRect = elm.getBoundingClientRect();
  const { width, left, height, top } = elmRect;
  const offsetBottom = 10;
  line.style.width = `${width}px`;
  line.style.left = `${left}px`;
  line.style.top = `${top + height + offsetBottom}px`;
}

// about

const aboutContainer = document.getElementById('about-container');
const xhr = new XMLHttpRequest();
xhr.open('GET', './component/about.html', true);
xhr.onload = function() {
  if (xhr.status === 200) {
	aboutContainer.innerHTML = xhr.responseText;
  }
};
xhr.send();





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
};







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






	





// // profile drawer

// document.getElementById("profileButton").onclick = function() {
//     document.getElementById("profileDrawer").style.width = "250px";
// }

// document.getElementById("closeDrawer").onclick = function() {
//     document.getElementById("profileDrawer").style.width = "0";
// }

// // Optional: Close the drawer if user clicks outside of it
// window.onclick = function(event) {
//     if (event.target == document.getElementById("profileDrawer")) {
//         document.getElementById("profileDrawer").style.width = "0";
//     }
// };



// document.getElementById('registrationForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // Perform your validation and API call here
//     console.log('Form submitted', { firstName, lastName, email, password });

//     // Example of form submission
//     fetch('/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ firstName, lastName, email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // Redirect to next step or show success message
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });


     

   

  // Add event listener to OTP input fields
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
      if (e.target.value.length === 1) {
        otpInputs[index + 1].focus();
      }
    });
  });

  // Add event listener to Verify OTP button
  const verifyOtpButton = document.querySelector('.btn');
  verifyOtpButton.addEventListener('click', () => {
    // TO DO: Implement OTP verification logic here
    alert('OTP verified successfully!');
  });





 

