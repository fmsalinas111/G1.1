class Carrito {
    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
            e.target.textContent='vendido'
            e.target.className='btn-secondary'
            //console.log (tienda)
        }
    }

    leerDatosProducto(producto){        
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            //id: producto.querySelector('a').getAttribute('data-id'),
            factor: producto.querySelector('.factor').textContent,
            id: producto.querySelector('input').getAttribute('id'),

            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){  productosLS = productoLS.id;  }
        });

        if(productosLS === infoProducto.id){
            alert('El producto ya está agregado')
        } else {
            this.insertarCarrito(infoProducto);
            document.getElementById('qty').className = 'qtyGrande';
            
            alert('producto agregado!', 'success');
            
            document.getElementById('qty').innerHTML = productosLS.length+1;
            document.getElementById(infoProducto.id).className = 'disabled'
            
            
        }
        
    }

    //muestra producto seleccionado en carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
            row.innerHTML = `
                <td> <img src="${producto.imagen}" height=100>  </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td> <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}> </td>
                <td class="alignCenter">${producto.factor}</td>
                <td id='unidades' class="alignCenter">${producto.factor * producto.cantidad}</td>
                <td id='subtotales' class='bold alignRight'>${(producto.precio * producto.cantidad * producto.factor).toFixed(2)}</td>
                <td id='borrar' class="alignCenter">
                    <a href="#" class="borrar-producto bi bi-x-square "  data-id="${producto.id}"></a>
                </td>
            `;
        listaCompra.appendChild(row);
        this.guardarProductosLocalStorage(producto);
        this.calcularTotal();
    }

    //Mostrar los productos guardados en el LS en compra.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> <img src="${producto.imagen}" height=100>  </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td> <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}> </td>
                <td class="alignCenter">${producto.factor}</td>
                <td id="unidades" class="alignCenter">${producto.cantidad * producto.factor}</td>
                <td id="subtotales" class='bold alignRight'>${(producto.precio * producto.cantidad * producto.factor).toFixed(2)}</td>
                <td class="alignCenter">
                    <a href="#" class="borrar-producto bi bi-x-square "  data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }
    dibujarLinea(){

    }

    //Eliminar el producto del carrito en el DOM
    eliminarProducto(e){ 
    alert('pp')      
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
            alert(document.getElementById(productoID).value)
            document.getElementById('b'+productoID).textContent='Comprar'
            document.getElementById('b'+productoID).className='btn btn-primary agregar-carrito'
            console.log('prid: '+productoID+': '+ document.getElementById(productoID).value)
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();

    }

    //Elimina todos los productos
    vaciarCarrito(e){
    
    var opcion = confirm("Está seguro?");
    if (opcion == true) {
        e.preventDefault();
        while(listaProductos.firstChild){listaProductos.removeChild(listaProductos.firstChild); }
        while(listaCompra.firstChild){ listaCompra.removeChild(listaCompra.firstChild);}
        this.vaciarLocalStorage();
        this.calcularTotal();
        document.getElementById('qty').innerHTML = 0;
        //window.location.reload(true);
        return false;
        }        
    }

    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS

        localStorage.setItem(tienda, JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;
        //Comprobar si hay algo en LS
        if(localStorage.getItem(tienda) === null){
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem(tienda));
        }
        return productoLS;
    }

    //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> <img src="${producto.imagen}" height=100> </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td> <a href="#" class="borrar-producto" data-id="${producto.id}">borrar</a></td>
            `;
            listaProductos.appendChild(row);
        });
    }



    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        //Añadimos el arreglo actual al LS
        localStorage.setItem(tienda, JSON.stringify(productosLS));
        document.getElementById('qty').innerHTML = productosLS.length;
    }

    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
    }

    //Procesar pedido
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            alert( 'El carrito está vacío, agrega algún producto')
        } else {
            location.href = "compra.html";
        }
    }

    //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad * productosLS[i].factor);
            total = total + element;
        }
        
        igv      = parseFloat(total * 0.21).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "S/. " + subtotal;
        document.getElementById('igv').innerHTML = "S/. " + igv;
        document.getElementById('total').value = "S/. " + total.toFixed(2);
    }

    obtenerEvento(e) {        
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;

            let actualizarMontos = document.querySelectorAll('#subtotales');
            let actualizarUnidades = document.querySelectorAll('#unidades');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML   = Number(cantidad * productosLS[index].precio * productosLS[index].factor);
                    actualizarUnidades[index].innerHTML = Number(cantidad * productosLS[index].factor);
                }    
            });
            localStorage.setItem(tienda, JSON.stringify(productosLS));
            this.calcularTotal();
            
        } else {
            console.log("click afuera");
        }
    }
}