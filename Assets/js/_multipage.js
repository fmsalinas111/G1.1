let params = new URLSearchParams(location.search);
let tokenA = params.get('a');

const Acerca = [
    { prodjid:2,   title: 'Gestión de Inquilinos',  text1: 'dirigido a:', 
      Items : {A: 'Dueños de casa', B: 'Inmobiliarias', C: 'Administradores', D: 'Consorcios'},
      acercaTitle: 'La solución ideal para el registro digital de cobranzas y gestión del alquiler de sus propiedades',
      acercaText: `Solo necesita una conexión a internet para estar informado en todo momento de sus 
                  cuentas por cobrar, así como de sus unidades disponibles, datos de sus inquilinos, cuentas, etc`,
      Features : {A: 'Habitaciones', B: 'Departamentos', C: 'Garages', D: 'Oficinas', E:'Locales', F:'Casas'},
      featuresTitle: 'Unidades funcionales',
    },
    { prodjid:5,   title: 'Gestionando: Tienda virtual',  text1: 'dirigido a:', 
      Items : {A: 'Almacenes', B: 'Indumentaria', C: 'Ferretería', D: 'Otros'},
      acercaTitle: 'La solución ideal para el registro digital de ventas y compras',
      acercaText: `Solo necesita una conexión a internet para estar informado en todo momento de sus 
                  cuentas por cobrar / pagar, así como de sus unidades disponibles, bancos, etc`,
      Features:{},
      featuresTitle: 'Características para negocios',
    }
  
]

h=''; i=0;
iconClass = ['bx bx-fingerprint', 'bx bx-gift','bx bx-atom'];
const foundEl = Acerca.find((myProj)=> myProj.prodjid==tokenA);
acercaTitle.innerText = foundEl['acercaTitle'];
acercaText.innerHTML = foundEl['acercaText'] + `<h5>Es la herramiento ideal para </h5>`;
featuresTitle.innerHTML = foundEl['featuresTitle'];

Object.entries(foundEl.Items).forEach(([key, value]) => {
	i++; j = (i>iconClass.length)?j=0:i-1;
	h+=`<div class="icon-box" data-aos="zoom-in" data-aos-delay="${i}00">
          <div class="icon"><i class="${iconClass[j]}"></i></div>
          <h4 class="title" style="padding-top:24px;">${value}</h4>
          <p class="description">   &nbsp</p>   </div>`
});
document.getElementById('iconBoxAbout').innerHTML = h;

iconClass = ['ri-store-line', 'ri-bar-chart-box-line','ri-calendar-todo-line']; h='';
Object.entries(foundEl.Features).forEach(([key, value]) => {
  i++; j = (i>iconClass.length)?j=0:i-1;
  h+=`<div class="col-lg-3 col-md-4"> <div class="icon-box" data-aos="zoom-in" data-aos-delay="${50*i}">
         <i class="${iconClass[j]}" style="color: #ffbb2c;"></i> <h3><a href="">${value}</a></h3>     </div></div>`
});
document.getElementById('iconBoxFeatures').innerHTML = h;
