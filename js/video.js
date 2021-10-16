var gifos = new Array();
///////////////////////VOy a cargar mi local storage////////////////////
var recordgif = JSON.parse(localStorage.getItem("misGifos"));
console.log("Que hay en mi record??" + recordgif);
gifos = recordgif;
if (gifos == null) {
 gifos = new Array();
  
}


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

// addEventListener version
/// variable globales
var image = document.getElementById("video");
var recorder;
var form = new FormData();
var grabacion=0;
var flag=0;


function stopRecordingCallback() {
  //document.querySelector("h1").innerHTML =
  //  "Grabacion de GIF detenido: " + bytesToSize(recorder.getBlob().size);
  document.getElementById("video").setAttribute("style", "display:none;")
  let previa = document.getElementById("gif");
  previa.src = URL.createObjectURL(recorder.getBlob());  
  document.getElementById("download").setAttribute("href",previa.src); 
  previa.setAttribute("style", "display:block;")
  recorder.stream.stop();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));
  recorder.destroy();
  recorder = null;
}

function subirGif(myGyf) {
  var urlupload =
    "https://upload.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";

  fetch(urlupload, {
    method: "POST", // here put the method
    body: myGyf, // data is a form file, this form is a blob video
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then(function (response) {
       console.log("Success:", response.data.id)
       gifos.push(response.data.id);
    localStorage.setItem("misGifos", JSON.stringify(gifos));
      //document.getElementById("download").setAttribute("href","https://media1.giphy.com/media/"+response.data.id+"/giphy.gif")
       texto=document.getElementById("texto")
       texto.textContent= "GIFO subido con éxito"
       loadersvg = document.getElementById("load");
       loadersvg.setAttribute("src","../assets/ok.svg");
       icon=document.getElementById("icon")
        icon.setAttribute("style","display:block;")
      }   
    
    );
}





//////////////////////////////////////////////////////////////////////////////////
////////////// AQUI COMENZAMOS LA SECUENCIA//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
  var miVideo;
document.getElementById("start").addEventListener("click",function getStreamAndRecord () { 
 
  grabacion++;
 
 if(grabacion==1){
  //var myobj = document.getElementById("message");  
  //var item = myobj.querySelector ('#titleVideo');
  // myobj.removeChild (item);
  //document.getElementById("video").setAttribute("style", "display:block;")
  document.getElementById("start").setAttribute("style", "display:none;")
  document.getElementById('titleVideo').textContent = '¿Nos das acceso a tu camara?';
  document.getElementById('parrafVideo').textContent = 'El acceso a tu camara sera valido solo en el tiempo en que estes creando tu GIFO';
  let uno =document.getElementById("uno")  
  uno.style.backgroundColor = "#572ee5";
  uno.style.color = "white";

    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 320 }
    }
 })
 .then(function(stream) {
  var myobj = document.getElementById("message");
  myobj.setAttribute("style", "display:none;")
   document.getElementById("video").setAttribute("style", "display:block;")   
    video.srcObject = stream;
    video.play();
    miVideo=video;
    document.getElementById('start').textContent = "Grabar"
    document.getElementById("start").setAttribute("style", "display:block;")
    let dos =document.getElementById("dos")  
  dos.style.backgroundColor = "#572ee5";
  dos.style.color = "white";
  uno.style.backgroundColor = "white";
  uno.style.color = "#572ee5";
 }) }
 if(grabacion==2){   
  recorder = RecordRTC(miVideo.srcObject, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 480,
    hidden: 240,   
   
  });

  recorder.startRecording();
  // release camera on stopRecording
  recorder.stream = miVideo.srcObject;
  console.log("estoy grabando")
  document.getElementById('start').textContent = "Finalizar"
  transcurrido();
  cintauno=document.getElementById("element-cinta1")
  //cintauno.classList.toggle("element-cinta1");
  cintauno.classList.toggle("element-cinta1-active");
  cintados=document.getElementById("element-cinta2")
  //cintados.classList.toggle("element-cinta2");
  cintados.classList.toggle("element-cinta2-active");
  luzcam=document.getElementById("element-luz-camara")
  //luzcam.classList.toggle("element-luz-camara");
  luzcam.classList.toggle("element-luz-camara-active")
 }
 if(grabacion==3){
  recorder.stopRecording(stopRecordingCallback);  
  document.getElementById('start').textContent = "Subir Gifo"
  document.getElementById("repetir").setAttribute("style", "display:block;")
  document.getElementById("reloj").setAttribute("style", "display:none;")
  cintauno=document.getElementById("element-cinta1")
  cintauno.classList.toggle("element-cinta1-active");
  //cintauno.classList.toggle("element-cinta1");
  cintados=document.getElementById("element-cinta2")
  cintados.classList.toggle("element-cinta2-active");
  //cintados.classList.toggle("element-cinta2");
  luzcam=document.getElementById("element-luz-camara")
  //luzcam.classList.toggle("element-luz-camara");
  luzcam.classList.toggle("element-luz-camara-active")
 }
 if (grabacion==4) {
  
  subirGif(form);
  console.log("estoy subiendo mi gyf");
  overlay=document.getElementById("overlay")
  overlay.setAttribute("style","opacity:1;")
  tres.style.backgroundColor = "#572ee5";
  tres.style.color = "white";
  dos.style.backgroundColor = "white";
  dos.style.color = "#572ee5"; 
  document.getElementById("start").setAttribute("style", "display:none;")
  document.getElementById("repetir").setAttribute("style", "display:none;")
 }

} )

document.getElementById("repetir").addEventListener("click",function repeatCapture(){
  grabacion=0;
  let previa = document.getElementById("gif");  
  previa.setAttribute("style", "display:none;")
  let textito = document.getElementById("repetir"); 
  textito.setAttribute("style", "display:none;") 
  document.getElementById('titleVideo').textContent = 'Aquí podrás crear tus propios GIFOS';
  //document.getElementById('gip').innerHTML="GIFOS"
  document.getElementById('parrafVideo').textContent = '¡Crea tu GIFO en sólo 3 pasos! (sólo necesitas una cámara para grabar un video)';
  document.getElementById('message').setAttribute("style","display:block")
  document.getElementById('start').textContent = "Comenzar"
  let dos =document.getElementById("dos")  
  dos.style.backgroundColor = "white";
  dos.style.color = "#572ee5";
  

});


function transcurrido() {
  document.getElementById("reloj").setAttribute("style", "display:block;")
	let segundos = 0;
	let minutos = 0;
	let timer = setInterval(() => {
		if (grabacion==2) {
			if (segundos < 60) {
				if (segundos <= 9) {
					segundos = '0' + segundos;
				}
				reloj.innerHTML=`00:00:0${minutos}:${segundos}`;
				segundos++;
				} else {
				minutos++;
				segundos = 0;
			}
		}
		else {
			clearInterval(timer)
		}
	}, 1000);
} 


var boton = document.getElementById('copy');

boton.addEventListener('click', function(event) {
  // seleccionar el texto de la dirección de email
  //var email = document.querySelector('.email');
  var link=document.getElementById('copy');
  var range = document.createRange();
  range.selectNode(link);
  window.getSelection().addRange(range);

  try {
    // intentar copiar el contenido seleccionado
    var resultado = document.execCommand('copy');
    console.log(resultado ? 'Email copiado' : 'No se pudo copiar el email');
    console.log(resultado);
  } catch(err) {
    console.log('ERROR al intentar copiar el email');
  }

  // eliminar el texto seleccionado
  window.getSelection().removeAllRanges();
  // cuando los navegadores lo soporten, habría
  // que utilizar: removeRange(range)
});