
let products = ['lll']

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
            <section class="card-anime-body">
              <h3>${nameProduct}</h3>
              <p>${descripcion}</p>
              <h4>$${price}.00 <span>MXN</span> </h4>
            </section>
            <footer class="card-anime-footer d-flex justify-content-between mt-4">
              <div class="heart">
                <i class="far fa-heart"></i>
              </div>
              <button data-product-id="${id}" class="btn btn-primary botoncito">Agregar <i class="fas fa-cart-plus"></i></button>
            </footer>
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
    alert('lh')
  }
})