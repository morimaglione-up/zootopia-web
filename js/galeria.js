
/* =========================================================
   ZOOTOPIA — GALERÍA COLLAGE INTERACTIVA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DE LA GALERÍA

    const fotos = Array.from(
        document.querySelectorAll(".collage-foto")
    );

    const modal = document.getElementById("collageModal");
    const imagenGrande = document.getElementById("collageImagenGrande");
    const contador = document.getElementById("collageContador");

    const botonCerrar = document.getElementById("collageCerrar");
    const botonAnterior = document.getElementById("collageAnterior");
    const botonSiguiente = document.getElementById("collageSiguiente");

    // EVITAR ERRORES SI FALTA ALGÚN ELEMENTO

    if (
        !fotos.length ||
        !modal ||
        !imagenGrande ||
        !contador ||
        !botonCerrar ||
        !botonAnterior ||
        !botonSiguiente
    ) {
        return;
    }

    let indiceActual = 0;
    let botonQueAbrio = null;

    /* =====================================================
       MOSTRAR UNA IMAGEN
    ===================================================== */

    function mostrarImagen(indice) {

        // PERMITE VOLVER AL PRINCIPIO O AL FINAL

        indiceActual = (
            indice + fotos.length
        ) % fotos.length;

        const fotoActual = fotos[indiceActual];
        const imagen = fotoActual.querySelector("img");

        if (!imagen) return;

        imagenGrande.src = imagen.src;
        imagenGrande.alt = imagen.alt;

        const numero = String(indiceActual + 1).padStart(2, "0");
        const total = String(fotos.length).padStart(2, "0");

        contador.textContent = `${numero} / ${total}`;
    }

    /* =====================================================
       ABRIR GALERÍA
    ===================================================== */

    function abrirGaleria(indice) {

        botonQueAbrio = fotos[indice];

        mostrarImagen(indice);

        modal.hidden = false;

        // EVITA QUE SE MUEVA LA PÁGINA DE FONDO

        document.body.style.overflow = "hidden";

        botonCerrar.focus();
    }

    /* =====================================================
       CERRAR GALERÍA
    ===================================================== */

    function cerrarGaleria() {

        modal.hidden = true;

        document.body.style.overflow = "";

        imagenGrande.src = "";

        if (botonQueAbrio) {
            botonQueAbrio.focus();
        }
    }

    /* =====================================================
       EVENTOS DE LAS FOTOGRAFÍAS
    ===================================================== */

    fotos.forEach((foto, indice) => {

        foto.addEventListener("click", () => {
            abrirGaleria(indice);
        });

    });

    /* =====================================================
       BOTONES DEL VISOR
    ===================================================== */

    botonCerrar.addEventListener("click", cerrarGaleria);

    botonAnterior.addEventListener("click", () => {
        mostrarImagen(indiceActual - 1);
    });

    botonSiguiente.addEventListener("click", () => {
        mostrarImagen(indiceActual + 1);
    });

    /* =====================================================
       CERRAR AL TOCAR EL FONDO OSCURO
    ===================================================== */

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {
            cerrarGaleria();
        }

    });

    /* =====================================================
       CONTROLES DEL TECLADO
    ===================================================== */

    document.addEventListener("keydown", (evento) => {

        if (modal.hidden) return;

        if (evento.key === "Escape") {
            cerrarGaleria();
        }

        if (evento.key === "ArrowRight") {
            mostrarImagen(indiceActual + 1);
        }

        if (evento.key === "ArrowLeft") {
            mostrarImagen(indiceActual - 1);
        }

        // MANTIENE EL FOCO DENTRO DEL VISOR

        if (evento.key === "Tab") {

            const controles = [
                botonCerrar,
                botonAnterior,
                botonSiguiente
            ];

            const indiceFoco = controles.indexOf(
                document.activeElement
            );

            if (evento.shiftKey) {

                if (indiceFoco <= 0) {
                    evento.preventDefault();
                    controles[controles.length - 1].focus();
                }

            } else {

                if (indiceFoco === controles.length - 1) {
                    evento.preventDefault();
                    controles[0].focus();
                }

            }
        }
    });

});
