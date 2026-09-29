const formulario = document.getElementById("form-ingreso");

const pantallaCarga =
  document.getElementById("pantalla-carga");

const animalCargando =
  document.getElementById("animal-cargando");

const especie =
  document.getElementById("especie");


formulario.addEventListener("submit", function(event) {

  event.preventDefault();


  const animalSeleccionado = especie.value;


  if (animalSeleccionado === "conejo") {
    animalCargando.textContent = "🐰";
  }

  else if (animalSeleccionado === "zorro") {
    animalCargando.textContent = "🦊";
  }

  else if (animalSeleccionado === "oso") {
    animalCargando.textContent = "🐻";
  }

  else if (animalSeleccionado === "ciervo") {
    animalCargando.textContent = "🦌";
  }

  else {
    animalCargando.textContent = "🐾";
  }


  pantallaCarga.classList.add("activa");


  setTimeout(function() {

    formulario.submit();

  }, 2600);

});