document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       TARJETAS DE HISTORIA
    ====================================================== */

    const tarjetas =
      document.querySelectorAll(
        ".story-card"
      );


    tarjetas.forEach(
      function (tarjeta) {


        const frente =
          tarjeta.querySelector(
            ".story-front"
          );


        const volver =
          tarjeta.querySelector(
            ".story-volver"
          );


        /* =================================================
           GIRAR PARA VER LA HISTORIA
        ================================================= */

        if (frente) {

          frente.addEventListener(
            "click",
            function (evento) {

              evento.preventDefault();

              evento.stopPropagation();


              tarjeta.classList.add(
                "activa"
              );

            }
          );

        }


        /* =================================================
           VOLVER A LA IMAGEN
        ================================================= */

        if (volver) {

          volver.addEventListener(
            "click",
            function (evento) {

              evento.preventDefault();

              evento.stopPropagation();


              tarjeta.classList.remove(
                "activa"
              );

            }
          );

        }

      }
    );



    /* =====================================================
       SECUENCIA CINEMATOGRÁFICA
    ====================================================== */

    const fotogramas =
      document.querySelectorAll(
        ".cine-fotograma"
      );


    fotogramas.forEach(
      function (fotograma) {


        fotograma.addEventListener(
          "click",
          function (evento) {

            evento.stopPropagation();


            const estabaActivo =
              fotograma.classList.contains(
                "activo"
              );


            fotogramas.forEach(
              function (otroFotograma) {

                otroFotograma.classList.remove(
                  "activo"
                );

              }
            );


            if (!estabaActivo) {

              fotograma.classList.add(
                "activo"
              );

            }

          }
        );

      }
    );



    /* =====================================================
       CERRAR FOTOGRAMA AL TOCAR AFUERA
    ====================================================== */

    document.addEventListener(
      "click",
      function () {

        fotogramas.forEach(
          function (fotograma) {

            fotograma.classList.remove(
              "activo"
            );

          }
        );

      }
    );



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