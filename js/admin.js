
let productsArray = []
const inputs = document.querySelectorAll("#frmProducts input, #frmProducts textarea")


const textArea = document.querySelector('#floatingTextarea2')
const btnI = document.querySelector('#btnSubmit')

const nameInput = document.querySelector('#name-Product')
const priceInput = document.querySelector('#priceP')
const descInput = document.querySelector('#desc')
const imageInput = document.querySelector('#url')
const stock = document.querySelector('#stockP')

let editar = false

let productoObjt = {}

const createProduct = (producto) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              //  console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    xhr.open("POST", "https://tarea-bootcamp-default-rtdb.firebaseio.com/products.json", true)
    xhr.send(JSON.stringify(producto))
}



btnI.addEventListener('click', ingresarProducto)

function ingresarProducto(e) {
    e.preventDefault()
    let sizes = []
    let inputsVacios = 0
    inputs.forEach((input) => {

            if (input.classList.contains('form-check-input') ){
                if (input.checked)
                sizes = [...sizes, input.name]
                productoObjt = {...productoObjt,sizes}
            } else {
                if (input.value)
                productoObjt[input.name] = input.value
                else inputsVacios ++
            }
        })
        if(sizes.length<1) inputsVacios++
    if(inputsVacios!=0) {
        alert('campos obligatorios!!!!!')

        console.log(inputsVacios);
        return
    }

    if (!editar) {


        createProduct(productoObjt)
    } else {

        updatingProduct(productoObjt)
        editar = false
    }
    document.querySelector('#frmProducts').reset()
}

const getProducts = () => {
    productsArray = []
    const xhr = new XMLHttpRequest()
    // Agregando el listener para ver el estado de mi peticion
    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <= 299) {

                let responseAjax = xhr.responseText

                let responseParsed = JSON.parse(responseAjax)

                //

                for (const key in responseParsed) {
                    let producto = responseParsed[key]
                    producto = { ...producto, id:key}
                    productsArray = [...productsArray, producto]
                }
            //    console.log(productsArray);
                printTable(productsArray)
            } else {
              //  console.log("Ocurrio un error: ", xhr.status, "Not Found")
            }
        }
    })
    // instruccion que me me permite abrir la peticion
    xhr.open("GET", "https://tarea-bootcamp-default-rtdb.firebaseio.com/products.json", true)
    xhr.send()
}


getProducts()

const deleteProduct = (productId) => {

    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    xhr.open("DELETE", `https://tarea-bootcamp-default-rtdb.firebaseio.com/products/${productId}.json`, true)
    xhr.send(null)

}

const updatingProduct = (prod) => {
    const { id } = prod
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    xhr.open("PUT", `https://tarea-bootcamp-default-rtdb.firebaseio.com/products/${id}.json`, true)
    xhr.send(JSON.stringify(prod))

}
function updateProduct(prod) {
    console.log(prod);
    //para regresar alos input los valores a editar
    const { nameProduct, price, descripcion, url, id, sizes } = prod;
    inputs.forEach( input =>{
        for (const key in prod) {
            if(input.name === key){
                input.value = prod[key]
            }
        }
        if (input.classList.contains('form-check-input')) {
            sizes.forEach( size => {
                if(size === input.name){
                    console.log('igual');
                    input.checked = true
                }
            })
        }
    })
    //lleno el objeto con los valores a editar
  /*  productoObjt.nameProduct = nameProduct
    productoObjt.price = price
    productoObjt.descripcion = descripcion
    productoObjt.url = url*/
    productoObjt.id = id
   /* productoObjt.sizes = sizes
    productoObjt.stock = stock*/

    editar = true
}

function printTable(arreglo) {
    const table = document.querySelector('.table tbody')

    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }


    arreglo.forEach((producto, i) => {
        console.log(producto);
        const { nameProduct, price, desc, url, id, sizes } = producto

        const row = document.createElement('tr')
        const td = document.createElement('td')
        td.textContent = nameProduct
        const tdi = document.createElement('td')
        tdi.textContent = i

        const tdimg = document.createElement('td')
        const imgreal = document.createElement('img')

        imgreal.src = `${url}`
        imgreal.classList.add('img-fluid')
        imgreal.setAttribute('width', 30)
        tdimg.appendChild(imgreal)
       // console.log(imgreal);

        const tdprice = document.createElement('td')
        tdprice.textContent = `$${price}`


        let tamaños = ''
        sizes.forEach(size => tamaños += `${size}, ` )
        const tdsizes = document.createElement('td')
        tdsizes.textContent = tamaños || 'no se'

        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add('btn', 'btn-danger')
        //  btnBorrar.textContent = 'X'
        btnBorrar.onclick = () => deleteProduct(id)
        const myi = document.createElement('i')
        myi.classList.add('fas', 'fa-trash-alt')
        btnBorrar.appendChild(myi)

        const btnEditar = document.createElement('button')
        btnEditar.classList.add('btn', 'btn-primary')
        btnEditar.onclick = () => updateProduct(producto)
        const myidos = document.createElement('i')
        myidos.classList.add('fas', 'fa-pencil-alt')
        btnEditar.appendChild(myidos)

        row.appendChild(tdimg)
        row.appendChild(tdi)
        row.appendChild(td)
        row.appendChild(tdprice)
        row.appendChild(tdsizes)
        row.appendChild(btnEditar)
        row.appendChild(btnBorrar)
        table.appendChild(row)
    })
}
