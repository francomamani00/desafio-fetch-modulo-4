// Función para borrar productos
function removeCards() {
  // Obtengo todos los productos si hay
  const productEl = document.querySelectorAll(".result-item");

  // Si no hay ninguno, entonces no hay mucho más que hacer...
  if (productEl.length == 0) {
    return;
  }

  // Si hay...
  productEl.forEach((prod) => prod.remove());
}

function mostrarResultados(resultados) {
  // borro todo
  removeCards();
  // Instanciar el template
  const template = document.querySelector("#result-item-template");
  // instancion elementos auxiliares
  const contenedor = document.querySelector(".results");
  const resultCountEl = document.querySelector(".results-count");

  // En caso de no haber resultados, sólo altero la cantidad de resultados de búsqueda
  if (resultados.length == 0) {
    resultCountEl.textContent = "No hay resultados para tu búsqueda!";
    return;
  } else {
    // Si hay resultados, entonces primero muestro la cantidad de resultados
    resultCountEl.textContent = resultados.length.toString();
  }
  // Recorro el array con todos los productos, y creo las "cartas"
  for (const item of resultados) {
    // Principal: el link de la publicación
    const aEl = template.content.querySelector(".result-link");
    aEl.setAttribute("href", item.permalink);
    // Al template, le agrego el atributo src de la imagen
    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.setAttribute("src", item.thumbnail);

    //ahora el titulo
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = item.title;

    //condicion
    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = item.condition;

    const selledEl = template.content.querySelector(".result-item-selled-num");
    selledEl.textContent = item.sold_quantity;

    const priceEl = template.content.querySelector(".result-item-price-num");
    priceEl.textContent = item.price;
    // clonar, importar y agregar al contenedor que
    let clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
  console.log(resultados);
}

function processSearch(formulario) {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    //  // Obtengo los datos otra forma de obtener esto de abajo (e.target.search.value)
    //  const data = new FormData(e.target);
    //  const object = Object.fromEntries(data.entries());
    //  const searchQuery = object.search.trim(); despues pondria el searchQuery donde va lo de abajo
    fetch(
      "https://api.mercadolibre.com/sites/MLA/search?q=" + e.target.search.value
    )
      .then((response) => response.json())
      .then((data) => mostrarResultados(data.results));
  });
}

function main() {
  //obtengo el form
  const formEl = document.querySelector(".search-form");

  //proceso la busqueda y muestro en pantalla
  processSearch(formEl);
}
main();
