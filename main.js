//sincrono 
//esperamos a que se termine de ejectar la primera accion
//No podemos hacer otra cosa 
//asincrona async
//Poder hacer varias cosas simultaneamente
// promesa 

function cartaDeclaracion (){

    const nuevaPromesa = new Promise(function (resolve,reject){
        resolve("Te contesta la carta y se van tomados de la mano")
    
    });
    return nuevaPromesa;

}
// promesa 
const declaracionPromise= cartaDeclaracion()
//console.log(declaracionPromise)

declaracionPromise
    // si se realiza exitosamente entonces ->
    .then(function(){
        //Ejecuta esta parte 
       // console.log("Ya me dio una respuesta")
    })
    //catch -> Si no se cumple exitosamente 
    .catch(error=>{
        console.log(error)
    })

    // const element = [1,2,4,5,6,7]
    // element
    //     .split()
    //     .join()

    //API -> aplication programming interface
    //Nos traemos informacion 
    //Consultamos informacion 
    //
// Formas de hacer peticiones al servidor
//-ajax -> es el estandar para Asynchronous javascript and xml \
//-fetch -> Es un estandar para hacer peticiones asincronas

//Nos lo traemos asincronamente

//xml -> es un tipo de dato con el cual se puede recibir data 
//retrive data
//Es como tu puedes mandar informacion por el servidor

// json -> javascript object notation

//endpoint es una palabra fancy para la URL que necesitas para visitar 
//para taer api, servidor
const endpoint = 'https://fakestoreapi.com/products';
//const endpoint = 'https://pokeapi.co/api/v2/pokemon/ditto'
//promesa
const promise = fetch(endpoint);

console.log(`Estado de la promesa : ${promise}`)
//Status 200 -> ok 
promise
    //Si me promesa es
    .then(function( data)  {
        //json
        //console.log(data)
        //Convertilo
       // console.log(data.json())
       //convierte los datos que traes en .json
       // convierte a algo que yo pueda interpretar
        return data.json()
    })
    .then(function (data){
        //Ejecuta estas instrucciones
        //imprime en consola
        //console.log(data)
        //
        createCards(data)
        saveLocalStorage(data)
    })
    //Si sucede un error
    .catch(function(error){
        console.log(error)
    })

    function saveLocalStorage(products){
        //Crear elementos en el window.storage
        //setItem(nombreKey,informacion)
        window.localStorage.setItem('items', JSON.stringify(products) )

    }

    function createCards(products){
        const ancla = document.getElementById('products');
        //ul
        const listaContainer = document.getElementById('producList');

        let plantillaFinal = '';
        let listaFinal ='';

        products.forEach(function(product){
            //producto es te tipo objeto
            //objeto tiene propiedades que puede mediante el punto

            let card = `
            <div class="col-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${product.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="detail.html?id=${product.id}" class="btn btn-primary">See details</a>
                </div>
            </div>
            </div>
            `
            let item = `
                <li>${product.title}}</li>
            `;

            //A mi plantilla final agregale una card
            //por cada producto
            plantillaFinal = plantillaFinal + card;
            listaFinal += item;
            //Query selector
            //Es mandar parametros por medio de la la url
            //endopoint ? nombre = valor 
            //si queremos agregar mas -> &
           // console.log(product)
            //console.log(product[id])
        })
        ancla.innerHTML = plantillaFinal;
        listaContainer.innerHTML =listaFinal;


    }// createCards

    function addArticle(evento){
        //prevenimos el defualt
        evento.preventDefault()
        //Traer los valores
        let title = document.getElementById('title').value;
        let price = parseFloat( document.getElementById('price').value);
        let description = document.getElementById('description').value;
        let url = document.getElementById('image').value;
        let category = document.getElementById('category').value;
        let id = parseInt(document.getElementById('id').value);
        console.log(title)
        console.log(description)
        console.log(price)
        console.log(url)
        console.log(category)
        //Mostrar en el html
        //Guardar mi nuevo obj dentro del arreglo 
        //Creamos nuevo objeto
        //obj llave: valor
        const newProduct = {
            "id" : id ,
            "title": title,
            "price" : price,
            "description" : description,
            "image": url,
            "category" : category
        }
        //1. leemos la base de datos
        //JSON.parse -> conviertelo a arreglo
        const arregloProductos = JSON.parse( window.localStorage.getItem('items'))

        console.log(arregloProductos)
        // 2. push metodo ingresar, guardar un nuevo elemento
        // const newProduct = {
        //     "id" : arregloProductos.lenght +1 ,
        //     "title": title,
        //     "price" : price,
        //     "description" : description,
        //     "imageUrl": url,
        //     "category" : category
        // }
        arregloProductos.push(newProduct);
        
        console.log(arregloProductos)
        //3 agregarlo en el local storage
        //arregloProductos -> array -> JSON
        //Guardalo en la bd
        window.localStorage.setItem('items', JSON.stringify( arregloProductos))
        //volver a crear el dom o las etiquetas

        //apendChild
        lista.apendChild(card)



    }

    const btnAddProduct = document.getElementById('form-add-product');
    btnAddProduct.addEventListener('submit',addArticle )
    const btnReload = document.getElementById('reload');

    btnReload.addEventListener('click', function(){
        const prodctos =  JSON.parse( window.localStorage.getItem('items'))
        createCards(prodctos)

    })