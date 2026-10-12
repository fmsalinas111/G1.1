
iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;
var arrayNegocios=[];
var arrayCategory=[];

var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  alertPlaceholder.append(wrapper)
  setTimeout(() => alertPlaceholder.innerHTML='', 800);
}

function render(){  //products
  URL = base_url+'Ecommerce/getProducts/'+iCo;     
  const data = new FormData(); 
  data.append('src', 'data');
  fetch(URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {    //console.log(texto);
    fillTableContent(texto);
  })
  .catch(function(err) {console.log(err);});
}



function page_render(code=''){  //pagedetails from page2
  URL = base_url+'Ecommerce/getPagedetails/'+bid;
  const data = new FormData(); data.append('code', code);
  fetch(URL, {method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {fillPageContent(texto);  })
  .catch(function(err) {console.log(err);});
}



function fillTableContent(texto){ //products
  var linea; var h;       
  if (arrayNegocios.length>0) {obj = texto;
  }else{obj=JSON.parse(texto);    arrayNegocios=obj;}
  h=''    ; y=0; i=0; u='';l='';
  options='';
  filter=`<li data-filter="*" class="filter-active">Todos</li>`
  for (x of obj) {  
    img2=(x.image==null)? 'noimage.jpg': x.image;
    imgPath=base_url+'Assets/images/uploads/'+img2+'?' + Math.random();
    //params ='?factor='+x.factor+'&id='+x.productid+'&name='+x.productname+'&cat='+x.dataname+'&img1='+x.imagename+'&price='+x.price    
    y=y+1; if (y=2) y=0;    
    filterCateg = (x.categoria==null)? '*':x.categoria;
    i=i+1;
    if (!arrayCategory.includes(filterCateg)){ //lista de categ
      l+='<li data-filter=".filter-'+filterCateg.split(' ')[0]+'">'+filterCateg+'</li>'
      arrayCategory.push(filterCateg)
      options += `<option value="${i}">${filterCateg}</option>`;
      filter+=`<li data-filter=".filter-${filterCateg}">${filterCateg}</li>`
    }
    
    h+=`
    <div class="col-lg-4 col-md-6 portfolio-item filter-${filterCateg}">
      <div class="portfolio-wrap">
        <figure style="height:300px;">
          <img src="${base_url}Assets/images/uploads/${img2}" class="img-fluid" alt="${base_url}Assets/images/uploads/noimage.jpg">          
        </figure>
          <h5 style="text-align-last: justify; padding: 8px 6px;">$${x.precio}
          <button class="btn btn-info btn-sm agregar-carrito" id="b${x.prid}">Comprar</button>
          </h5>
        <div class="portfolio-info">
          <input type="hidden" id="${x.prid}" class="prid">           
          <h6 class="precio" style="display:none;"><span>${x.precio}</span></h6>  
          <h4>${x.producto}</h4>
          <h6 class="factor" style="display:none;">${x.multiplo}</h6>
        </div>
      </div>
    </div>  `  
  }       
 
  comboCat = `
    <select name="cmbCat" id="cmbCat"  onchange ="cmbChange(this)" class="form-control">
      <option value="0" selected="">(todos)</option><option style="display:none;"></option>
      ${options}
    </select>`; 
     
  document.getElementById("portfolio-flters").innerHTML = filter;
  document.getElementById('combo_cat').innerHTML = comboCat;
  document.getElementById('tarjeta').innerHTML = h;
  sortDropDownListByText('cmbCat')
}

function fillPageContent(texto){  //pagedet
  var linea; var h;  var i;     
  h='' ; content=''
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
    if (x.code=='servi') {
      document.getElementById('st1').innerHTML=pt[0];
      document.getElementById('st2').innerHTML=pt[2];
      document.getElementById('st3').innerHTML=pt[4];
      document.getElementById('sp1').innerHTML=pt[1];
      document.getElementById('sp2').innerHTML=pt[3];
      document.getElementById('sp3').innerHTML=pt[5];
    }
    if (x.code=='faa') {
      document.getElementById('fq1').innerHTML=pt[0];
      document.getElementById('fa1').innerHTML=pt[1];
      document.getElementById('fq2').innerHTML=pt[2];
      document.getElementById('fa2').innerHTML=pt[3];
      document.getElementById('fq3').innerHTML=pt[4];
      document.getElementById('fa3').innerHTML=pt[5];
      document.getElementById('fq4').innerHTML=pt[6];
      document.getElementById('fa4').innerHTML=pt[7];
      document.getElementById('fq5').innerHTML=pt[8];
      document.getElementById('fa5').innerHTML=pt[9];
    }
  }    
  if (content.length>0) document.getElementById('about-content').innerHTML = content;
}


function pageEdit(code){  
  if(code=='abou') main_code='about-content';
  if(code=='servi')main_code='services';
  if(code=='faa')main_code='faq';
  if(code=='cart')main_code='cart';
  if(code=='products')main_code='portfolio';
  preparaModal(code, main_code);
  showModal();
}

page_render()//page

render();//products


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

