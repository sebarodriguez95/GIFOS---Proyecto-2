var identifierfav = 0;
let cantGifs=0;
var corazones=0;
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
document.getElementById("cerrar_modalfav").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modalfav").style = "display:none";
});

/////////////////////////////
gustados = new Array();
let recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
let recordfav = recordfa.filter((valor, indice) => {///elimino valores repetidos
  return recordfa.indexOf(valor) === indice;
}
)
gustados = recordfav;
cantGifs=gustados.length;
if (gustados == null) {
  gustados = new Array();
}
function pintar(){
  if(recordfav!=0){
    let urlfav = `https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=${recordfav}`;

 fetch(urlfav)
  .then((response) => response.json())
  .then((json) => {
    json.data
      .map((data) => data.images.downsized_large.url)
      .forEach((urlorigin) => {       
        let div = document.createElement("div");
        div.id = identifierfav;
        div.className = "divi";
        div.style = "display:none"; ////////////ver mas............
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        let img = document.createElement("img");
        img.src = urlorigin;
        img.className="cards";
        img.id="amp"+identifierfav;
        img.setAttribute("width", "260px");
        img.setAttribute("height", "200px");
        div.appendChild(img);
        div.appendChild(overlay);
        document.getElementById("imagenes").appendChild(div);
        let title = document.createElement("div");
        title.className = "titulo";
        title.id = "titulo" + identifierfav;
        overlay.appendChild(title);
        let user = document.createElement("div");
        user.className = "user";
        user.id = "user" + identifierfav;
        overlay.appendChild(user);
        let iconos = document.createElement("div");
        iconos.className = "iconos";
        overlay.appendChild(iconos);
        let fav = document.createElement("a");
        fav.className = "fav";
        fav.id = "favoritos" + identifierfav;
        iconos.appendChild(fav);
        let adownload = document.createElement("a");
        adownload.className = "down";
        adownload.id = "download" + identifierfav;
        iconos.appendChild(adownload);
        let amp = document.createElement("a");
        amp.className = "amp";
        amp.id = "ampliar" + identifierfav;
        iconos.appendChild(amp);
        identifierfav++;
      });
    identifierfav = 0;
    json.data
      .map((data) => data.title)
      .forEach((title) => {
        document.getElementById("titulo" + identifierfav).textContent = title;
        identifierfav++;        
      });
    identifierfav = 0;
    json.data
      .map((user) => user.username)
      .forEach((username) => {
        document.getElementById("user" + identifierfav).textContent = username;
        identifierfav++;        
      });
    identifierfav = 0;
    json.data
      .map((data) => data.images.downsized_large.url)
      .forEach((urlorigin) => {
        document.getElementById("download" + identifierfav).src = urlorigin;
        //document.getElementById("download"+identifier).download="tuGifo.gif"
        document.getElementById("download" + identifierfav).target = "_blank";

        identifierfav++;
        //console.log(title);
      });
    identifierfav = 0;
    //////////////////// prueba ids gifs /////////////////////////////
    json.data
      .map((data) => data.id)
      .forEach((id) => {
        document.getElementById("favoritos" + identifierfav).name = id;
        identifierfav++;        
      });
    identifierfav = 0;
  
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
    
    
  
  })


  .catch((error) => (document.body.appendChild = error));
}
if (cantGifs === 0) {
  console.log("no hay nada que mostrar");
  let imgouch = document.createElement("img");
  imgouch.src = "assets/icon-fav-sin-contenido.svg";
  imgouch.setAttribute("width", "200px");
  imgouch.setAttribute("height", "200px");
  imgouch.style="display:block"
  let message = document.createElement("p");
  message.innerHTML = "¡Guarda tu primer GIFO en Favoritos"+"<br/>"+"para que se muestre aquí!";
  message.style = "color: #50E3C2 ; font-size: 22px";
  document.getElementById("imagenes").appendChild(imgouch);
  document.getElementById("imagenes").appendChild(message);
  document.getElementById("boton_ver_mas").style = "display:none";

}
}  


pintar();
////////////////////////7 boton ver mas//////////
let vermasfav=1;
document.getElementById("boton_ver_mas").addEventListener("click", function () {
  let pags = Math.trunc(cantGifs / 12);
  let bloque = 12;
  let limits = bloque + bloque * vermasfav;
  if (vermasfav < pags) {
    console.log(pags);
    for (let index = bloque * vermasfav; index < limits; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
      document.getElementById("boton_ver_mas").style = "display:block";
    }
    vermasfav++;
    console.log(vermasfav);
  } else {
    for (let index = bloque * vermasfav; index < cantGifs; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
    }
    vermasfav = 1;
    document.getElementById("boton_ver_mas").style = "display:none";
  }
});

//////////////////////detectamos eventos sobre cards/////////////////

document.querySelector(".imagenes").addEventListener("click", function (e) {  
  if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");
    console.log(e.target);
    document.getElementById("modalfav").style = "display:block";
    let identifi = e.target.id.substring(7, e.target.id.length);
    console.log(identifi);
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modalfav").textContent=titlemodal;
    document.getElementById("usuario_modalfav").textContent=usermodal;
    console.log(urlmodal);
    document.getElementById("imagen_ampliadafav").src = urlmodal;
    document.getElementById("imagen_ampliadafav").name = identifi;
  }
  if (e.target && e.target.matches("img.cards")) {       
    document.getElementById("modalfav").style = "display:block";
    let identifi = e.target.id.substring(3, e.target.id.length);   
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modalfav").textContent=titlemodal;
    document.getElementById("usuario_modalfav").textContent=usermodal;    
    document.getElementById("imagen_ampliadafav").src = urlmodal;
    document.getElementById("imagen_ampliadafav").name = identifi;
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
    console.log("Elimine este gif"+favoritear);
    let element = favoritear;
    let idx = gustados.indexOf(element);
    gustados.splice(idx,1);
    console.log(gustados);
    console.log("eliminamos este "+idx);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));

    ///////////////////////////////////////////////////////////////////

     recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
    console.log("Que hay en mi record??  " + recordfa);
     recordfav = recordfa.filter((valor, indice) => {///elimino valores repetidos
      return recordfa.indexOf(valor) === indice;
    }
    )
    gustados = recordfav;
     cantGifs=gustados.length;
    console.log("tenemos estos gustados "+gustados.length);
    if (gustados == null) {
      gustados = new Array();
    }
    ///////////////////////////////////////////////////////////////////

  // Eliminando todos los hijos de un elemento
  let elementrash  = document.getElementById("imagenes");
  let identifier = e.target.id.substring(9, e.target.id.length);
  elementrash.removeChild (document.getElementById(identifier))
  //while (elementrash.firstChild) {
  //  elementrash.removeChild(elementrash.firstChild);
  //}
  
   // pintar();
  }
  //document.getElementById("modal").style= "display:block";
});

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

///////////////////////////////////////////////////////
document.getElementById("gustamodalfav").addEventListener("click", function () {  
 
    let favoritear = document.getElementById("gustamodalfav").name;    
    console.log("Elimine este gif"+favoritear);
    let element = favoritear;
    let idx = gustados.indexOf(element);
    gustados.splice(idx,1);    
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));

    ///////////////////////////////////////////////////////////////////

     recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
    console.log("Que hay en mi record??  " + recordfa);
     recordfav = recordfa.filter((valor, indice) => {///elimino valores repetidos
      return recordfa.indexOf(valor) === indice;
    }
    )
    gustados = recordfav;
     cantGifs=gustados.length;    
    if (gustados == null) {
      gustados = new Array();
    }
    ///////////////////////////////////////////////////////////////////

  // Eliminando todos los hijos de un elemento
  let elementrash  = document.getElementById("imagenes");
  let identifier = document.getElementById("imagen_ampliadafav").name ;
  elementrash.removeChild (document.getElementById(identifier))
  document.getElementById("modalfav").style="display:none";
  
 

});

document.getElementById("gustamodal").addEventListener("click", function () {
  if (corazones==0) {    
  let favoritear = document.getElementById("gustamodal").name;
  let imgfav = document.createElement("img");
  imgfav.src = "assets/icon-fav-active.svg";
  imgfav.setAttribute("width", "18px");
  imgfav.style="margin: 8px 0 0 7px";
  imgfav.className = "imgfavs";
  document.getElementById("gustamodal").appendChild(imgfav);  
  gustados.push(favoritear);
  localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
  corazones=1;
}

});

//////////////////////////download del modal//////////////////////////////
document.getElementById("downmodal").addEventListener("click", function () {
  
  fetch(document.getElementById("imagen_ampliada").src)
    .then((response) => response.blob())
    .then(function (myBlob) {    
      downloadGifModal(myBlob);
    });
  });
  document.getElementById("downmodalfav").addEventListener("click", function () {
       //console.log(imagen_ampliada);
    fetch(document.getElementById("imagen_ampliadafav").src)
      .then((response) => response.blob())
      .then(function (myBlob) {    
        downloadGifModal(myBlob);
      });
    });
  
  function downloadGifModal(blob) {
    
    var objectURL = URL.createObjectURL(blob);    
    let tag = document.createElement("a");
    tag.href = objectURL;
    tag.download = `${
      document.getElementById("titulo_modal").textContent
    }.gif`;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }