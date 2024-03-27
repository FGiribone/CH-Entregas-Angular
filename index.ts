
console.log("hola mundo desde Typescript!, actualizado")
let edad = 20;              // number
let nombre = "Matias";      //string
nombre = "Fabricio"; 
nombre.toUpperCase();

let isDarkTheme = true;     //boolean
let algunacosa;             //any
algunacosa = 1
algunacosa = true;

let color = undefined;
let nulo = null;

function saludar(nombre: string): string {
    const saludo = `Hola ${nombre}`
    console.log(saludo);
    return saludo;
}
saludar("fabri");


let frutas = ["manzanas","naranja","Banana"]; // string []
let calificaciones = [10,7,8,6];
let numrosYLetras = ["Jose","Veronica",30,50,"R"]; // no explisito en su tipo
let numrosYLetras2:(string|number)[] =["Jose","Veronica",30,50,"R"]; // explisito

//let usuarios = [{nombre: "Naruto"},{nombre:"Sasuke"}]// array de nombres

interface Usuario{
    nombre: string;
    edad: number;
    role: Roles;
}

enum Roles{
    Administrador = 'adnim',
    // Usuario = 'Usuario',
    // Usuario = 'usuario',
    Usuario = 'user'
}


class Usuario{
    nombre: string;
    edad: number;
    role: Roles;

    constructor(nombre: string, edad: number, role: Roles){
        this.nombre = nombre;
        this.edad = edad;
        this.role = role;
    }
    iniciarSesion(){
        console.log('sesion iniciada, su edad es $"this.edad');
    }
    cerrarsesion(){}

    inscribirseACurso(){}
}

const spiderman = new Usuario("Peter Parker", 15, Roles.Administrador);
//const superman = new Usuario("clark","ken",35)



function validadIsAdmin(role: string){
    return role === Roles.Administrador;
}

const user = {
    role: "user",
}

validadIsAdmin(user.role);

let nombreEdad: [string, number] = ["Sakura", 13];
