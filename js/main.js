
let products = []
let articulosCarrito = []
let contenedorCarrito = document.querySelector('#lista-carrito tbody');

const getProducts = () => {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let products = JSON.parse(xhr.responseText)
      // console.log(products)
      // console.log(Object.keys(products))
      products = Object.keys(products).map(key => {
        let product = products[key]
        // console.log(key)
         console.log(product)
        return { ...product, id: key }
      })
      printProducts(products)
    }
    return products
  })

  xhr.open("GET", "https://tarea-bootcamp-default-rtdb.firebaseio.com/products.json")
  xhr.send()
}
//getProducts()
let url = "https://tarea-bootcamp-default-rtdb.firebaseio.com/products.json"
fetch(url)
  .then(respuesta => {
    return respuesta.json();
  })
  .then(datos => {
    products = Object.keys(datos).map(key => {
      let product = datos[key]
      // console.log(key)
      return { ...product, id: key }

    })
    return products
  })
  .then( arreglo =>{
    console.log(arreglo)
    printProducts(arreglo)
  })
  .catch(error => {
    console.log(error)
  });

document.querySelector('.btnFiltrar').addEventListener('click', (e)=>{
  e.preventDefault()
  let inputBuscar = document.querySelector('.buscarInput').value
  const select = document.querySelector('.select').value

  console.log(inputBuscar);
  products = products.filter( prod => prod[select] === inputBuscar)
  console.log(products);
  printProducts(products)
})

let list = document.querySelector("#list-products")
const printProducts = arrayProducts => {

  let allProducts = arrayProducts.reduce((acc, product) => {
    let { nameProduct, descripcion, price, id, sizes, url } = product

    let cardProduct = `
        <div class="col-12 col-md-6 d-flex justify-content-center my-3">
          <article class="card-anime">
            <header class="card-anime-header d-flex justify-content-between mb-2">
              <img class="img-munko img-fluid" width="140" height="200" src="${url}" alt="${name}">
              <div class="sizes-munkos d-flex flex-column justify-content-between">
                <div class="large d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>G</span>rande</p>
                </div>
                <div class="medium d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>M</span>ediano</p>
                </div>
                <div class="small d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>P</span>equeño</p>
                </div>
              </div>
            </header>
            <div>
            <section class="card-anime-body">
              <h3>${nameProduct}</h3>
              <p>${descripcion}</p>
              <h4>$${price}.00 <span>MXN</span> </h4>
            </section>
            <footer class="card-anime-footer d-flex justify-content-between mt-4">
              <div class="heart">
                <i class="far fa-heart"></i>
              </div>
              <button id="${id}" class="btn btn-primary botoncito">Agregar <i class="fas fa-cart-plus"></i></button>
            </footer>
           </div>
          </article>
        </div>
        `
    return acc + cardProduct
  }, "")
  // console.log(allProducts)
  list.innerHTML = allProducts
}

list.addEventListener('click', (e)=>{
  console.log('ooj');
  e.preventDefault()
  if (e.target.classList.contains('botoncito')){
    const todo = e.target.parentElement.parentElement
    console.log(todo);
    const infoProd = {

      nombre: todo.querySelector('h3').textContent,
      desc: todo.querySelector('p').textContent,
      precio:todo.querySelector('h4').textContent,
      id: todo.querySelector('button').id,
      cantidad:1
    }
    let url = products.filter( x =>x.id ===infoProd.id)
    url.forEach( x => {

      infoProd.url =  x.url;
    })

    console.log(infoProd);

 if (articulosCarrito.some(x => x.id === infoProd.id)) {

   const productos = articulosCarrito.map(x => {
     if (x.id === infoProd.id) {
       x.cantidad++;
       console.log(x);
       return x;
     } else {
       return x;
     }
   })
   articulosCarrito = [...productos];
 } else {
   articulosCarrito = [...articulosCarrito, infoProd];
 }
 console.log(articulosCarrito);
   carritoHTML()
  }
})

function carritoHTML() {

  vaciarCarrito();

  articulosCarrito.forEach(producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
               <td>
                    <img src="${producto.url}" width=50>
               </td>
               <td>${producto.nombre}</td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="btn btn-danger borrando" id="${producto.id}">X</a>
               </td>
          `;
    contenedorCarrito.appendChild(row);
  });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';


  // forma rapida (recomendada)
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

document.querySelector('.table').addEventListener('click', (e) =>{
  if (e.target.classList.contains('borrando')){

    let id = e.target.id
   articulosCarrito = articulosCarrito.filter(x => x.id !== id)
   console.log(articulosCarrito);
   carritoHTML()
  }
})
document.querySelector('#vaciar-carrito').addEventListener('click', () =>{
 articulosCarrito =[]
 carritoHTML()
})