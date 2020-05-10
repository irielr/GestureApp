
var app = {
    inicio: function(){
		this.iniciarBotones();
		this.iniciarFastClick();
		this.iniciarHammer();
	},
	
	iniciarBotones: function(){
        var botonClaro = document.querySelector('#claro'); // se asocia al id del button en el html
		var botonOscuro = document.querySelector('#oscuro');
		
		botonClaro.addEventListener('click', this.ponerClaro, false);
		botonOscuro.addEventListener('click', this.ponerOscuro, false);
    },
	
	iniciarFastClick: function(){
		FastClick.attach(document.body);
	},
	
	/* Con esta función mostraremos en el texto #info con el tipo de acción detectada en 'zona'
	iniciarHammer: function(){
        var squarearea = document.getElementById('zona'); 
		var hammertime = new Hammer(squarearea);
		var mensajeGesto = document.querySelector('#info');
		
		// por defecto Hammer no trae activada las funciones pinch y rotate, por eso hay que habilitarlas manualmente
		hammertime.get('pinch').set({ enable: true });
		hammertime.get('rotate').set({ enable: true });
		
		hammertime.on('tap doubletap pan press pinch swipe rotate', function(ev){mensajeGesto.innerHTML = ev.type + '!';});
    },
	*/
	
	// Con esta función haremos una animación según la acción detectada en 'zona'
	iniciarHammer: function(){
        var squarearea = document.getElementById('zona'); 
		var hammertime = new Hammer(squarearea);
		var mensajeGesto = document.querySelector('#info');
		
		// estos eventos vienen inhabilitados por defecto
		hammertime.get('pinch').set({ enable: false });
		hammertime.get('rotate').set({ enable: true });
		
		squarearea.addEventListener('webkitAnimationEnd', function(ev){squarearea.className = '';});
	
		hammertime.on('doubletap', function(ev){ squarearea.className = 'doubletap'; mensajeGesto.innerHTML = 'doubletap';});
		hammertime.on('press', function(ev){ squarearea.className = 'press'; mensajeGesto.innerHTML = 'press';});
		
		hammertime.on('swipe', function(ev){ //});
			var direccion = ev.direction;
			
			if (direccion==4) {
				squarearea.className='swipederecha';
				mensajeGesto.innerHTML = 'swipe derecha';
			}
			if (direccion==2) {
				squarearea.className='swipeizquierda';
				mensajeGesto.innerHTML = 'swipe izquierda';
			}
		});
		
		hammertime.on('rotate', function(ev){
			var umbral = 25;
			if (ev.distance > umbral) {
				squarearea.className = 'rotar';
				mensajeGesto.innerHTML = 'rotate';
			}
		});
		
		hammertime.on('tap pinch', function(ev){mensajeGesto.innerHTML = ev.type;});
		
		//////////////////////////////////////////
		
	},
	
	ponerClaro: function(){
		document.body.className = 'claro'; // className refiere al class del estilo body.claro
	},
	
	ponerOscuro: function(){
		document.body.className = 'oscuro';
	},
};

if ('addEventListener' in document) {
	//document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
	document.addEventListener('DOMContentLoaded', function() { app.inicio(); }, false );
}