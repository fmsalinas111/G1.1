const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);
form2 = document.querySelector("#form2");
if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}

imgPath = base_url+'Assets/images/logo/';
function validM2(){  arr2={};  
  if (titleModal2.innerText==='Cambiar logo'){
    arr1.campo1=campo20.value;
    fetchMulti(arr1, '','Companies/setLogo', '../Assets/images/logo/',idcampo);
    closeModal2(); return null;
  }
  setField();
  if (arr2.field1.length==0) {alertError ('Campo obligatorio','field1'); return;}
  const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
  fetch_URL = base_url +'Misdatos/sendTicket';  save(fetch_URL, dato); closeModal2()
}

document.addEventListener('DOMContentLoaded', function() {  //intl-tel-input
  /*
  iti = window.intlTelInput(document.querySelector("#campo8"), {    
    onlyCountries: ["ar", "bo", "cl", "pe"], initialCountry: "auto",
    loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"),
  });
  */
})

var arrayRubros=[]; hRubro='';
if (APP===11) {// cambiar a si el url es xmayor
  //divC2.style.display='none';  //rubro comercial
  divC1.classList.add('col-md-9') //nombre del negocio 
  divC5.style.display='none';  //barrio
  divC4.classList.add('col-md-12');//dirección
}

const g1 = data =>{  console.log(data.length);}
gg = getSome3('data/getDefaults', {ar:[10]},g1); 
const g2 = data =>{xx(data);    pintarBline();}

chargeCombo(erps, 'combo_rubro', 'campo2', {selected:'5',  s2:true, placeholder:'erp'});
/*
if (window.location.hostname==='www.xmayor.com.ar'||window.location.hostname==='localhost'){
}else{
  const dataRubro=new FormData(); dataRubro.append('src','data'); 
  getJson(base_url+'Data/getDataCmb/10', dataRubro, 'combo_rubro', 'campo2', 0, 'Rubro', false)
}
*/
const dIva=new FormData(); dIva.append('src','data'); 
getJson(base_url+'Data/getDataCmb/22', dIva, 'combo_iva', 'campo23', 0, 'IVA', false)

hide(['custom-select-wrapper']);
if (document.getElementById('divC15')) { 
  const daGale=new FormData(); daGale.append('src','gallery'); 
  getJson(base_url+'Data/getDataCmb/0', daGale, 'combo_galeria', 'campo15', 0, '- sin galería -', false,'Galería',false,false,-99,true, 'sugerir nueva')
}else{
  //divC8.classList.add('col-md-6');  divC7.classList.add('col-md-6');
}


getSome('Data/getDataByType/15','rubros');
function fillTC(texto, type){
  if (type=='rubros') rubros(texto);
}
function rubros(txt){ 
  for(x of JSON.parse(txt)) {
    arrayRubros.push({rubId:x.fieldId,rubName:x.fieldName});
    //hRubro+=`<label class="px-3"><input type="checkbox" value=${x.dataid}>${arrayRubros[x.dataid]}</label>`;
  }
  //cargar(iCo)
  cargar();
  //document.getElementById('bline-list').innerHTML = hRubro;
}


  //por ahora no se usa barrio
  const dataBarrio = new FormData(); dataBarrio.append('src', 'data');
  f_URL = base_url+'Data/getDataCmb/12';
  getJson(f_URL, dataBarrio, 'combo_barrio', 'campo14', 199, 'Barrio', false)

function cargar(){  //console.log(id)
  const data = new FormData(); 
  data.append('token', 0);
  f_URL = base_url+'companies/getBcard'; 
  fetch(f_URL, {method: 'POST', body: data  })
  .then(function(response) {//console.log(response);
     if(response.ok) { return response.text() } else { throw "Error  Ajax"; }
  })
  .then(function(texto) {  	//console.log(texto);
    var objData = JSON.parse(texto); console.log(objData)
    if (objData.status===true){
    	gId('campo1').value = objData.data.coName;
      if(objData.data.businesscategory>0){
        document.getElementById('campo2').value = objData.data.businesscategory;
        $("#campo2").select2().trigger('change');
      }      
      document.getElementById('campo3').value = objData.data.direccion;
      document.getElementById('campo4').value = objData.data.twitter;
      document.getElementById('campo5').value = objData.data.face;
      document.getElementById('campo6').value = objData.data.insta;
      document.getElementById('campo7').value = objData.data.phone;
      document.getElementById('campo8').value = objData.data.wsp;
      document.getElementById('campo9').value = objData.data.web;
      document.getElementById('campo10').value = objData.data.email;
      document.getElementById('campo11').value = objData.data.stt;
      document.getElementById('campo12').value = objData.data.reseña;
      if (gId('campo14')) campo14.value = objData.data.ciudad;
      if (document.getElementById('campo15'))campo15.value = objData.data.gallery;
      document.getElementById('campo16').value = objData.data.tiktok;
      
      if(!objData.data.logo===''){
        imgLogo = isValidUrl(objData.data.logo)? objData.data.logo: imgPath+objData.data.logo;
        gId('imgLogo').src = imgLogo;
      }

      gId('campo21').value = objData.data.razon;
      gId('campo22').value = objData.data.cuit;
      gId('campo23').value = objData.data.iva;
      gId('campo24').value = objData.data.iibb;
      gId('campo25').value = objData.data.inicio;

      /*if(location.hostname==='www.villacelina.com.ar'||location.hostname==='localhost') 
      document.getElementById('bline-div').classList.add('d-none');*/
      //rubs = objData.data.business_line;  rub =  rubs.split(','); //array
      rubs = objData.data.bline;  rub =  rubs.split(','); 
      arrayRubros.forEach(function(chkRub){sele= (rub.includes(chkRub.rubId.toString()))?'checked':'';
        hRubro+=`<label class="px-3"><input type="checkbox" ${sele} value=${chkRub.rubId} name="rubro">${chkRub.rubName}</label>`; 
      })
      document.getElementById('bline-list').innerHTML = `
      <label class="control-label" style="width: auto; color:blue;" >Sub rubro</label>
      ${hRubro}`;     
    }else{      /*console.log('sin datos ecommerce');    */}
  })
  .catch(function(err) {console.log(err);});
}

document.getElementById('btnGuardar').addEventListener('click', function(){
  if ((document.getElementById('campo4').value).substr(0,24) ==='https://www.twitter.com/') document.getElementById('campo4').value=((document.getElementById('campo4').value).substr(24))
  campo4.value='https://www.twitter.com/'+campo4.value;
  if ((document.getElementById('campo5').value).substr(0,25) ==='https://www.facebook.com/') document.getElementById('campo5').value=((document.getElementById('campo5').value).substr(25))
  campo5.value='https://www.facebook.com/'+campo5.value;
  if ((document.getElementById('campo6').value).substr(0,26) ==='https://www.instagram.com/') document.getElementById('campo6').value=((document.getElementById('campo6').value).substr(26))
  document.getElementById('campo6').value='https://www.instagram.com/'+document.getElementById('campo6').value;
  //if ((document.getElementById('campo8').value).substr(0,2) ==='54') document.getElementById('campo8').value=(document.getElementById('campo8').value).substr(2)
  //document.getElementById('campo8').value='54'+document.getElementById('campo8').value;
  //iti='';
  //itiFull = ((document.querySelector('.iti__a11y-text').textContent)); itiPos = (itiFull.indexOf('+')+1);  //iti = `(${itiFull.substr(itiPos)}) `; 

  document.getElementById('campo8').value = iti.getNumber();
  console.log(campo8.value)
  //console.log(iti.getNumber(intlTelInputUtils.numberFormat.E164));
  //regex
  let texto=document.getElementById('campo1').value;    
  //let patron=/^[ A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9;._*$%"&!()\/-]+$/;   //original
  let patron=/^[A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9;._*$%!()\/-]+$/;   
  if(!patron.test(texto)) {
    alert('nombre no permitido');document.getElementById('campo1').focus(); return null;
  }
  //create bline list
  let casillas = document.querySelectorAll("input[type='checkbox']:checked"); bline=''; arrBline=[];
  casillas.forEach(c =>{ arrBline.push(c.value);})
  bline= arrBline.join(',');

  //comprobar si se ha cambiado el rubro comercial y mostrar info al respecto
    //se cambiarán los punteros al proj13

  //verificar disponibilidad del nombre
  interrumpir_proceso=false;
  const data = new FormData(); data.append('campo1', gId('campo1').value);    
  f_URL = base_url+'companies/verifyPagename'; 
  fetch(f_URL, {method: 'POST', body: data  })
  .then(function(response) {
     if(response.ok) {return response.text() } else { throw "Error  Ajax"; }
  })
  .then(function(texto) {  
    var objData = JSON.parse(texto); 
    if (objData=='permitido' ){
      setCampo(); arr1['campo13']=bline;
      const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
      save(base_url+'companies/setBcard2', dato);
      localStorage.page=gId('campo1').value;
      ref=(gId('markCo').closest('a'))
      ref.href=gId('campo1').value;
      gId('btnCerrar').disabled=false;
    }else{
      alert('Nombre no disponible o no permitido');
      interrumpir_proceso = true;
      document.getElementById('campo1').focus();
    }
  })
  .catch(function(err) {console.log(err);});
})

gId('btnCerrar').addEventListener('click', function(){
  location.href =gId('campo1').value;
})

document.querySelector('#combo_galeria')?.addEventListener("click", newGallery)

function newGallery(e){ et = e.target; inputs=[];
  if((et.tagName==="A")&&et) {
    inputs.push({id:'field1', campo:'Nombre', selector:'input', type:'input', placeholder:'Galería sugerida',label:1});
    inputs.push({id:'field2', campo:'Dirección', selector:'textarea', rows:'2', label:1});

    openModal(inputs,'.inputs2');  titleModal2.innerText='galería nueva';
    document.querySelector('.alert').innerHTML=`<strong>Pendiente: </strong> <span>Su solicitud deberá ser revisada</span>`
    removeClass(['alert','d-none']);
    modal2.show();  
  }
}

function cambiarLogo(e) {
  aaa= e.target; 
  if (aaa&&(aaa.tagName==='A'||aaa.tagName==='I')){
    e.preventDefault(); 
    aaa = (e.target.tagName==='I')? aaa.parentElement.parentElement: aaa.parentElement;
    edtImgName=(aaa.querySelector('img')).src;
    bnrId = aaa.querySelector('a').getAttribute('bnrId');
    editImg(edtImgName, bnrId);  img_elem='imgModal';
    localStorage.setItem('imgToUpld',edtImgName);
    document.getElementById('id').value = bnrId;
  }
}
function editImg(imagen='', bnrId=0, tit=''){
  inputs = []; idcampo="campo20";//para la imagen
  combo3 = setPreview(nuevaImg(imagen,'gallery'), idcampo, imagen);
  inputs.push({id:'combo',  idCmb:combo3})// preview
  openModal(inputs,'.inputs2');  titleModal2.innerText='Cambiar logo';
  modal2.show(); gId('a2').classList.add('d-none')

  /*
  document.querySelector('.alert').innerHTML=`<strong>Pendiente: </strong> <span>Su solicitud deberá ser revisada</span>`
  removeClass(['alert','d-none']);
  modal2.show();  
  */
 }

const beforeSave = data=>{arrAlert=[];   console.log(data)
  switch (data[1]) {
    case 'galería nueva': fetch_URL = base_url +'Misdatos/sendTicket';  break;
    default:console.log('someaction before'); break;
  }
  return arrAlert;
}


const afterSave = data=>{    arrAlert=[];   
    switch (data[1]) {
      case 'setLogo':
        gId('imgLogo').src = imgPath+data[2]['campo20'];
        gId('logo').src = imgPath+data[2]['campo20'];
        const dNewLogo=new FormData(); dNewLogo.append('newLogo', data[2]['campo20']);
        save(base_url+'companies/establecerLogo', dNewLogo);
      break;
      default:console.log('someaction after'); break;
    }
    return arrAlert;
}

const change2 = data=>{ let sPage, titModal, cmb;
  [sPage, titModal, cmb] = data;
  console.log (cmb, parseInt(cmb.value)===292);
  if(parseInt(cmb.value)===292) show(['bline-div']); else hide(['bline-div']);
}




(function() {
  // código básico para imitar un select por defecto:
  function getClosestMatch(target, className) {
    return target.classList.contains(className) ?
       target :
       target.closest('.' + className);
  }

  function getDropdown(target, bypass) {
     if (target.className.startsWith('dropdown-') && !bypass) return;
     return getClosestMatch(target, 'dropdown');
  }
  
  function getDropdownOption(target) {
     return getClosestMatch(target, 'dropdown-option');
  }
  
  function handlePopup(dropdown, close) {
    var popup = dropdown.querySelector('.dropdown-options');
    if (popup) {
        if (close) popup.classList.remove('open');
        else popup.classList.toggle('open');
    }
  }
  
  function toggle(dropdown) {
    if (dropdown) handlePopup(dropdown, false);
    else document.querySelectorAll('.dropdown')
           .forEach(function (item) {
             handlePopup(item, true);
           });
  }
  
  function handleDropdownClick(e) {
    var dropdown = getDropdown(e.target);
    if (dropdown) toggle(dropdown);
    else toggle();
  }
  
  function handleOptionClick(e) {
    var option = getDropdownOption(e.target);

    if (option) {
      var dropdown = getDropdown(option, true);
      dropdown.querySelector('input').value = option.dataset.value;
      dropdown.querySelectorAll('.dropdown-option').forEach(function(op) {
        op.classList.remove('selected');
      });
      option.classList.add('selected');
    }
  }
  
  // con esta función muestras las imágenes de las banderas:
  function displayOptionFlags() {
    document.querySelectorAll('.dropdown-option')
      .forEach(function(option) {
        var flag = option.dataset.flag;
        if (flag) {
          var img = document.createElement('img');
          img.src = flag;
          img.width = 16;
          img.height = 12;
          option.appendChild(img);
        }
      });
  }

  document.addEventListener('click', function(e) {
    handleDropdownClick(e);
    handleOptionClick(e);
  });
  displayOptionFlags();
})();

function validarInput(input) {
  // Eliminar caracteres especiales (&, ") y espacios
  let valor = input.value;
  valor = valor.replace(/[!"#$%&/()=<>/?¡¿+]/g, ''); // Elimina & y "
  valor = valor.replace(/\s/g, '');   // Elimina espacios
  input.value = valor;
}



  const trigger = document.getElementById('trigger-btn');
  const list = document.getElementById('options-list');
  const items = list.querySelectorAll('li');

  // Mostrar/ocultar lista al hacer clic o tocar en Android
  trigger.addEventListener('click', () => {
    list.classList.toggle('show');
  });

  // Seleccionar elemento y cerrar la lista
  items.forEach(item => {
    item.addEventListener('click', () => {
      trigger.textContent = item.textContent; // Cambia el texto del botón
      trigger.style.color = window.getComputedStyle(item).color; // Copia el color
      list.classList.remove('show'); // Oculta la lista
      
      console.log('Seleccionaste:', item.getAttribute('data-value'));
    });
  });

  // Opcional: cerrar si el usuario toca fuera del menú
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      list.classList.remove('show');
    }
  });


  