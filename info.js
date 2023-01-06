const viaArray = [ 
    
    {
    title: "Login and onboarding journeys",
    description: "We reduced the bounce rate on the login process that would affect several parts of the interface, especially the buying journey, visible on user metrics.",
    pictureUrl: "images/via-pic_1.png",
  },
    
    {
    title: "Browse and fast access journeys",
    description: "Prior to the Black Friday, we included fast access cards to present featured categories (e.g. mobile, home appliances, electronics...) on the homepage.",
    pictureUrl: "images/home.png",
  },

  {
    title: "User location and delivery address",
    description: "Product analysis of the flow across user journeys from the user address and the location components. I monitored the behaviour through Smartlook and Google Analytics. The main problem was the lack of persistence and integration of the components across the user journey on the app.",
    pictureUrl: "images/address.png",
  },
  {
    title: "Applying new Design System",
    description: "UI changes to improve accessibility over text styles, color system and other  formatting issues.", 
    pictureUrl: "images/discovery.png",
  },
  {
    title: "Design documentation and reports",
    description: "I Created data Studio reports with Google Analytics metrics to provide a monitoring interface directly related to the changes implemented by my squad. The squad process was also documented and published at Via's confluence.",   
    pictureUrl: null,
  },

  {
    title: "Other contributions",
    description: "<b>UX app tribe:</b> conversations among designers from others squads to exchange materials and talk through the desired common goals specially when the squads overlapped.<br><b>Support implementation:</b> As any new change should be properly tagged to obtain user metrics, I reviewed the current tag book to properly implement Analytics on the new implementations.<br><b>Supported QA and Project managers:</b> I supported my peers with the testing and validation phases, also keeping up with firebase and Jira\.<br><b>UX Benchmarking:</b> I teamed up with other designers to compare Via's products with other e-commerce platforms to identify strenghts, weakness and opportunities for Via's apps.",   
    pictureUrl: null,
  },

    
];

// defining our variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
let htmlCode = ``;

// to get each single elephant object from the array and use them to build out html string, we need to open up our array, and we do that using forEach method. The forEach method, finds each item(object) in the array and returns them, this means we get 4 items that are objects back.
  viaArray.forEach(function(singleCard) {
  if(singleCard.pictureUrl !== null) {
    htmlCode =
    `${htmlCode}
      <div style="width:100vw; padding: 20px; max-width:800px;" >
        <h3 style="margin-bottom: 8px; color:black">${singleCard.title}</h3><br>
        <p >${singleCard.description}</p><br>
        <div class="content-case"><img src="${singleCard.pictureUrl}" style="width: 90%;"/></div>
      </div> 
  `;
  } else {
    htmlCode =
    `${htmlCode}
      <div style="width:100vw; padding: 20px; max-width:800px;" >
      <h3 style="margin-bottom: 8px; color:black">${singleCard.title}</h3><br>
      <p >${singleCard.description}</p><br>
    </div> 
  `;
}}

);


const portfolioCards = document.querySelector(".cards-list");
portfolioCards.innerHTML = htmlCode;





