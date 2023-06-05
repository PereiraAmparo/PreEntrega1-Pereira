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

function MontoPrestamo(){
    let montoPrestamo = parseInt(prompt("Ingrese el monto a solicitar (por favor ingrese un valor entre 10.000 y 100.000)"));
    while(montoPrestamo > 100000 || montoPrestamo < 10000 || isNaN(montoPrestamo)){
        if(montoPrestamo > 100000){
            montoPrestamo = parseInt(prompt("El monto ingresado es superior a 10000 pesos, porfavor ingrese un monto entre 10000 y 100000 pesos."));
        } else if(montoPrestamo < 10000) {
            montoPrestamo = parseInt(prompt("El monto ingresado es inferior a 100000 pesos, porfavor ingrese un monto entre 10000 y 100000 pesos."));
        } else if(isNaN(montoPrestamo)){
            montoPrestamo = parseInt(prompt("Se ha ingresado un monto incorrecto, asegurese de ingresar un número entero entre 10000 y 100000 pesos."));
        }
    }
    return montoPrestamo;
}

function CantidadCuotas(){
    let cantidadCuotas = prompt("Porfavor ingrese la cantidad de cuotas que desee (puede elegir entre 6, 12 o 24 pagos)");
    while(cantidadCuotas != 6 && cantidadCuotas != 12 && cantidadCuotas != 24){
        cantidadCuotas = prompt("Se ha ingresado una cantidad de cuotas invalida, porfavor especifique si quiere 6, 12 o 24 cuotas.");
    }
    return cantidadCuotas;
}

function Calculos(prestamo){
    let monto = prestamo.getMonto();
    let cantCuotas = prestamo.getCantCuotas();
    let tasaMensual = 0.0272 * 1.22;
    let cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, cantCuotas) / (Math.pow(1 + tasaMensual, cantCuotas) - 1)).toFixed(2);
    let interesTotal = (cuota * cantCuotas - monto).toFixed(2);
    let amortizacionPrestamo = (monto/cantCuotas).toFixed(2);
    prestamo.setAmortizacion(amortizacionPrestamo);
    prestamo.setInteres(interesTotal);
    alert("Monto del Prestamo: " + prestamo.getMonto() + " pesos\n" +
    "Amortización Constante: "  + amortizacionPrestamo + " pesos\n" +
    "Interés total a pagar: " + interesTotal + " pesos\n" +
    "Cuota mensual: " + cuota + " pesos\n");
}

function listarPrestamos(lista){
    for (let i = 0; i< lista.length; i++) {
        let p = lista[i];
        alert("prestamo numero " + (i+1) + ": " +
                 "\n Monto total: " + p.getMonto() + " pesos" + 
                 "\n Cantidad de cuotas: " + p.getCantCuotas() + 
                 "\n Amortizacion Constante: " + p.getAmortizacion() + " pesos" +
                 "\n Interes total a pagar: " + p.getInteres() + " pesos" +
                 "\n Cuotas restantes: " + ((p.getCuotasApagar())-(p.getCuotasPagadas())));
    }
}

function pagarCuotas(prestamosCliente){
    let prestamo = (prompt("Porfavor ingrese el numero del prestamo del cual desea pagar cuotas"))-1;
    if(prestamosCliente.includes(prestamosCliente[prestamo])){
        let cuotasPagas =parseInt(prompt("Porfavor ingrese cuantas cuotas ha pagado"));
        while(cuotasPagas < 0 || isNaN(cuotasPagas)){
            cuotasPagas = parseInt(prompt("Se ha ingresado un numero de cuotas incorrecto, por favor ingrese un numero valido."));
        }
        let cuotasPagar = (prestamosCliente[prestamo].getCuotasApagar()) - (prestamosCliente[prestamo].getCuotasPagadas());
        if((cuotasPagar - cuotasPagas) > 0){
            prestamosCliente[prestamo].setCuotasPagadas(cuotasPagas);
        }else{
           prestamosCliente.splice(prestamo, 1);
        }
    }else{
        alert("se ha ingresado un numero de prestamo incorrecto, porfavor vuelva a intentar con un numero valido");
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
    let cuotas = prompt("Ingrese la cantidad de cuotas de los prestamos que deaea buscar, sean de 6, 12 o 24 cuotas");
    while(cuotas != 6 && cuotas != 12 && cuotas != 24){
        cuotas = prompt("Se ha ingresado una cantidad de cuotas invalida, porfavor especifique si quiere buscar prestamos de 6, 12 o 24 cuotas.");
    }
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].getCantCuotas() == cuotas){
            ret.push(lista[i]);
        }
    }
    listarPrestamos(ret);
}   

function inicio(){
    let repetir = true;
    let prestamosCliente = [];
    while(repetir){
        let accion = prompt("Ingrese el numero que corresponda a la accion desea realizar \n 1.Ingresar un prestamo \n 2.Listar prestamos ingresados \n 3.Pagar cuotas \n 4.Buscar Prestamos \n 5.Salir")
        if(accion == 1){
            let Monto = MontoPrestamo();
            let Cuotas = CantidadCuotas();
            let prestamo = new Prestamo(Monto,Cuotas);
            Calculos(prestamo);
            prestamosCliente.push(prestamo);
        }
        else if(accion == 2){
            if(prestamosCliente.length == 0){
                alert("aun no se ha ingresado un prestamo al sistema.");
            }else{
                listarPrestamos(prestamosCliente);
            }
        }
        else if(accion == 3){
            pagarCuotas(prestamosCliente);
        }
        else if(accion == 4){
            if(prestamosCliente.length == 0){
                alert("aun no se ha ingresado un prestamo al sistema.");
            }else{
                let opcion = parseInt(prompt("Ingrese que desea buscar: \n 1.Listar prestamo mas grande  \n 2.Listar prestamo mas chico  \n 3.Listar prestamos por cantidad de cuotas"));
                while(opcion > 4 || opcion < 0){
                    opcion = parseInt(prompt("Se ha ingresado una opcion incorrecta porfavor eliga una opcion valida. \n 1.Listar prestamo mas grande  \n 2.Listar prestamo mas chico  \n 3.Listar prestamos por cantidad de cuotas"));
                }
                if(opcion == 1){
                    listarMayor(prestamosCliente);
                }
                else if(opcion == 2){
                    listarMenor(prestamosCliente);
                }
                else if(opcion == 3){
                    listarCuotas(prestamosCliente);
                }
            }
        }
        else if(accion == 5){
            repetir = false;
        }
        else{
            alert("se ha ingresado una accion incorrecta, porfavor re-ingrese su seleccion.");
        }
    }
}


inicio();