const escalaSlider =
  document.getElementById("escalaSlider");

const escalaHabitante =
  document.getElementById("escalaHabitante");

const escalaVista =
  document.getElementById("escalaVista");

const escalaPorcentaje =
  document.getElementById("escalaPorcentaje");

const escalaNumero =
  document.getElementById("escalaNumero");

const escalaMini =
  document.getElementById("escalaMini");

const escalaTitulo =
  document.getElementById("escalaTitulo");

const escalaMensaje =
  document.getElementById("escalaMensaje");

const escalaDescripcion =
  document.getElementById("escalaDescripcion");


function actualizarEscala() {

  if (
    !escalaSlider ||
    !escalaHabitante
  ) {
    return;
  }


  const valor =
    Number(escalaSlider.value);


  const escala =
    0.45 + (valor / 100) * 1.45;


  escalaHabitante.style.transform =
    "translateX(-50%) scale(" +
    escala +
    ")";


  escalaPorcentaje.textContent =
    valor;


  escalaSlider.style.background =
    `linear-gradient(
      90deg,
      #ee9b7b 0%,
      #ee9b7b ${valor}%,
      #e1e5ea ${valor}%,
      #e1e5ea 100%
    )`;


  if (valor < 34) {

    escalaVista.textContent =
      "ESCALA PEQUEÑA";

    escalaNumero.textContent =
      "01";

    escalaMini.textContent =
      "ESCALA PEQUEÑA";

    escalaTitulo.textContent =
      "Todo parece enorme.";

    escalaMensaje.textContent =
      "Una puerta puede convertirse en un edificio.";

    escalaDescripcion.textContent =
      "Cuando sos uno de los habitantes más pequeños, una vereda, un banco o una entrada pueden cambiar por completo la forma de recorrer la ciudad.";

    escalaNumero.style.backgroundColor =
      "#f8ddd3";

  }


  else if (valor < 67) {

    escalaVista.textContent =
      "ESCALA MEDIA";

    escalaNumero.textContent =
      "02";

    escalaMini.textContent =
      "ESCALA MEDIA";

    escalaTitulo.textContent =
      "La ciudad a tu medida.";

    escalaMensaje.textContent =
      "Todo parece estar en proporción.";

    escalaDescripcion.textContent =
      "Puertas, calles y objetos cotidianos se sienten pensados para habitantes de un tamaño intermedio.";

    escalaNumero.style.backgroundColor =
      "#fff3b5";

  }


  else {

    escalaVista.textContent =
      "ESCALA GIGANTE";

    escalaNumero.textContent =
      "03";

    escalaMini.textContent =
      "ESCALA GIGANTE";

    escalaTitulo.textContent =
      "Ahora todo parece pequeño.";

    escalaMensaje.textContent =
      "La ciudad necesita hacer lugar.";

    escalaDescripcion.textContent =
      "Para las especies más grandes, puertas, transportes y espacios necesitan otras dimensiones para que moverse por Zootopia sea posible.";

    escalaNumero.style.backgroundColor =
      "#dfeff1";

  }

}


if (escalaSlider) {

  escalaSlider.addEventListener(
    "input",
    actualizarEscala
  );

  actualizarEscala();

}


const opcionesConstruye =
  document.querySelectorAll(
    ".construye-opcion"
  );


const construyeCiudad =
  document.getElementById(
    "construyeCiudad"
  );


const construyeNumero =
  document.getElementById(
    "construyeNumero"
  );


const construyeMini =
  document.getElementById(
    "construyeMini"
  );


const construyeTitulo =
  document.getElementById(
    "construyeTitulo"
  );


const construyeTexto =
  document.getElementById(
    "construyeTexto"
  );


const construyeDato =
  document.getElementById(
    "construyeDato"
  );


const construyeActivo =
  document.getElementById(
    "construyeActivo"
  );


const opcionesCiudad = {

  moverse: {

    numero: "01",

    mini:
      "MOVERSE POR LA CIUDAD",

    titulo:
      "Conectá todos los tamaños.",

    texto:
      "Una misma red puede conectar distintos puntos de Zootopia, pero los accesos y transportes tienen que funcionar para habitantes muy diferentes.",

    dato:
      "El transporte se convierte en parte del diseño de una ciudad para todos.",

    activo:
      "TRANSPORTE",

    clase:
      "estado-moverse"

  },


  entrar: {

    numero: "02",

    mini:
      "ENTRAR SIN QUEDAR AFUERA",

    titulo:
      "Una entrada no alcanza.",

    texto:
      "Una puerta enorme puede funcionar para una especie y ser imposible para otra. Por eso una misma construcción puede necesitar diferentes accesos.",

    dato:
      "Diseñar entradas distintas permite que todos lleguen al mismo lugar.",

    activo:
      "ACCESOS",

    clase:
      "estado-entrar"

  },


  convivir: {

    numero: "03",

    mini:
      "COMPARTIR LA CIUDAD",

    titulo:
      "Hacé lugar para encontrarse.",

    texto:
      "Parques, bancos y espacios públicos también pueden adaptarse para que animales de tamaños distintos puedan compartirlos.",

    dato:
      "Una ciudad funciona mejor cuando sus espacios permiten encontrarse.",

    activo:
      "ESPACIO PÚBLICO",

    clase:
      "estado-convivir"

  }

};



opcionesConstruye.forEach(
  function(opcion) {

    opcion.addEventListener(
      "click",
      function() {


        opcionesConstruye.forEach(
          function(boton) {

            boton.classList.remove(
              "activa"
            );

          }
        );


        opcion.classList.add(
          "activa"
        );


        const seleccion =
          opcion.dataset.construye;


        const contenido =
          opcionesCiudad[
            seleccion
          ];


        construyeCiudad.classList.remove(
          "estado-moverse",
          "estado-entrar",
          "estado-convivir"
        );


        construyeCiudad.classList.add(
          contenido.clase
        );


        construyeNumero.textContent =
          contenido.numero;


        construyeMini.textContent =
          contenido.mini;


        construyeTitulo.textContent =
          contenido.titulo;


        construyeTexto.textContent =
          contenido.texto;


        construyeDato.textContent =
          contenido.dato;


        construyeActivo.textContent =
          contenido.activo;

      }
    );

  }
);


const horas =
  document.querySelectorAll(
    ".mundo-hora"
  );


const mundoHoraNumero =
  document.getElementById(
    "mundoHoraNumero"
  );

const mundoHoraMini =
  document.getElementById(
    "mundoHoraMini"
  );

const mundoHoraTitulo =
  document.getElementById(
    "mundoHoraTitulo"
  );

const mundoHoraTexto =
  document.getElementById(
    "mundoHoraTexto"
  );


const momentosDia = [

  {

    hora: "07:00",

    mini:
      "LA CIUDAD DESPIERTA",

    titulo:
      "Empieza un nuevo día.",

    texto:
      "Los primeros trenes comienzan a conectar los diferentes sectores de la ciudad."

  },


  {

    hora: "10:00",

    mini:
      "LA MAÑANA AVANZA",

    titulo:
      "Todos encuentran su rumbo.",

    texto:
      "Las calles se llenan de habitantes que trabajan, estudian y recorren la ciudad."

  },


  {

    hora: "14:00",

    mini:
      "TODO ESTÁ EN MOVIMIENTO",

    titulo:
      "La ciudad alcanza su ritmo máximo.",

    texto:
      "Estaciones, comercios y espacios públicos reciben habitantes de todos los tamaños."

  },


  {

    hora: "19:00",

    mini:
      "CAMBIA LA LUZ",

    titulo:
      "La ciudad empieza otra etapa.",

    texto:
      "Las luces se encienden y los espacios de encuentro toman protagonismo."

  },


  {

    hora: "23:00",

    mini:
      "ZOOTOPIA SIGUE VIVA",

    titulo:
      "La ciudad no se detiene.",

    texto:
      "Aunque el ritmo cambia, todavía hay movimiento, luces y habitantes recorriendo sus calles."

  }

];



horas.forEach(
  function(hora, indice) {

    hora.addEventListener(
      "click",
      function() {


        horas.forEach(
          function(boton) {

            boton.classList.remove(
              "activa"
            );

          }
        );


        hora.classList.add(
          "activa"
        );


        mundoHoraNumero.textContent =
          momentosDia[indice].hora;


        mundoHoraMini.textContent =
          momentosDia[indice].mini;


        mundoHoraTitulo.textContent =
          momentosDia[indice].titulo;


        mundoHoraTexto.textContent =
          momentosDia[indice].texto;

      }
    );

  }
);
