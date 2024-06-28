/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");
  menuBtn.classList.toggle("responsive");
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() { addHeaderShadow() };

function addHeaderShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
new Typed(".typedText", {
  strings: ["a Software Developer", "a UI/UX Designer", "a Cricket Fan", "a Casual Gamer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const scrollRevealOptions = {
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
};

const sr = ScrollReveal(scrollRevealOptions);

sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', { delay: 100 });
sr.reveal('.featured-text-info', { delay: 200 });
sr.reveal('.featured-text-btn', { delay: 200 });
sr.reveal('.social_icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 300 });

sr.reveal('.project-box', { interval: 200 });
sr.reveal('.top-header', {});

const srLeft = ScrollReveal({ ...scrollRevealOptions, origin: 'left' });
srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });
srLeft.reveal('.e-col', { delay: 100 });

const srRight = ScrollReveal({ ...scrollRevealOptions, origin: 'right' });
srRight.reveal('.skills-box', { delay: 100 });
srRight.reveal('.form-control', { delay: 100 });
srRight.reveal('.ex-col', { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const linkElement = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      linkElement.classList.add('active-link');
    } else {
      linkElement.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/* ----- CONTACT ME ----- */
document.addEventListener('DOMContentLoaded', function() {
  emailjs.init("5XMzYOWYD1vnZHCkk"); // Replace with your EmailJS user ID

  const apiKey = '1cfad8c0cabd41dc9d30ade7e5f6e794'; // Replace with your AbstractAPI key

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function checkEmailExists(email) {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data.deliverability === 'DELIVERABLE')
      .catch(error => {
        console.error('Error checking email existence:', error);
        return false;
      });
  }

  document.getElementById('sendButton').addEventListener('click', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    if (!name || !email || !message) {
      showResponseMessage('error', 'Please fill out all fields.');
      return;
    }

    if (!validateEmail(email)) {
      showResponseMessage('error', 'Please enter a valid email address.');
      return;
    }

    checkEmailExists(email).then(exists => {
      if (!exists) {
        showResponseMessage('error', 'Email does not exist. Please enter an existing email.');
        return;
      }

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message
      };

      emailjs.send("service_ftvefet", "template_dkiy2tk", templateParams)
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
          showResponseMessage('success', 'Message sent successfully!');
        })
        .catch(error => {
          console.log('FAILED...', error);
          showResponseMessage('error', 'Message failed to send.');
        });
    });
  });
});

function showResponseMessage(messageType, messageText) {
  const responseMessage = document.createElement('div');
  responseMessage.textContent = messageText;
  responseMessage.classList.add('response-message', messageType, 'show');

  
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('close-btn');
  closeButton.addEventListener('click', () => {
    responseMessage.remove();
  });

  responseMessage.appendChild(closeButton);
  document.body.appendChild(responseMessage);

  setTimeout(() => {
    responseMessage.remove();
  }, 5000);
}
