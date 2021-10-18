
//let apiKey = "AL2THPNTNm41IMtrDgXnqF0eYrqFo0XM";
const $lupon = document.querySelector('#lupon');
var vermas = 1;
var cantGifs = 0;
let tags = document.querySelector('input[type="search"]');
let letterInput = null;
let indice = 0;
var contBusqueda = 0;
var gustados = new Array();
var corazones=0;
const trendingTagsEndpoint = 'https://api.giphy.com/v1/trending/searches';

let arrFavoriteGifs = [];
const addToFav = (gif, username, title) => {
	let objGif = {
		gif: gif,
		username: username,
		title: title,
	};

	arrFavoriteGifs.push(objGif);
	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));	
};

var record = JSON.parse(localStorage.getItem("favoritosLocal"));
gustados = record;
if (gustados == null) {
 gustados = new Array();
  
}




tags.addEventListener("input", () => {
  let url = `https://api.giphy.com/v1/tags/related/${letterInput}?api_key=${apiKey}&lang=es&limit=8`;
  letterInput = tags.value;
  if (letterInput == 0) {   
    document.getElementById("lupon").setAttribute("style","visibility: hidden");
    for (let flag = 0; flag < indice; flag++) {
      var d = document.getElementById("busqueda");
      var d_nested = document.getElementById("sug" + flag);
      d.removeChild(d_nested);
    }
    indice = 0;
    document
      .getElementById("inpu")
      .setAttribute("style", "border-bottom: none");
  }
  if (letterInput.length > 1) {
    console.log("fecheamos");
    document.getElementById("inpu").setAttribute("style", "border-bottom: solid 2px rgb(167, 167, 167)");
    document.getElementById("lupon").setAttribute("style","visibility: visible");
    
    
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        for (let index = 0; index < indice; index++) {
          var d = document.getElementById("busqueda");
          var d_nested = document.getElementById("sug" + index);
          d.removeChild(d_nested);
        }
        indice = 0;
        json.data.forEach((element) => {         
          let div = document.createElement("div");
          div.innerText = element.name;
          div.setAttribute("class", "sug");
          div.setAttribute("id", "sug" + indice);
          div.style=`background: var(--lupa) left/4% no-repeat`;
          document.getElementById("busqueda").appendChild(div);
          indice++;
        });
      })
      .catch((error) => (document.body.appendChild = error));
  }  
});



const input = document.querySelector('input[type="search"]');
var buscar = null;
var identifier = 0;
input.addEventListener("search", () => {
  document.getElementById("lupon").setAttribute("style","visibility: hidden");
  searchs();

});

function searchs() {  
  event.preventDefault();
  buscar = input.value;
  document.getElementById("inpu").setAttribute("style", "border-bottom: none");
  //////
  for (let fla = 0; fla < indice; fla++) {
    var d = document.getElementById("busqueda");
    var d_nested = document.getElementById("sug" + fla);
    d.removeChild(d_nested);
  }
  indice = 0;


  fetch( `https://api.giphy.com/v1/gifs/search?q=${buscar}&api_key=${apiKey}&limit=50` )
    .then((response) => response.json())
    .then((json) => {
      cantGifs = json.data.length;
      var e = document.getElementById("imagenes");
      var child = e.lastElementChild; /////////here remove last search
      while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
      }

      json.data
        .map((gif) => gif.images.fixed_height_downsampled.url)
        .forEach((url) => {
          //console.log(url)
          let div = document.createElement("div");
          div.id = identifier;
          div.className = "divi";
          div.style = "display:none"; ////////////ver mas............
          let overlay = document.createElement("div");
          overlay.className = "overlay";
          let img = document.createElement("img");
          img.src = url;
          img.id="amp"+identifier;         
          img.className="cards";
          div.appendChild(img);
          div.appendChild(overlay);
          document.getElementById("imagenes").appendChild(div);

          let title = document.createElement("div");
          title.className = "titulo";
          title.id = "titulo" + identifier;
          overlay.appendChild(title);
          let user = document.createElement("div");
          user.className = "user";
          user.id = "user" + identifier;
          overlay.appendChild(user);
          let iconos = document.createElement("div");
          iconos.className = "iconos";
          overlay.appendChild(iconos);
          let fav = document.createElement("a");
          fav.className = "fav";
          fav.id = "favoritos" + identifier;
          iconos.appendChild(fav);
          let adownload = document.createElement("a");
          adownload.className = "down";
          adownload.id = "download" + identifier;
          iconos.appendChild(adownload);
          let amp = document.createElement("a");
          amp.className = "amp";
          amp.id = "ampliar" + identifier;
          iconos.appendChild(amp);
          identifier++;
        });
      identifier = 0;      
      let titleSearch = document.getElementById("titleSearchs");
      titleSearch.style = "display.block";
      titleSearch.textContent = buscar;
      json.data
        .map((data) => data.title)
        .forEach((title) => {
          document.getElementById("titulo" + identifier).textContent = title;
          identifier++;          
        });
      identifier = 0;
      json.data
        .map((user) => user.username)
        .forEach((username) => {
          document.getElementById("user" + identifier).textContent = username;
          identifier++;          
        });
      identifier = 0;
      json.data
        .map((data) => data.images.downsized_large.url)
        .forEach((urlorigin) => {
          document.getElementById("download" + identifier).src = urlorigin;         
          document.getElementById("download" + identifier).target = "_blank";
          identifier++;         
        });
      identifier = 0;
      //////////////////// prueba ids gifs /////////////////////////////
      json.data.map((data) => data.id).forEach((id) => {
          document.getElementById("favoritos" + identifier).name = id;
          identifier++;         
        });
      identifier = 0;

      //////////////////////////////////////////////
      if (cantGifs <= 12) {
        for (let index = 0; index < cantGifs; index++) {
          const element = document.getElementById(index);
          element.style = "display:block";
          document.getElementById("boton_ver_mas").style = "display:block";
        }
      }

      if (cantGifs > 12) {
        for (let index = 0; index < 12; index++) {
          const element = document.getElementById(index);
          element.style = "display:block";
          document.getElementById("boton_ver_mas").style = "display:block";
        }
      }
      if (cantGifs == 0) {
        let imgouch = document.createElement("img");
        imgouch.src = "assets/icon-busqueda-sin-resultado.svg";
        imgouch.setAttribute("width", "260px");
        imgouch.setAttribute("height", "200px");
        let message = document.createElement("p");
        message.innerText = "Intenta con otra busqueda";
        message.style = "color: #50E3C2 ; font-size: 22px";
        document.getElementById("imagenes").appendChild(imgouch);
        document.getElementById("imagenes").appendChild(message);
        document.getElementById("boton_ver_mas").style = "display:none";
      }
    })
    .catch((error) => (document.body.appendChild = error));
}
//////////////////////////////////////////////
document.querySelector(".imagenes").addEventListener("click", function (e) {
   if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");
    console.log(e.target);
    document.getElementById("modal").style = "display:block";
    let identifi = e.target.id.substring(7, e.target.id.length);
    console.log("amplie la imagen numero "+identifi);
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("usuario_modal").textContent=usermodal;
    document.getElementById("titulo_modal").textContent=titlemodal;
    let gustamodal=document.getElementById("favoritos"+identifi).name;
    let downmodal=document.getElementById("download"+identifi).src;    
    document.getElementById("gustamodal").name= gustamodal;
    document.getElementById("downmodal").src=downmodal;

    console.log(urlmodal);
    document.getElementById("imagen_ampliada").src = urlmodal;
  }
  if (e.target && e.target.matches("img.cards")) {
    console.log("presionamos alguna imagen");
    console.log(e.target);
    document.getElementById("modal").style = "display:block";
    let identifi = e.target.id.substring(3, e.target.id.length);
    console.log("cliquee la imegen numero"+identifi);
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modal").textContent=titlemodal;
    document.getElementById("usuario_modal").textContent=usermodal;
    console.log(urlmodal);
    document.getElementById("imagen_ampliada").src = urlmodal;
    let gustamodal=document.getElementById("favoritos"+identifi).name;
    document.getElementById("gustamodal").name= gustamodal;
  }
  if (e.target && e.target.matches("a.down")) {
    console.log("presionamos algun download");
    console.log(e.target.id);
    fetch(document.getElementById(e.target.id).src)
      .then((response) => response.blob())
      .then(function (myBlob) {
        downloadGif(myBlob, e.target.id);
      });
  }
  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
    let favoritear = document.getElementById(e.target.id).name;
    //////////////////////////////en el futuro lo guardo como obj//////////////////////////////////////
    let identifierfav = e.target.id.substring(9, e.target.id.length);
    console.log(identifierfav);
     let gif = document.getElementById("download" + identifierfav).src;
    let title = document.getElementById("titulo" + identifierfav).textContent;
    let user = document.getElementById("user" + identifierfav).textContent;
    addToFav(gif,title,user);
    /////////////////////////////////////////////////////////////////////
    let imgfav = document.createElement("img");
    imgfav.src = "assets/icon-fav-active.svg";
    imgfav.setAttribute("width", "18px");
    imgfav.className = "imgfavs";
    document.getElementById(e.target.id).appendChild(imgfav);
    console.log(favoritear);
    gustados.push(favoritear);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
  }
  //document.getElementById("modal").style= "display:block";
});

///////////////////////////FUNCION QUE DESCARGA GIF/////////////////////////////////

function downloadGif(blob, target) {
  let identifier = target.substring(8, target.length);
  console.log(identifier);
  var objectURL = URL.createObjectURL(blob);
  console.log(objectURL);
  let tag = document.createElement("a");
  tag.href = objectURL;
  tag.download = `${
    document.getElementById("titulo" + identifier).textContent
  }.gif`;
  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
}

document.getElementById("boton_ver_mas").addEventListener("click", function () {
  console.log(cantGifs);
  let pags = Math.trunc(cantGifs / 12);
  let bloque = 12;
  let limits = bloque + bloque * vermas;
  if (vermas < pags) {
    console.log(pags);
    for (let index = bloque * vermas; index < limits; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
      document.getElementById("boton_ver_mas").style = "display:block";
    }
    vermas++;
    console.log(vermas);
  } else {
    for (let index = bloque * vermas; index < cantGifs; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
    }
    vermas = 1;
    document.getElementById("boton_ver_mas").style = "display:none";
  }
});
/////////////////////////buscamos las sugerencias////////////
document.querySelector(".form").addEventListener("click", function (e) {
  let sugess = 0;  
  if (e.target && e.target.matches("div.sug")) {
    console.log("presionamos alguna sugerencia");
    console.log(e.target.id);
    sugges = document.getElementById(e.target.id).innerText;
    console.log(sugges);
    document.querySelector('input[type="search"]').value = sugges;
    document.getElementById("lupon").setAttribute("style","visibility: hidden");///que onda
    searchs();
  }
});

/////////////////cerrar modal////////////////
document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  
  console.log("hubo un click cerrar modal");
  let ele = document.getElementById("gustamodal");
while (ele.firstChild) {
  ele.removeChild(ele.firstChild);
}  
  corazones=0;
  document.getElementById("modal").style = "display:none";
  
});

////////////////busqueda por lupon//////////////
document.getElementById("lupon").addEventListener("click", function() {
  
  console.log("hubo un click en lupon");
  document.getElementById("lupon").setAttribute("style","visibility: hidden");
  searchs();
  
});

///////////////////////Etiquetas de tendecias/////////////////////////////

//  ***   ETIQUETAS DE TENDENCIAS  ***  \\

const getTrendingTags = async () => {
	await fetch(`${trendingTagsEndpoint}?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((trendingTags) => {			
		mostrarTags(trendingTags);
		})
		.catch((err) => console.log(err));
};

getTrendingTags();

function mostrarTags(trendingTags){      
  for (let index = 0; index < 5; index++) {
    let wordp=document.createElement("span");
    wordp.style="cursor:pointer";
    wordp.id=index+"word";
    if(index<4){
     wordp.textContent= trendingTags.data[index]+", ";
     }
     else{
      wordp.textContent= trendingTags.data[index] 
     }
    //console.log( wordp.textContent);
    document.getElementById("parrafTrending").appendChild(wordp);
    
  }

}

document.getElementById("parrafTrending").addEventListener("click", function(e) {
  
  let suggesWord = document.getElementById(e.target.id).innerText;   
    let cadenaCorregida = suggesWord.substring(0, suggesWord.length - 2);
    document.querySelector('input[type="search"]').value = cadenaCorregida;
    document.getElementById("lupon").setAttribute("style","visibility: hidden");///que onda
    searchs();
  
});


//////////////////////////gustamodal////////////////////////


document.getElementById("gustamodal").addEventListener("click", function () {
  if(corazones==0){
  let favoritear = document.getElementById("gustamodal").name;
  let imgfav = document.createElement("img");
  imgfav.src = "assets/icon-fav-active.svg";
  imgfav.setAttribute("width", "18px");
  imgfav.style="margin: 8px 0 0 7px";
  imgfav.className = "imgfavs";
  document.getElementById("gustamodal").appendChild(imgfav);
  console.log(favoritear+"no me imprime");
  gustados.push(favoritear);
  localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
  corazones=1;
}
});
//////////////////////////download del modal//////////////////////////////
document.getElementById("downmodal").addEventListener("click", function () {
console.log("presionamos  download del modal");
//console.log(imagen_ampliada);
fetch(document.getElementById("imagen_ampliada").src)
  .then((response) => response.blob())
  .then(function (myBlob) {    
    downloadGifModal(myBlob);
  });
});

function downloadGifModal(blob) {
  
  var objectURL = URL.createObjectURL(blob);
  console.log(objectURL);
  let tag = document.createElement("a");
  tag.href = objectURL;
  tag.download = `${
    document.getElementById("titulo_modal").textContent
  }.gif`;
  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
}

let test = document.getElementById("inpu");
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.background = "none";
});
