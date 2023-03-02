//rray for each case
const viaArray = [
    {
        title: "<h3>The products</h3>",
        description: "Product designer consultant of mobile apps for Via, a big retailing brazilian company. I was part of the APP experience squad, a cross-functional team that worked together with other squads\ on Via's three marketplace brands: Casas Bahia, Ponto and Extra, each for a different target audience. The brand's mobile applications are whitelabel, meaning they all behave the same with a different design system.",
        pictureUrl: null,
        order: "1",
        caption: null,
    },

    {
        title: "<h3>My teams</h3>",
        description: "I was product designer at the APP Experience squad, a cross-functional team that worked together with other squads (buying journey, discovery, onboarding etc.). It was composed by me as product designer iOS and Android developers, Scrum master, Project Manager and QA. <br> <br> I was also part of the UX tribe at Via, which product designers from different squads/teams would gather regularly to talk about the user experience of Via's products, to support each other across different user journeys and be part of design critiques of each other's works.",
        pictureUrl: "../images/via/img-5.png",
        order: "2",
        caption: "Study of the user address and location across the user journeys ",
    },

    {
        title: "<h3>Contributions</h3>",
        description: "To enable the backlog and evaluate the impact of the solutions, I had to articulate myself in a complex environment of stakeholders from different teams: project managers, marketing, data intelligence, tech leaders and designers. Eventually I also supported the QA with the testing and guided the changes on the tag book, guaranteeing the analytics would be properly implemented. <br><br> To maintain a design legacy at Via, I documented and published at Via's confluence all the APP experience work, detailing the design decisions and the technical challenges. Alongside those reports, I created monitoring dashboards on DataStudio to provide a monitoring interface directly related to the changes implemented by my squad to be consumed by other stakeholders at Via.",
        pictureUrl: "../images/via/img-6.png",
        order: "3",
        caption: "Illustrative example of a Dashboard on the login",
    },

    {
        title: "<h3>Login and onboarding journeys</h3>",
        description: "We reduced the bounce rate on the login process that would affect several parts of the interface, especially the buying journey, visible on user metrics.",
        pictureUrl: "../images/via/img-1.png",
        order: "4",
        caption: "Biometric page: Facilitate the login journey",
    },

    {
        title: "<h3>Browse and fast access journeys</h3>",
        description: "Prior to the Black Friday, we included fast access cards to present featured categories (e.g. mobile, home appliances, electronics...) on the homepage.",
        pictureUrl: "../images/via/img-2.png",
        order: "5",
        caption: "Featured categories",
    },

    {
        title: "<h3>User location and delivery address</h3>",
        description: "Product analysis of the flow across user journeys from the user address and the location components. I monitored the behaviour through Smartlook and Google Analytics. The main problem was the lack of persistence and integration of the components across the user journey on the app.",
        pictureUrl: "../images/via/img-3.png",
        order: "6",
        caption: "User location and delivery address</h3>",
    },
    {
        title: "<h3>Applying new Design System</h3>",
        description: "UI changes to improve accessibility over text styles, color system and other formatting issues.",
        pictureUrl: "../images/via/img-4.png",
        order: "7",
        caption: "Adjustments on the APPs to the new Design system guidelines",
    },

];

const museuArray = [

    {
        title: "<h3>About the project</h3>",
        description: "This app design is a conceptual project for a UX course\. I chose as my educational project the design of an APP for the National Museum of Rio de Janeiro\. ",
        pictureUrl: null,
        caption: null,
        order: "1",
    },

    {
        title: "<h3>About the museum</h3>",
        description: "The National Museum of Rio de Janeiro, the oldest Museum in Brazil, has a collection of scientific and cultural artifacts in the fields of Geology, Paleontology, Archaeology, Ethnology and Anthropological Biology.<br>Aside from the exhibitions, the Museum is also a science and research environment from the University of Rio de Janeiro, also hosting many cultural, scientific and educational initiatives for the community. ",
        pictureUrl: "../images/museu/wikipedia_halley oliveira.jpeg",
        caption: "The Museum is located on a historical site, the São Cristovão Palace(Photo: Halley Oliveira/Wikimedia)",
        order: "2",
    },

    {
        title: "<h3>The fire</h3>",
        description: "In 2018 the Museum was hit by a massive fire, damaging the building and the collection. Some examples of important pieces that was either damaged or extinct by the fire are Luzia, one of the oldest human remains from Americas, a 13 meter high dinosaur and an Egyptian mummy with almost 2 thousand years.<br>After the fire, the community initiated a big and long task force for rescuing everything they could in the museum. At the same time, national and international entities from the public and private sector  joined forces to come up with a long-term plan of reconstruction, sponsorship and governance for the museum.",
        pictureUrl: "../images/museu/elpais_marcelo-sayao.jpeg",
        caption: "The big fire (Photo: Marcelo Sayo/El pais)",
        order: "3",
    },

    {
        title: "<h3>Discovery process</h3>",
        description: "Include text",
        pictureUrl: null,
        caption: null,
        order: "4",
    },



    {
        title: "<h4>Stakeholder interview</h4>",
        description: "I reached out to a person responsible from the educational section of the Museum for an interview about the initiatives taken place and the challenges the Museum has been facing since 2018. This interview had the purpose of setting the main direction and requirements of my project.",
        pictureUrl: null,
        caption: null,
        order: "6",
    },
    {
        title: "<h4>Desk research</h4>",
        description: "Besides the interview, I conducted a desk research looking for everything available about the Museum's history and reconstruction.",
        pictureUrl: null,
        caption: null,
        order: "7",
    },
    {
        title: "<h4>The problem</h4>",
        description: "The museum is now being rebuilt and closed to visitation. Currently many activities with the public are suspended or were reinvented beyond the museum infrastructure, a lot is also done virtually.",
        pictureUrl: null,
        caption: null,
        order: "4",
    },


    {
        title: "<h3>Design and prototyping</h3>",
        description: "Include text",
        pictureUrl: null,
        caption: null,
        order: "4",
    },

    {
        title: "<h4>Goals</h4>",
        description: "I've established a focus on education for the APP in order to differ from other ones I benchmarked. The take outs from this phase were: <br>The goals of the education section of the museum, responsible for the exhibitions to the public and the educational initiatives towards formal education and science research. <br>Identify the potential users of the app: museum stakeholders, the general public, teachers from formal education and researchers.<br> A little more on the goal of this project is to keep the community informed and engaged in the museum activities, such as exhibitions, didactic-scientific projects, campaigns and cultural events.",
        pictureUrl: "../images/museu/img-03.png",
        caption: null,
        order: "8",
    },



];

const icpeduArray = [ 
    
    {
    title: "<h3>Context</h3>",
    description: "The first version of ICPEdu platform focused on a single user. With the increase of use during pandemics, I started working for the platform with the goal to expand ICPEdu to other 2 users profiles (admins from universities and from the RNP itself).",
    pictureUrl: "../images/icpedu/img-01.gif",
    caption: "Digital certificate emission",
    order: "1",
  },
    
    {
    title: "<h3>User interviews</h3>",
    description: "I’ve conducted user interviews with system administrators from the universities. They manage the system within the university and provide support for end-users.<br><br>In the overall, They valued the system for reducing costs and speeding up processes, but many efforts had to be taken to help the end-user on understanding what is a digital certificate and how it works.",
    pictureUrl: "../images/icpedu/img-02.png",
    caption: "User journeys for admins",
    order: "2",
  },
  
  {
    title: "<h3>Product analysis</h3>",
    description: "I've also done a product analysis to identify usability problems on the current interface. The main problem was towards the user flow. Because they didn't understand the steps, users would constantly issue new certificates and didn't know how to actually use it for signing documents. I also looked into the design system and made changes to improve the visual accessibility.",
    pictureUrl: "../images/icpedu/img-03.png",
    caption: "Analyzing the current journey and users often missing their digital certificates or misunderstanding the functioning of it",
    order: "3",
  },
  {
    title: "<h3>Journeys review and prototyping</h3>",
    description: "The redesign process included validation rounds with the participation of people responsible for the business and technology involved, reviewing user journeys, content, graphic interface and system visibility. Some of more structural recommendations form the user research were presented as report to business stakeholders and later on included in the scope of the product.", 
    pictureUrl: "../images/icpedu/img-04.png",
    caption: "Report page for admins",
    order: "4",
  },
  
  ];

const dlabArray = [

    {
        title: "<h3>About the designlab Twente</h3>",
        description: "DesignLAB is a coworking space at the University of Twente to bring science and society together through design, education, entrepreneurship and research. The main goal is to  connect multidisciplinary fields and encourage co-creation around the creative process.",
        pictureUrl: null,
        order: "1",
        caption: null,
    },

    {
        title: "<h3>Scrap table</h3>",
        description: "I've created an Installation of discarded materials and prototypes from the fabrication workshops. The tools were also arranged in this creative space and the materials were reused by users from the DesignLab.",
        pictureUrl: "../images/dlab/img-01.png",
        order: "2",
        caption: "The table",
    },
    {
        title: "<h3>Prototyping workshop</h3>",
        description: "Workshop for 5 participants with the proposal to think for a permanent workstation and storage of the material in the scrap table (materials, tools and old prototypes).",
        pictureUrl: "../images/dlab/img-02.png",
        order: "3",
        caption: "Workshop",
    },

    {
        title: "<h3>Article presentation</h3>",
        description: "The installation was part of my research project on thinking through prototyping. It was presented at the 13th conference \"Student Interaction Design Research\" at University of Delft - Netherlands, with the article \"Gambiarra Meets Design Thinking - Scaffolding Embodied Creativity in a Design\" under the supervision of Professor Dr. J. Van Dijk.",
        pictureUrl: null,
        order: "4",
        caption: null,
    },

    {
        title: "<h3>The legacy of scrap</h3>",
        description: "The discarded materials and prototypes from older projects provided some sort of exhibition of the work being held at DesignLab. In addition, the arbitrary constraints of scrap materials would stimulate creativity. Today it is a permanent and improved space at DesignLab.",
        pictureUrl: "../images/dlab/img-03.png",
        order: "5",
        caption: "Older prototypes being ressignified",
    },
]



// defining variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
let htmlCode = ``;
//define pages
let page = document.body.id;
let pageArray = '';


switch (page) {
    case 'e-commerce':
        pageArray = viaArray;
        break;
    case 'museum':
        pageArray = museuArray;
        break;
    case 'dlab':
        pageArray = dlabArray;
        break;
        case 'icpedu':
            pageArray = icpeduArray;
            break;
}



pageArray.forEach(function (singleCard)
 {
    if(singleCard.pictureUrl !== null && singleCard.caption !== null) {

    htmlCode =
        `${htmlCode}
          <section href="#${singleCard.order}" id="section-${singleCard.order}">
          ${singleCard.title}

          <p>${singleCard.description}</p>
          <div class="content-case"><img style="width: 100%" src="${singleCard.pictureUrl}" style="width: 90%;"/></div>
          <p class="caption"><mark>${singleCard.caption}</mark></p>


            </section>
        `;

} else {
    htmlCode =
        `${htmlCode}
          <section href="#${singleCard.order}" id="section-${singleCard.order}">
            ${singleCard.title}
            <p >${singleCard.description}</p>
          </section> 
        `;
}
});



const portfolioCards = document.querySelector(".cards-list");
portfolioCards.innerHTML = htmlCode;

