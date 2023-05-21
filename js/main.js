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

function Calculos(monto, cuotas){
    let tasaMensual = 0.0272 * 1.22;
    let cuota = monto * tasaMensual * Math.pow(1 + tasaMensual, cuotas) / (Math.pow(1 + tasaMensual, cuotas) - 1);
    let interesTotal = cuota * cuotas - monto;
    let amortizacionPrestamo = monto/cuotas;
    alert("Monto del Prestamo: " + monto + " pesos\n" +
    "Amortización Constante: "  + amortizacionPrestamo.toFixed(2) + " pesos\n" +
    "Interés total a pagar: " + interesTotal.toFixed(2) + " pesos\n" +
    "Cuota mensual: " + cuota.toFixed(2) + " pesos\n");
}

function calcularPrestamo(){
    let repetir = true
    while(repetir){
        let Prestamo = MontoPrestamo();
        let Cuotas = CantidadCuotas();
        Calculos(Prestamo, Cuotas);
        let respuesta = (prompt("Desea probar con otro monto? (Si o No)")).toUpperCase();
        if(respuesta != "SI"){
            repetir = false;
        }
    }
}



calcularPrestamo();