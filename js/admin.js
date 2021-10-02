
let productsArray = []

const getProducts = () => {
    productsArray = []
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {                
                let response = xhr.responseText
                let productsObject = JSON.parse(response)
             //   console.log(productsObject)
                if(productsObject) {
                for (const key in productsObject) {
                     let productObject = productsObject[key]
                     productObject.id = key
                     productsArray = [...productsArray, {...productObject, id:key}]
                  }
                 printTable()
                 console.log(productsArray) 
                }
                 else {
                     printTable()
                 //    console.log("No hay productos u.u")
                 }            
            }
        }
    })
    xhr.open("GET", "https://productkodemia-default-rtdb.firebaseio.com/products.json", true)
    xhr.send()
}

//se crea emvia el producto a bd
const createProduct = (productObject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    // yo construimos la peticion
    xhr.open("POST", "https://productkodemia-default-rtdb.firebaseio.com/products.json", true)
    // Enviamos la peticion
    xhr.send(JSON.stringify(productObject))
}

document.getElementById("btnSubmit").addEventListener("click", (event)=> {
    event.preventDefault()
    let newProduct = {}
    let objectSize={}
    document.querySelectorAll("form#frmProducts input,form#frmProducts textArea").forEach((input) => {
        if(!input.value) {
            newProduct = null
        }else {
            // console.log(input.name +"=" + input.value)        
            // console.log(`${input.name} === "large"`)
            // console.log(input.name === 'large')
            if( input.name=== "Grande" || input.name=== "Mediano" || input.name=== "Chico"){
               if( input.checked)
              {
               objectSize[input.name] = input.value
             }         
            }else{
                newProduct[input.name] = input.value
            }            
        }
       //agregar size a new object    
    })    
    //console.log(objectSize)
    newProduct.sizes=objectSize
     console.log(newProduct)
    if(!newProduct) return alert("Camplos obligatorios..")
    createProduct(newProduct)
})

const putInfo= (idInputFrm,idinfo)=>{
    let namePr = document.getElementById(idInputFrm)
    namePr.addEventListener("input", () => {
       //console.log("Escribiendo...")
        let valueInput = namePr.value
       document.getElementById(idinfo).textContent = valueInput
   })
}
putInfo("name-Product","name-prod")
putInfo("priceP","price-prod")
putInfo("floatingTextarea2","desc-prod")

let miCheckbox = document.getElementById('CheckSize2');
let miDivSize = document.getElementById('div-large');
//alert(miCheckbox)
miCheckbox.addEventListener('click', function() {
    
    if(miCheckbox.checked) {
        console.log( 'El elemento está marcado')
        miDivSize.style.display='true'
    } else {
        console.log ( 'El elemento está desmarcado')
        miDivSize.style.display='none'
        }
  });

const deleteProduct = (idProductToDelete) => {
    //alert(idProductToDelete)
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    xhr.open("DELETE", `https://productkodemia-default-rtdb.firebaseio.com/products/${idProductToDelete}.json`, true)
    xhr.send()
}

const clickToDeleteProduct = (event) => {
    // console.log("Eliminando... jeje")
    // Eliminar del array
     let idProduct = event.target.dataset.productIdDelete
     //alert(idProduct)
     deleteProduct(idProduct)
}

const EditProduct = (idProduct,productObject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                getProducts()
            }
        }
    })
    console.log(idProduct,productObject )
    // yo construimos la peticion
    xhr.open("PATCH", `https://productkodemia-default-rtdb.firebaseio.com/products/${idProduct}.json`, true)
    // Enviamos la peticion
    xhr.send(JSON.stringify(productObject))
}
const clickToEditProduct = (event) => {
    event.preventDefault()
    //console.log(event)
    let idProduct = event.target.dataset.productIdEdit
    //console.log(idProduct)    
    productsArray = []
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {                
                let response = xhr.responseText
                let productsObject = JSON.parse(response)
                console.log(productsObject)
                if(productsObject) {
                    document.getElementById("urlImage").value = productsObject.url
                    document.getElementById("name-Product").value = productsObject.nameProduct
                    document.getElementById("priceP").value = productsObject.price
                    document.getElementById("floatingTextarea2").value = productsObject.descripcion
                    document.getElementById("btnEdit").setAttribute("data-product-id-edit-frm",idProduct)   
                  
                }
                 else {
         
                     console.log("No hay productos u.u")
                 }            
            }
        }
    })
    xhr.open("GET",`https://productkodemia-default-rtdb.firebaseio.com/products/${idProduct}.json`, true)
    console.log(`https://productkodemia-default-rtdb.firebaseio.com/products/${idProduct}.json`)
    xhr.send()   

}


document.getElementById("btnEdit").addEventListener("click", (event)=> {
    event.preventDefault()
console.log(event)
    console.log("Edit... jeje")
    let newProduct = {}
    let objectSize={}
    let idProduct = event.target.dataset.productIdEditFrm
    document.querySelectorAll("form#frmProducts input,form#frmProducts textArea").forEach((input) => {
        if(!input.value) {
            newProduct = null
        }else {
            // console.log(input.name +"=" + input.value)        
            // console.log(`${input.name} === "large"`)
            // console.log(input.name === 'large')
            if( input.name=== "Grande" || input.name=== "Mediano" || input.name=== "Chico"){
               if( input.checked)
              {
               objectSize[input.name] = input.value
             }         
            }else{
                newProduct[input.name] = input.value
            }            
        }
       //agregar size a new object    
    })    
    //console.log(objectSize)
    newProduct.sizes=objectSize
     console.log(newProduct)
    if(!newProduct) return alert("Camplos obligatorios..")
      EditProduct(idProduct,newProduct)
})



const createNode = (typeElement, text) => {
    let node = document.createElement(typeElement)
    node.textContent = text
    return node
}

const printTable = () => {
    let tBody = document.getElementById("prodctInfo")    
    while(tBody.lastElementChild) {
        tBody.removeChild(tBody.lastElementChild)
    }

    productsArray.forEach((product, index) => {
        let {nameProduct, price, sizes,url,id} = product
        let tr = document.createElement("tr")        

        let img = createNode("img")
        img.setAttribute("src", url);
        img.setAttribute("width", "20.55");
        img.setAttribute("height", "30.13");
        img.setAttribute("alt",nameProduct );
        let tdImg = createNode("td")
        tdImg.appendChild(img)
        let tdIndex = createNode("td", index + 1)
        let tdNameProduct = createNode("td", nameProduct)
        let tdprice = createNode("td", price)
        let tamanios=""
        for (const key in sizes) {
            tamanios +=` ${key} `   
        }     
        let tdSize = createNode("td", tamanios)
        let tdButton = document.createElement("td")
        
        let iEdit=createNode("i")
        iEdit.classList.add("fas","fa-pencil-alt")
        
        let buttonEditar = createNode("button")

        buttonEditar.appendChild(iEdit)
        buttonEditar.classList.add("btn", "btn-primary")
        buttonEditar.setAttribute("data-product-id-edit", id)
        
        buttonEditar.addEventListener("click", clickToEditProduct)  
        
        let iDelete=createNode("i")
        iDelete.classList.add("fas","fa-trash-alt")
        let buttonDelete = createNode("button")
        buttonDelete.appendChild(iDelete)
        buttonDelete.classList.add("btn","btn-danger")
        buttonDelete.setAttribute("data-product-id-delete", id)
         buttonDelete.addEventListener("click", clickToDeleteProduct)  
         tdButton.appendChild(buttonEditar)
         tdButton.appendChild(buttonDelete)
         tr.appendChild(tdImg)
         tr.appendChild(tdIndex)
         tr.appendChild(tdNameProduct)
         tr.appendChild(tdprice)
         tr.appendChild(tdSize)        
         tr.appendChild(tdButton)
         tBody.appendChild(tr)
    })
}
getProducts()


