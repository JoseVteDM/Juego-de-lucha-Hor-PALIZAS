// Clase u Objeto llamado Persona
class Persona{

    // Coinstructor de la clase persona
    constructor(nombre, dni, edad){
        this.nombre = nombre; // atributos
        this.dni = dni; // atributos
        this.edad = edad; // atributos
    }

}

// Instancias de la clase Persona
let persona = new Persona("Pepe", "12345678L", 25);
let persona2 = new Persona("Javi", "Y4904844Q", 30);

// Invocación de la función mayor Edad
mayorEdad(persona,persona2);

// función mayor Edad que compara la edad de dos personas pasadas por parámetro
function mayorEdad(persona, persona2){
    if(persona.edad > persona2.edad){
        alert("La primera persona es mayor");
    }else{
        alert("La segunda persona es mayor");
    }
}

