iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;
var arrayNegocios=[]; var arrayCategory=[];

function render(){  
  URL = base_url+'Ecommerce/getProducts/'+iCo;     
  const data = new FormData(); data.append('src', 'data');
  fetch(URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {fillTableContent(texto); })
  .catch(function(err) {console.log(err);});
}
function fillTableContent(texto){
  var linea; var h;       
  if (arrayNegocios.length>0) {obj = texto;
  }else{obj=JSON.parse(texto); arrayNegocios=obj;}
  h=''; i=0; l='';
  filter=`<a href="#" class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2" data-filter="todos"> todos</a>`;
  for (x of obj) {  
    img2=(x.image==null)? 'noimage.jpg': x.image;
    //imgPath=base_url+'Assets/images/uploads/'+img2+'?' + Math.random();
    filterCateg = (x.categoria==null)? 'todos':x.categoria;
    i=i+1;
    if (!arrayCategory.includes(filterCateg)){ //lista de categ
      arrayCategory.push(filterCateg)
      filter+=`<a href="#" class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2" data-filter="${filterCateg}">${filterCateg}</a>`;
    }
    
    h+=`<div class="col-10 col-sm-6 col-lg-4 producto" data-item="${filterCateg}">
          <div class="">
            <div class="img-container">
              <img src="${base_url}Assets/images/uploads/${img2}" width="400" alt="imagen">
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
  document.getElementById('productos').innerHTML = h;
}

const contCategorias = document.querySelector("#categorias");
const contProductos = document.querySelector("#productos");
const CP=contProductos;

(() => {
  render();
  contProductos.addEventListener("click", delegacion);
  contCategorias.addEventListener("click", filtrar);
})();

function filtrar(e) {
  e.preventDefault();
  var keyword = e.target.getAttribute("data-filter");
  filterItems(keyword);  
}

function filterItems(keyword){ //filter
  var items = document.querySelectorAll(".producto");
  console.log(items.length)
  //    contProductos.innerText='';
  items.forEach(function(item){
    item.getAttribute("data-item").toLowerCase().includes(keyword.toLowerCase())
    /* if(!keyword || keyword == 'todos' || item.getAttribute("data-item").toLowerCase().includes(keyword.toLowerCase())){
      contProductos.appendChild(item);
    }  */      
 });
}

function delegacion(e) {
  e.preventDefault();
   console.log(e.target);
  //document.querySelector('body').classList = e.target.classList[1];  //Este codigo agrega una clase al body,  adoptando la del boton 
  //console.log(document.querySelector('.btn'));
}
