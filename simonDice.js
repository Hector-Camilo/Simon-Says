

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')// estoy trayendo el boton Empezar
// de mi html a Javascript. 
const ULTIMO_NIVEL = 10
   
var nombreJugador = prompt('Ingrese el nombre del jugador');
document.getElementById('Jugador').innerHTML = nombreJugador; 

// defino la clase Juego, es decir  defino todas las propiedades que tendra los objetos
// instanciados de esta clase.  
               
class Juego {     
  constructor() { 
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()  
    this.generarSecuencia() 
    setTimeout(this.siguienteNivel,500)
  } 


  inicializar() {  
    // como elegirColor es una funcion que se dispara con el evento del click, el this originalmente
    // estaria referenciado al elemento html, pero con el metodo bind(), lo obligo a que mantenga 
    // el this en el contexto del objeto instanciado de la clase Juego
    this.siguienteNivel = this.siguienteNivel.bind(this) 
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar() 
    this.nivel = 1;
    this.colores = { 
      celeste,  
      violeta, 
      naranja,    
      verde
    }    
    
  }  

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }
    else{
      btnEmpezar.classList.add('hide')  
    }
  }

  generarSecuencia(){
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
  
  }
  
  siguienteNivel(){
    document.getElementById('nivel').innerHTML = this.nivel;
    this.subnivel = 0;
    this.iluminarSecuencia() 
    this.agregarEventosClick()
  }

     
  transformarNumeroAColor(numero){
    switch(numero){
    case 0:
      return 'celeste'
    case 1:
      return 'violeta'
    case 2:
      return 'naranja'
    case 3: 
      return 'verde'
  }
}


transformarColorANumero(color){
  switch(color){
  case 'celeste':
    return 0
  case 'violeta':
    return 1
  case 'naranja':
    return 2
  case 'verde':
    return 3
}
} 
 
    iluminarSecuencia(){
      for(let i = 0; i < this.nivel; i++){
        let color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(() => {this.iluminarColor(color)}, 1000 * i)
        
      }  
    }       

    iluminarColor(color){ 
      this.colores[color].classList.add('light')
      setTimeout( () => this.apagarColor(color),350)
     } 
   
  
     apagarColor(color){
      this.colores[color].classList.remove('light')  
     }      
    
    agregarEventosClick(){ 
      var self = this // estoy guardando el this que esta referenciado al objeto instanciado
      // en la variable Self, para poder mantener el contexto de este this, dentro de la funcion
      // que se va a ejecutar cuando suceda el evento del click, esto lo logro con el metodo bind
      // que me obliga a mantener el contexto del this con el objeto instanciado y no con el 
      // elemento html 
      this.colores.celeste.addEventListener('click',this.elegirColor)
      this.colores.violeta.addEventListener('click',this.elegirColor)
      this.colores.naranja.addEventListener('click',this.elegirColor)
      this.colores.verde.addEventListener('click',this.elegirColor) 
}
 
eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click',this.elegirColor)
      this.colores.violeta.removeEventListener('click',this.elegirColor)
      this.colores.naranja.removeEventListener('click',this.elegirColor)
      this.colores.verde.removeEventListener('click',this.elegirColor) 
}
 
 


elegirColor(ev){
  const nombreColor = ev.target.dataset.color 
  const numeroColor =  this.transformarColorANumero(nombreColor)  
  this.iluminarColor(nombreColor)  
   
  if(numeroColor === this.secuencia[this.subnivel]){
    this.subnivel++
  if(this.subnivel === this.nivel){
    this.nivel++
    this.eliminarEventosClick()
  if(this.nivel === (ULTIMO_NIVEL+1)){
    this.ganoElJuego() 
  }    
  else{
    setTimeout(this.siguienteNivel, 1500); 
  }

  }
  } else{
    this.perdioElJuego()
  }
   
} 


ganoElJuego(){
  swal('Simon Dice :','Felicitaciones Ganaste mi amor','success')
    .then(() =>this.inicializar())   
} 
 
  
perdioElJuego(){
  swal('Simon Dice : ','Intenta de Nuevo','error')
    .then(()=>{
      this.eliminarEventosClick()  
      this.inicializar()
      
    }) 
}
 


} 
 
function empezarJuego() { 
 window.juego = new Juego(); // estoy creando el objeto juego instanciado de la clase Juego
}     

 
 