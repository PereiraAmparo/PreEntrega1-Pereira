function calcularPrestamo(){
    let repetir = true
    while(repetir){
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
        let cantidadCuotas = prompt("Porfavor ingrese la cantidad de cuotas que desee (puede elegir entre 6, 12 o 24 pagos)");
        while(cantidadCuotas != 6 && cantidadCuotas != 12 && cantidadCuotas != 24){
            cantidadCuotas = prompt("Se ha ingresado una cantidad de cuotas invalida, porfavor especifique si quiere 6, 12 o 24 cuotas.");
        }
        let tasaMensual = 0.0272 * 1.22;
        let cuota = montoPrestamo * tasaMensual * Math.pow(1 + tasaMensual, cantidadCuotas) / (Math.pow(1 + tasaMensual, cantidadCuotas) - 1);
        let interesTotal = cuota * cantidadCuotas - montoPrestamo;
        let amortizacionPrestamo = montoPrestamo/cantidadCuotas;
        alert("Monto del Prestamo: " + montoPrestamo + " pesos\n" +
        "Amortización Constante: "  + amortizacionPrestamo.toFixed(2) + " pesos\n" +
        "Interés total a pagar: " + interesTotal.toFixed(2) + " pesos\n" +
        "Cuota mensual: " + cuota.toFixed(2) + " pesos\n");

        let respuesta = (prompt("Desea probar con otro monto? (Si o No)")).toUpperCase();
        if(respuesta != "SI"){
            repetir = false;
        }
    }
}

calcularPrestamo();