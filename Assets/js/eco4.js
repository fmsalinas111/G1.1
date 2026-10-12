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

function page_render(code=''){  
  URL = base_url+'Ecommerce/getPagedetails/'+bid;
  const data = new FormData(); data.append('code', code);
  fetch(URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {  fillPageContent(texto);  })
  .catch(function(err) {console.log(err);});
}


function fillTableContent(texto){
  var linea; var h;       
  if (arrayNegocios.length>0) {obj = texto;
  }else{obj=JSON.parse(texto); arrayNegocios=obj;}
  h=''; i=0; l='';
  filter=`<a href="#" class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2" data-filter="all"> todos</a>`;
  for (x of obj) {  
    img2=(x.image==null||x.image.length==0)? 'noimage.jpg': x.image;
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


function fillPageContent(texto){
  content=''
  obj=JSON.parse(texto);   
  for (x of obj) {        
    pt = (x.pagetext).split('|');
    if (x.code=='abou') content=`      
      <h2><b class="abou">${pt[0]}</b> 
      </h2><h3 class="abou">${pt[1]}</h3>
      <p class="abou">${pt[2]}</p><p class="abou">${pt[3]}</p>
      <ul>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[4]}</li>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[5]}</li>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[6]}</li>
      </ul>
    `
  }    
  if (content.length>0) document.getElementById('about-content').innerHTML = content;
}

document.addEventListener('DOMContentLoaded', function() {
     var itemsContainer = document.getElementById('store-items');
     var items = document.querySelectorAll('#store-items .store-item');
     var buttons = document.querySelectorAll('.sortBtn a');
     var txtSearch = document.getElementById('search-item');   
     var cart = [];

     
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

     document.querySelectorAll('.store-item-icon').forEach(function(item){
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
});



function pageEdit(code){  
  if(code=='abou') main_code='about-content';
  if(code=='servi')main_code='services';
  if(code=='faa')main_code='faq';
  if(code=='cart')main_code='cart';
  if(code=='products')main_code='portfolio';
  preparaModal(code, main_code);
  showModal();
}

function preparaModal(code, main_code){
  //console.log(code, main_code)
  let content = document.getElementById(main_code);
  let items = content.getElementsByClassName(code);
  let data = [].map.call(items, item => item.textContent);
  inputs = []; h=''; j=0;
  lbls = ['','Título', 'Subtítulo', 'Párrafo 1', 'Párrafo 2', 'op 1', 'op 2', 'op 3'];titModal='Presentación';
  if (main_code=='services') {lbls =['',
      'Título servicio 1','Descripción servicio 1',
      'Título servicio 2','Descripción servicio 2',
      'Título servicio 3','Descripción servicio 3'];titModal='Servicios';}
  if (main_code=='faq') {lbls =['',
      'pregunta 1','Respuesta 1',
      'pregunta 2','Respuesta 2',
      'pregunta 3','Respuesta 3',
      'pregunta 4','Respuesta 4',
      'pregunta 5','Respuesta 5'];titModal = 'Preguntas frecuentes';}
  if (main_code=='cart') {lbls =['',
      'Mayorista','Descripción servicio 1',
      'Minorista','Descripción servicio 2',
      'Otro','Descripción servicio 3'];titModal='Carrito';}
  if (main_code=='portfolio') {
    ht=`<fieldset>
          <legend>Altura de imagen (px)</legend>
          <input type="radio" name="altura" value="2" id="campo1"> 200</input>
          <input type="radio" name="altura" value="3" id="campo2" checked> 300</input>
          <input type="radio" name="altura" value="4" id="campo3"> 400</input>
        </fieldset>`;
      inputs.push({id:'combo', idCmb:ht});
      inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:code, disabled:'' }) 
      inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:bid, disabled:'' })  
      openModal(inputs);
      document.querySelector('#titleModal').innerHTML='Productos';

      return null;
  }

  
  for(var i=0; i<data.length;i++){ 
    j++;
    //console.log(data[i]);
    inputs.push({id: 'campo'+j, campo:lbls[j],selector:'input',type:'text',placeholder:'Presentación', value:data[i], label:1})
  }  
  inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:code, disabled:'' }) 
  inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:bid, disabled:'' })  
  /*
    data.forEach(element =>     
    inputs.push({id: 'campo' ,campo:'Título ',selector:'input',type:'text',placeholder:'Presentación', value:element, label:1})
    );
  */
  openModal(inputs);
  document.querySelector('#titleModal').innerHTML=titModal;
}