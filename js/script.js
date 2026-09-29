/* =========================================================
   HOME — MOVIMIENTO GRÁFICO DEL TEST
========================================================= */

const seccionTest =
  document.querySelector(".home-test");

const universoTest =
  document.getElementById("testUniverso");


if (seccionTest && universoTest) {

  seccionTest.addEventListener(
    "mousemove",
    function(evento) {

      const rect =
        seccionTest.getBoundingClientRect();

      const centroX =
        rect.left + rect.width / 2;

      const centroY =
        rect.top + rect.height / 2;

      const movimientoX =
        (evento.clientX - centroX) / 20;

      const movimientoY =
        (evento.clientY - centroY) / 20;


      seccionTest.style.setProperty(
        "--mouse-x",
        movimientoX + "px"
      );

      seccionTest.style.setProperty(
        "--mouse-y",
        movimientoY + "px"
      );

    }
  );


  seccionTest.addEventListener(
    "mouseleave",
    function() {

      seccionTest.style.setProperty(
        "--mouse-x",
        "0px"
      );

      seccionTest.style.setProperty(
        "--mouse-y",
        "0px"
      );

    }
  );

}



/* =========================================================
   MEZCLADOR DE ZOOTOPIA
========================================================= */

const controlRitmo =
  document.getElementById("controlRitmo");

const controlClima =
  document.getElementById("controlClima");

const controlEntorno =
  document.getElementById("controlEntorno");


const valorRitmo =
  document.getElementById("valorRitmo");

const valorClima =
  document.getElementById("valorClima");

const valorEntorno =
  document.getElementById("valorEntorno");


const mezclaTitulo =
  document.getElementById("mezclaTitulo");

const mezclaTexto =
  document.getElementById("mezclaTexto");

const resultadoPlaneta =
  document.querySelector(".resultado-planeta");


const botonDescubrirDistrito =
  document.getElementById("descubrirDistrito");

const botonRecalcularDistrito =
  document.getElementById("recalcularDistrito");

const mezcladorResultado =
  document.getElementById("mezcladorResultado");

const mezcladorDescubrir =
  document.getElementById("mezcladorDescubrir");



/* =========================================================
   TEXTO DE LOS CONTROLES
========================================================= */

function obtenerNivel(
  valor,
  bajo,
  medio,
  alto
) {

  if (valor < 34) {
    return bajo;
  }

  if (valor < 67) {
    return medio;
  }

  return alto;

}



function actualizarTextosControles() {

  if (
    !controlRitmo ||
    !controlClima ||
    !controlEntorno
  ) {
    return;
  }


  const ritmo =
    Number(controlRitmo.value);

  const clima =
    Number(controlClima.value);

  const entorno =
    Number(controlEntorno.value);


  if (valorRitmo) {

    valorRitmo.textContent =
      obtenerNivel(
        ritmo,
        "TRANQUILO",
        "EQUILIBRADO",
        "INTENSO"
      );

  }


  if (valorClima) {

    valorClima.textContent =
      obtenerNivel(
        clima,
        "FRÍO",
        "TEMPLADO",
        "CÁLIDO"
      );

  }


  if (valorEntorno) {

    valorEntorno.textContent =
      obtenerNivel(
        entorno,
        "URBANO",
        "MIXTO",
        "NATURALEZA"
      );

  }

}



/* =========================================================
   CALCULAR DISTRITO
========================================================= */

function calcularDistrito() {

  if (
    !controlRitmo ||
    !controlClima ||
    !controlEntorno
  ) {
    return null;
  }


  const ritmo =
    Number(controlRitmo.value);

  const clima =
    Number(controlClima.value);

  const entorno =
    Number(controlEntorno.value);


  let sahara = 0;
  let tundra = 0;
  let rodentia = 0;
  let rainforest = 0;



  /* CLIMA */

  if (clima >= 67) {

    sahara += 6;

  }

  else if (clima <= 33) {

    tundra += 6;

  }

  else {

    rainforest += 2;
    rodentia += 1;
    sahara += 1;

  }



  /* RITMO */

  if (ritmo >= 67) {

    sahara += 3;
    rodentia += 3;

  }

  else if (ritmo <= 33) {

    tundra += 2;
    rainforest += 4;

  }

  else {

    sahara += 1;
    tundra += 1;
    rainforest += 2;
    rodentia += 1;

  }



  /* ENTORNO */

  if (entorno <= 33) {

    rodentia += 6;
    sahara += 2;

  }

  else if (entorno >= 67) {

    rainforest += 6;
    tundra += 1;

  }

  else {

    sahara += 1;
    tundra += 1;
    rainforest += 2;
    rodentia += 1;

  }



  /* BONUS */

  if (
    clima >= 67 &&
    ritmo >= 60
  ) {

    sahara += 4;

  }


  if (
    clima <= 33 &&
    ritmo <= 55
  ) {

    tundra += 4;

  }


  if (
    entorno <= 33 &&
    ritmo >= 55
  ) {

    rodentia += 4;

  }


  if (
    entorno >= 67 &&
    clima >= 34 &&
    clima <= 66
  ) {

    rainforest += 4;

  }



  const puntajes = {

    sahara: sahara,
    tundra: tundra,
    rodentia: rodentia,
    rainforest: rainforest

  };


  let distritoGanador =
    "rainforest";

  let puntajeMayor =
    -1;


  for (const distrito in puntajes) {

    if (
      puntajes[distrito] >
      puntajeMayor
    ) {

      puntajeMayor =
        puntajes[distrito];

      distritoGanador =
        distrito;

    }

  }


  return distritoGanador;

}



/* =========================================================
   ESCRIBIR RESULTADO
========================================================= */

function escribirResultadoDistrito() {

  const distritoGanador =
    calcularDistrito();


  if (
    !distritoGanador ||
    !mezclaTitulo ||
    !mezclaTexto
  ) {
    return;
  }



  if (
    distritoGanador === "sahara"
  ) {

    mezclaTitulo.textContent =
      "Tu lugar es Sahara Square.";

    mezclaTexto.textContent =
      "Te gustan la energía, el movimiento y los ambientes cálidos. Tu recorrido ideal tiene actividad, ritmo y una ciudad siempre despierta.";


    if (resultadoPlaneta) {

      resultadoPlaneta.style.background =
        "linear-gradient(135deg, #ee9b7b, #fff3b5)";

    }

  }



  else if (
    distritoGanador === "tundra"
  ) {

    mezclaTitulo.textContent =
      "Tu lugar es Tundratown.";

    mezclaTexto.textContent =
      "Preferís el frío, los contrastes y un ritmo más tranquilo. Te atraen los ambientes con una personalidad fuerte y diferente.";


    if (resultadoPlaneta) {

      resultadoPlaneta.style.background =
        "linear-gradient(135deg, #91c7cf, #ececf8)";

    }

  }



  else if (
    distritoGanador === "rodentia"
  ) {

    mezclaTitulo.textContent =
      "Tu lugar es Little Rodentia.";

    mezclaTexto.textContent =
      "Te gustan los espacios urbanos, los pequeños detalles y una ciudad llena de cosas por descubrir a cada paso.";


    if (resultadoPlaneta) {

      resultadoPlaneta.style.background =
        "linear-gradient(135deg, #f8ddd3, #fff3b5)";

    }

  }



  else {

    mezclaTitulo.textContent =
      "Tu lugar es Rainforest District.";

    mezclaTexto.textContent =
      "Preferís la naturaleza, el equilibrio y los ambientes más verdes. Tu recorrido ideal mezcla calma, altura y movimiento natural.";


    if (resultadoPlaneta) {

      resultadoPlaneta.style.background =
        "linear-gradient(135deg, #91c7cf, #a8add7)";

    }

  }



  /* MOVIMIENTO DEL PLANETA */

  if (resultadoPlaneta) {

    const ritmo =
      Number(controlRitmo.value);

    const entorno =
      Number(controlEntorno.value);


    const rotacion =
      -8 + (ritmo / 100) * 22;


    const escalaVisual =
      0.95 + (entorno / 100) * 0.08;


    resultadoPlaneta.style.transform =
      `rotate(${rotacion}deg) scale(${escalaVisual})`;

  }

}



/* =========================================================
   CAMBIAR CONTROLES
========================================================= */

function cambiarControles() {

  actualizarTextosControles();


  if (mezcladorResultado) {

    mezcladorResultado.style.display =
      "none";

  }


  if (mezcladorDescubrir) {

    mezcladorDescubrir.style.display =
      "block";

  }

}



/* =========================================================
   EVENTOS CONTROLES
========================================================= */

if (
  controlRitmo &&
  controlClima &&
  controlEntorno
) {

  controlRitmo.addEventListener(
    "input",
    cambiarControles
  );


  controlClima.addEventListener(
    "input",
    cambiarControles
  );


  controlEntorno.addEventListener(
    "input",
    cambiarControles
  );


  actualizarTextosControles();

}



/* =========================================================
   ESTADO INICIAL
========================================================= */

if (mezcladorResultado) {

  mezcladorResultado.style.display =
    "none";

}


if (mezcladorDescubrir) {

  mezcladorDescubrir.style.display =
    "block";

}



/* =========================================================
   DESCUBRIR DISTRITO
========================================================= */

if (botonDescubrirDistrito) {

  botonDescubrirDistrito.addEventListener(
    "click",
    function() {

      escribirResultadoDistrito();


      if (mezcladorDescubrir) {

        mezcladorDescubrir.style.display =
          "none";

      }


      if (mezcladorResultado) {

        mezcladorResultado.style.display =
          "block";


        setTimeout(
          function() {

            mezcladorResultado.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          },
          100
        );

      }

    }
  );

}



/* =========================================================
   PROBAR OTRA COMBINACIÓN
========================================================= */

if (botonRecalcularDistrito) {

  botonRecalcularDistrito.addEventListener(
    "click",
    function() {


      if (
        controlRitmo &&
        controlClima &&
        controlEntorno
      ) {

        controlRitmo.value = 50;
        controlClima.value = 50;
        controlEntorno.value = 50;

        actualizarTextosControles();

      }


      if (mezcladorResultado) {

        mezcladorResultado.style.display =
          "none";

      }


      if (mezcladorDescubrir) {

        mezcladorDescubrir.style.display =
          "block";


        setTimeout(
          function() {

            mezcladorDescubrir.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          },
          100
        );

      }

    }
  );

}



/* =========================================================
   DESTINO ALEATORIO
========================================================= */

const destinos = [

  {
    numero: "01",
    mini: "CONOCÉ SUS ORÍGENES",
    titulo: "Historia",
    texto:
      "Descubrí cómo comenzó todo y cómo nació la idea de una ciudad para todos.",
    link:
      "subpaginas/historia.html"
  },

  {
    numero: "02",
    mini: "CONOCÉ A SUS HABITANTES",
    titulo: "Personajes",
    texto:
      "Descubrí las distintas personalidades que hacen que Zootopia esté siempre en movimiento.",
    link:
      "personajes.html"
  },

  {
    numero: "03",
    mini: "RECORRÉ LA CIUDAD",
    titulo: "Distritos",
    texto:
      "Pasá del desierto a la nieve y descubrí cómo cambia cada rincón de la ciudad.",
    link:
      "subpaginas/distritos.html"
  },

  {
    numero: "04",
    mini: "ENTENDÉ CÓMO FUNCIONA",
    titulo: "Mundo Zootopia",
    texto:
      "Conocé cómo transporte, edificios y servicios se adaptan a habitantes completamente distintos.",
    link:
      "subpaginas/mundo.html"
  },

  {
    numero: "05",
    mini: "MIRÁ MÁS DE CERCA",
    titulo: "Curiosidades",
    texto:
      "Encontrá detalles, secretos y pequeñas cosas que quizás habían pasado desapercibidas.",
    link:
      "subpaginas/curiosidades.html"
  }

];


const botonDestino =
  document.getElementById("botonDestino");

const destinoNumero =
  document.getElementById("destinoNumero");

const destinoMini =
  document.getElementById("destinoMini");

const destinoTitulo =
  document.getElementById("destinoTitulo");

const destinoTexto =
  document.getElementById("destinoTexto");

const destinoLink =
  document.getElementById("destinoLink");


let destinoAnterior =
  0;



function elegirDestino() {

  let nuevoDestino;


  do {

    nuevoDestino =
      Math.floor(
        Math.random() *
        destinos.length
      );

  }

  while (
    nuevoDestino === destinoAnterior &&
    destinos.length > 1
  );


  destinoAnterior =
    nuevoDestino;


  const destino =
    destinos[nuevoDestino];


  if (destinoNumero) {

    destinoNumero.textContent =
      destino.numero;

  }


  if (destinoMini) {

    destinoMini.textContent =
      destino.mini;

  }


  if (destinoTitulo) {

    destinoTitulo.textContent =
      destino.titulo;

  }


  if (destinoTexto) {

    destinoTexto.textContent =
      destino.texto;

  }


  if (destinoLink) {

    destinoLink.href =
      destino.link;

  }


  const ticket =
    document.querySelector(
      ".destino-ticket"
    );


  if (ticket) {

    ticket.animate(

      [
        {
          transform:
            "translateY(4px)",

          opacity:
            0.65
        },

        {
          transform:
            "translateY(0)",

          opacity:
            1
        }
      ],

      {
        duration: 350,
        easing: "ease-out"
      }

    );

  }

}



if (botonDestino) {

  botonDestino.addEventListener(
    "click",
    elegirDestino
  );

}