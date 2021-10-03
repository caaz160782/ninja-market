
let productsArray = []
const inputs = document.querySelectorAll(".myinput")

const textArea = document.querySelector('#floatingTextarea2')
const btnI = document.querySelector('#btnSubmit')

const nameInput = document.querySelector('#name-Product')
const priceInput = document.querySelector('#priceP')
const descInput = document.querySelector('#desc')
const imageInput = document.querySelector('#url')
const stock = document.querySelector('#stockP')

let editar = false

let productoObjt = {
   /* desc: " ",
    image: " ",
    name: " ",
    price: " ",
    sizeLarge: " ",
    sizeMedium: " ",
    sizeShort: " "*/
}


const createProduct = (producto) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    xhr.open("POST", "https://productkodemia-default-rtdb.firebaseio.com/products.json", true)
    xhr.send(JSON.stringify(producto))
}



btnI.addEventListener('click', ingresarProducto)
alert('kslshg')
function ingresarProducto(e) {
    e.preventDefault()
    inputs.forEach((input) => {
        productoObjt[input.name] = input.value
    })

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
                console.log(productsArray);
                printTable(productsArray)
            } else {
                console.log("Ocurrio un error: ", xhr.status, "Not Found")
            }
        }
    })
    // instruccion que me me permite abrir la peticion
    xhr.open("GET", 'https://productkodemia-default-rtdb.firebaseio.com/products.json', true)
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
    xhr.open("DELETE", `https://productkodemia-default-rtdb.firebaseio.com/products/${productId}.json`, true)
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
    xhr.open("PUT", `https://productkodemia-default-rtdb.firebaseio.com/products/${id}.json`, true)
    xhr.send(JSON.stringify(prod))

}
function updateProduct(prod) {
    //para regresar alos input los valores a editar
    const { name, price, desc, image, id, sizeLarge } = prod;
    nameInput.value = name
    priceInput.value = price
    imageInput.value = image
    descInput.value = desc

    //lleno el objeto con los valores a editar
    /*productoObjt.name = nameInput
    productoObjt.price = price
    productoObjt.desc = desc
    productoObjt.image = image*/
    productoObjt.id = id

    editar = true
}

function printTable(arreglo) {
    const table = document.querySelector('.table tbody')

    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }


    arreglo.forEach((producto, i) => {
        const { nameProduct, price, desc, url, id, sizeLarge } = producto

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
        console.log(imgreal);

        const tdprice = document.createElement('td')
        tdprice.textContent = `$${price}`

        const tdsizes = document.createElement('td')
        tdsizes.textContent = sizeLarge

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
