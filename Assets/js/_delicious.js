const Acerca = {
  title: 'Gestión de Inquilinos',
  text1: 'dirigido a:', 
  Items : {
   A: 'Dueños de casa',
   B: 'Inmobiliarias',
   C: 'Administradores',
   D: 'Consorcios'
  }
}
acercaTitle.innerText='La solución ideal para el registro digital de cobranzas y gestión del alquiler de sus propiedades'
  acercaText.innerHTML=`<p>Solo necesita una conexión a internet para estar informado 
    en todo momento de sus cuentas por cobrar, así como de sus unidades disponibles, datos de sus inquilinos, cuentas, etc</p>
    <h5>Es la herramiento ideal para </h5>`
h=''; i=0;
iconClass = ['bx bx-fingerprint', 'bx bx-gift','bx bx-atom'];
Object.entries(Acerca.Items).forEach(([key, value]) => {
	i++; j = (i>iconClass.length)?j=0:i-1;
	h+=`<div class="icon-box" data-aos="zoom-in" data-aos-delay="${i}00">
          <div class="icon"><i class="${iconClass[j]}"></i></div>
          <h4 class="title" style="padding-top:24px;">${value}</h4>
          <p class="description">   &nbsp</p>   </div>`
});
document.getElementById('iconBoxAbout').innerHTML = h;


const Features = {
  fItems : {
   A: 'Habitaciones',   B: 'Departamentos',   C: 'Garages',
   D: 'Oficinas',       E: 'Locales',         F: 'Casas'  }}
  iconClass = ['ri-store-line', 'ri-bar-chart-box-line','ri-calendar-todo-line'];
  h='';
  Object.entries(Features.fItems).forEach(([key, value]) => {
    i++; j = (i>iconClass.length)?j=0:i-1;
    h+=`<div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="${50*i}">
              <i class="${iconClass[j]}" style="color: #ffbb2c;"></i>
              <h3><a href="">${value}</a></h3>
            </div></div>`
  });
  document.getElementById('iconBoxFeatures').innerHTML = h;
