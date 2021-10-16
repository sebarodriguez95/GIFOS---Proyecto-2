// *   MODO NOCTURNO  *  \º
const $switchThemeBtn = document.querySelector('#switchTheme');
const $logo = document.querySelector('#logo');
const $pelicula = document.querySelector('#pelicula');
const $cintaUno = document.querySelector('#element-cinta1');
const $cintaDos = document.querySelector('#element-cinta2');
//

const switchTheme = () => {
	document.body.classList.toggle('darkMode');

	// *   GUARDAR EN LOCALSTORAGE   *  \\
	if (document.body.classList.contains('darkMode')) {
		localStorage.setItem('dark-mode', true);
	} else {
		localStorage.setItem('dark-mode', false);
	}
	setLocalStorageTheme();
};

$switchThemeBtn.addEventListener('click', switchTheme);

// *   CAMBIO DE  IMAGENES, SEGUN MODO NOC O DIURNO  *   \\
const setLocalStorageTheme = () => {
	console.log("Me ejecute");
	if (localStorage.getItem('dark-mode') == 'true') {
		document.body.classList.add('darkMode');
		$switchThemeBtn.textContent = 'Modo Diurno';
	    $logo.src = 'assets/Logo-modo-noc.svg';
		$pelicula.src = 'assets/pelicula-modo-noc.svg';
		$cintaUno.src = 'assets/element_cinta1-modo-noc.svg';
		$cintaDos.src = 'assets/element_cinta2-modo-noc.svg';
	//$lupon.src="assets/icon-search-mod-noc.svg"
	//$crearGifBtn.src = 'assets/CTA-crar-gifo-modo-noc.svg';
	document.documentElement.style.setProperty('--nombreVariable', 'url("assets/CTA-crear-gifo-hover-modo-noc.svg")');
	document.documentElement.style.setProperty('--lupa', 'url("assets/icon-search-mod-noc.svg")');
	document.documentElement.style.setProperty('--colorPrimario', '#ffffff');
	document.documentElement.style.setProperty('--close', 'url("assets/close-modo-noct.svg")');
	document.documentElement.style.setProperty('--verMas', '#37383C');
	document.documentElement.style.setProperty('--verMasHover', '#ffffff');	
	document.documentElement.style.setProperty('--verMasFuenteHover', '#000000');
	document.documentElement.style.setProperty('--crearGifoHover', 'url("assets/CTA-crear-gifo-hover-modo-noc.svg")');
	
	} else {
		document.body.classList.remove('darkMode');
		$logo.src ='img/logo-mobile.svg';
		$pelicula.src = 'assets/pelicula.svg';
		$cintaUno.src = 'assets/element_cinta1.svg';
		$cintaDos.src = 'assets/element_cinta2.svg';
	
		$switchThemeBtn.textContent = 'Modo Nocturno';
		document.documentElement.style.setProperty('--nombreVariable', 'url("assets/button-crear-gifo.svg")');
		document.documentElement.style.setProperty('--lupa', 'url("assets/icon-search.svg")');
		document.documentElement.style.setProperty('--close', 'url("assets/close.svg")');
		document.documentElement.style.setProperty('--colorPrimario', '#572ee5');
		document.documentElement.style.setProperty('--verMasHover', '#572ee5');
		document.documentElement.style.setProperty('--colorPrimario', '#572ee5');
		document.documentElement.style.setProperty('--verMas', '#ffffff');
		document.documentElement.style.setProperty('--ColorVerMas', '#572ee5');
		document.documentElement.style.setProperty('--verMasFuenteHover', '#ffffff');
		document.documentElement.style.setProperty('--crearGifoHover', 'url("assets/CTA-crear-gifo-hover.svg")');
		
		
	}
	
};

setLocalStorageTheme();