const tienda = 'productos_'+document.getElementById('tienda').innerHTML;
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('tarjeta');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//const procesarPedidoBtn = document.getElementById('procesar-pedido');
const listaCompra = document.querySelector("#lista-compra tbody");

cargarEventos();
document.getElementById('qty').innerHTML = obtenerLS();

function cargarEventos(){
    
    //Se ejecuta cuando se presionar agregar carrito
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});
    //Cuando se elimina productos del carrito
    //carro.addEventListener('click', (e)=>{carro.eliminarProducto(e)});
    //carrito.addEventListener('click', (e) => {carro.eliminarProducto(e) });    
    listaCompra.addEventListener('click', (e) => {carro.eliminarProducto(e) });    
    carro.calcularTotal();

    listaCompra.addEventListener('change', (e) => { carro.obtenerEvento(e) });
    listaCompra.addEventListener('keyup', (e) => { carro.obtenerEvento(e) });


    //Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});
    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorageCompra());    
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    //Enviar pedido a otra pagina
    //procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
}


function obtenerLS(){
        let productoLS;
        
        if(localStorage.getItem(tienda) === null){
            productoLS = 0;
        } else {
            productoLS = JSON.parse(localStorage.getItem(tienda));
            productoLS = productoLS.length
        }
        return productoLS;
    }
