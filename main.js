

const cardsArray = [ 
    
    { // Via
    title: "Mobile app for e-commerce",
    description: "Product designer consultant (Capgemini/Via) of marketplace mobile apps for Via, a big brazilian retailing company",
    pictureUrl: "images/via-pic.png",
    linkPage: "pages/e-commerce-app.html",
  },
    
    { // Pnipe
    title: "Prototyping in collaboration",
    description: "UX analyst consultant for the National Research Infrastructure platform when I was working for several projects for the National Education and Research Network.",
    pictureUrl: "images/pnipe-pic.png",
    linkPage: "https://jhbonomo.github.io/portfolio.github.io/",
  },

    
    {// Museu project
    title: "Museum APP project",
    description: "This app design is my project for a UX course. I chose as my educational project the design of an APP for the National Museum of Rio de Janeiro. ",
    pictureUrl: "images/museu-pic.png",
    linkPage: "https://jhbonomo.github.io/portfolio.github.io/",
    },

    
    {// Dlab
        title: "Thinking with scrap",
        description: "Design installation and research project to investigate the creative process of prototyping in early stages of a projects at DesignLab, a collaborative space for innovative solutions within the ecosystem of the University of Twente - Netherlands.",
        pictureUrl: "images/dlab.png",
        linkPage: "https://jhbonomo.github.io/portfolio.github.io/",
    },

    {// Dlab
    title: "ICPEdu platform",
    description: "Research and design for ICPEdu platform, a digital certification service offered by the National Education and Research Network (RNP) to higher education institutions, providing the infrastructure for issuing digital certificates and security keys.",
    pictureUrl: "images/icpedu.png",
    linkPage: "https://jhbonomo.github.io/portfolio.github.io/",
    },
];

// defining our variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
let htmlCode = ``;

// to get each single elephant object from the array and use them to build out html string, we need to open up our array, and we do that using forEach method. The forEach method, finds each item(object) in the array and returns them, this means we get 4 items that are objects back.

cardsArray.forEach(function(singleCard) {
htmlCode =
  `${htmlCode}
      <div id="card" class="hidden">
      <img class="img-card-box" src="${singleCard.pictureUrl}"/>
      <div class="card-info">
        <h2>${singleCard.title}</h2>
        <p>${singleCard.description}</p>
        <div><a href="${singleCard.linkPage}"><button class="button" type="button"> Check this project <div class="fas fa-arrow-right" id="icon"></div></button></a></div>
      </div>
      </div>
  `;
});
const portfolioCards = document.querySelector(".cards-list");
portfolioCards.innerHTML = htmlCode;



