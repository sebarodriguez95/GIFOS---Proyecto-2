
// selector
var menu = document.querySelector(".hamburger");

// method
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener("click", toggleMenu, false);
var favtrend0=0;
var favtrend1=0;
var favtrend2=0;
// addEventListener version
// trending
let apiKey = "AL2THPNTNm41IMtrDgXnqF0eYrqFo0XM";
var count = 0;
let arraygifs = new Array();
let arrayTitle = new Array();
let arrayUser = new Array();
let arrayUrl = new Array();
let arrayId = new Array();
let arrayLike = new Array();
fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=5`)
  .then((response) => response.json())
  .then((json) => {
    json.data
      .map((gif) => gif.images.original.url)
      .forEach((url) => {
        arraygifs[count] = url;
        count++;        
      });
    count = 0;
    json.data.map((data) => data.title).forEach((title) => {
        arrayTitle[count] = title;       
        count++;
      });
    count = 0;
    json.data.map((user) => user.username).forEach((username) => {
        arrayUser[count] = username;
        count++;
      });
      count=0;
      json.data.map((data) => data.images.downsized_large.url).forEach((urlorigin) => {
        arrayUrl[count] = urlorigin;
        count++;
      }); 
      count=0; 
      json.data.map((data) => data.id).forEach((id) => {
        arrayId[count] = id;
        count++;
        
      });
      count=0;

    for (let a = 0; a < 3; a++) {
      document.getElementById("img" + a).src = arraygifs[a];
      document.getElementById("user" + a).textContent = arrayUser[a];
      document.getElementById("tit" + a).textContent = arrayTitle[a];
      document.getElementById("downtrend" + a).src = arrayUrl[a];
      document.getElementById("favtrend" + a).name = arrayId[a];
    }
  })
  .catch((error) => (document.body.appendChild = error));


////////////////////////////////////////////////////////////////////////
// Carousel de GIFS
////////////////////////////////////////////////////////////////////////
var forward = document.getElementById("right");
let counti = 0;
forward.addEventListener("click", () => {
  counti++;
  if(favtrend0===1){
    let d = document.getElementById("favtrend0");
   let d_nested = document.getElementById("imgfav0");
    d.removeChild(d_nested);
    favtrend0=0;
    } 
    if(favtrend1===1){
      let d = document.getElementById("favtrend1");
     let d_nested = document.getElementById("imgfav1");
      d.removeChild(d_nested);
      favtrend1=0;
      }  
      if(favtrend2===1){
        let d = document.getElementById("favtrend2");
       let d_nested = document.getElementById("imgfav2");
        d.removeChild(d_nested);
        favtrend2=0;
        }
  adelante();
});

var reward = document.getElementById("left");
reward.addEventListener("click", () => {
  counti--;
  if(favtrend0===1){
    let d = document.getElementById("favtrend0");
   let d_nested = document.getElementById("imgfav0");
    d.removeChild(d_nested);
    favtrend0=0;
    } 
    if(favtrend1===1){
      let d = document.getElementById("favtrend1");
     let d_nested = document.getElementById("imgfav1");
      d.removeChild(d_nested);
      favtrend1=0;
      }  
      if(favtrend2===1){
        let d = document.getElementById("favtrend2");
       let d_nested = document.getElementById("imgfav2");
        d.removeChild(d_nested);
        favtrend2=0;
        }
  atras();
});

function atras() {
  

  for (var i = 0; i < 3; i++) {
    if (counti < 0) {
      counti = 4;
    }
    if (counti + i >= arraygifs.length) {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti - arraygifs.length]);
      document.getElementById("user" + i).textContent =arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent =arrayTitle[i + counti - arraygifs.length];
      document.getElementById("downtrend" + i).src=arrayUrl[i + counti - arraygifs.length];
      document.getElementById("favtrend" + i).name=arrayId[i + counti - arraygifs.length];
    } else {
      document
        .getElementById("img" + i).setAttribute("src", arraygifs[counti + i]);
      document.getElementById("user" + i).textContent = arrayUser[counti + i];
      document.getElementById("tit" + i).textContent = arrayTitle[counti + i];
      document.getElementById("downtrend" + i).src= arrayUrl[counti + i];
      document.getElementById("favtrend" + i).name=arrayId[i + counti ];
      
    }
  }  
  for (let a = 0; a < 3; a++) {
    if(arrayLike.find(element => element == (document.getElementById("favtrend"+a).name))){
      if(a==0){
        favtrend0=1;
  }
  if(a==1){   
    favtrend1=1;
  }
  if(a==2){    
    favtrend2=1;
  }
    let imgfavs = document.createElement("img");
      imgfavs.src = "assets/icon-fav-active.svg";
      imgfavs.setAttribute("width", "18px");
      imgfavs.className = "imgfavs";
      imgfavs.id="imgfav"+a;
      document.getElementById("favtrend"+a).appendChild(imgfavs);
    }
  }
}

function adelante() {
  
  if (counti >= arraygifs.length) {
    counti = 0;
  }
  for (var i = 0; i < 3; i++) {
    if (counti + i >= arraygifs.length) {
      document
        .getElementById("img" + i)
        .setAttribute("src", arraygifs[i + counti - arraygifs.length]);
      document.getElementById("user" + i).textContent =arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent =arrayTitle[i + counti - arraygifs.length];
      document.getElementById("downtrend" + i).src=arrayUrl[i + counti - arraygifs.length];
      document.getElementById("favtrend" + i).name=arrayId[i + counti - arraygifs.length];
    } else {
      document
        .getElementById("img" + i)
        .setAttribute("src", arraygifs[i + counti]);
      document.getElementById("user" + i).textContent = arrayUser[counti + i];
      document.getElementById("tit" + i).textContent = arrayTitle[counti + i];
      document.getElementById("downtrend" + i).src= arrayUrl[counti + i];
      document.getElementById("favtrend" + i).name=arrayId[i + counti ];
    }
  }
  for (let a = 0; a < 3; a++) {
  if(arrayLike.find(element => element == (document.getElementById("favtrend"+a).name))){
    if(a==0){  
  favtrend0=1;
}
if(a==1){  
  favtrend1=1;
}
if(a==2){ 
  favtrend2=1;
}
  let imgfavs = document.createElement("img");
    imgfavs.src = "assets/icon-fav-active.svg";
    imgfavs.setAttribute("width", "18px");
    imgfavs.className = "imgfavs";
    imgfavs.id="imgfav"+a;
    document.getElementById("favtrend"+a).appendChild(imgfavs);
  }
}
}
///////////// listener de los iconos de los trending/////////////////////////

var downtrend=document.getElementById("downtrend0")
downtrend.addEventListener("click", function (e){
  e.preventDefault();
  downloadTrend(downtrend.id);
})
var downtrenduno=document.getElementById("downtrend1")
downtrenduno.addEventListener("click", function (e){
  e.preventDefault();
  downloadTrend(downtrenduno.id);
})
var downtrenddos=document.getElementById("downtrend2")
downtrenddos.addEventListener("click", function (e){
  e.preventDefault();
  downloadTrend(downtrenddos.id);
})

var amptrenddos=document.getElementById("amptrend2")
amptrenddos.addEventListener("click", function (e){
  e.preventDefault();  
  let urlmodal = document.getElementById("downtrend2").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user2").textContent;
    document.getElementById("usuario_modal").textContent=document.getElementById("tit2").textContent;
    let gustamod=document.getElementById("favtrend2").name;
    let downmodal=document.getElementById("downtrend2").src;    
    document.getElementById("gustamodal").name= gustamod;
    document.getElementById("downmodal").src=downmodal;
})
var amptrenduno=document.getElementById("amptrend1")
amptrenduno.addEventListener("click", function (e){
  e.preventDefault();  
  let urlmodal = document.getElementById("downtrend1").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user1").textContent;
    document.getElementById("usuario_modal").textContent=document.getElementById("tit1").textContent;
    let gustamod=document.getElementById("favtrend1").name;
    let downmodal=document.getElementById("downtrend1").src;    
    document.getElementById("gustamodal").name= gustamod;
    document.getElementById("downmodal").src=downmodal;
})
var amptrendcero=document.getElementById("amptrend0")
amptrendcero.addEventListener("click", function (e){
  e.preventDefault();  
  let urlmodal = document.getElementById("downtrend0").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user0").textContent;
  document.getElementById("usuario_modal").textContent=document.getElementById("tit0").textContent;
  let gustamod = document.getElementById("favtrend0").name;
  let downmodal = document.getElementById("downtrend0").src;    
  document.getElementById("gustamodal").name= gustamod;
  document.getElementById("downmodal").src=downmodal;
})
/////////////////////////favoritos detectcion/////////////////////

 favtrend=document.getElementById("favtrend0")
favtrend.addEventListener("click", function (e){
  e.preventDefault();
  favtrend0=1;
  console.log("detectamos el primer fav"  )
  let favoritrend = document.getElementById("favtrend0").name;
  arrayLike.push(favoritrend);
  let imgfav = document.createElement("img");
    imgfav.src = "assets/icon-fav-active.svg";
    imgfav.setAttribute("width", "18px");
    imgfav.className = "imgfavs";
    imgfav.id="imgfav0";
    document.getElementById("favtrend0").appendChild(imgfav);
    console.log(favoritrend);
    gustados.push(favoritrend);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
})

 favtrend1=document.getElementById("favtrend1")
favtrend1.addEventListener("click", function (e){
  e.preventDefault();
  favtrend1=1;
  console.log("detectamos el segundo fav"  )
  let favoritrend1 = document.getElementById("favtrend1").name;
  arrayLike.push(favoritrend1);
  let imgfav = document.createElement("img");
    imgfav.src = "assets/icon-fav-active.svg";
    imgfav.setAttribute("width", "18px");
    imgfav.className = "imgfavs";
    imgfav.id="imgfav1";
    document.getElementById("favtrend1").appendChild(imgfav);
    console.log(favoritrend1);
    gustados.push(favoritrend1);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
})

favtrend2=document.getElementById("favtrend2")
favtrend2.addEventListener("click", function (e){
  e.preventDefault();
  favtrend2=1;
  console.log("detectamos el tercer fav"  )
   favoritrend2 = document.getElementById("favtrend2").name;
  arrayLike.push(favoritrend2);
  let imgfav = document.createElement("img");
    imgfav.src = "assets/icon-fav-active.svg";
    imgfav.setAttribute("width", "18px");
    imgfav.className = "imgfavs";
    imgfav.id="imgfav2";
    document.getElementById("favtrend2").appendChild(imgfav);
    console.log(favoritrend2);
    gustados.push(favoritrend2);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
})

function downloadTrend(card){
  
  console.log("presionamos la "+card);
  
  fetch(document.getElementById(card).src)
  .then((response) => response.blob())
  .then(function (blobs) {    
      let identifier = card.substring(9,card.length);
      console.log(identifier);
      console.log(blobs);
      let objectURLtrend = URL.createObjectURL(blobs);
      console.log(objectURLtrend);
      let tagtrend = document.createElement("a");
     tagtrend.href = objectURLtrend;
     tagtrend.download = `${ document.getElementById("tit" + identifier).textContent}.gif`;
     document.body.appendChild(tagtrend);
      tagtrend.click();
      document.body.removeChild(tagtrend);    
  });
   }

/////////////////////////////////////////Para mobile

var touchimg0=document.getElementById("img0")
touchimg0.addEventListener("click", function (e){
  e.preventDefault();
  console.log("hice click en el modal 0")
  let urlmodal = document.getElementById("downtrend0").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user0").textContent;
  document.getElementById("usuario_modal").textContent=document.getElementById("tit0").textContent;
  let gustamod = document.getElementById("favtrend0").name;
  let downmodal = document.getElementById("downtrend0").src;    
  document.getElementById("gustamodal").name= gustamod;
  document.getElementById("downmodal").src=downmodal;
})

var touchimg1=document.getElementById("img1")
touchimg1.addEventListener("click", function (e){
  e.preventDefault();
  console.log("hice click en el modal 1")
  let urlmodal = document.getElementById("downtrend1").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user1").textContent;
    document.getElementById("usuario_modal").textContent=document.getElementById("tit1").textContent;
    let gustamod = document.getElementById("favtrend1").name;
  let downmodal = document.getElementById("downtrend1").src;    
  document.getElementById("gustamodal").name= gustamod;
  document.getElementById("downmodal").src=downmodal;
})
var touchimg2=document.getElementById("img2")
touchimg2.addEventListener("click", function (e){
  e.preventDefault();
  console.log("hice click en el modal 2")
  let urlmodal = document.getElementById("downtrend2").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
  document.getElementById("titulo_modal").textContent=document.getElementById("user2").textContent;
    document.getElementById("usuario_modal").textContent=document.getElementById("tit2").textContent;
    let gustamod = document.getElementById("favtrend2").name;
  let downmodal = document.getElementById("downtrend2").src;    
  document.getElementById("gustamodal").name= gustamod;
  document.getElementById("downmodal").src=downmodal;
})
