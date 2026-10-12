
getStoReturn("https://dummyjson.com/products?limit=100",false)
    .then(data=>{products=data.products; pintar( products)});
cont = document.querySelector('.contenedor-productos');
const pintar = (products) => {
    products.forEach(product => {
        const storeItem = document.createElement('div');
            storeItem.innerHTML = `<div class="producto-card">
            <img src="${product.thumbnail}" alt="${product.title}" width="200"  class="producto-imagen">
            <div class="producto-info">
                <div class="producto-nombre"><h5>${product.title}</h5></div>
                <div class="producto-precio">${product.price.toFixed(2)}</div>
                <button class="boton-agregar" data-id="${product.id}">Agregar al carrito</button>
            </div>      </div>`;
        cont.appendChild(storeItem);    
    });
}
