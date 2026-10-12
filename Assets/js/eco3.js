iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;
var arrayNegocios=[]; var arrayCategory=[];
grid='';
render();

function render(){  
  URL = base_url+'Ecommerce/getProducts/'+iCo;     
  const data = new FormData(); 
  data.append('src', 'data');
  fetch(URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {    //console.log(texto);
    fillTableContent(texto);

	grid = new Muuri('.grid', {
		layout: {rounding: false}
	});

  })
  .catch(function(err) {console.log(err);});
}

function fillTableContent(texto){
  var linea; var h;       
  if (arrayNegocios.length>0) {obj = texto;
  }else{obj=JSON.parse(texto);    arrayNegocios=obj;}
  h=''; i=0; u='';l='';
  filter=`<a href="#" class="activo">Todos</a>`;
  for (x of obj) {  
    img2=(x.image==null)? 'noimage.jpg': x.image;
    imgPath=base_url+'Assets/images/uploads/'+img2+'?' + Math.random();

    filterCateg = (x.categoria==null)? 'todos':x.categoria;
    i=i+1;
    if (!arrayCategory.includes(filterCateg)){ //lista de categ
      l+='<li data-filter=".filter-'+filterCateg.split(' ')[0]+'">'+filterCateg+'</li>'
      arrayCategory.push(filterCateg)
      filter+=`<a href="#">${filterCateg}</a>`;
    }
    
    h+=`
    	<div class="item" 
				 data-categoria="${filterCateg}"
				 data-etiquetas="ciudades autos carros calles"
				 data-descripcion="1.- Lorem ipsum dolor sit amet consectetur."
			>
				<div class="item-contenido">
					<img src="${base_url}Assets/images/uploads/${img2}" alt="">
				</div>
			</div>`;
  }       
  document.getElementById("categorias").innerHTML = filter;
  document.getElementById('grid').innerHTML = h;
  
}


window.addEventListener('load', () => {

	document.getElementById('grid').classList.add('imagenes-cargadas');
	// Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');
			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	// Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});