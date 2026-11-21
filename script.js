
let minutos = 25;
let segundos = 0;
let intervalo = null;
let sesiones = 0;
let tipo = "trabajo";

function mostrarTiempo() {
    document.getElementById("tiempo").textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");
}

function iniciar() {
    if (intervalo !== null) return;

    intervalo = setInterval(function() {

        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalo);
                intervalo = null;
                finalizar();
                return;
            }

            minutos--;
            segundos = 59;

        } else {
            segundos--;
        }

        mostrarTiempo();

    }, 1000);
}

function pausar() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciar() {
    pausar();

    if (tipo === "trabajo") {
        minutos = Number(document.getElementById("trabajo").value);
    } else if (tipo === "descanso corto") {
        minutos = Number(document.getElementById("corto").value);
    } else {
        minutos = Number(document.getElementById("largo").value);
    }

    segundos = 0;
    mostrarTiempo();
}

function guardar() {
    pausar();

    if (
        document.getElementById("trabajo").value < 1 ||
        document.getElementById("corto").value < 1 ||
        document.getElementById("largo").value < 1
    ) {
        alert("Ingresa tiempos mayores a cero");
        return;
    }

    reiniciar();
    alert("Tiempos guardados correctamente");
}

function finalizar() {

    // Sonido de notificación
    let sonido = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );

    sonido.play().catch(function() {});

    if (tipo === "trabajo") {

        sesiones++;
        document.getElementById("sesiones").textContent = sesiones;

        if (sesiones % 4 === 0) {
            tipo = "descanso largo";
            minutos = Number(document.getElementById("largo").value);
        } else {
            tipo = "descanso corto";
            minutos = Number(document.getElementById("corto").value);
        }

    } else {
        tipo = "trabajo";
        minutos = Number(document.getElementById("trabajo").value);
    }

    segundos = 0;

    document.getElementById("tipo").textContent =
        tipo.charAt(0).toUpperCase() + tipo.slice(1);

    mostrarTiempo();
}

mostrarTiempo();
