class Luchador {
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

    defensa() { }
}

var jugador1 = new Luchador("Agua-Cate", 200, 50, 30, 7);
var jugador2 = new Luchador("Al-Cachostias", 200, 45, 35, 5);
var jugador3 = new Luchador("Beren-Grescas", 200, 40, 28, 8);
var jugador4 = new Luchador("Bronco-Lee", 200, 55, 25, 9);
var jugador5 = new Luchador("Envidiosas", 200, 60, 27, 5);
var jugador6 = new Luchador("Melocotonazo", 200, 50, 30, 8);


function obtenerJugadorDadoNombre(nombre) {
    var jugador = "";

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

$(document).ready(function () {
    
    $('.jugador1').attr('data-nombre', jugador1.nombre);
    $('.jugador2').attr('data-nombre', jugador2.nombre);
    $('.jugador3').attr('data-nombre', jugador3.nombre);
    $('.jugador4').attr('data-nombre', jugador4.nombre);
    $('.jugador5').attr('data-nombre', jugador5.nombre);
    $('.jugador6').attr('data-nombre', jugador6.nombre);

    let equipoVerde = [];
    let equipoAmarillo = [];

    cantidadJugadores = 2;

    let countClick = 0;

    $(".jugador").click(function () {
        let nombreJugador = $(this).attr('data-nombre');
        
        var jugador = obtenerJugadorDadoNombre(nombreJugador);

        console.log(jugador);

        countClick++;

        if (countClick % 2 != 0) {
            $(this).addClass("border border-success elegido border-2px");
            equipoVerde.push(jugador);
        } else {
            $(this).addClass("border border-warning elegido border-2px");
            equipoAmarillo.push(jugador);
        }

        if (countClick == cantidadJugadores) {
            $(".jugador").each(function (index) {
                if (!$(this).is(".elegido")) {
                    $(this).hide();
                }
            });

            $('.contendedorBotonPelea').removeClass('visually-hidden-focusable');
        }

        let texto = "";

        if (equipoVerde.length == equipoAmarillo.length &&countClick == cantidadJugadores) {
            for (let i = 0; i < equipoVerde.length; i++) {
                texto +=
                    "El jugador " +
                    equipoVerde[i].nombre +
                    " va pelear con " +
                    equipoAmarillo[i].nombre;
            }

            alert(texto);
        }
    });


    $(".btn-emparejar").click(function () {

        for (let i = 0; i < equipoVerde.length; i++) {
            let turno = Math.floor(Math.random() * 2);
            let especial = Math.floor(Math.random() * 5);

            if (turno == 0) {
                if (especial == 3) {

                    $('.estadisticasPelea').append('<p>Jugador Verde realiza ataque especial</p>');

                    equipoVerde[i].ataqueEspecial(equipoAmarillo[i]);

                    if (equipoAmarillo[i].vida <= 0) {
                        alert("Ha ganado el jugador Verde");
                        $('.btn-emparejar').hide();
                    }

                } else {

                    $('.estadisticasPelea').append('<p>Jugador Verde realiza un ataque</p>');
                    equipoVerde[i].ataque(equipoAmarillo[i]);

                    if (equipoAmarillo[i].vida <= 0) {
                        alert("Ha ganado el jugador Verde");
                        $('.btn-emparejar').hide();
                    }

                }
                $('.estadisticaAmarilla').append('<p>Vida: ' + equipoAmarillo[i].vida + '</p>');
            } else {
                if (especial == 3) {

                    $('.estadisticasPelea').append('<p>Jugador Amarillo realiza ataque especial</p>');
                    equipoAmarillo[i].ataqueEspecial(equipoVerde[i]);

                    if (equipoVerde[i].vida <= 0) {
                        alert("Ha ganado el jugador Amarillo");
                        $('.btn-emparejar').hide();
                    }

                } else {

                    $('.estadisticasPelea').append('<p>Jugador Amarillo realiza un ataque</p>');
                    equipoAmarillo[i].ataque(equipoVerde[i]);

                    if (equipoVerde[i].vida <= 0) {
                        alert("Ha ganado el jugador Amarillo");
                        $('.btn-emparejar').hide();
                    }

                }

                $('.estadisticaVerde').append('<p>Vida: ' + equipoVerde[i].vida + '</p>');

            }

        }

    });
});
