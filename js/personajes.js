/* =========================================================
   PERSONAJES
========================================================= */

const personajes = [

  {
    numero: "01",
    nombre: "Judy Hopps",
    tipo: "CONEJA · OFICIAL DE POLICÍA",
    frase: "“Si algo parece imposible, es porque todavía no lo intentaste.”",
    descripcion:
      "Decidida, optimista y valiente. Judy llega a la gran ciudad con un objetivo claro: demostrar que cualquiera puede alcanzar lo que se propone.",
    etiquetas: ["VALIENTE", "OPTIMISTA", "DETERMINADA"],
    imagen: "imagenes/judy-zootopia .png"
  },

  {
    numero: "02",
    nombre: "Nick Wilde",
    tipo: "ZORRO · ASTUTO Y CARISMÁTICO",
    frase: "“A veces, mirar las cosas de otra manera cambia todo.”",
    descripcion:
      "Ingenioso, rápido y con mucho humor. Nick suele encontrar soluciones inesperadas y sabe adaptarse a casi cualquier situación.",
    etiquetas: ["ASTUTO", "DIVERTIDO", "CREATIVO"],
    imagen: "imagenes/nick-zootopia .png"
  },

  {
    numero: "03",
    nombre: "Flash",
    tipo: "PEREZOSO · EMPLEADO DEL REGISTRO",
    frase: "“No todo tiene que hacerse a las apuradas.”",
    descripcion:
      "Tranquilo, paciente y siempre a su propio ritmo. Flash demuestra que no todos viven la ciudad de la misma manera.",
    etiquetas: ["TRANQUILO", "PACIENTE", "AMABLE"],
    imagen: "imagenes/flash-zootopia .png"
  },

  {
    numero: "04",
    nombre: "Chief Bogo",
    tipo: "BÚFALO · JEFE DE POLICÍA",
    frase: "“Un gran equipo necesita responsabilidad.”",
    descripcion:
      "Serio, exigente y comprometido. Bogo tiene una personalidad fuerte, pero siempre busca mantener el orden y cuidar a su equipo.",
    etiquetas: ["FIRME", "RESPONSABLE", "PROTECTOR"],
    imagen: "imagenes/chief-zootopia.png"
  },

  {
    numero: "05",
    nombre: "Bellwether",
    tipo: "OVEJA · ASISTENTE",
    frase: "“Las apariencias pueden engañar.”",
    descripcion:
      "Reservada y observadora. Su historia demuestra que no siempre conocemos realmente a alguien por lo que vemos a simple vista.",
    etiquetas: ["OBSERVADORA", "RESERVADA", "ESTRATÉGICA"],
    imagen: "imagenes/bellwether.jpg"
  },

  {
    numero: "06",
    nombre: "Finnick",
    tipo: "FÉNEC · PEQUEÑO PERO TEMIBLE",
    frase: "“No siempre las apariencias cuentan toda la historia.”",
    descripcion:
      "Pequeño, serio y con muchísimo carácter. Finnick puede parecer adorable a primera vista, pero tiene una personalidad fuerte y sabe perfectamente cómo sorprender a los demás.",
    etiquetas: ["ASTUTO", "DIRECTO", "INESPERADO"],
    imagen: "imagenes/finnick-zootopia.png"
  },

  {
    numero: "07",
    nombre: "Clawhauser",
    tipo: "GUEPARDO · RECEPCIONISTA DE LA POLICÍA",
    frase: "“Un poco de entusiasmo puede alegrar cualquier día.”",
    descripcion:
      "Amable, expresivo y siempre de buen humor. Clawhauser recibe a todos con entusiasmo y demuestra que también hay lugar para la diversión dentro de la comisaría.",
    etiquetas: ["ALEGRE", "AMABLE", "ENTUSIASTA"],
    imagen: "imagenes/clawhauser-zootopia.png"
  }

];


/* =========================================================
   ELEMENTOS DEL CARRUSEL
========================================================= */

const imagen = document.getElementById("personajeImagen");
const numero = document.getElementById("personajeNumero");
const tipo = document.getElementById("personajeTipo");
const nombre = document.getElementById("personajeNombre");
const frase = document.getElementById("personajeFrase");
const descripcion = document.getElementById("personajeDescripcion");
const etiquetas = document.getElementById("personajeEtiquetas");

const botonAnterior =
  document.getElementById("personajeAnterior");

const botonSiguiente =
  document.getElementById("personajeSiguiente");

const puntos =
  document.querySelectorAll(".punto-personaje");

const tarjeta =
  document.querySelector(".personaje-principal");


/* =========================================================
   PERSONAJE ACTUAL
========================================================= */

let personajeActual = 0;


/* =========================================================
   MOSTRAR PERSONAJE
========================================================= */

function mostrarPersonaje(indice) {

  const personaje = personajes[indice];

  tarjeta.classList.add("cambiando");

  setTimeout(function () {

    imagen.src = personaje.imagen;
    imagen.alt = personaje.nombre;

    numero.textContent = personaje.numero;
    tipo.textContent = personaje.tipo;
    nombre.textContent = personaje.nombre;
    frase.textContent = personaje.frase;
    descripcion.textContent = personaje.descripcion;


    /* LIMPIAR ETIQUETAS */

    etiquetas.innerHTML = "";


    /* CREAR ETIQUETAS */

    personaje.etiquetas.forEach(
      function (etiqueta) {

        const span =
          document.createElement("span");

        span.textContent =
          etiqueta;

        etiquetas.appendChild(span);

      }
    );


    /* SACAR ACTIVO */

    puntos.forEach(
      function (punto) {

        punto.classList.remove("activo");

      }
    );


    /* ACTIVAR PUNTO */

    if (puntos[indice]) {

      puntos[indice].classList.add(
        "activo"
      );

    }


    tarjeta.classList.remove(
      "cambiando"
    );

  }, 220);

}


/* =========================================================
   SIGUIENTE
========================================================= */

function siguientePersonaje() {

  personajeActual++;

  if (
    personajeActual >=
    personajes.length
  ) {

    personajeActual = 0;

  }

  mostrarPersonaje(
    personajeActual
  );

}


/* =========================================================
   ANTERIOR
========================================================= */

function anteriorPersonaje() {

  personajeActual--;

  if (personajeActual < 0) {

    personajeActual =
      personajes.length - 1;

  }

  mostrarPersonaje(
    personajeActual
  );

}


/* =========================================================
   EVENTOS FLECHAS
========================================================= */

if (botonSiguiente) {

  botonSiguiente.addEventListener(
    "click",
    siguientePersonaje
  );

}


if (botonAnterior) {

  botonAnterior.addEventListener(
    "click",
    anteriorPersonaje
  );

}


/* =========================================================
   EVENTOS PUNTOS
========================================================= */

puntos.forEach(
  function (punto, indice) {

    punto.addEventListener(
      "click",
      function () {

        personajeActual =
          indice;

        mostrarPersonaje(
          personajeActual
        );

      }
    );

  }
);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key ===
      "ArrowRight"
    ) {

      siguientePersonaje();

    }

    if (
      event.key ===
      "ArrowLeft"
    ) {

      anteriorPersonaje();

    }

  }
);


/* =========================================================
   INICIO CARRUSEL
========================================================= */

mostrarPersonaje(
  personajeActual
);



/* =========================================================
   ARMÁ TU EQUIPO
========================================================= */

const botonesEquipo =
  document.querySelectorAll(
    ".equipo-personaje"
  );

const slotsEquipo =
  document.querySelectorAll(
    ".equipo-slot"
  );

const contadorEquipo =
  document.getElementById(
    "equipoContador"
  );

const botonMision =
  document.getElementById(
    "iniciarMision"
  );

const resultadoMision =
  document.getElementById(
    "resultadoMision"
  );

const tituloMision =
  document.getElementById(
    "misionTitulo"
  );

const textoMision =
  document.getElementById(
    "misionTexto"
  );


/* =========================================================
   EQUIPO SELECCIONADO
========================================================= */

let equipoSeleccionado = [];


/* =========================================================
   ACTUALIZAR EQUIPO
========================================================= */

function actualizarEquipo() {


  /* CONTADOR */

  if (contadorEquipo) {

    contadorEquipo.textContent =
      equipoSeleccionado.length +
      " / 3";

  }


  /* MARCAR PERSONAJES */

  botonesEquipo.forEach(
    function (boton) {

      const personaje =
        boton.dataset.personaje;

      const seleccionado =
        equipoSeleccionado.some(
          function (item) {

            return (
              item.nombre ===
              personaje
            );

          }
        );


      if (seleccionado) {

        boton.classList.add(
          "seleccionado"
        );

      }

      else {

        boton.classList.remove(
          "seleccionado"
        );

      }

    }
  );


  /* LIMPIAR SLOTS */

  slotsEquipo.forEach(
    function (slot, indice) {

      slot.classList.remove(
        "ocupado"
      );

      slot.innerHTML =
        "<span>0" +
        (indice + 1) +
        "</span>";

    }
  );


  /* COLOCAR PERSONAJES ELEGIDOS */

  equipoSeleccionado.forEach(
    function (personaje, indice) {

      const slot =
        slotsEquipo[indice];

      if (!slot) {
        return;
      }


      slot.classList.add(
        "ocupado"
      );

      slot.innerHTML = "";


      /* FOTO */

      const foto =
        document.createElement(
          "img"
        );

      foto.src =
        personaje.imagen;

      foto.alt =
        personaje.nombre;

      slot.appendChild(
        foto
      );


      /* INFORMACIÓN */

      const info =
        document.createElement(
          "div"
        );

      info.classList.add(
        "equipo-slot-info"
      );


      /* NOMBRE */

      const nombrePersonaje =
        document.createElement(
          "strong"
        );

      nombrePersonaje.textContent =
        personaje.nombre;


      info.appendChild(
        nombrePersonaje
      );

      slot.appendChild(
        info
      );

    }
  );


  /* ACTIVAR BOTÓN DE MISIÓN */

  if (botonMision) {

    botonMision.disabled =
      equipoSeleccionado.length !== 3;

  }


  /* OCULTAR RESULTADO SI CAMBIA EL EQUIPO */

  if (resultadoMision) {

    resultadoMision.classList.remove(
      "visible"
    );

  }

}


/* =========================================================
   SELECCIONAR / DESELECCIONAR PERSONAJE
========================================================= */

botonesEquipo.forEach(
  function (boton) {

    boton.addEventListener(
      "click",
      function () {

        const nombrePersonaje =
          boton.dataset.personaje;

        const imagenPersonaje =
          boton.dataset.imagen;


        const indiceExistente =
          equipoSeleccionado.findIndex(
            function (item) {

              return (
                item.nombre ===
                nombrePersonaje
              );

            }
          );


        /* SI YA ESTÁ ELEGIDO,
           LO SACAMOS */

        if (
          indiceExistente !== -1
        ) {

          equipoSeleccionado.splice(
            indiceExistente,
            1
          );

          actualizarEquipo();

          return;

        }


        /* SI YA HAY 3,
           NO AGREGAMOS MÁS */

        if (
          equipoSeleccionado.length >= 3
        ) {

          return;

        }


        /* AGREGAR PERSONAJE */

        equipoSeleccionado.push({

          nombre:
            nombrePersonaje,

          imagen:
            imagenPersonaje

        });


        actualizarEquipo();

      }
    );

  }
);


/* =========================================================
   MISIONES
========================================================= */

const misiones = [

  {
    titulo:
      "El misterio del tren perdido",

    texto:
      "Un tren salió de Savanna Central, pero nunca llegó a destino. Hay que seguir las pistas, recorrer la ciudad y descubrir qué ocurrió."
  },

  {
    titulo:
      "Operación Tundratown",

    texto:
      "Algo extraño está pasando en el distrito helado. El equipo deberá investigar sin perderse entre la nieve y encontrar una solución."
  },

  {
    titulo:
      "Un habitante desaparecido",

    texto:
      "Un pequeño ciudadano se separó de su familia durante la hora pico. La misión es encontrarlo y llevarlo sano y salvo de regreso."
  },

  {
    titulo:
      "Emergencia en Sahara Square",

    texto:
      "Un problema inesperado interrumpió el movimiento del distrito. El equipo tendrá que trabajar rápido para volver a poner todo en marcha."
  },

  {
    titulo:
      "El objeto misterioso",

    texto:
      "Un objeto desconocido apareció en medio de la ciudad. Nadie sabe de dónde vino ni a quién pertenece. Es hora de investigar."
  },

  {
    titulo:
      "Misión: cruzar Zootopia",

    texto:
      "Hay que llevar un mensaje urgente de un extremo de la ciudad al otro. El desafío será encontrar el camino más rápido entre todos los distritos."
  }

];


/* =========================================================
   INICIAR MISIÓN
========================================================= */

if (botonMision) {

  botonMision.addEventListener(
    "click",
    function () {


      if (
        equipoSeleccionado.length !== 3
      ) {

        return;

      }


      /* ELEGIR UNA MISIÓN */

      const indiceAleatorio =
        Math.floor(
          Math.random() *
          misiones.length
        );

      const mision =
        misiones[
          indiceAleatorio
        ];


      /* NOMBRES DEL EQUIPO */

      const nombresEquipo =
        equipoSeleccionado
          .map(
            function (personaje) {

              return personaje.nombre;

            }
          )
          .join(", ");


      /* MOSTRAR RESULTADO */

      tituloMision.textContent =
        mision.titulo;

      textoMision.textContent =
        nombresEquipo +
        " tienen una nueva misión: " +
        mision.texto;

      resultadoMision.classList.add(
        "visible"
      );


      /* BAJAR SUAVEMENTE AL RESULTADO */

      setTimeout(
        function () {

          resultadoMision.scrollIntoView({

            behavior:
              "smooth",

            block:
              "nearest"

          });

        },
        150
      );

    }
  );

}


/* =========================================================
   INICIO EQUIPO
========================================================= */

actualizarEquipo();