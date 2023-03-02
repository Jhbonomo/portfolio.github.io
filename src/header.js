
let navBarCode = '';
let headCode = '';

/* Head */
headCode =
    `    <meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://kit.fontawesome.com/c7222e8417.js" crossorigin="anonymous"></script>


<title>Ju Holanda Portfolio</title>
<link rel="stylesheet" href="../css/reset.css"/>
<link rel="stylesheet" href="../css/style.css"/>
<!-- Sora -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
    rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
const head = document.querySelector("head");
head.innerHTML = headCode;
/* Header */

if (document.body.id != "index") {
navBarCode =
    `
<nav id="nav-projetos">
<a href="../index.html" class="nav-links" id="index"><img class="icon" src="../images/house-solid.svg" style="width: 24px;">
</a>
    <a href="../pages/e-commerce.html" class ="nav-links" id="e-commerce">
        <p class="nav-page">E-commerce mobile APPs</p>
    </a>
    <a href="../pages/pnipe.html" class ="nav-links" id="pnipe">
    <p class="nav-page">PNIPE platform</p>
</a>
</a>
    <a href="../pages/museum.html" class ="nav-links" id="museum">
        <p class="nav-page">Museum APP</p>
    </a>
    <a href="../pages/icpedu.html" class ="nav-links" id="icpedu">
    <p class="nav-page">ICPEdu platform</p>
</a>

    <a href="../pages/dlab.html" class ="nav-links" id="dlab">
    <p class="nav-page">DesignLab</p>
</a>

</nav>`


const nav = document.querySelector("#header");
nav.innerHTML = navBarCode;

} else {
let indexBarCode = '';

indexBarCode =
    `<a href="index.html" style="text-decoration: none ;"><span style="color:white">Juholanda portfolio</span></a>
    <div><a href="https://www.linkedin.com/in/julianahb/" target="_blank"> <img src="images/linkedin.svg"/> </a></div>`


const indexPage = document.getElementById('index-page');
indexPage.innerHTML = indexBarCode;

}









