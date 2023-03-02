let sections = document.querySelectorAll("section");
let indiceCode = ""
let i = 0;
sections.forEach(function (section) {
  i++;
  let firstChild = section.firstElementChild.innerHTML;
  if (section.firstElementChild.tagName == 'H3') {
  indiceCode = `${indiceCode} 
<button href="#section-${i}" data-target="section-${i}" class="btn-scroll-into">${firstChild}</button>
`}
} 
);


const indiceSections = document.querySelector(".indice");
indiceSections.innerHTML = indiceCode;

// header pages
document.addEventListener('click', function (event) {})


//scroll to element
document.addEventListener('click', function (event) {
  if (!event.target.matches('.btn-scroll-into')) return;
  event.preventDefault();
  var offset = 80 // sticky nav height
  var el = document.getElementById(event.target.dataset.target); // element you are scrolling to
  window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });

});


  const scrollSections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.btn-scroll-into');

  window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY + 150;

      scrollSections.forEach(section => {
          if (scrollPosition >= section.offsetTop) {
              links.forEach(link => {
                  link.classList.remove('active');
                  if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                      link.classList.add('active');
                  }
              });
          }
      });
  });


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');

      entry.target.classList.add('show');
    } 
    else {

      entry.target.classList.remove('show');

      entry.target.classList.add('hidden'); 
    }
  });
  });
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
  
  let navlinks = document.querySelectorAll('.nav-links');

for (let i = 0; i < navlinks.length; i++) {

    let navId = navlinks[i].id;


    if (navId == document.body.id) {
        navlinks[i].classList.add('active')
    }
};
