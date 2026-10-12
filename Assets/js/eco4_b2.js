iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;
var arrayNegocios=[]; var arrayCategory=[];
render();

function render(){  
  URL = base_url+'Ecommerce/getProducts/'+iCo;     
  const data = new FormData(); data.append('src', 'data');
  fetch(URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {fillTableContent(texto);})
  .catch(function(err) {console.log(err);});
}



function fillTableContent(texto){
  var linea; var h;       
  if (arrayNegocios.length>0) {obj = texto;
  }else{obj=JSON.parse(texto); arrayNegocios=obj;}
  h=''; i=0; l='';
  filter=`<a href="#" class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2" data-filter="all"> todos</a>`;
  for (x of obj) {  
    img2=(x.image==null)? 'noimage.jpg': x.image;
    //imgPath=base_url+'Assets/images/uploads/'+img2+'?' + Math.random();
    filterCateg = (x.categoria==null)? 'todos':x.categoria;
    i=i+1;
    if (!arrayCategory.includes(filterCateg)){ //lista de categ
      l+='<li data-filter=".filter-'+filterCateg.split(' ')[0]+'">'+filterCateg+'</li>'
      arrayCategory.push(filterCateg)
      filter+=`<a href="#" class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2" data-filter="${filterCateg}">${filterCateg}</a>`;
    }
    
    h+=`<div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item ${filterCateg}" data-item="${filterCateg}">
          <div class="card">
            <div class="img-container">
              <img class="card-img-top store-img" src="${base_url}Assets/images/uploads/${img2}" alt="">
              <span class="store-item-icon" data-id="${x.prid}" data-price="${x.precio}" data-title="${x.producto}" data-image="${base_url}Assets/images/uploads/${img2}">
                <i class="fas fa-shopping-cart"></i>
              </span>
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">${x.producto}</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${x.precio}</strong></h5>
              </div>
            </div>
          </div>
          <!-- end of card-->
        </div>`;
  }       
  document.getElementById("categorias").innerHTML = filter;
  document.getElementById('store-items').innerHTML = h;
}



     var itemsContainer = document.getElementById('store-items');
     var items = document.querySelectorAll('#store-items .store-item');
     var buttons = document.querySelectorAll('.sortBtn a');
     var txtSearch = document.getElementById('search-item');   
     var cart = [];

     
     var productItems = document.querySelectorAll('.store-item-icon');
     productItems.forEach(function(item){
        item.addEventListener('click',function(e){
          e.preventDefault();
          console.log(e.target)
          var keyword = e.target.getAttribute("data-id");
          console.log(keyword)
        });
     });


//**********************
class Carrito {

}

const carro = new Carrito();

//**********************
    var cartItems = document.querySelectorAll('.cart-items');
    cartItems.forEach(function(pepe){
        pepe.addEventListener('click',function(e){
          e.preventDefault();
          var keyword = e.target.getAttribute("rid");
          removeCartItem(keyword)
        });
    });

    var cartClearCartEl = document.querySelector('#clear-cart');
    cartClearCartEl.addEventListener('click',function(){clearCart();});

     buttons.forEach(function(button){ //Category
     	button.addEventListener('click', function(e){               
     		e.preventDefault();
     		var keyword = e.target.getAttribute("data-filter");
     		filterItems(keyword);
     	});
     });
     txtSearch.addEventListener('input', function(e){
     	filterItems(e.target.value);
     });
     function filterItems(keyword){ //filter
     	itemsContainer.innerText='';
     	items.forEach(function(item){
     		if(!keyword || keyword == 'all' || item.getAttribute("data-item").toLowerCase().includes(keyword.toLowerCase())){
     			itemsContainer.appendChild(item);
     		}
     	});
     }

     document.getElementById('cart-info').addEventListener('click', function(e){
          cartEl = document.getElementById('cart').classList.toggle('show-cart');
     });

     var productItems =  document.querySelectorAll('.store-item-icon');
     productItems.forEach(function(item){
          item.addEventListener('click', function(e){
               e.preventDefault();               
               var cardEl = e.target.closest('.card');               
               cardEl.classList.add('loading');
               setTimeout(function(){
                    var arr = cart.filter(function(item){
                         return item.id == e.target.dataset.id
                    });          
                    if(arr.length>0){
                         arr[0].quantity++;
                         arr[0].subtotal += parseInt(e.target.dataset.price);
                    }
                    else{
                         cart.push({
                              id:e.target.dataset.id, 
                              quantity:1, 
                              title: e.target.dataset.title, 
                              price: parseInt(e.target.dataset.price), 
                              subtotal: parseInt(e.target.dataset.price), 
                              image: e.target.dataset.image});
                    }                    
                    fillCart();
                    cardEl.classList.remove('loading');
               },400);               
          });
     });



     function fillCart(){
          var cartEl = document.querySelector('.cart-items');
          var cartTotalEl = document.querySelector('#cart-total');
          var itemCountEl = document.querySelector('#item-count');
          var itemTotalEl = document.querySelector('.item-total');
          var cartButtonsEl = document.querySelector('.cart-buttons-container');

          
          cartEl.innerText='';
          cart.forEach(function(item){
               var cartHtml = '<div class="cart-item d-flex justify-content-between text-capitalize my-3">'+
               '<img src="' + item.image + '" class="img-fluid rounded-circle cart-image" id="item-img" alt="">'+
               '<div class="item-text">'+

               '<p id="cart-item-title" class="font-weight-bold mb-0">' + item.title + '</p>'+
               '  <p id="cart-item-price" class="mb-0">$ ' + item.price + '  (' + item.quantity + ' )</p>'+
               '</div>'+
               '<a href="#" class="cart-item-remove" rid="'+item.id+'">'+
               
               '  <i class="fas fa-trash" rid="'+item.id+'"></i>'+
               '</a>'+
               '</div>';
               cartEl.insertAdjacentHTML('beforeend', cartHtml);
          });
          var totalPrice = getTotalPrice();
          cartTotalEl.innerText = totalPrice;
          itemCountEl.innerText = cart.length;
          itemTotalEl.innerText = totalPrice;

          if(cart.length<=0){
               cartButtonsEl.classList.replace('d-flex','d-none');
          } 
          else {
               cartButtonsEl.classList.replace('d-none','d-flex');
          }
     }

     function getTotalPrice(){
          var total = 0;
          cart.forEach(function(item){
               total += item.subtotal
          });
          return total;
     }

     function removeCartItem(id){
          cart = cart.filter(function(item){
               return item.id != id;
          });
          fillCart();
     }

     function clearCart(){
          cart = [];
          fillCart();
     }
