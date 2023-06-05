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
                 "\n Cantidad de cuotas a pagar: " + p.getCantCuotas() + 
                 "\n Amortizacion Constante: " + p.getAmortizacion() + " pesos" +
                 "\n Interes total a pagar: " + p.getInteres() + " pesos" +
                 "\n Cuotas a pagar: ");
    }
}

function inicio(){
    let repetir = true;
    let prestamosCliente = [];
    while(repetir){
        let accion = prompt("ingrese el numero que corresponda a la accion que quiera hacer \n 1.ingresar un prestamo \n 2.Ver los prestamos ingresados \n 3.Pagar una Cuota \n 4.salir")
        if(accion == 1){
            let Monto = MontoPrestamo();
            let Cuotas = CantidadCuotas();
            let prestamo = new Prestamo(Monto,Cuotas);
            Calculos(prestamo);
            prestamosCliente.push(prestamo);
        }
        else if(accion == 2){
            listarPrestamos(prestamosCliente);
        }
        else if(accion == 3){
            alert("WIP, wippy, wippy good");
        }
        else if(accion == 4){
            repetir = false;
        }
        else{
            alert("se ha ingresado una accion incorrecta, porfavor re-ingrese su seleccion.");
        }
    }
}


inicio();