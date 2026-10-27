/* =========================================================
   TARJETAS DE CURIOSIDADES
========================================================= */

const tarjetasCuriosidad =
  document.querySelectorAll(".curiosidad-card");


tarjetasCuriosidad.forEach(function(tarjeta) {

  const boton =
    tarjeta.querySelector(".curiosidad-frente");

  const textoBoton =
    tarjeta.querySelector(".curiosidad-ver");


  boton.addEventListener("click", function() {

    const estaActiva =
      tarjeta.classList.contains("activa");


    tarjetasCuriosidad.forEach(function(otraTarjeta) {

      otraTarjeta.classList.remove("activa");

      const otroTexto =
        otraTarjeta.querySelector(".curiosidad-ver");

      otroTexto.textContent =
        "DESCUBRIR +";

    });


    if (!estaActiva) {

      tarjeta.classList.add("activa");

      textoBoton.textContent =
        "CERRAR −";

    }

  });

});



/* =========================================================
   VERDADERO O FALSO
========================================================= */

const botonesRespuesta =
  document.querySelectorAll(
    ".curiosidades-respuestas button"
  );


const feedback =
  document.getElementById(
    "curiosidadesFeedback"
  );


botonesRespuesta.forEach(function(boton) {

  boton.addEventListener("click", function() {

    const respuesta =
      boton.dataset.respuesta;


    botonesRespuesta.forEach(function(opcion) {

      opcion.classList.remove("seleccionada");

    });


    boton.classList.add("seleccionada");


    feedback.classList.remove(
      "correcto",
      "incorrecto"
    );


    if (respuesta === "falso") {

      feedback.textContent =
        "¡Correcto! Zootopia no busca que todos vivan igual: la ciudad se adapta a las distintas especies y tamaños.";

      feedback.classList.add(
        "correcto"
      );

    } else {

      feedback.textContent =
        "Casi. La idea es justamente lo contrario: Zootopia adapta sus espacios para habitantes muy diferentes.";

      feedback.classList.add(
        "incorrecto"
      );

    }

  });

});