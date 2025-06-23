'use strict';



// JavaScript for revealing timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

// Intersection Observer options
const options = {
  root: null, // viewport
  threshold: 0.5, // trigger when 50% of the item is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // stop observing once revealed
    }
  });
}, options);

timelineItems.forEach(item => {
  observer.observe(item);
});





// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



function copyText() {
  const textToCopy = document.getElementById('textToCopy').innerText;

  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  // Select the text in the textarea and copy it to the clipboard
  textarea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Notify the user
  alert('Certificate number copied to clipboard! Now click verify.');
}




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        // Store scroll position in sessionStorage
        sessionStorage.setItem("scrollPosition", window.scrollY);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Restore scroll position when the page is loaded
window.addEventListener("load", function() {
    var scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem("scrollPosition"); 
    }
});


document.addEventListener('DOMContentLoaded', function () {
  const skills = document.querySelectorAll('.skill-progress-fill');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percentage = fill.getAttribute('data-percentage');
        fill.style.setProperty('--target-width', `${percentage}%`);
        fill.classList.add('active');
        observer.unobserve(fill); 
      }
    });
  }, {
    threshold: 0.5 
  });

  skills.forEach(skill => {
    observer.observe(skill);
  });
});


window.onload = function() {

  const hourHand = document.querySelector('.hourHand');
      const minuteHand = document.querySelector('.minuteHand');
      const secondHand = document.querySelector('.secondHand');
      const time = document.querySelector('.time');
      const clock = document.querySelector('.clock');
      const audio = document.querySelector('.audio');
  
      function setDate(){
          const today = new Date();
          
          const second = today.getSeconds();
          const secondDeg = ((second / 60) * 360) + 360; 
          secondHand.style.transform = `rotate(${secondDeg}deg)`;
        
          audio.play();
          
          const minute = today.getMinutes();
          const minuteDeg = ((minute / 60) * 360); 
          minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  
          const hour = today.getHours();
          const hourDeg = ((hour / 10 ) * 360 ); 
          hourHand.style.transform = `rotate(${hourDeg}deg)`;
          
          time.innerHTML = '<span>' + '<strong>' + hour + '</strong>' + ' : ' + minute + ' : ' + '<small>' + second +'</small>'+ '</span>';
  
          }
    
      setInterval(setDate, 1000);
   
  }

  
// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});


