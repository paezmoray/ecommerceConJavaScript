class Producto {
    constructor(id, nombre, descripcion, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio; 
        this.img = img;
        this.cantidad = 1;
    }
}

const conjuntoPrimavera = new Producto(1, "Conjunto Primavera", "Short de jean y blusita blanca", 9000, "/img/ropa1.jpeg");
const conjuntoRomance = new Producto(2, "Conjunto Romance", "Pollera con volados y manga larga blanca", 7000, "/img/ropa2.jpeg");
const vestido = new Producto(3, "Vestido", "Vestido azul largo con volados", 5000, "/img/ropa3.jpeg");
const pollera = new Producto(4, "Pollera", "Pollera a cuadrille blanco y negro vintage", 3000, "/img/ropa4.jpeg");


//Creamos un Array con todo nuestro catálogo de productos: 

const productos = [conjuntoPrimavera, conjuntoRomance, vestido, pollera]; 

//Creamos el array del carrito. 

let carrito = [];

/** CARGAR CARRITO DESDE EL LOCALSTORAGE **/
//Si hay algo en el localStorage, lo cargamos en el carrito: 
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Verifico por consola que todo este bien:

console.log(productos);

//Modificamos el DOM mostrando los productos: 

const contenedorProductos = document.getElementById("contenedorProductos");

//Creamos una función para mostrar los productos en stock. 

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <h3> ${producto.descripcion} </h2>
                        <p> ${producto.precio} </p>
                        <button class = "btn colorBoton" id = "boton${producto.id}" >Agregar al Carrito</button>
                    </div>
                </div>`

        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })


    })
}

mostrarProductos();


//Creamos la función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
    calcularTotal();
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar el carrito de compras: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar</button>
                    </div>
                </div>`

        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    //LocalStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras. 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage: 
    localStorage.clear();
}


//Mostrar un mensaje con el total de la compra.

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach( producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad. 
    })
    total.innerHTML = `Total $${totalCompra}`;
}