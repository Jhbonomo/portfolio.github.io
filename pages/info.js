//array for each case
const viaArray = [ 
  {
    title: "The products",
    description: "Via has three marketplace brands each for a different target audience. The brand's mobile applications are whitelabel, meaning they all behave the same with a different design system.",
    pictureUrl: null,
  }, 
  
  {
    title: "My teams",
    description: "I was product designer at the APP Experience squad, a cross-functional team that worked together with other squads (buying journey, discovery, onboarding etc.). It was composed by me as product designer iOS and Android developers, Scrum master, Project Manager and QA. <br> <br> I was also part of the UX tribe at Via, which product designers from different squads/teams would gather regularly to talk about the user experience of Via's products, to support each other across different user journeys and be part of design critiques of each other's works.",
    pictureUrl: null,
    caption: "",
    },
  
  {
    title: "Contributions",
    description: "To enable the backlog and evaluate the impact of the solutions, I had to articulate myself in a complex environment of stakeholders from different teams: project managers, marketing, data intelligence, tech leaders and designers. Eventually I also supported the QA with the testing and guided the changes on the tag book, guaranteeing the analytics would be properly implemented. <br><br> To maintain a design legacy at Via, I documented and published at Via's confluence all the APP experience work, detailing the design decisions and the technical challenges. Alongside those reports, I created monitoring dashboards on DataStudio to provide a monitoring interface directly related to the changes implemented by my squad to be consumed by other stakeholders at Via.", 
    pictureUrl: null,
  },
  
  {
    title: "Login and onboarding journeys",
    description: "We reduced the bounce rate on the login process that would affect several parts of the interface, especially the buying journey, visible on user metrics.",
    pictureUrl: "../images/via/img-1.png",
    caption: "",
  },
    
    {
    title: "Browse and fast access journeys",
    description: "Prior to the Black Friday, we included fast access cards to present featured categories (e.g. mobile, home appliances, electronics...) on the homepage.",
    pictureUrl: "../images/via/img-2.png",
    caption: "",
  },

  {
    title: "User location and delivery address",
    description: "Product analysis of the flow across user journeys from the user address and the location components. I monitored the behaviour through Smartlook and Google Analytics. The main problem was the lack of persistence and integration of the components across the user journey on the app.",
    pictureUrl: "../images/via/img-3.png",
    caption: "",
  },
  {
    title: "Applying new Design System",
    description: "UI changes to improve accessibility over text styles, color system and other  formatting issues.", 
    pictureUrl: "../images/via/img-4.png",
    caption: "",
  },
    
];
const viaBanner = [ 
  {
  imgBanner: "../images/via/main-banner.png",
  bgColor: "#A043E9",
  info: "Product designer for mobile apps of three e-commerce brands: Casas Bahia, Ponto and Extra. I was part of the APP experience squad, a cross-functional team that worked together with other squads.",
  buttonTitle: "Go to PNIPE case",
  buttonUrl: "pnipe.html"

},]
const pnipeArray = [ 
    
  {
  title: "Coming up with an idea",
  description: "Seeking a more effective solution, the project manager and I included stakeholders and developers on an early stage of the prduct using Figma as a collaborative environment. This process was later reviewed and much was adapted to other projects by the National Education and Research Network.<br>We refined user journeys ideas with the developing team, also giving them more time to look into technical solutions before the story was added to their backlog. Meanwhile the same file was used with Client and users to validate ideas, strategy and to elaborate the content such as translations, images, etc.",
  pictureUrl: "../images/pnipe/img-1.png",
  caption: "",

},
  
  {
  title: "Specifying the interface",
  description: "I designed the interface, created assets and compiled content to deliver for backlog development. The design system, created by my UX peer at RNP, was adapted from the design guidelines from the Brazilian government.<br>As the platform evolved, I partnered up with the front-end developer to come up with new UI components based on the platform visual identity, the Government design guidelines and React's material-ui.",
  pictureUrl: "../images/pnipe/img-2.png",
  caption: "",
},

{
  title: "Product strategy",
  description: "The MVP focused on Labs and Institutions users. Laboratories were required to have equipment registered on the platform in order to participate in a funding public selection. That way the platform would have an initial load for its scientific catalogue. After it was launched, we focused our efforts towards researcher users to put the platform into motion. I gathered user metrics from the platform and users feedback from the support team to analyze and propose a strategy for evolving the MVP to adapt the platform for a wider audience.",
  pictureUrl: "../images/pnipe/img-3.png",
  caption: "",
},
{
  title: "Platform evolution",
  description: "We presented to business stakeholders the results from the 1st phase and a step-by-step proposal of new features and improvements to achieve the next project's milestones defined on the platform roadmap.", 
  pictureUrl: "../images/pnipe/img-4.png",
  caption: "",
},
  
];

const pnipeBanner = [ 
  {
  imgBanner: "../images/pnipe/main-banner.png",
  bgColor: "#47C7D8",
  info: "PNIPE is an initiative from the Ministry of Science and Technology to gather information about resources from brazilian Institutions for Science, Technology and Innovation.",
  buttonTitle: "Go to DesignLab case",
  buttonUrl: "dlab.html"
  },]
/*
const museuArray = [ 
    
  {
  title: "About the museum",
  description: "The National Museum of Rio de Janeiro, the oldest Museum in Brazil, has a collection of scientific and cultural artifacts in the fields of Geology, Paleontology, Archaeology, Ethnology and Anthropological Biology.<br>Aside from the exhibitions, the Museum is also a science and research environment from the University of Rio de Janeiro, also hosting many cultural, scientific and educational initiatives for the community. ",
  pictureUrl: null,
},
  
  {
  title: "The fire",
  description: "In 2018 the Museum was hit by a massive fire, damaging the building and the collection. Some examples of important pieces that was either damaged or extinct by the fire are Luzia, one of the oldest human remains from Americas, a 13 meter high dinosaur and an Egyptian mummy with almost 2 thousand years.<br>After the fire, the community initiated a big and long task force for rescuing everything they could in the museum. At the same time, national and international entities from the public and private sector  joined forces to come up with a long-term plan of reconstruction, sponsorship and governance for the museum.",
  pictureUrl: "../images/museu/img-01.png",
},

{
  title: "The app design",
  description: "The MVP focused on Labs and Institutions users. Laboratories were required to have equipment registered on the platform in order to participate in a funding public selection. That way the platform would have an initial load for its scientific catalogue. After it was launched, we focused our efforts towards researcher users to put the platform into motion. I gathered user metrics from the platform and users feedback from the support team to analyze and propose a strategy for evolving the MVP to adapt the platform for a wider audience.",
  pictureUrl: "../images/museu/img-02.png",
},
{
  title: "The problem",
  description: "The museum is now being rebuilt and closed to visitation. Currently many activities with the public are suspended or were reinvented beyond the museum infrastructure, a lot is also done virtually.", 
  pictureUrl: null,
},
{
  title: "Stakeholder interview",
  description: "I reached out to a person responsible from the educational section of the Museum for an interview about the initiatives taken place and the challenges the Museum has been facing since 2018. This interview had the purpose of setting the main direction and requirements of my project.", 
  pictureUrl: null,
},
{
  title: "Desk research",
  description: "Besides the interview, I conducted a desk research looking for everything available about the Museum's history and reconstruction.", 
  pictureUrl: null,
},

{
  title: "Goals",
  description: "I've established a focus on education for the APP in order to differ from other ones I benchmarked. The take outs from this phase were: <br>The goals of the education section of the museum, responsible for the exhibitions to the public and the educational initiatives towards formal education and science research. <br>Identify the potential users of the app: museum stakeholders, the general public, teachers from formal education and researchers.", 
  pictureUrl: "../images/museu/img-03.png",
},
  
{
  title: null,
  description: "A little more on the goal of this project is to keep the community informed and engaged in the museum activities, such as exhibitions, didactic-scientific projects, campaigns and cultural events.",
},


];
const museuBanner = [ 
  {
  imgBanner: "../images/museu/main-banner.png",
  bgColor: "#FF4C41",
  info: "This app design is a conceptual project for a UX course. I chose as my educational project the design of an APP for the National Museum of Rio de Janeiro. ",
  buttonTitle: "Go to Thinking with scrap case",
  buttonUrl: "dlab.html"

},];

*/
const dlabArray = [ 
    
  {
  title: "About the designlab Twente",
  description: "DesignLAB is a coworking space at the University of Twente to bring science and society together through design, education, entrepreneurship and research. The main goal is to  connect multidisciplinary fields and encourage co-creation around the creative process.",
  pictureUrl: null,

},

{
  title: "Scrap table",
  description: "I've created an Installation of discarded materials and prototypes from the fabrication workshops. The tools were also arranged in this creative space and the materials were reused by users from the DesignLab.",
  pictureUrl: "../images/dlab/img-01.png",
  caption: "",
},
{
  title: "Prototyping workshop",
  description: "Workshop for 5 participants with the proposal to think for a permanent workstation and storage of the material in the scrap table (materials, tools and old prototypes).", 
  pictureUrl: "../images/dlab/img-02.png",
  caption: "",
},

{
  title: "Article presentation",
  description: "The installation was part of my research project on thinking through prototyping. It was presented at the 13th conference \"Student Interaction Design Research\" at University of Delft - Netherlands, with the article \"Gambiarra Meets Design Thinking - Scaffolding Embodied Creativity in a Design\" under the supervision of Professor Dr. J. Van Dijk.", 
  pictureUrl: null,
},

{
  title: "The legacy of scrap",
  description: "The discarded materials and prototypes from older projects provided some sort of exhibition of the work being held at DesignLab. In addition, the arbitrary constraints of scrap materials would stimulate creativity. Today it is a permanent and improved space at DesignLab.", 
  pictureUrl: "../images/dlab/img-03.png",
  caption: "",
},

];
const dlabBanner = [
{buttonTitle: "Go to ICPedu case",
buttonUrl: "icpedu.html"}
];

const icpeduArray = [ 
    
  {
  title: "Context",
  description: "The first version of ICPEdu platform focused on a single user. With the increase of use during pandemics, I started working for the platform with the goal to expand ICPEdu to other 2 users profiles (admins from universities and from the RNP itself).",
  pictureUrl: "../images/icpedu/img-01.gif",
  caption: "",
},
  
  {
  title: "User interviews",
  description: "I’ve conducted user interviews with system administrators from the universities. They manage the system within the university and provide support for end-users.<br><br>In the overall, They valued the system for reducing costs and speeding up processes, but many efforts had to be taken to help the end-user on understanding what is a digital certificate and how it works.",
  pictureUrl: "../images/icpedu/img-02.png",
  caption: "",
},

{
  title: "Product analysis",
  description: "I've also done a product analysis to identify usability problems on the current interface. The main problem was towards the user flow. Because they didn't understand the steps, users would constantly issue new certificates and didn't know how to actually use it for signing documents. I also looked into the design system and made changes to improve the visual accessibility.",
  pictureUrl: "../images/icpedu/img-03.png",
  caption: "",
},
{
  title: "Journeys review and prototyping",
  description: "The redesign process included validation rounds with the participation of people responsible for the business and technology involved, reviewing user journeys, content, graphic interface and system visibility. Some of more structural recommendations form the user research were presented as report to business stakeholders and later on included in the scope of the product.", 
  pictureUrl: "../images/icpedu/img-04.png",
  caption: "",
},

];
const icpeduBanner = [ 
  {
  imgBanner: "../images/icpedu/main-banner.png",
  bgColor: "#FF9238",
  info: "UX research and design for ICPEdu platform, a digital certification service offered by the National Education and Research Network (RNP) to higher education institutions.",
  buttonTitle: "Go to all works",
  buttonUrl: "../index.html"
},
];

const pnipeprocessArray = [ 
    
  {
  title: "THE PLATFORM GOALS",
  description: "<ul><li>Encourage the shared use of resources and collaboration between research groups from different institutions and locations across the country;</li><li>Foster innovation by giving visibility and insights for companies to cooperatively improve their products and develop new technologies;</li><li>Provide to public officials information and data to promote public policies for the maintenance of existing infrastructures and acquisition of new ones.</li></ul>",
  pictureUrl: null,


},
  
  {
  title: "THE PROCESS<br><h2>Planning</h2>",
  description: "I supported the product owner in defining and prioritizing user journeys to align with the platform goals. Once the plan was validated, I helped progress the product development cycle for each user journey.",
  pictureUrl: null,
},

{
  title: "<h2>Discovery</h2>",
  description: "Our discovery process involved a focused group of diverse users from research institutions, who participated in weekly conversations between my team (product stakeholders) and the client (Ministry of Science and Technology). <br><br>We gathered requirements through discussions of their needs and realities, followed by conversations to create a concept prototype for the interface, interaction, and terminology. The product owner and I also held sessions with developers to explore the best implementation methods and adapt the concept to the React Framework.",
  pictureUrl: "../images/pnipe/process/img-1.png",
  caption: "Fragment of user journey: How users navigate inside and outside the platform to register an institution",
},
{
  title: "<h2>Design and development</h2>",
  description: "Once the prototype was validated with users and clients, the user journey was specified and added to the development backlog. My main responsibilities included defining the user scenarios and interface with the product owner, evolving the design system as necessary, and ensuring the project's assets and content were provided (such as marketing banners and text content).", 
  pictureUrl: "../images/pnipe/process/img-2.png",
  caption: "Example of design delivery - interface specs for production",
},
{
  title: "<h2>Product launch and evaluation</h2>",
  description: "After the product was launched, we included a new step in our product lifecycle using Google Analytics, Data from the platform itself and user information from the support team. We planned and prioritized a new roadmap for the product evolution with improvements towards the existing features and the strategy to include features focused on another type of user, researchers looking for information about the laboratories, equipment and sharing possibilities.", 
  pictureUrl: "../images/pnipe/process/img-3.png",
  caption: "Improvements on the usability of components and improvements on the overall user experience",
},
  
{
  title: "CONTRIBUTIONS<br> <h2>Changing the product process</h2>",
  description: "I started working on projects for a client with an undefined UX/UI process. My role was to adapt drafts into highly dynamic prototypes, but there was no room for UX considerations. The process was also inefficient and involved excessive back-and-forth communication between teams. To resolve these issues, I teamed up with the product owner. Our goal was to increase developer ownership and improve collaboration with clients, users, and developers. <br><br>We integrated developer reviews into the discovery phase and switched to using Figma for prototyping. This change promoted collaboration and empowered all parties involved. The client and user validation process became more technical and efficient, and developers were better able to understand the prototype and the user journeys. This process was later refined and implemented in other projects, and Figma became the official prototyping tool for the company.",
  pictureUrl: "../images/pnipe/process/img-4.png",
  caption: "Product collaboration using the prototype",
},
{
  title: "<h2>Monitoring the user experience</h2>",
  description: "<b>Improved Features</b> <br> We monitored user feedback and problems coming from the support team to identify common mistakes caused by usability issues or interface bugs. We then created a backlog for these improvements, reducing user errors and failures.", 
  pictureUrl: null,
},

{
  title: "<h2>Platform evolution</h2>",
  description: "I also gained more responsibility in the project, analyzing and monitoring the product experience to measure results and suggest strategies for implementing the platform roadmap.<br>I conducted a product experience analysis and developed a plan to prioritize new users, using Google Analytics and platform data. I presented the results of the MVP for enrolling institutions, laboratories, and equipment, provided an overview of lessons learned and opportunities for improvement, and recommended key milestones to enhance the new user journey (such as sharing and advanced search).", 
  pictureUrl: "../images/pnipe/process/img-5.png",
  caption: "Platform evolution: new important features for researchers looking for equipment and facilities across the country",
},

{
  title: "<h2>Design system</h2>",
  description: "The PNIPE design system was based on brazilian government guidelines and design system with adaptations for PNIPE's visual identity. The design was evolved with new components in collaboration with the front-end developer. Some elements were kept from the government guidelines, such as typography and spacing, while others were adapted to fit PNIPE's visual identity (colors, imagery, and components).", 
  pictureUrl: "../images/pnipe/process/img-6.png",
  caption: "The design system: adapted from two guidelines to the visual identity of the brand and the front-end framework (React)",
},



];

const pnipeprocessBanner = [ 
  {
  imgBanner: "../images/pnipe/main-banner.png",
  bgColor: "#47C7D8",
  info: "PNIPE is a webplatform and Brazilian initiative from the Ministry of Science and Technology that catalogs research labs and equipment nationwide, making information on location, conditions and usage accessible to public institutions and the scientific community.",
  buttonTitle: "Go to Via case",
  buttonUrl: "via.html"
  },]



// defining variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
let htmlCode = ``;
let bannerCode = ``;
//define pages
let page = document.body.id;
let pageArray = ''
let bannerArray = ``;
//include portfolio pages case

switch (page) {
  case 'pnipe':
    pageArray = pnipeArray;
    bannerArray = pnipeBanner;
    break;
  case 'via':
    pageArray = viaArray;
    bannerArray = viaBanner;
    break;
  case 'museu':
    pageArray = museuArray;
    bannerArray = museuBanner;
    break;
  case 'dlab':
    pageArray = dlabArray;
    bannerArray = dlabBanner;
    break;
  case 'icpedu':
    pageArray = icpeduArray;
    bannerArray = icpeduBanner;
    break;
    case 'pnipe-process':
      pageArray = pnipeprocessArray;
      bannerArray = pnipeprocessBanner;
      break;
}

let footerCode = '';

const footer = document.querySelector("#footer");
footer.innerHTML = footerCode;

//retrieve paragraphs info
pageArray.forEach(function(singleCard) {
  if(singleCard.pictureUrl !== null) {

    htmlCode =
    `${htmlCode}
      <div class="hidden"; style="width:100vw; padding: 20px; max-width:800px";>
        <h3 style="margin-bottom: 8px;">${singleCard.title}</h3><br>
        <p >${singleCard.description}</p><br>
        <div class="content-case"><img src="${singleCard.pictureUrl}" style="width: 90%;"/></div>
        <p style="text-align: center; font-weight: 200; font-style: italic;">${singleCard.caption}</p>
      </div> 
  `;

  } else {
    htmlCode =
    `${htmlCode}
      <div style="width:100vw; padding: 20px; max-width:800px;" >
      <h3 style="margin-bottom: 8px;">${singleCard.title}</h3><br>
      <p >${singleCard.description}</p><br>
    </div> 
  `;
}});

bannerArray.forEach(function(banner) {
footerCode = 
`<div class="next-project">
<a href=" ${banner.buttonUrl}"><button class="button" type="button"> ${banner.buttonTitle} <div class="fas fa-arrow-right" id="icon"></div></button></a></div>`

if(page !== "dlab") {
bannerCode = 
`<div id="main-pic" style="background-color:${banner.bgColor};"> 
<img src="${banner.imgBanner}">
  <div class="info-case">
  <p style="color:#0E0E0E">${banner.info}</p>
</div> </div>
  `;
  


const portfolioBanner = document.querySelector("#banner");
portfolioBanner.innerHTML = bannerCode;

}})
//insert html code on cards list

const portfolioCards = document.querySelector(".cards-list");
portfolioCards.innerHTML = htmlCode;
const newFooter = document.querySelector("#footer");
footer.innerHTML = footerCode;

