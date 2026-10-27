document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       DATOS DE LOS DISTRITOS
    ====================================================== */

    const datosDistritos = [

      {
        numero: "01",

        nombre: "Sahara Square",

        categoria:
          "CALOR · PALMERAS · ARENA",

        imagen:
          "../imagenes/sahara-square.png",

        descripcion:
          "Un distrito cálido y lleno de movimiento, creado para especies acostumbradas a las altas temperaturas.",

        detalle:
          "Entre enormes edificios, palmeras y paisajes desérticos, Sahara Square demuestra cómo Zootopia adapta cada rincón de la ciudad a las necesidades de quienes viven allí."
      },


      {
        numero: "02",

        nombre: "Tundratown",

        categoria:
          "NIEVE · HIELO · FRÍO",

        imagen:
          "../imagenes/tundratown.png",

        descripcion:
          "Un rincón de Zootopia donde el invierno nunca termina y todo está preparado para convivir con temperaturas bajo cero.",

        detalle:
          "Calles cubiertas de nieve, edificios helados y paisajes completamente blancos forman uno de los distritos más particulares de la ciudad."
      },


      {
        numero: "03",

        nombre: "Little Rodentia",

        categoria:
          "PEQUEÑO · DETALLADO · INESPERADO",

        imagen:
          "../imagenes/little-rodentia.png",

        descripcion:
          "Una ciudad diminuta dentro de una ciudad enorme, pensada especialmente para los habitantes más pequeños.",

        detalle:
          "Sus calles, edificios, vehículos y espacios tienen otra escala. Para un animal grande puede parecer una maqueta, pero para sus habitantes es toda una metrópolis."
      },


      {
        numero: "04",

        nombre: "Rainforest District",

        categoria:
          "LLUVIA · VERDE · ALTURA",

        imagen:
          "../imagenes/rainforest-district.png",

        descripcion:
          "Vegetación, humedad, lluvia y construcciones entre las alturas convierten este distrito en un mundo completamente diferente.",

        detalle:
          "El agua y la naturaleza atraviesan todo el paisaje. Pasarelas, árboles y edificios conviven en uno de los sectores más verdes de Zootopia."
      }

    ];



    /* =====================================================
       TARJETAS DE DISTRITOS
    ====================================================== */

    const botonesDescubrir =
      document.querySelectorAll(
        ".distrito-frente"
      );



    /* =====================================================
       CREAR MODAL
    ====================================================== */

    const modalDistrito =
      document.createElement(
        "div"
      );


    modalDistrito.classList.add(
      "distrito-modal"
    );


    modalDistrito.innerHTML = `

      <div class="distrito-modal-fondo"></div>


      <div class="distrito-modal-caja">


        <button
          class="distrito-modal-cerrar"
          type="button"
          aria-label="Cerrar información"
        >
          ×
        </button>


        <div class="distrito-modal-imagen">

          <img
            id="modalDistritoImagen"
            src=""
            alt=""
          >

          <div class="distrito-modal-overlay"></div>


          <span
            class="distrito-modal-numero"
            id="modalDistritoNumero"
          >
            01
          </span>

        </div>


        <div class="distrito-modal-info">

          <p
            class="distrito-modal-categoria"
            id="modalDistritoCategoria"
          ></p>


          <h2
            id="modalDistritoTitulo"
          ></h2>


          <p
            class="distrito-modal-descripcion"
            id="modalDistritoDescripcion"
          ></p>


          <div class="distrito-modal-linea"></div>


          <p
            class="distrito-modal-detalle"
            id="modalDistritoDetalle"
          ></p>


          <span class="distrito-modal-pista">
            EXPLORÁ LOS CUATRO DISTRITOS
          </span>

        </div>

      </div>

    `;


    document.body.appendChild(
      modalDistrito
    );



    /* =====================================================
       ELEMENTOS MODAL
    ====================================================== */

    const modalImagen =
      document.getElementById(
        "modalDistritoImagen"
      );


    const modalNumero =
      document.getElementById(
        "modalDistritoNumero"
      );


    const modalCategoria =
      document.getElementById(
        "modalDistritoCategoria"
      );


    const modalTitulo =
      document.getElementById(
        "modalDistritoTitulo"
      );


    const modalDescripcion =
      document.getElementById(
        "modalDistritoDescripcion"
      );


    const modalDetalle =
      document.getElementById(
        "modalDistritoDetalle"
      );


    const modalCerrar =
      modalDistrito.querySelector(
        ".distrito-modal-cerrar"
      );


    const modalFondo =
      modalDistrito.querySelector(
        ".distrito-modal-fondo"
      );



    /* =====================================================
       ABRIR MODAL
    ====================================================== */

    function abrirDistrito(indice) {

      const distrito =
        datosDistritos[indice];


      if (!distrito) {
        return;
      }


      modalImagen.src =
        distrito.imagen;


      modalImagen.alt =
        distrito.nombre;


      modalNumero.textContent =
        distrito.numero;


      modalCategoria.textContent =
        distrito.categoria;


      modalTitulo.textContent =
        distrito.nombre;


      modalDescripcion.textContent =
        distrito.descripcion;


      modalDetalle.textContent =
        distrito.detalle;


      modalDistrito.classList.add(
        "activo"
      );


      document.body.classList.add(
        "modal-abierto"
      );

    }



    /* =====================================================
       CERRAR MODAL
    ====================================================== */

    function cerrarDistrito() {

      modalDistrito.classList.remove(
        "activo"
      );


      document.body.classList.remove(
        "modal-abierto"
      );

    }



    /* =====================================================
       EVENTOS TARJETAS
    ====================================================== */

    botonesDescubrir.forEach(
      function (boton, indice) {

        boton.addEventListener(
          "click",
          function () {

            abrirDistrito(
              indice
            );

          }
        );

      }
    );


    modalCerrar.addEventListener(
      "click",
      cerrarDistrito
    );


    modalFondo.addEventListener(
      "click",
      cerrarDistrito
    );


    document.addEventListener(
      "keydown",
      function (evento) {

        if (
          evento.key === "Escape" &&
          modalDistrito.classList.contains(
            "activo"
          )
        ) {

          cerrarDistrito();

        }

      }
    );



    /* =====================================================
       MAPA INTERACTIVO
    ====================================================== */

    const mapaContenedor =
      document.getElementById(
        "mapaZootopiaContenedor"
      );


    const mapaImagen =
      document.getElementById(
        "mapaZootopiaImagen"
      );


    const mapaHotspots =
      document.querySelectorAll(
        ".mapa-hotspot"
      );


    const zonasMapa = {

      sahara: {
        x: "22%",
        y: "65%",
        escala: 1.75
      },

      tundra: {
        x: "72%",
        y: "25%",
        escala: 1.75
      },

      rodentia: {
        x: "48%",
        y: "60%",
        escala: 1.9
      },

      rainforest: {
        x: "70%",
        y: "68%",
        escala: 1.75
      }

    };



    /* =====================================================
       ACTIVAR ZOOM
    ====================================================== */

    function activarZona(
      boton
    ) {

      if (
        !mapaImagen ||
        !boton
      ) {
        return;
      }


      const nombreZona =
        boton.dataset.zona;


      const zona =
        zonasMapa[
          nombreZona
        ];


      if (!zona) {
        return;
      }


      mapaHotspots.forEach(
        function (otro) {

          otro.classList.remove(
            "activo"
          );

        }
      );


      boton.classList.add(
        "activo"
      );


      mapaImagen.style.transformOrigin =
        zona.x +
        " " +
        zona.y;


      mapaImagen.style.transform =
        "scale(" +
        zona.escala +
        ")";

    }



    /* =====================================================
       RESTAURAR MAPA
    ====================================================== */

    function restaurarMapa() {

      if (!mapaImagen) {
        return;
      }


      mapaImagen.style.transform =
        "scale(1)";


      mapaImagen.style.transformOrigin =
        "50% 50%";


      mapaHotspots.forEach(
        function (punto) {

          punto.classList.remove(
            "activo"
          );

        }
      );

    }



    /* =====================================================
       EVENTOS MAPA
    ====================================================== */

    mapaHotspots.forEach(
      function (punto) {


        punto.addEventListener(
          "mouseenter",
          function () {

            activarZona(
              punto
            );

          }
        );


        punto.addEventListener(
          "focus",
          function () {

            activarZona(
              punto
            );

          }
        );


        punto.addEventListener(
          "click",
          function () {

            activarZona(
              punto
            );

          }
        );

      }
    );


    if (mapaContenedor) {

      mapaContenedor.addEventListener(
        "mouseleave",
        restaurarMapa
      );

    }



    /* =====================================================
       SCROLL SUAVE
    ====================================================== */

    const enlacesInternos =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    enlacesInternos.forEach(
      function (enlace) {

        enlace.addEventListener(
          "click",
          function (evento) {

            const href =
              enlace.getAttribute(
                "href"
              );


            if (
              !href ||
              href === "#"
            ) {
              return;
            }


            const destino =
              document.querySelector(
                href
              );


            if (destino) {

              evento.preventDefault();


              destino.scrollIntoView({

                behavior: "smooth",

                block: "start"

              });

            }

          }
        );

      }
    );

  }
);