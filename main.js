const cardsArray = [ 
    
    { // Via
    title: "Mobile app for e-commerce",
    description: "Product designer consultant (Capgemini/Via) of marketplace mobile apps for Via, a big brazilian retailing company",
    pictureUrl: "images/via-pic.png",
    goToPage: "pages/e-commerce-app.html",
  },
    
    { // Pnipe
    title: "Prototyping in collaboration",
    description: "UX analyst consultant for the National Research Infrastructure platform when I was working for several projects for the National Education and Research Network.",
    pictureUrl: "images/pnipe-pic.png",
    goToPage: "pages/e-commerce-app.html"
  },

    
    {// Museu project
    title: "Museum APP project",
    description: "Design installation and research project to investigate the creative process of prototyping in early stages of a projects at DesignLab, a collaborative space for innovative solutions within the ecosystem of the University of Twente - Netherlands.",
    pictureUrl: "images/museu-pic.png",
    goToPage: "pages/e-commerce-app.html",
    },

    
    {// Dlab
        title: "Thinking with scrap",
        description: "Design installation and research project to investigate the creative process of prototyping in early stages of a projects at DesignLab, a collaborative space for innovative solutions within the ecosystem of the University of Twente - Netherlands.",
        pictureUrl: "images/dlab.png",
        goToPage: "pages/e-commerce-app.html",
    },

    {// Dlab
    title: "ICPEdu platform",
    description: "Research and design for ICPEdu platform, a digital certification service offered by the National Education and Research Network (RNP) to higher education institutions, providing the infrastructure for issuing digital certificates and security keys.",
    pictureUrl: "images/icpedu.png",
    goToPage: "pages/e-commerce-app.html",
    },
];

// defining our variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
let htmlCode = ``;

// to get each single elephant object from the array and use them to build out html string, we need to open up our array, and we do that using forEach method. The forEach method, finds each item(object) in the array and returns them, this means we get 4 items that are objects back.

cardsArray.forEach(function(singleCard) {
htmlCode =
  `${htmlCode}
      <div class="card">
      <img class="img-card-box" src="${singleCard.pictureUrl}"/>
      <div class"content-box">
        <h2>${singleCard.title}</h2>
        <p>${singleCard.description}</p>
        <div><a href="https://jhbonomo.github.io/portfolio.github.io/${goToPage}"><button class="button" type="button"> Check this project <i calass="fas fa-arrow-right"></i></button></a></div>
      </div>
      </div>
  `;
});
const portfolioCards = document.querySelector(".cards-list");
portfolioCards.innerHTML = htmlCode;



