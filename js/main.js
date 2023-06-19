class Prestamo{
    constructor(monto,cantCuotas){
        this.monto = monto;
        this.interesApagar = 0;
        this.cantCuotas = cantCuotas;
        this.amortizacion = 0;
        this.cuotasApagar = cantCuotas;
        this.cuotasPagadas = 0;
    }

    getMonto(){
        return this.monto;
    }

    setInteres(interes){
        this.interesApagar = interes; 
    }

    getInteres(){
        return this.interesApagar;
    }

    setAmortizacion(amortizacion){
        this.amortizacion = amortizacion;
    }

    getAmortizacion(){
        return this.amortizacion;
    }

    getCantCuotas(){
        return this.cantCuotas;
    }

    getCuotasApagar(){ 
        return this.cuotasApagar;
    }

    setCuotasPagadas(pagadas){
        this.cuotasPagadas = pagadas;
    }

    getCuotasPagadas(){
        return this.cuotasPagadas;
    }
}

class Usuario{
    constructor(nombre,apellido,ci,tel,mail){
        this.nombre = nombre;
        this.apellido = apellido;
        this.ci = ci;
        this.tel = tel;
        this.mail = mail;
    }
}



function calculos(prestamo){
    let monto = prestamo.getMonto();
    let cantCuotas = prestamo.getCantCuotas();
    let tasaMensual = 0.0272 * 1.22;
    let cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, cantCuotas) / (Math.pow(1 + tasaMensual, cantCuotas) - 1)).toFixed(2);
    let interesTotal = (cuota * cantCuotas - monto).toFixed(2);
    let amortizacionPrestamo = (monto/cantCuotas).toFixed(2);
    prestamo.setAmortizacion(amortizacionPrestamo);
    prestamo.setInteres(interesTotal);
}

function listarPrestamos(){
    if(prestamosUsuario.length != 0){
        let ul = document.getElementById("listaPrestamo");
        ul.innerHTML = "";
        for (let i = 0; i< prestamosUsuario.length; i++) {
            document.getElementById("parrafoPrestamo").innerHTML = " ";
            let p = prestamosUsuario[i];
            let node = document.createElement("li");
            let text = document.createTextNode("Préstamo numero " + (i+1) + ": " +
                                                "\n Monto total: " + p.getMonto() + " pesos" + 
                                                "\n Cantidad de cuotas: " + p.getCantCuotas() + 
                                                "\n Amortización Constante: " + p.getAmortizacion() + " pesos" +
                                                "\n Interés total a pagar: " + p.getInteres() + " pesos" +
                                                "\n Cuotas restantes: " + ((p.getCuotasApagar())-(p.getCuotasPagadas())));
            
            node.appendChild(text);
            ul.appendChild(node);
        }
    }else{
        document.getElementById("parrafoPrestamo").innerHTML = "No se ha ingresado un prestamo aún";
    }
}


/*
function pagarCuotas(prestamosCliente){
    if(prestamosCliente.length <= 0){
        alert("Aún no se ha ingresado un préstamo al sistema.");
    }else{
        let prestamo = (prompt("Porfavor ingrese el numero del préstamo del cual desea pagar cuotas"))-1;
        if(prestamosCliente.includes(prestamosCliente[prestamo])){
            let cuotasPagas =parseInt(prompt("Por favor ingrese cuantas cuotas ha pagado"));
            while(cuotasPagas < 0 || isNaN(cuotasPagas)){
                cuotasPagas = parseInt(prompt("Se ha ingresado un número de cuotas incorrecto, por favor ingrese un numero valido."));
            }
            let cuotasPagar = (prestamosCliente[prestamo].getCuotasApagar()) - (prestamosCliente[prestamo].getCuotasPagadas());
            if((cuotasPagar - cuotasPagas) > 0){
                prestamosCliente[prestamo].setCuotasPagadas(cuotasPagas);
            }else{
            prestamosCliente.splice(prestamo, 1);
            }
        }else{
            alert("Se ha ingresado un numero de prestamo incorrecto, por favor vuelva a intentar con un numero valido");
        }
    }
}


function listarMayor(lista){
    let ret = [];
    let montoMax = 0;
    for(let i = 0; i < lista.length; i++) {
        if(lista[i].getMonto() > montoMax){
            montoMax = lista[i].getMonto();
            ret = [];
            ret.push(lista[i]);
        }
        else if(lista[i].getMonto() == montoMax){
            ret.push(lista[i]);
        }
    }
    listarPrestamos(ret);
}

function listarMenor(lista){
    let ret = [];
    let montoMin = 100100;
    for(let i = 0; i < lista.length; i++) {
        if(lista[i].getMonto() < montoMin){
            montoMin = lista[i].getMonto();
            ret = [];
            ret.push(lista[i]);
        }
        else if(lista[i].getMonto() == montoMin){
            ret.push(lista[i]);
        }
    }
    listarPrestamos(ret);
}

function listarCuotas(lista){
    let ret = [];
    let cuotas = prompt("Ingrese la cantidad de cuotas de los préstamos que desea buscar, sean de 6, 12 o 24 cuotas");
    while(cuotas != 6 && cuotas != 12 && cuotas != 24){
        cuotas = prompt("Se ha ingresado una cantidad de cuotas invalida, por favor especifique si quiere buscar prestamos de 6, 12 o 24 cuotas.");
    }
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].getCantCuotas() == cuotas){
            ret.push(lista[i]);
        }
    }
    listarPrestamos(ret);

    function menuBusqueda(lista) {
    if(lista.length == 0){
        alert("Aún no se ha ingresado un préstamo al sistema.");
    }else{
        let opcion = parseInt(prompt("Ingrese que desea buscar: \n 1.Listar préstamo/s más grande/s  \n 2.Listar préstamo/s más chicos/s  \n 3.Buscar préstamos por cantidad de cuotas"));
        while(opcion > 4 || opcion < 0){
            opcion = parseInt(prompt("Se ha ingresado una opción incorrecta, por favor elija una opción valida. \n 1.Listar préstamo/s más grande/s  \n 2.Listar préstamo/s más chico/s  \n 3.Listar préstamos por cantidad de cuotas"));
        }
        if(opcion == 1){
            listarMayor(lista);
        }
        else if(opcion == 2){
            listarMenor(lista);
        }
        else if(opcion == 3){
            listarCuotas(lista);
        }
    }
}
}*/

function ingresoPrestamo(event) {
    event.preventDefault();
    let Monto = parseInt(document.getElementById("inputMonto").value);
    let Cuotas = document.getElementById("selectCuotas").value;
    let prestamo = new Prestamo(Monto,Cuotas);
    calculos(prestamo);
    prestamosUsuario.push(prestamo);
    document.getElementById("confirmPrestamo").innerHTML = "Se ha ingresado el prestamo número " + (prestamosUsuario.indexOf(prestamo) + 1) + " exitosamente";
}


const prestamosUsuario = [];
const Usuarios = [];
let parrafos = document.getElementsByClassName("parrafo");

console.log(parrafos);

parrafos[0].innerHTML = "Ahora puedes hacerte socio desde la WEB!";
document.getElementById("btnUsuario").addEventListener("click", ingresoUsuario);
document.getElementById("menuSocio").addEventListener("click", showUsuario);
document.getElementById("menuPrestamo").addEventListener("click", showPrestamo);
document.getElementById("menuMostrar").addEventListener("click", showListaPrestamo); 
document.getElementById("formPrestamo").addEventListener("submit", ingresoPrestamo);
document.getElementById("btnListarPrestamos").addEventListener("click",listarPrestamos); 



function showPrestamo(event) {
    event.preventDefault();
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "block";
    ingresoUsuario.style.display = "none";
    listaPrestamos.style.display = "none";
}
function showUsuario(event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "none";
    ingresoUsuario.style.display = "block";
    listaPrestamos.style.display = "none";
}
function showListaPrestamo(event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "none";
    ingresoUsuario.style.display = "none";
    listaPrestamos.style.display = "block";
}

function ingresoUsuario(event) {
    event.preventDefault();
    let email = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let cedula = document.getElementById("cedula");
    let cedulaError = document.getElementById("cedulaError");
    if (email.value == "" || cedula.value == ""){
        emailError.className = "text-danger";
        emailError.innerHTML = "Debe ingresar direccion de mail";
        cedulaError.className = "text-danger";
        cedulaError.innerHTML = "Debe ingresar numero de cedula de identidad";
    } else {
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let tel = document.getElementById("telefono");
        new Usuario(nombre.value, apellido.value, tel.value, email.value, cedula.value);
    }
}

//el pega las fotos aca de la url, no los almacena como yo!!!!
/*
 const productos = [
    {id:1, nombre:"Garantia de Alquiler", img:"./multimedia/imgagenes/garantiaAlquiler"},
    {id:2, nombre:"Prestamos quinceañera", img:"./multimedia/imagenes/quinceanera"},
    {id:3, nombre: "Prestamos para Estudiantes", img:"./multimedia/imagenes/prestamoEstudiante"},
    {id:4, nombre:"Prestamos se agrando la familia", img:"./multimedia/imagenes/camaBebe"},
 ]

 for (let producto of productos){
    let div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `<img src=${producto.imagen} class= "img-fluid">
    <h3>${producto.nombre}</h3>`;

      //yo aca pondria un boton que dijera "quiero mas informacion" abajo de la foto.
   // <button>${producto.}????
   document.getElementById("productos").appendChild(div);
}
*/