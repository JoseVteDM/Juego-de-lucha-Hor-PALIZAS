class Jugador {
    constructor(nombre, vida, fuerza, defensa, suerte) {
      this.nombre = nombre;
      this.vida = vida;
      this.fuerza = fuerza;
      this.defensa = defensa;
      this.suerte = suerte;
      this.handicap = suerte - Math.floor(Math.random() * 5);
    }
  
    ataque(enemigo) {
      enemigo.vida -=
        (this.fuerza - enemigo.defensa) * (this.suerte - this.handicap);
    }
  
    ataqueEspecial(enemigo) {
      enemigo.vida -= this.fuerza * 0.5 + this.fuerza - enemigo.defensa;
    }
  
    defensa() {}    
}
  
var jugador1 = new Jugador("Agua-Cate", 200, 50, 30, 7);
var jugador2 = new Jugador("Al-Cachostias", 200, 45, 35, 5);
var jugador3 = new Jugador("Beren-Grescas", 200, 40, 28, 8);
var jugador4 = new Jugador("Bronco-Lee", 200, 55, 25, 9);
var jugador5 = new Jugador("Envidiosas", 200, 60, 27, 5);
var jugador6 = new Jugador("Melocotonazo", 200, 50, 30, 8);
  
let todosJugadores = [];
  
  function asignarJugadoresLista(){
    todosJugadores[0] = jugador1;
    todosJugadores[1] = jugador2;
    todosJugadores[2] = jugador3;
    todosJugadores[3] = jugador4;
    todosJugadores[4] = jugador5;
    todosJugadores[5] = jugador6;
  }
  
  asignarJugadoresLista();
  
  function asignarNombreHTMLJugador(){
    document.getElementById('nombreJugador1').innerHTML = jugador1.nombre;
    document.getElementById('nombreJugador2').innerHTML = jugador2.nombre;
    document.getElementById('nombreJugador3').innerHTML = jugador3.nombre;
    document.getElementById('nombreJugador4').innerHTML = jugador4.nombre;
    document.getElementById('nombreJugador5').innerHTML = jugador5.nombre;
    document.getElementById('nombreJugador6').innerHTML = jugador6.nombre;
  }
  
  asignarNombreHTMLJugador();
  
  function obtener_jugador(nombre) {
    let jugador = "";

    if(nombre == "Agua-Cate"){
        jugador = jugador1;        
    }else if(nombre == "Al-Cachostias"){
        jugador = jugador2;        
    }else if(nombre == "Beren-Grescas"){
        jugador = jugador3;        
    }else if(nombre == "Bronco-Lee"){
        jugador = jugador4;        
    }else if(nombre == "Envidiosas"){
        jugador = jugador5;        
    }else if(nombre == "Melocotonazo"){
        jugador = jugador6;        
    } 
  
    return jugador;
  }
  
  let countClick = 0;
  
  let arrayTeamA = [];
  let arrayTeamB = [];
  
  let cantidadJugadores = 2;
  let texto = "";
  
  function clickJugador(nombreJ){
  
    let idJugador = nombreJ;
    let nombreJugador = document.getElementById(idJugador).innerHTML;
    var jugadorClick = obtener_jugador(nombreJugador);
    console.log(jugadorClick);
    countClick++;
  
    let identificador = nombreJ.replace("nombreJugador", "luchador");
  
    if (countClick % 2 != 0) {    
      document.getElementById(identificador).classList.add('border', 'border-primary', 'elegido');
      arrayTeamA.push(jugadorClick);  
      console.log(arrayTeamA);
    } else {
      document.getElementById(identificador).classList.add('border', 'border-danger', 'elegido');
      arrayTeamB.push(jugadorClick);
      console.log(arrayTeamB);
    }
  
    if (countClick == cantidadJugadores) {
  
      var listaJugadoresTags = document.getElementsByClassName('jugador');
      
      for (var i = 0; i < listaJugadoresTags.length; ++i) {
        var item = listaJugadoresTags[i].classList;  
        if(!item.contains('elegido')){
          listaJugadoresTags[i].classList.add('ocultar');
        }
      }
  
      if (arrayTeamA.length == arrayTeamB.length && countClick == cantidadJugadores) {
  
        for (let i = 0; i < arrayTeamA.length; i++) {
          texto +=
            "El jugador " +
            arrayTeamA[i].nombre +
            " va pelear con " +
            arrayTeamB[i].nombre;
        }
  
        var opcion = confirm(texto);
        if(opcion == true){
          document.getElementById('container-pelea').classList.remove('ocultar');
          document.getElementById('body').classList.add('body-pelea');
        }
      }
  
    }
    
  }
  
  function pelear(){
  
    for (let i = 0; i < arrayTeamA.length; i++) {
  
      let turno = Math.floor(Math.random() * 2);
      let especial = Math.floor(Math.random() * 5);
  
      if (turno == 0) {
        if (especial == 3) {
          
          document.getElementById('resumenPelea').innerHTML += '<p>Jugador Azul realiza ataque especial</p>';
  
          arrayTeamA[i].ataqueEspecial(arrayTeamB[i]);
  
          if(arrayTeamB[i].vida <= 0){
            alert("Ha ganado el jugador Azul");
            document.getElementById('container-pelea').classList.add('ocultar');          
          }
  
        } else {
  
          document.getElementById('resumenPelea').innerHTML += '<p>Jugador Azul realiza un ataque</p>';
          arrayTeamA[i].ataque(arrayTeamB[i]);
          
          if(arrayTeamB[i].vida <= 0){
            alert("Ha ganado el jugador Azul");
            document.getElementById('container-pelea').classList.add('ocultar');  
          }
  
        }
  
        document.getElementById('estadisticaB').innerHTML += '<p>Vida: ' + arrayTeamB[i].vida +'</p>';
  
      } else {
        if (especial == 3) {
  
          document.getElementById('resumenPelea').innerHTML += '<p>Jugador Rojo realiza ataque especial</p>';
          arrayTeamB[i].ataqueEspecial(arrayTeamA[i]);
          
          if(arrayTeamA[i].vida <= 0){
            alert("Ha ganado el jugador Rojo");
            document.getElementById('container-pelea').classList.add('ocultar');
          }
  
        } else {
          document.getElementById('resumenPelea').innerHTML += '<p>Jugador Rojo realiza un ataque</p>';
          arrayTeamB[i].ataque(arrayTeamA[i]);
          
          if(arrayTeamA[i].vida <= 0){
            alert("Ha ganado el jugador Rojo");
            document.getElementById('container-pelea').classList.add('ocultar');
          }
  
        }
        document.getElementById('estadisticaA').innerHTML += '<p>Vida: ' + arrayTeamA[i].vida +'</p>';
  
      }
  
    }
  }