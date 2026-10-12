arr1=new Object();
var img_elem;       var atAction;     var idcampo;        
var client_type;    var table;        var edtImgName='';

htR1 =`<div class="row ">`;       htR2 =`</div>`;
ht2  =`<div class="col-md-2">`;   ht3  =`<div class="col-md-3">`;   ht4  =`<div class="col-md-4">`;   
ht5  =`<div class="col-md-5">`;   ht6  =`<div class="col-md-6">`;   ht7  =`<div class="col-md-7">`; 
ht8  =`<div class="col-md-8">`;   ht9  =`<div class="col-md-9">`;   ht10 =`<div class="col-md-10">`;

function drawForm(inputs, h=''){
  inputs.forEach(function(input, index) {
    if (input.label==null){label=''}else{label=`<label class="control-label" style="width: auto;" id="lbl_${input.id}"for="${input.id}">${input.campo}</label>`}
    placeholder = (input.placeholder==null)? '':` placeholder = "${input.placeholder}"`;
    type        = (input.type==null)       ? '':` type = "${input.type}" `;
    value       = (input.value==null)      ? '':` value = "${input.value}"`;
    step        = (input.step==null)       ? '':` step = "${input.step}"`;
    disabled    = (input.disabled==null)   ? '':` disabled = "${input.disabled}"`;
    required    = (input.required==null)   ? '':` required = "${input.required}"`;
    pattern     = (input.pattern==null)    ? '':` pattern = "${input.pattern}"`;
    autofocus   = (input.autofocus==null)  ? '':` autofocus = "${input.autofocus}"`;
    onkey       = (input.onkeypress==null) ? '':` onkeypress = "${input.onkeypress}"`;
    //oninput       = (input.oninput==null) ? '':` oninput = "${input.oninput}"`;
    innerHTML   = (input.innerHTML)     ? (input.innerHTML.trim()):'';
    rows        = (input.rows==null)    ? '':`rows = "${input.rows}"`;
    isArea      = (input.rows==null)    ? '':`${innerHTML}</textarea>`;
    col         = (input.col==null)     ? 'col-md-12':`${input.col}`;
    div         = (input.div==null)     ? '':`${input.div}`;
    if (input.id=='combo') {h+=input.idCmb; 
    }else{  
      if (input.id=='html'){h+=input.idHt; 
      }else{h+=
        `<div class="form-group ${col}">  ${label}
            <${input.selector} class="form-control ${col}" id="${input.id}" name="${input.id.substr(0,5)}" 
            ${type}${value}${placeholder}${required} ${pattern} ${onkey} ${step}  ${disabled}${rows}>${isArea}
         </div>`;         
      }
    }
  });
  return h;  
}

function openModal(inputs, bodyModal='.inputs'){
  if ((Number(document.getElementById('id').value))==0) {      
    document.querySelector('.modal-header').classList.replace("headerUpdate","headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info","btn-primary");
    document.querySelector('#btnText').innerHTML ="Guardar"; //Cambiamos el texto
    document.querySelector('#titleModal').innerHTML ="Nuevo"; //Cambiamos el titulo
  }else{
    document.querySelector('.modal-header').classList.replace("headerRegister","headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-info","btn-secondary");
    document.querySelector('#btnText').innerHTML ="Actualizar"; 
    document.querySelector('#titleModal').innerHTML ="Editar"; 
  } 
  if(inputs) document.querySelector(bodyModal).innerHTML= drawForm(inputs);
}

function showModal(showDel, size){
  if (size) document.getElementById('role').classList.add(size);
  for (const item of document.querySelectorAll('.modalButton')) {
    (item.classList.remove("disabled")); (item.classList.remove("d-none"));
  }; 
  document.getElementById('alert1').classList.add('d-none');//ocultar alert
  document.getElementById('btnClose').disabled=false;
  //$('#modalForm').modal({backdrop:'static',keyboard:false}); //$("#modalForm").modal('show');  
  modal.show();
  //document.getElementById('campo1').focus();
  //if (showDel) document.getElementById('btnDelete').classList.remove("d-none")
  document.getElementById('btnDelete').style.display=(showDel)?'inline':'none';
}

var myModal=document.getElementById("modalForm");
var modal = new bootstrap.Modal(myModal);

const removeClassEdited = data=>{document.querySelectorAll('.'+data).forEach(b=>{b.classList.remove(data)})}
const addClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.add(data[1])})}
const removeClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.remove(data[1])});}
function closeModal(){
  modal.hide();
  document.querySelector('#form').reset();  document.getElementById('id').value = '';
  document.getElementById('btnCopyNew').classList.add('d-none');
  document.querySelector('#btnActionForm').setAttribute('disabled','')
  removeClassEdited('edited');
  if (table) table.ajax.reload();
  updating = false;
}
function closeModal2(){
  modal2.hide(); document.querySelector('#form2').reset(); id2.value = '';}

function setCampo(titModal,sPage ){
  if (sPage=='Products'){
    if(titModal=='Configuración' ) {
      campo6 = document.querySelector('input[name="img_layout"]:checked').value;
      arr1['campo6']= document.querySelector('input[name="img_layout"]:checked').value;
    }else{
      if (titModal=='Edición múltiple') {        
        prids=items.querySelectorAll("input[type='checkbox']:checked");lstPrids=[];
        prids.forEach(c =>{lstPrids.push(c.value)})
        arr1['campo3']=lstPrids.toString();
        let blprod=document.getElementById('contRubrosMulti');listChcks =[];
        casillas = blprod.querySelectorAll("input[type='checkbox']:checked");
        casillas.forEach(c =>{listChcks.push(c.value)})
        arr1['campo11']=listChcks.toString();
        document.getElementById('id').value='m';
      }else{
        campo4=(document.getElementById('campo4').checked)?1:0;
        if (document.getElementById('bline-prod')) {
        blprod=document.getElementById('bline-prod');listChcks =[];
        casillas=blprod.querySelectorAll("input[type='checkbox']:checked");
        casillas.forEach(c =>{listChcks.push(c.value)})
        arr1['campo11']=listChcks.toString();}
      }
    }
  }
 
  id = (document.getElementById('id'))? document.getElementById('id').value:0 
  campos=document.getElementsByName("campo"); arr=[]; 
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id; valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (campos.item(i).type==='checkbox'&&primera(titModal)==='Notificación') {
      valor = (campos.item(i).checked)?campos.item(i).getAttribute('data-id'):0;
      console.log(campos.item(i).getAttribute('data-id'))
    }
    if (valor.length==0&&i==0)valor='';
    arr.push (valor); //check to del
    arr1[clave]=valor;    //console.log([clave], valor);
  } 
  arr1['id']=id;
  arr1['clType']=localStorage.getItem('cppm'); arr1['clid']=localStorage.getItem('xcli')
  if (sPage=='Products'&&titModal=='Configuración')arr1['campo6']= document.querySelector('input[name="img_layout"]:checked').value;  
}

function save(fetch_URL, data, cmb){      
  var sPath = window.location.pathname;
  var sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
  sPage = sPage1.charAt(0).toUpperCase() + sPage1.slice(1);
  hideModal=1;

  fetch(fetch_URL, { method: 'POST', body: data})
  .then(function(response) {   //console.log(response)
    if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {  //console.log(texto, cmb) 
    var objData = JSON.parse(texto);
    localStorage.setItem('newIndex', objData.newIndex);
    if (cmb){ //si el origen es un combo Adr agrega el nuevo dato al select
      if (cmb.substring(0,5)==='image') {
        img_elem=cmb.substring(6);
        console.log(cmb, img_elem+'test image ');
        //document.getElementById(img_elem).setAttribute("src", base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime() );
      }else{
        newIndex=objData.newIndex;
        mySelect=document.getElementById(cmb);
        mySelect.options[mySelect.options.length] = new Option(newData, newIndex);
        sortDropDownListByText(cmb);
        hideModal=0; 
      }
    }
    if(document.getElementById("animate")){
      const div = document.getElementById("animate");
      div.style.display='block';  div.innerHTML = objData.msg;
      div.animate({opacity: 0 }, {  duration: 2000,
        easing: "linear", iterations: 1, fill: "both"
        }) .onfinish = function() {
        //console.log(div.style.opacity);
      }
    }else{
      alert(objData.msg);
      if(sPage=='Access_token' && objData.status) window.location.href = base_url+"/login";
    }
    
    let model=fetch_URL.split("/").pop();
    if (objData.status) {  
      //console.log(arr1)  //
      //console.log(model, fetch_URL);
      //if (fetch_URL.split("/").pop()=='setCpaco')localStorage.setItem('newPYD', objData.newIndex;

      if (document.title=="Ecommerce") {
        if(model=='Presupuesto'){cart.vaciar(); window.location.href = base_url+"buysal";}
        if(model=='Venta'){cart.vaciar();}
        if(model=='setBanne')getSome('Ecommerce/getCarousel/'+iCo,'banner');
      }
      if(model=='pedido'){cart.vaciar();}
      if (model=='changeMyapp') window.location.href = base_url+"home"; 
      if (model=='passRecovery') {hideModal=0;prepareToSend(objData.newIndex)} 
      //if (model=='setImage'&&sPage1=='s_legajo') getSome('Sco/GetParents/'+xcli,'parents');
      if (sPage1=='s_legajo'&&primera(titModal)==='Foto'){getSome('Sco/GetLegajo/'+xcli,'legajo');closeModal();return null;}
      if (sPage1=='s_legajo')getSome('Sco/GetParents/'+xcli,'parents');

      if (model==='setSubcateg') {drawTableDetails(document.getElementById('id').value); closeModal2(); return}

      if (model=='delBuysa'||model=='delInventor'||model=='delSubcat') { drawTableDetails(document.getElementById('id').value);return null;}
      if (model=='setDetails') {drawTableDetails(document.getElementById('id').value); closeModal2();return;}
      if (model=='setProdDetails'){drawTableDetails(document.getElementById('id').value); closeModal2();return;}

      if (model==='setProduct'){
            if(titModal!=='Edición múltiple') tEdit(objData.newIndex); else window.location.reload();
          } 
      if (model==='toggleVisible') tVisible([arr1.id,arr1.campo1]);
      if (model==='delProduct') window.location.reload();
      if (model==='setInventor') getSome('inventory/getBalance/'+tipoProd,'saldos');      
      if (model==='setProductIncome') {
          drawTableDetails(document.getElementById('id').value);field3.select(); return;}
      if (model==='rto') {hideModal=0; document.getElementById('id').value=objData.newIndex;}

      if (model=='setContract') getSome('Hm/updtHM');
      if (sPage1=='companies') window.location.reload();
      if (model=='setBcard') document.getElementById('markCo').innerText=document.getElementById('campo1').value;
      if (hideModal==1&&(document.getElementById('modalForm')) ) closeModal()       
    }else{      //alert(objData.msg);
      if(model==='setMicuent') {
        for (const item of document.querySelectorAll('.modalButton')) {
          (item.classList.remove("disabled")); (item.classList.remove("d-none"));
        }; 
        hideModal=0;
        document.getElementById('alert1').classList.add('d-none');}
      if (hideModal==1&&(document.getElementById('modalForm')) ) closeModal()       
    }
  })
  .catch(function(err) {console.log(err);});
}

function alertError(msgError, elemento){alert(msgError); document.getElementById(elemento).focus();}

function sav0(){  
  pageReload=false;
  titModal = (document.querySelector('#titleModal'))?document.querySelector('#titleModal').innerHTML:''
  var sPath = window.location.pathname;  var sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
  sPage = sPage1.charAt(0).toUpperCase() + sPage1.slice(1);
  fetch_URL=base_url+sPage+'/set'+sPage.slice(0,-1); fetch_UPLD=base_url+'Controllers/upload.php'; 
  //console.log(sPage,sPage1, fetch_URL)
  setCampo(titModal,sPage);
  if (sPage1==='micuenta') {
    if (titModal==='Cambiar clave') {
      if (!verificarCambioClave()) return null;
    }
  }
  if (titModal == 'Recuperar contraseña') fetch_URL = base_url +'Access_token/passRecovery';
  if (titModal==='killer') {tokill();closeModal(); return null;}
  if (titModal!=='Configuración') {
    if ((arr1['campo1'].length==0||arr1['campo1']==0)&&document.title!=="Ecommerce") {alertError('Campo obligatorio','campo1');return null;}
  }else{
    //if ((arr1.campo1.length==0||arr1.campo1==0)) {alertError('Campo obligatorio','campo1');return null;}
  }
  if (sPage1== 'k_turnos') {document.getElementById('campo6').value = localStorage.precio}
  
  if (sPage1=='k_turnos2'&titModal=='Turnos') {
    if (campo4.value==0) {alertError('campo obligatorio','campo4');return null;}
  }

  if (titModal=='Confirmar pedido') {
    if (campo1.value==0) {alertError('Seleccione un cliente','campo1');return;} 
    const dPed=new FormData();
    dPed.append('changuito',JSON.stringify(changuito)); dPed.append('campos',JSON.stringify(arr1));
    save(base_url+'Pedidos_tex/setPedido/pedido', dPed); return;
  } 

  if (titModal=='Presupuesto'|| titModal=='Venta') {
    if (campo1.value==0) {alertError('Seleccione un cliente','campo1');return;} 
    if (titModal==='Venta') if (campo5.value==0&&!campo11.checked) {alertError('Seleccione un banco','campo5');return;} 
    const datPresu = new FormData(); 
    if (document.title=="Ecommerce") datPresu.append('changuito',JSON.stringify(changuito)); 
    else datPresu.append('changuito',[]);//to check
    datPresu.append('campos',JSON.stringify(arr1));
    save(base_url+'Buysal/setBuysal/'+titModal, datPresu); return;
  } 
  //clprpames

  if (titModal == 'Micro sitio') fetch_URL = base_url +'Access_token/setToken';   
  if (sPage1 == 'k_hisconsultas') fetch_URL = base_url +'K_consultation/setK_consultatio';   
  
  if (sPage == 'G_production')   {
    fetch_URL = base_url +'G_production/setG_prod'; 
    if (campo1==0) {alertError('Seleccione un producto','campo3');return null;} 
  }
  //hm
  if (titModal == 'Alquilar') {
    fetch_URL = base_url +'Ufs/setContract';
    if (campo3.value==0) {alertError('Campo obligatorio (Inquilino/a)','campo3');return;} 
  }
  if (titModal==='Cargo'&&sPage1=='Ctactes') {fetchMulti(arr1, 'cpacos/setCargo'); return;}
  if (sPage1=='Ctactes') fetch_URL = base_url +'Cpacos/setCpaco';
  if (sPage1=='cpacos'||sPage1=='Ctactes' ) { //cobrar o pagar
    if (campo3.value<=0) {alertError('Importe inválido','campo3');return ;}
    if (campo4.value==0) {alertError('Seleccione una caja o banco','campo4');return ;}
    localStorage.setItem('dbk',document.getElementById('campo4').value);
      fetchMulti(arr1, 'cpacos/setCpaco','Cpacos/setImage', '../Assets/images/hm/',idcampo); 
      return;}
  
  if (sPage1=='s_legajo'&&primera(titModal)==='Foto') {fetchMulti(arr1, 'Sco/setFoto','Sco/setFoto', '../Assets/images/legajo/',idcampo); return null;}
  if (sPage1=='s_legajo'&&primera(titModal)==='Notificación') {fetch_URL='Sco/sendNotify'}
  if (sPage1=='s_legajo'&&primera(titModal)==='Familiares')  {fetchMulti(arr1, 'Sco/setParent','Sco/setImage', '../Assets/images/legajo/',idcampo); return null; }

  if (document.title=="Ecommerce"){
    fetch_URL=base_url+'ecommerce/setEcommerce'; 
    if (titModal=='Productos')fetch_URL=base_url+'ecommerce/setAlturaImagen'; 
    if (titModal=='Secciones'){
      fetch_URL=base_url+'ecommerce/setSections';
      sec = ''+arr1.campo1+arr1.campo2+arr1.campo3+arr1.campo4+arr1.campo5;
      showSection();
    }
    if (titModal==='Cobrar') {alert('cobrar desde eco');return}
    //if (campo1.length==0 || campo1==0) {alertError('Debe subir una imagen o escribir su enlace','campo1');return null;}    
    if (titModal=='Imagen principal'){fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return null;}

  }

  if (sPage1=='orden'   )  {fetchMulti(arr1, 'Orden/setOrden','Orden/setImage', '../Assets/images/torepair/',idcampo); return null;}
  if (sPage1=='companies') {fetchMulti(arr1, '','Companies/setCompanie', '../Assets/images/logo/',idcampo); return null;}
  if (sPage1=='k_imagenes'){fetchMulti(arr1, '','K_imagenes/setImagePatient', '../Assets/images/klk/',idcampo); return null;}
  if (sPage1=='products'&& titModal!=='Configuración'){
    if(titModal!=='Edición múltiple'&&APP!==13){fetchMulti(arr1, '','Products/setProduct', '../Assets/images/uploads/',idcampo); return}}

  if (sPage==='Products'&& titModal==='Configuración'){
    document.getElementById('btnConfig').setAttribute('prodconfig',''+arr1.campo1+arr1.campo2+arr1.campo3+arr1.campo4+arr1.campo5+arr1.campo6)
    fetch_URL=base_url+'Products/setConfig';
  }


  if (sPage1=='banner')    {fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return null;}
  //
  if (sPage1=='inventory') {
    if (campo2.value==0) {alertError('Campo obligatorio','campo2');return null;}
    if ((campo3.value)==0) {alertError('Campo obligatorio','campo3');return null;}
    if(APP===13) {fetch_URL=base_url+'Inventory/setOrder';}
    //if ((campo4.value)==0) {alertError('Ingrese un valor','campo4');return null;}
    //if (campo3.value + campo4.value==0) {alertError('cantidad inválida','campo3');return null;} 
  }

  if (titModal == 'Cobrar' && sPage1=='k_turnos2') {
    fetch_URL = base_url +'Klinike/setPago_consulta';
    var combo = document.getElementById("campo3");
    if (combo.options.length<2) {alert('no hay productos o servicios registrados, Cancele ésta operación y registre uno desde Datos:productos...');return null;}
    if (combo.value==0) {alert('seleccione el arancel');combo.focus();return null}
    //if (campo.length==0) {alert('campo obligatorio');document.getElementById('campo1').focus();return null;}
    var selected = combo.options[combo.selectedIndex].text;
    campo3 = combo.options[combo.selectedIndex].text;
    campo3 = campo3.substring(-1,campo3.indexOf(':'));
    campo1 = campo5;
    if(document.getElementById('campo4').options.length<2){
      alert('no hay cajas o bancos registrados, Cancele ésta operación y registre uno desde Datos:Bancos');return null;}
    localStorage.setItem('dbk', campo4);
  }
  //
  if (sPage.toLowerCase()=='bancos'){fetch_URL=base_url+'Data/setData'; campo4=localStorage.getItem('dttp')}
  if (sPage.toLowerCase()=='datos') {fetch_URL=base_url+'Data/setData'; campo4=localStorage.getItem('dttp')}

  //prepare to save
  clType = localStorage.getItem('cppm')
  const data = new FormData();
    data.append('campos', JSON.stringify(arr1));
    for (const item of document.querySelectorAll('.modalButton')) {
      item.classList.add("disabled");
      item.classList.add("d-none");
    } 
    if (document.getElementById('btnClose')) document.getElementById('btnClose').disabled=true;    
  if (document.getElementById('alert1')){document.getElementById('alert1').classList.remove('d-none');}
  //prepare to save: end
  
  save(fetch_URL, data); 
  if(pageReload) window.location.reload();

  //if (document.title=="Ecommerce") window.location.reload();
  if (document.getElementById('id')) document.getElementById('id').value = '';
}

function fetchMulti(arr1, fetch_URL, fetch_setImg, imgTarget, campoImg){
  document.getElementById('alert1').classList.remove('d-none');
  const datMulti = new FormData(); datMulti.append('campos',JSON.stringify(arr1));
  if(fetch_URL.length>0) save(base_url+fetch_URL, datMulti); 
  if (document.getElementById(campoImg).value.length>0 && edtImgName.length==0) { //si imagen, no link
    if (defineSubirImagen()){
      imgName = localStorage.getItem('imgToUpld');
      record_id = document.getElementById('id').value;// anterior imagen (si hay, para borrar)
      subirImagen(fetch_UPLD, imgTarget, base_url+fetch_setImg, imgName, imgSubir, record_id);
    }else{save(base_url+fetch_setImg, datMulti); console.log('track4')}
  }else{    
    if(fetch_setImg.length>0) save(base_url+fetch_setImg, datMulti); 
  }
}

function prepare_to_save(arr1){
  clType = localStorage.getItem('cppm')
  const data = new FormData();
    data.append('campos', JSON.stringify(arr1));
    for (const item of document.querySelectorAll('.modalButton')) {
      item.classList.add("disabled");
      item.classList.add("d-none");
    } document.getElementById('btnClose').disabled=true;    
  document.getElementById('alert1').classList.remove('d-none');//mostrar alert 
  return data;   
}

var form, updating = false
if (document.querySelector("#form")) {
	form = document.querySelector("#form");
	form.onsubmit = function(e){
    if (!updating) {
	    e.preventDefault();
      updating=true;
      sav0();}}
}

function LSprod_source(valor){localStorage.setItem('prod_source', valor);}

function setXslt(op){
  localStorage.setItem('cppm', op);
  localStorage.setItem('showInactive', false);
  ssn(false, 'showInactive');  
}  
//tipo de cliente
function setXCli(clave,op){localStorage.setItem(clave, op); }  //xcliente/mail/id

function setDTp (op){ localStorage.setItem('dttp', op); } 
function setAcc (op){ localStorage.setItem('acco', op); } 

function removeLS(varName){localStorage.removeItem(varName);}

function getTbl(fetch_URL, data, el){  //getSome(fetch_URL, data)
  fetch(fetch_URL, { method: 'POST', body: data})
  .then(function(response) {
    if(response.ok) return response.text(); else throw "Ajax error";
  })
  .then(function(texto) { //console.log(texto);
    cargarTabla(JSON.parse(texto), el);
  })
  .catch(function(err)  {console.log(err);  });
}

function getJson(fetch_URL, data, el, campo, selected, defValue, disabled, label='',hidden, required){
  fetch(fetch_URL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) { return response.text(); } else { throw "Error Ajax";  }
  })
  .then(function(texto) { //console.log(texto);
    cargarCombo(texto, el, campo, selected, defValue, disabled, label, hidden, required);
    if(actionA1) actionA1(el,campo);
  })
  .catch(function(err)  {console.log(err);  });
}

function cargarCombo(texto, el, campo, selected, defValue, disabled=false, label='', hidden=true, required=false ){
  disabled=(disabled)?'disabled':''; 
  required=(required)?'required':'';
  hidden = (hidden)?' hidden ':'';
  h=`<option selected ${hidden} value="0">${defValue}</option>`; 
  obj=JSON.parse(texto);
  for (x of obj) { 
    sele = (x.fieldId==selected)?  'selected':''; 
    h+=`<option value ="${x.fieldId}" ${sele}  aux="${x.aux}">${x.fieldName}</option>`; 
  }
  if (label.length>0) label=`<label>${label}</label>`;
  document.getElementById(el).innerHTML = `${label}
    <select id="${campo}" name="${campo.substring(0,5)}" ${disabled} class="form-control selectEl" 
    onchange ="cmbChange2(${campo})" ${required}> ${h} </select>`;  
}

var full_options=[]

function cmbChange2(cmb){ 
  titModal = (document.querySelector('#titleModal'))?document.querySelector('#titleModal').innerHTML:''
  var sPath = window.location.pathname;    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1); 
  if (cmb.id=='cmbCat') filtrandoJSon('rubroid',cmb.value);//rubro en galería
  if (cmb.id=='cmbCatInventory') {filterTable();}//filtro inventory
  if (cmb.id=='campo1'&&titModal=='Edición múltiple') {//edición múltiple de productos
    switch (document.getElementById('campo1').value){
      case '4':
        document.getElementById('cmbCategoría').classList.remove('d-none');
        document.getElementById('txtValor').classList.add('d-none');
        document.getElementById('contRubrosMulti').classList.add('d-none');
      break;
      case '5':
        document.getElementById('contRubrosMulti').classList.remove('d-none');
        document.getElementById('cmbCategoría').classList.add('d-none');
        document.getElementById('txtValor').classList.add('d-none');
      break;
      default:
        document.getElementById('contRubrosMulti').classList.add('d-none');
        document.getElementById('cmbCategoría').classList.add('d-none');
        document.getElementById('txtValor').classList.remove('d-none');        
      break;
    }
  }
  
  if (sPage=='cpacos') {
    if (cmb.id=='cmbCliente') {
      var combo = document.getElementById(cmb);
      localStorage.setItem('cmbCli',combo.value)
      const select = document.getElementById('cmbProducto');
      const options = Array.from(select.options);
      if (full_options.length==0) full_options = options;
      const input = document.getElementById('cmbCliente').value;    
      filterOptions(select, options,input, full_options)
      document.getElementById('cmbProducto').disabled=false;    
    }
    if (cmb.id=='cmbProducto') {
      //alert('uiuiu')
    }
  }
  if (cmb.id=='campo6'&&sPage=='banner') {//console.log(document.getElementById(cmb).value)
    const cmbVal = document.getElementById(cmb).value;    
    if (cmbVal==1) {
      document.getElementById('campo3').style.display='none';    
      document.getElementById('campo4').style.display='none';    
    }
  }
  if (sPage==='products'&&APP===13) {
    if (cmb.id==='campo7') cargarHijos([cmb.value]);
    if (cmb.id==='campo6') sugerirNombre();
    //al seleccionar un dad element agregar la clase d-none a todos los option de subcat
    //remover la clase d-none a los elementos cuyo atributo sea igual al dad seleccionado
  }

}


function hoy(option){
    var fecha = new Date();   var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate();   var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)    dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)    mes='0'+mes; //agrega cero si el menor de 10
    if (option) {
      if (option=='h') 
        var hora = fecha.getHours(); var minuto = fecha.getMinutes()
        if (hora<10) hora='0'+hora;
        if (minuto<10) minuto='0'+minuto;
        //return fecha.getHours() + ':' + fecha.getMinutes()
        return hora + ':' + minuto;
    } else {return ano+"-"+mes+"-"+dia;}
}

function subirImagen(f_url, target='', targetData='', imgName='', bGuardaImagen, record_id){
  f_url  = base_url+'Controllers/upload.php'; 
  nuevaImagen = imgName;
  const dato  = new FormData(formUpload);  
    dato.append('id', nuevaImagen); dato.append('uploadPath',target);
  fetch(f_url, {method:'POST', body: dato})
  .then(function(response) {  
    if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    var objData = JSON.parse(texto);
    if (objData.status) {
      console.log(objData)
      previewElement=document.getElementById(img_elem);
      if (previewElement) previewElement.src= 
          base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime();
      if (atAction=='editarLogo') {
        document.getElementById('logo').setAttribute("src", base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime() )
        localStorage.setItem('imgLogo',objData.msg)
      }
      if (atAction=='editar_imgMain') document.getElementById('imgMain').setAttribute("src", base_url+"Assets/images/bnr/"+objData.msg+"?"+ new Date().getTime());

      arr1[idcampo]=objData.msg; 
      if (document.getElementById('alert2')) document.getElementById('alert2').classList.add('d-none');
      //console.log (bGuardaImagen,targetData, arr1[idcampo], record_id);

      if (bGuardaImagen) guardarImagen(targetData, record_id);
    }else{
      alert(objData.msg);
    }
  })
  .catch(function(err) {console.log(err);});
}


function eliminar2(id_del=document.getElementById('id').value,par2, model=''){
  sPath = window.location.pathname;
  sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
  sPage = sPage1.charAt(0).toUpperCase() + sPage1.slice(1);
  fetch_URL = base_url+sPage+'/del'+sPage.slice(0,-1);
  //console.log(base_url, sPage, sPage1, sPage.slice(0,-1))
  if (model.length!==0)fetch_URL=base_url+model;
  if (sPage=="H_contracts") {    //('suspender alquiler')
    if (confirm('Confirme')) {
      fetch_URL = fetch_URL = base_url+sPage+'/endContracts';
      const data = new FormData();         
      //data.append('id', document.getElementById('id').value);
      //data.append('campos',JSON.stringify(arr1));
      data.append('campos',id_del);
      //data.append('campo6', document.getElementById('campo6').value);
      save(fetch_URL, data); 
      //document.getElementById('id').value = '';
    }
  }
  else{
//    console.log(sPage)
    if (confirm("Confirme la eliminación del registro")) {
      const data = new FormData();         
      data.append('id', id_del);
      data.append('par2', par2);
      if (sPage=='Banner') data.append('campo1', document.getElementById('campo1').value);
      save(fetch_URL, data); 
    }
  }
}  

function primera(texto){textoCortado = texto.split(" "); return textoCortado[0];}

function showAddData(div_option, txtoption){  
  if (document.getElementById(div_option).style.display=="none") {
    document.getElementById(div_option).style.display="inline";
    document.getElementById(txtoption).focus();
  }else{
    document.getElementById(div_option).style.display="none";
  }
}

function newAddData(data, type, cmb, txtAdd, div_crud){//txtAdd=id txtInput;   
  newData = document.getElementById(txtAdd).value;  
  if (newData.length===0) {alertError('error: campo vacío',txtAdd); return}
  c2=(txtAdd==='txtAdd_subcat')?campo7.value:0;
  addR2(data, type, cmb, newData,c2 );
  document.getElementById(div_crud).style.display="none";
  document.getElementById(txtAdd).value="";  
  //if (table)  table.ajax.reload();  //recarga el datatable
}

function addR2(data, type, cmb, c1, c2){
  const dato = new FormData();  
  dato.append('data', data);    dato.append('type', type);  
  dato.append('campo1', c1);    dato.append('campo2', c2);
  fetch_URL = base_url+'Adr/SetAdr';  save(fetch_URL, dato, cmb)  
  /*
  const agregar = () => {
    const option = document.createElement('option');
    const valor = new Date().getTime();
    option.value = valor;    option.text = c1;
    $select.appendChild(option);
  };  */
}

function sortDropDownListByText(selectId) {
    s=document.getElementById(selectId);
    Array.from(s.options).sort(
        (a,b) => a.text.toLowerCase() > b.text.toLowerCase() ? 1: -1
    ).forEach(
        el => s.add(el)
    );}

function crearEvento(elemento, evento, funcion) {
  /*llamada
  crearEvento(elementos[i], "change", function(){
       alert(this.innerHTML);
  });*/

  if (elemento.addEventListener) {
    elemento.addEventListener(evento, funcion, false);
  } else {
    elemento.attachEvent("on" + evento, funcion);
  }
}




function btnGrid(op, title=''){
switch (op) {
  case 'detail':
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
    return `<button  type='button' class='botondetalles btn btn-success btn-sm'><i class='fa fa-desktop' title='${title}'></i></button>`

    break;
  case 'edit':
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
    break;
  case 'both':
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
    break;
  default:
    //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
    break;
  }
}




if (document.getElementById('checkbox1')) {
  valChequed = (localStorage.getItem('showInactive'))? localStorage.getItem('showInactive') :"false";
  document.getElementById('checkbox1').checked = (valChequed==="false")?false:true;
  inactive = (localStorage.getItem('showInactive')=='false')?0:1;

  var checkbox = document.getElementById('checkbox1');
  checkbox.addEventListener("change", validaCheckbox, false);
  const esperar1Seg = (checked) => new Promise(resolve => setTimeout(resolve, 100));
  function validaCheckbox(){
    var checked = checkbox.checked;
    esperar1Seg(checked)
    .then(() => {
      localStorage.setItem('showInactive', checked)
      return esperar1Seg();
    })
    .then(() => {
      ssn(checked, 'showInactive');
      return esperar1Seg();
    })
    .then(() => {
      location.reload();
      return esperar1Seg();
    });
  }
}


function ssn(varVal, varName){  
  const data = new FormData();  
  data.append('varVal', varVal);  
  data.append('varName', varName);
  fetch_URL = base_url+'Ssn/SetSsn';
  save(fetch_URL, data)  
}


function valideKey(evt){
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    //console.log(code)    ;
    if(code==8) { // backspace.
      return true;
    } else if((code>=48 && code<=57) || code==46 || code ==13) { // number. o enter
      return true;
    } else{ // other keys.
      return false;
    }
}

function getSome(model, type, param, someData){  //console.log(model)
  const data = new FormData();
  //if(someData)data.append('someData', JSON.stringify(someData));
  fetch_URL  = base_url+model; 
  fetch(fetch_URL, {method: 'POST', body: data})
  .then(function(response) {//console.log(response);
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {//console.log(texto);
    var objData = JSON.parse(texto);// console.log(objData)
    fillTC(texto, type, param);      
  })
}

const getSome2 = async(model,type)=>{
  try{
    const res =await fetch(base_url+model);
    const data=await res.json();
    fillTC(data,type)
    if (type==='token') {localStorage.setItem('tkn',data.data);}
  }
  catch (error){console.log(error);} 
}

function guardarImagen(model, record_id){
  const dato = new FormData();
    dato.append('campos', JSON.stringify(arr1));
    dato.append('id',record_id);
  save(model, dato);
}

const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => { /*  https://parzibyte.me/blog   */
  return new Promise((resolve, reject) => {
    const $canvas = document.createElement("canvas");
    const imagen = new Image();
    imagen.onload = () => {
      $canvas.width = imagen.width; $canvas.height = imagen.height;
      $canvas.getContext("2d").drawImage(imagen, 0, 0);
      $canvas.toBlob(
        (blob) => {
          if (blob === null) {return reject(blob);} 
          else {resolve(blob);}
        },"image/jpeg", porcentajeCalidad / 100 );
    };
    imagen.src = URL.createObjectURL(imagenComoArchivo);
  });
};

if (document.querySelector("#image")) {
  document.querySelector("#image").addEventListener("change",async()=>{
    const archivo = document.querySelector("#image").files[0];
    //si archivoImagen.size>X, comprimir
    console.log('comprimiendo...');
    const blob = await comprimirImagen(archivo, 20);
    src=URL.createObjectURL(blob);
    document.getElementById('imgModal').src = src;
    edtImgName='';
    if (document.getElementById("enlace")) {
      document.getElementById("enlace").style.display='none';
      document.getElementById(idcampo).value = src;
    }
  });
}
function showPreview(event, img_elem='imgModal', c1='campo1'){
  if(event.target.files.length > 0){
    let archivo=event.target.files[0];
    async () => {
      //const archivo = $imagen.files[0];
      const blob = await comprimirImagen(archivo, 20);
      document.getElementById(img_elem).src = URL.createObjectURL(blob);
    }
    let src = URL.createObjectURL(archivo);
    document.getElementById(img_elem).src = src;

    if(event.target.files[0].size>500000) {
      document.getElementById('btnText').textContent='Imagen muy pesada max:50K'
      document.getElementById('btnActionForm').disabled=true;
    }else{
      document.querySelector('#btnText').textContent=(document.getElementById('id').value==="")?"Guardar":"Actualizar"; 
      document.getElementById('btnActionForm').disabled=false;
    }
    edtImgName='';
    
    if (document.getElementById('btnImgMain'))document.getElementById('btnImgMain').style.display='inline';//revisar
    if (document.getElementById("enlace")) {
      document.getElementById("enlace").style.display='none';
      document.getElementById(c1).value = src;
    }
  }
}

function defineSubirImagen(){ 
  idcampoStr=document.getElementById(idcampo).value
  imgExterna=(idcampoStr.substring(0,4)=='http')?true:false;
  imgSubir=false; 
  if (!imgExterna){ imgSubir=true;
  }else{// si edit
    if(localStorage.imgToUpld!==edtImgName){//si cambia, actualizar
      if (!imgExterna) imgSubir=true;
    }
  }
  return imgSubir;
}

function copy_new(){
    campo1 = document.getElementById('campo1');
    
    if (campo1.type!=='date')  campo1.value+= ' (copia)';
    document.getElementById('id').value='';
    
    if (document.getElementById('imgModal')) document.getElementById('imgModal').src = nuevaImg('');
    if (document.getElementById(idcampo)) document.getElementById(idcampo).value = '';
    
    openModal();
    document.getElementById('btnCopyNew').classList.add('d-none');
    document.getElementById('btnDelete').classList.add('d-none');
    campo1.focus();
}

function enlace(){
  if (document.getElementById('a2').innerHTML=='Actualizar imagen') {
    src=document.getElementById(idcampo).value;
    document.getElementById("imgModal").src=src
    document.getElementById('a2').innerHTML='escribir o pegar enlace';
  }else{
    if (document.getElementById('enlace').style.display=='none') {//si no se vé
      document.getElementById('enlace').style.display='block';
    }else{
      document.getElementById('enlace').style.display='none';
    }
  }
}

function ff(){document.getElementById('a2').innerHTML=
  (event.target.value.substr(0,4)=='http')?'Actualizar imagen'
  :'escribir o pegar enlace';
}

function comboBuilder(ref, dataType, field, insData, clase='', crud=true) {
  capitalRef=ref.charAt(0).toUpperCase()+ref.slice(1);
  _crud = (crud)?`
    <a href="#" tabindex="-1" id="a1" class="a1" 
      onclick="showAddData('mini-crud_${ref}','txtAdd_${ref}')"> <b>+</b></a>
    <div id="mini-crud_${ref}" style="display: none;">
      <input type="text" id="txtAdd_${ref}" class="small">
      <input type="button" value=" + " onclick="
      newAddData('${insData}', ${dataType},'${field}','txtAdd_${ref}','mini-crud_${ref}')">
    </div>`:'';
  return `
  <div id="cmb${capitalRef}" class ="col-md-12 ${clase}" >
    <label for="${field}">${capitalRef}</label>
    ${_crud}
    <div id="combo_${ref}" ></div><br>
  </div>`;  
}

function setPreview(nuevaImg, idcampo, imagen){  return `<br>
  <div class="col-md-12" style="background-color: #f2ebeb;" onclick="document.getElementById('image').click();">
    <div class="preview"> <img id="file-ip-1-preview"> </div>
    <img id="imgModal" class="preview " src="${nuevaImg}" title="cambiar imagen" height="200">
  </div>
  <a href="#"  id="a2" onclick='enlace();'> escribir o pegar enlace</a>&nbsp&nbsp
  <div id="enlace" style="display:none;">
    <div class="form-group ">
      <input class="form-control c1" id="${idcampo}" name="campo" type="text" value="${imagen}" oninput="ff();"> 
    </div>    </div>    `;  
}

function nuevaImg(imagen='',folder){
  if (imagen.length===0) return  base_url+"Assets/images/fix/subir_imagen.jpg";
  else return(imagen.toString().substring(0,4)=='http')?imagen:base_url+"Assets/images/"+folder+'/'+imagen;
}

function noImage() {return base_url+"Assets/images/fix/noimage.jpg";}

function comboStatus(idCampo='',sele="selected", required=false){ 
  required=(required)?'required ':'';  return`
  <div class="col-md-12">
    <div><label for="${idCampo}">Status</label>      </div>
      <div id="combo_stat">
        <select name="campo" id="${idCampo}" class="form-control" ${required}>
          <option value="0">Inactivo</option> <option value="1" ${sele}>Activo</option>
        </select>   </div> 
    <br> </div>  </div>`;
}

function redondear(valor, digitos){
    const base = 10**digitos;
    const precioxBase = valor*base;
    const rPrecioxBase = Math.round(precioxBase);
    const precioFinal = rPrecioxBase/base;
    return precioFinal;   
}

//validar  
  document.querySelector("#form").addEventListener("change", validar);
  function validar(e) {
    let sPath = window.location.pathname;
    let sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
    tModal = document.querySelector('#titleModal').innerText;
    validated=false;
    let c=[];MF = document.querySelectorAll("[name='campo']");
    if (e.target&&e.target.name==='campo'){
      if (!campo1.type==='date') {
        if (campo1.type='select-one'&&campo1.value>0){ 
          validated=true;//venta          
        }
        if (campo1.value.length>0) {validated=true;}
        if ((tModal=='Presupuesto'||tModal=='Venta')) validEco(e);
      }else{validated=true;}
    }
    if (sPage1==='inventory'&&campo2.value==0)validated=false;    
    if (sPage1==='usuarios'&&campo5.value==0&&tModal==='Usuarios')validated=false;else validated=true;
    //console.log(tModal, validated)
    document.querySelector('#btnActionForm').setAttribute('disabled','');
    //console.log('tr2')
    if(validated) document.querySelector('#btnActionForm').removeAttribute('disabled');
    if (document.querySelector('#iconNuevo')&&validated)document.querySelector('#iconNuevo').style.display='block';
  }
//esc
  document.querySelector("#form").addEventListener("keyup", esc);
  function esc(e) {    console.log('e.target.keyCode')  }


function fillTableBanner(texto){
  var ca;  i=0; j=0;  obj=JSON.parse(texto)
  for (x of obj) {
    if (x.bout==1) {j++;//destacado
      var newDiv_related = document.createElement("div");
      newDiv_related.setAttribute("class","");
      newDiv_related.setAttribute("id","rel"+j);
      document.getElementById('related-section').appendChild(newDiv_related);
      //document.getElementById("rel"+j).setAttribute('padding', '10px');
      var newA = document.createElement("a");
      newA.setAttribute("id","d"+j);
      urlTargetLoc=x.urlDestination.lastIndexOf("|")+1;
      urlTarget=(x.urlDestination.substr(urlTargetLoc)!=='http')? x.urlDestination.substr(urlTargetLoc):'';

      newA.setAttribute("href",urlTarget);
      document.getElementById("rel"+j).appendChild(newA);

      var y = document.createElement("IMG");
      let carItem_img=(x.burl.substr(0,4)!=='http')? base_url+"Assets/images/bnr/"+x.burl:x.burl;
      y.setAttribute("src", carItem_img);  //y.setAttribute("height", "390");
      y.setAttribute("width", "100%");  y.setAttribute("alt", "d"+j);
      
      document.getElementById('d'+j).appendChild(y);
      document.getElementById('d'+j).className ="imgrela";

      var newA = document.createElement("h5"); newA.innerHTML='..';
      document.getElementById("rel"+j).appendChild(newA);
    }else{ //carousel
      i++;  active=(i==1) ?' active':'';
      var newDiv = document.createElement("div"); newDiv.setAttribute("id","banner"+i); 
      document.getElementById('carousel-inner').appendChild(newDiv);
      
      var y = document.createElement("IMG");
      let carItem_img=(x.burl.substr(0,4)!=='http')? base_url+"Assets/images/bnr/"+x.burl:x.burl;
      y.setAttribute("src", carItem_img);
      //y.setAttribute("height", "304");  //y.setAttribute("width", "228");
      y.setAttribute("alt", "banner"+i); y.setAttribute("class","d-block w-100")
      document.getElementById('banner'+i).appendChild(y);
      document.getElementById('banner'+i).className =`carousel-item ${active}`;
    }
  }
}

function filtrandoJSon(key, value){
  if (value==0) {sin_filtro=true;fillTableCards(arrayNegocios);
  }else{sin_filtro = false;fillTableCards(getFilteredByKey(arrayNegocios, key, value))} }

function getFilteredByKey(array, key, value) {
  return array.filter(function(e) {return e[key] == value;});}

