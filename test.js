const preguntas = [

  {
    texto:
      "¿Qué hacés cuando aparece un problema difícil?",

    opciones: [

      {
        texto:
          "Lo enfrento de una",

        personaje:
          "judy"
      },

      {
        texto:
          "Busco una salida inteligente",

        personaje:
          "nick"
      },

      {
        texto:
          "Voy con calma",

        personaje:
          "flash"
      },

      {
        texto:
          "Organizo todo antes de actuar",

        personaje:
          "bogo"
      }

    ]
  },


  {
    texto:
      "¿Qué te representa más?",

    opciones: [

      {
        texto:
          "Optimismo",

        personaje:
          "judy"
      },

      {
        texto:
          "Astucia",

        personaje:
          "nick"
      },

      {
        texto:
          "Tranquilidad",

        personaje:
          "flash"
      },

      {
        texto:
          "Liderazgo",

        personaje:
          "bogo"
      }

    ]
  },


  {
    texto:
      "Elegí tu plan ideal",

    opciones: [

      {
        texto:
          "Explorar la ciudad",

        personaje:
          "judy"
      },

      {
        texto:
          "Improvisar y ver qué pasa",

        personaje:
          "nick"
      },

      {
        texto:
          "Un día sin apuro",

        personaje:
          "flash"
      },

      {
        texto:
          "Organizar una misión",

        personaje:
          "bogo"
      }

    ]
  }

];



const resultados = {

  judy: {

    emoji:
      "🐰",

    titulo:
      "¡Sos Judy!",

    texto:
      "Sos optimista, decidida y no te rendís fácil. Cuando tenés un objetivo, vas por él."

  },


  nick: {

    emoji:
      "🦊",

    titulo:
      "¡Sos Nick!",

    texto:
      "Sos ingenioso, observador y siempre encontrás una forma distinta de resolver las cosas."

  },


  flash: {

    emoji:
      "🦥",

    titulo:
      "¡Sos Flash!",

    texto:
      "Vas a tu ritmo, mantenés la calma y preferís disfrutar el camino sin apurarte demasiado."

  },


  bogo: {

    emoji:
      "🐃",

    titulo:
      "¡Sos Bogo!",

    texto:
      "Sos organizado, firme y tenés personalidad de líder. Te gusta tener todo bajo control."

  }

};



let preguntaActual = 0;


let puntajes = {

  judy: 0,

  nick: 0,

  flash: 0,

  bogo: 0

};



/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const numeroPregunta =
  document.getElementById(
    "preguntaActual"
  );


const barraActiva =
  document.getElementById(
    "barraTest"
  );


const preguntaTexto =
  document.getElementById(
    "preguntaTexto"
  );


const opcionesContenedor =
  document.getElementById(
    "opcionesTest"
  );


const bloquePregunta =
  document.getElementById(
    "testPregunta"
  );


const bloqueResultado =
  document.getElementById(
    "testResultado"
  );


const resultadoEmoji =
  document.getElementById(
    "resultadoEmoji"
  );


const resultadoTitulo =
  document.getElementById(
    "resultadoTitulo"
  );


const resultadoTexto =
  document.getElementById(
    "resultadoTexto"
  );


const reiniciarTest =
  document.getElementById(
    "reiniciarTest"
  );



/* =========================================================
   MOSTRAR PREGUNTA
========================================================= */

function mostrarPregunta() {

  if (
    !numeroPregunta ||
    !barraActiva ||
    !preguntaTexto ||
    !opcionesContenedor
  ) {
    return;
  }


  const pregunta =
    preguntas[preguntaActual];


  numeroPregunta.textContent =
    preguntaActual + 1;


  barraActiva.style.width =
    (
      (
        preguntaActual + 1
      ) /
      preguntas.length
    ) *
    100 +
    "%";


  preguntaTexto.textContent =
    pregunta.texto;


  opcionesContenedor.innerHTML =
    "";


  pregunta.opciones.forEach(
    function(opcion) {

      const boton =
        document.createElement(
          "button"
        );


      boton.classList.add(
        "test-opcion"
      );


      boton.type =
        "button";


      boton.textContent =
        opcion.texto;


      boton.addEventListener(
        "click",
        function() {

          puntajes[
            opcion.personaje
          ]++;


          preguntaActual++;


          if (
            preguntaActual <
            preguntas.length
          ) {

            mostrarPregunta();

          }

          else {

            mostrarResultado();

          }

        }
      );


      opcionesContenedor.appendChild(
        boton
      );

    }
  );

}



/* =========================================================
   MOSTRAR RESULTADO
========================================================= */

function mostrarResultado() {

  let personajeGanador =
    "judy";


  let puntajeMayor =
    -1;


  for (
    const personaje
    in puntajes
  ) {

    if (
      puntajes[personaje] >
      puntajeMayor
    ) {

      puntajeMayor =
        puntajes[personaje];


      personajeGanador =
        personaje;

    }

  }


  const resultado =
    resultados[
      personajeGanador
    ];


  if (bloquePregunta) {

    bloquePregunta.style.display =
      "none";

  }


  if (bloqueResultado) {

    bloqueResultado.classList.add(
      "activo"
    );

  }


  if (resultadoEmoji) {

    resultadoEmoji.textContent =
      resultado.emoji;

  }


  if (resultadoTitulo) {

    resultadoTitulo.textContent =
      resultado.titulo;

  }


  if (resultadoTexto) {

    resultadoTexto.textContent =
      resultado.texto;

  }

}



/* =========================================================
   REINICIAR TEST
========================================================= */

if (reiniciarTest) {

  reiniciarTest.addEventListener(
    "click",
    function() {

      preguntaActual =
        0;


      puntajes = {

        judy:
          0,

        nick:
          0,

        flash:
          0,

        bogo:
          0

      };


      if (bloqueResultado) {

        bloqueResultado.classList.remove(
          "activo"
        );

      }


      if (bloquePregunta) {

        bloquePregunta.style.display =
          "block";

      }


      mostrarPregunta();

    }
  );

}



/* =========================================================
   INICIO
========================================================= */

mostrarPregunta();