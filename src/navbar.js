let navBarCode = '';
let navPage = '';

navPage = document.body.id;
console.log(navPage)
if(navPage != "index") {
navBarCode = 
        `<div><a href="../index.html" style="text-decoration: none; color: white" class="nav-arrow"><div class="fas fa-arrow-left" id="icon"></div><p>All works</p></a></div>
        <div><a href="https://www.linkedin.com/in/julianahb/" target="_blank"> <img src="../images/linkedin.svg"/> </a></div>`
    
    }
    else {
        navBarCode = 
        `<div><a href="index.html" style="text-decoration: none ;"><p>Juholanda portfolio</p></a></div>
        <div><a href="https://www.linkedin.com/in/julianahb/" target="_blank"> <img src="images/linkedin.svg"/> </a></div>`
    
    }
    
const nav = document.querySelector("#navbar");
nav.innerHTML = navBarCode;
