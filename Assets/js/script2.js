arr1=new Object();  arr2=new Object(); arrAlert=[];
var atAction;       var iti;  var client_type;    var table;
var edtImgName='';  var img_elem;   var idcampo;  var avoid27=false

const MAX_WIDTH = 1024; // Reducción de resolución a un ancho máximo.
const JPEG_QUALITY = 0.6; // Calidad JPEG al 60% (muy común para compresión).
const divCol = data =>{[type='col',width]=data; return `<div class="${type} col-md-${width}">`;} //width.join(' ')} 
htR1=`<div class="row ">`;       htR2=`</div>`;
ht2 =`<div class="col-md-2">`;   ht3 =`<div class="col-md-3">`;   ht4 =`<div class="col-md-4">`;   
ht5 =`<div class="col-md-5">`;   ht6 =`<div class="col-md-6">`;   ht7 =`<div class="col-md-7">`; 
ht8 =`<div class="col-md-8">`;   ht9 =`<div class="col-md-9">`;   ht10=`<div class="col-md-10">`;

document.querySelector("#btnNuevo")?.addEventListener('click',()=>prepara_abreModal());

function drawForm(inputs) { h='';
  inputs.forEach(function(input, index) {
    if (input.label==null){label=''}else{label=`<label class="control-label" style="width: auto;" id="lbl_${input.id}"for="${input.id}">${input.campo}</label>`}
    placeholder = (input.placeholder==null)? '':` placeholder = "${input.placeholder}"`;
    type        = (input.type==null)       ? '':` type = "${input.type}" `;
    value       = (input.value==null)      ? '':` value ="${input.value}"`;
    step        = (input.step==null)       ? '':` step = "${input.step}"`;
    disabled    = (input.disabled==null)   ? '': (input.disabled=='1')? ` disabled = "${input.disabled}"` : ` `;
    required    = (input.required==null)   ? '':` required = "${input.required}"`;
    pattern     = (input.pattern==null)    ? '':` pattern =  "${input.pattern}"`;
    autofocus   = (input.autofocus==null)  ? '':` autofocus ="${input.autofocus}"`;
    onkey       = (input.onkeypress==null) ? '':` onkeypress="${input.onkeypress}"`;
    //style       = (input.style==null)      ? '':` style="${input.style} !important;"`;
    //oninput     = (input.oninput==null) ? '':` oninput = "${input.oninput}"`;
    innerHTML   = (input.innerHTML)     ? (input.innerHTML.trim()):'';
    rows        = (input.rows==null)    ? '':`rows = "${input.rows}"`;
    isArea      = (input.rows==null)    ? '':`${innerHTML}</textarea>`;
    col         = (input.col==null)     ? '':`${input.col}`;  //col-md-12
    div         = (input.div==null)     ? '':`${input.div}`;
    intlTel     = (input.type=='tel')?'iti__tel-input':'xx';
    clase       = (input.clase==null)   ? 'clase':`${input.clase}`;
    clasinp     = (input.clasinp==null)   ? '':`${input.clasinp}`;
    defVal      = (input.defVal==null)   ? '':`defvalue ="${input.defVal}"`;
    //claseDiv    = (input.claseDiv)? ''
    if (input.id=='combo') {h+=input.idCmb; 
    }else{  
      if (input.id=='html'){h+=input.idHt; 
      }else{h+=
        `<div class="form-group ${clase} ${col} ${(input.type==='hidden')?'d-none':''} ">  ${label}
            <${input.selector} id="${input.id}" name="${input.id.substr(0,5)}"
              class="form-control ${intlTel} ${col} ${input.id.substr(0,5)} ${clasinp}" 
              ${type}${value}${placeholder}${required} ${pattern}${onkey} ${step}  
              ${disabled}${rows} ${defVal} > ${isArea}
         </div>`;         
      }
    }
  });
  return h;  
}

const modalHeader=(data) => {
  //console.log(document.getElementById('id'))
    if ((Number(document.getElementById('id').value))==0) {      
      document.querySelector('.modal-header').classList.replace("headerUpdate","headerRegister");
      document.querySelector('#btnActionForm').classList.replace("btn-info","btn-primary");
      document.querySelector('#btnText').innerHTML ="Guardar"; //Cambiamos el texto
      document.querySelector('#titleModal').innerHTML ="Nuevo"; //Cambiamos el titulo
      if (data) cleanInputs(document.querySelector('.inputs'));
      btnCopyNew.classList.add('d-none');
    }else{
      document.querySelector('.modal-header').classList.replace("headerRegister","headerUpdate");
      document.querySelector('#btnActionForm').classList.replace("btn-info","btn-secondary");
      document.querySelector('#btnText').innerHTML ="Actualizar"; 
      document.querySelector('#titleModal').innerHTML ="Editar"; 
    } 
}
function openModal(inputs, bodyModal='.inputs', newCont='', dataName='') {
  if (newCont&&newCont.length>0) {   const div = document.createElement('div');
    div.className = `cont ${newCont}`;
    document.querySelector(bodyModal).appendChild(div);
    iipp = div;
  }else  iipp=document.querySelector(bodyModal);//if (inputs) document.querySelector(bodyModal).innerHTML= drawForm(inputs);
  iipp.innerHTML = drawForm(inputs);  iipp.setAttribute('data-name', dataName);
  itiField = (document.querySelector('input[type="tel"]'))?document.querySelector('input[type="tel"]'):'';
  if (!iti && itiField.length>0) {
    console.log( !iti, itiField )
    iti = window.intlTelInput(itiField, {
      initialCountry: "auto",  //onlyCountries: ["ar", "bo", "cl","pe"],
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"),
    });
    console.log(iti)
  }
}

function showModal(showDel, size, modalId="modalForm", buttons, cleanInputs=false){
  if (modalId=="modal3") {
      hide(['modalButton']); buttons.forEach(b => show([b])); 
      modal3.show(); return null;  }
  
  if (size) document.getElementById('role').classList.add(size);
  for (const item of document.querySelectorAll('.modalButton')) {
    (item.classList.remove("disabled")); (item.classList.remove("d-none"));  }; 
  gId('alert1').classList.add('d-none');//ocultar alert
  gId('btnClose').disabled=false;
  modalHeader(cleanInputs);  modal.show();
  gId('btnDelete').style.display=(showDel)?'inline':'none';
  document.querySelector('#btnActionForm').setAttribute('disabled','');  
  gTkn(btnActionForm);
  //if (focus!==null) focusModal(focus); else 
  if(gId('campo1')!==null)focusModal(campo1);
}
const showModal_2 = (data) => { 
  [cont, focusEl, title, size] = data;
  if (!hasSubModal()) gTkn(btnActionForm);
  hide(['cont']); show([cont]);  modal.show();
  if (size) document.getElementById('role').classList.add(size);
  if (title) document.querySelector('#titleModal').innerHTML = title;
  if (focusEl) focusModal(focusEl);
}

const pepe = (data) => {  console.log(data);}


if (document.getElementById("modalForm")) {
  var myModal=document.getElementById("modalForm");
  var modal = new bootstrap.Modal(document.getElementById("modalForm"));
  //validar  
  document.querySelector("#form").addEventListener("input", validar);
  function validar(e) { sPage1 = xPage(); validated=false;
    //hacer algo si volvemos a borrar un input que ya estaba validado, por ejemplo, si borramos el campo obligatorio de un formulario, se deshabilita el botón de guardar
    
    tModal = document.querySelector('#titleModal').innerText;
    //console.log('validar', e.target.name, tModal, sPage1);
    let c=[]; MF = document.querySelectorAll("[name='campo']");
    if(e){      //console.log('pepe');
      if((e.target.type=='radio'||e.target.type=='checkbox')&&!e.target.name==='htTab')validated=true;//htab:gprod
      if (e.target&&(e.target.name==='campo'||e.target.name==='field')){
        if (!campo1.type==='date') {
          if (campo1.type='select-one'&&campo1.value>0)validated=true;//buy/Sal
          if (campo1.value.length>0) {validated=true;}
        }else{
          if ((tModal=='Presupuesto'||tModal=='Venta')) {validEco(e);}
          validated=true;
        }
      }}
    if (sPage1==='inventory'&&campo2.value==0) validated=false;
    if (sPage1==='products'&&e.target.type=='checkbox')validated=true;
    if (sPage1==='usuarios'&&tModal==='Usuarios') validated=(campo5.value==0)?false:true;
    document.querySelector('#btnActionForm').setAttribute('disabled','');
    if(validated) document.querySelector('#btnActionForm').removeAttribute('disabled');
    if (document.querySelector('#iconNuevo')&&validated)document.querySelector('#iconNuevo').style.display='block';
  }  

  //ESC
  document.getElementById("modalForm").addEventListener("keyup", function(event){
    if (event.keyCode === 27 && !avoid27) {closeModal();  if (xPage()=="ssale"||xPage()=="spurcha") ca2.focus();}
  });
}

hide = data => { data.forEach(item =>    addClass([item,'d-none']));  }
show = data => { data.forEach(item => removeClass([item,'d-none']));  }

hide2 = data => { data.forEach(item =>    addClass([item,'hidden']));  }
show2 = data => { data.forEach(item => removeClass([item,'hidden']));  }

const removeClassEdited = data=>{document.querySelectorAll('.'+data).forEach(b=>{b.classList.remove(data)})}
const addClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.add(data[1])})}
const removeClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.remove(data[1])});}
const toggleClass = (el, className) => el.classList.toggle(className);
const delClass=data=>{[element, clasebuscada, claseaborrar] = data;
  element = (typeof element === 'string')? document.getElementById(element): element
  element.querySelectorAll('.'+clasebuscada).forEach(b=>b.classList.remove(claseaborrar));  
};
const adClas=data=>{[element, clasebuscada, claseaagregar] = data;
  console.log(data );
  if (!element.constructor ==NodeList) element = document.querySelectorAll(element);
  //element = (typeof element === 'string')? document.getElementById(element): element
  element.querySelectorAll('.'+clasebuscada).forEach(b=>b.classList.add(claseaagregar));  
};

function closeModal(data=1){
  if (data==2) {modal2.hide(); return null;}
  if (data==3) {modal3.hide(); return null;}
  modal.hide();  form.reset();  
  if (gId('id')) gId('id').value = '';
  if (gId('btnActionForm')) btnActionForm.setAttribute('disabled',''); removeClassEdited('edited');
  if (table && updating) table.ajax.reload();
  updating = false;
  //console.log('closing', gIC(['inputs']).innerHTML.length);
}
function closeModal2(){
  modal2.hide(); document.querySelector('#form2').reset(); 
  id2.value = ''; inputs2.innerHTML='';
  //btnActionForm2.setAttribute('disabled','');  
}

function setField(fieldName='field'){
  campos=document.getElementsByName(fieldName)
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;     valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0&&i==0)valor='';
    arr2[clave]=valor;
    arr2['clType']=localStorage.cppm;
  } 

}  
function setCampo(titModal='', sPage, fieldName='campo' ){
  console.log(arguments);
  //if (gId('id')) console.log('id length',gId('id').value.length);
  id = (gId('id'))? gId('id').value: 0 
  arr1['id']=id;  arr1['clType']=localStorage.cppm; arr1['clid']=localStorage.xcli;
  arr1['dbk']=localStorage.dbk;     arr1['dossier']=localStorage.dossier;
  //localStorage.account = (arr1['clType']==1)?1:2; 
  arr1['account']=localStorage.account;  
  if(myModal) arr1['tkn']=btnActionForm.getAttribute('tkn');
  //if (sPage=='Products'&&titModal=='Configuración')arr1['campo6']= document.querySelector('input[name="img_layout"]:checked').value;    
  if (fieldName==='field'||
    sPage=="Ssale") {setField();return;}
  if (sPage=='Products'){
    if(titModal=='Configuración' ) {
      //campo6 = document.querySelector('input[name="img_layout"]:checked').value;
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
  campos = document.getElementsByName("campo"); arr=[]; mods=[];
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id; valor = campos.item(i).value;
    if (campos.item(i).type==='tel') valor = iti.getNumber();
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (campos.item(i).type==='checkbox') //console.log(campos.item(i),valor, sPage)
    if (campos.item(i).type==='checkbox'&&primera(titModal)==='Notificación') {
      valor = (campos.item(i).checked)?campos.item(i).getAttribute('data-id'):0;
      console.log(campos.item(i).getAttribute('data-id'))
    }
    if (campos.item(i).type==='checkbox'&&
      campos.item(i).checked&&localStorage.getItem('dttp')==17&&
      sPage==='datos'&&campos.item(i).classList.contains('toggle-checkbox')
      ) mods.push(campos.item(i).value)
    if (valor.length==0&&i==0)valor='';
    arr.push (valor); //check to del
    arr1[clave]=valor;    //console.log([clave], valor);
  } 
  if (localStorage.dttp==17 && sPage==='datos') arr1['campo11']=mods.toString();
  //console.log(iti.getNumber())

}

const setCampo2 = data =>{
  campos = document.getElementsByName(data); arr=[]; 
  arr1['_id']=gId('_id').value;
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id; valor = campos.item(i).value||'';
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    arr1[clave]=valor;    
  } 
}

function save(fetch_URL, data, cmb){      
  //console.log('fetch_URL', fetch_URL, data, cmb);
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
      //console.log('cmb', cmb, objData.newIndex, objData.msg);
      if (cmb.substring(0,5)==='image') {
        img_elem=cmb.substring(6);
        console.log(cmb, img_elem+'test image ');
        //document.getElementById(img_elem).setAttribute("src", base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime() );
      }else{        
        newIndex=objData.newIndex; mySelect=document.getElementById(cmb); 
        mySelect.options[mySelect.options.length] = new Option(newData, newIndex);
        sortDropDownListByText(cmb);
        mySelect.value = newIndex; mySelect.focus(); cmbChange2(mySelect)
        hideModal=0; 
      }
    }
    if(document.getElementById("animate")){
      const div = document.getElementById("animate");
      div.classList.add('text-center');
      div.style.display='block';  div.innerHTML = `${objData.msg}`
      div.animate({opacity: 0 }, {duration:3000,
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
      //console.log(sPage1, model, fetch_URL,document.title);
      //if (fetch_URL.split("/").pop()=='setCpaco')localStorage.setItem('newPYD', objData.newIndex;
      if (document.title=="Ecommerce") {
        if(model=='Presupuesto'){cart.vaciar(); window.location.href = base_url+"buysal";}
        if(model=='Venta'){ticket_(objData.newIndex); cart.vaciar(); if (typeof(closeMinor)==='function')closeMinor();}
        if(model=='setBanne'||model=='delBanne')getSome('Ecommerce/getCarousel/'+iCo,'banner');
      }
      if (model=='pedido'){cart.vaciar();}
      if (model=='changeMyapp') window.location.href = base_url+"home"; 
      if (model=='passRecovery') {hideModal=0;prepareToSend(objData.newIndex)} 
      //if (model=='setImage'&&sPage1=='s_legajo') getSome('Sco/GetParents/'+xcli,'parents');
      if (sPage1=='legajo'&&primera(titleModal.textContent)==='Foto'){gtSo('Legajo/GetLegajo/'+xcli, fillLegajo, cltype);closeModal();return null;}
      if (sPage1=='legajo' && cltype==8) gtSo('Legajo/GetParents/'+xcli, fillParents);

      if (model=='delInventor') {drawTableDetails(gId('id').value);return null;}

      /* if (model==='setProduct'){
            if(titModal!=='Edición múltiple') tEdit(objData.newIndex); else window.location.reload();
          }  */      
      if (model==='toggleVisible') tVisible([arr1.id,arr1.campo1]);
      //if (model==='delProduct') window.location.reload();
      if (model==='setInventor') getSome('inventory/getBalance/'+tipoProd,'saldos'); 
      if (model==='setProductIncome') {
          drawTableDetails(gId('id').value);
          if(gId('id2').value==0){gId('field3').select();  gId('btnActionForm2').style.display='none';}
          else{closeModal2();}  return;   }
      if (model=='setContract') getSome('Hm/updtHM');
      if (sPage1=='companies') window.location.reload();
      if (model=='setBcard') gId('markCo').innerText=gId('campo1').value;
      if(typeof afterSave === 'function') afterSave([objData.newIndex, model, arr1, objData]);
      if (hideModal==1&&(gId('modalForm'))) closeModal();
    }else{
      console.log('hideModal',hideModal);
      console.log(objData.msg, model, sPage1, fetch_URL);
      if(model==='setMicuent') {
        for (const item of document.querySelectorAll('.modalButton')) {
          (item.classList.remove("disabled")); (item.classList.remove("d-none"));
        }; 
        hideModal=0; document.getElementById('alert1').classList.add('d-none');}
      if (hideModal==1&&(document.getElementById('modalForm')) ) closeModal();
      if(typeof afterSaveFail === 'function') afterSaveFail([objData.msg, model, arr1, objData]);
    }
  })
  .catch(function(err) {console.log(err);});
}

function alertError(msgError, elemento){alert(msgError); document.getElementById(elemento).focus(); updating=false;}

function sav0(){  
  exeptions=[];  pageReload=false;
  titModal = (document.querySelector('#titleModal'))? titleModal.innerText:''
  sPath = window.location.pathname;  sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
  sPage = sPage1.charAt(0).toUpperCase() + sPage1.slice(1);
  fetch_URL =base_url+sPage+'/set'+sPage.slice(0,-1); 
  fetch_UPLD=base_url+'Controllers/upload.php'; 
  
  setCampo(titModal, sPage);
  console.log('args: ',sPage, sPage1, fetch_URL, document.title);
  if (sPage1==='micuenta') {
    if (titModal==='Cambiar clave') {
      if (!verificarCambioClave()) return null;
    }
    if (titModal==='Plantilla') fetch_URL = base_url +'companies/setTemplate';
  }
  //if (titModal=='Cambiar logo'){fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return null;}
  if (titModal=='Cambiar logo')alert('0pepe');
  if (titModal == 'Recuperar contraseña') fetch_URL = base_url +'Access_token/passRecovery';
  if (titModal==='killer') {tokill();closeModal(); return null;}
  if (titModal!=='Configuración') {
    if(!document.getElementById('campo1').type=='checkbox')
      if (( arr1['campo1'].length==0||arr1['campo1']==0)&&document.title!=="Ecommerce") {alertError('Campo obligatorio','campo1');return;}  
  }else{
    console.log(arr1['campo1'] )
    //if ((arr1.campo1.length==0||arr1.campo1==0)) {alertError('Campo obligatorio','campo1');return null;}
  }

  if (sPage1== 'k_turnos') {document.getElementById('campo6').value = localStorage.precio}

  if (titModal=='Confirmar pedido') {
    if (campo1.value==0) {alertError('Seleccione un cliente','campo1');return;} 
    const dPed=new FormData();
    dPed.append('changuito',JSON.stringify(changuito)); dPed.append('campos',JSON.stringify(arr1));
    save(base_url+'Pedidos_tex/setPedido/pedido', dPed); return;
  } 
  
  if (titModal=='Presupuesto'|| titModal=='Venta') {
    if (campo1.value==0) {alertError('Seleccione un cliente','campo1');return;} 
    if (titModal==='Venta') {
      if (campo5.value==0&&!campo11.checked) {alertError('Seleccione un banco','campo5');return;} 
      if (!campo11.checked){
        _temp = [{'bank':campo5.value, 'amount':campo4.value}];
        arr1["campo4"] =  JSON.stringify(_temp);
      }
    }
    const datPresu = new FormData(); 
    if (document.title=="Ecommerce") datPresu.append('changuito',JSON.stringify(changuito)); 
    else datPresu.append('changuito',[]);//to check
    datPresu.append('campos',JSON.stringify(arr1));
    save(base_url+'Buysal/setBuysal/'+titModal, datPresu); return;
  } 
  
  //clprpames

  if (titModal == 'Micro sitio') fetch_URL = base_url +'Access_token/setToken';   
  if (sPage1 == 'k_hisconsultas') fetch_URL = base_url +'K_consultation/setK_consultatio';   
  
  //hm
  if (titModal == 'Alquilar') {
    fetch_URL = base_url +'Ufs/setContract';
    if (campo3.value==0) {alertError('Campo obligatorio (Inquilino/a)','campo3');return;} 
  }
  if (titModal==='Movimiento de fondos'&&sPage1=='resume'){
    if(Number(campo3.value)<=0){alertError('importe inválido','campo3');return null;}
    if(Number(campo1.value)==0){alertError('cuenta inválida','campo1');return null;}
   fetch_URL='Resume/setWallet';  }
  if (titModal==='Transferencia'&&sPage1=='resume') {
    if(Number(campo3.value)<=0){alertError('importe inválido','campo3');return null;}
    if(Number(campo1.value)==0){alertError('selección inválida','campo1');return null;}
      fetch_URL='Resume/setTransfer';  }

  if (sPage1=='cpacos' ) { //cobrar o pagar    
    console.log('cpacos save', titModal);
    if (campo3.value<=0&&!campo11.checked) {alertError('Importe inválido','campo3');return ;}
    if (titModal==='Cobrar'||titModal==='Pagar'){
        if (campo4.value==0){alertError('Seleccione una caja o banco','campo4');return ;}
        localStorage.setItem('dbk',document.getElementById('campo4').value);
        fetchMulti(arr1, 'cpacos/setCpaco','Cpacos/setImage', '../Assets/images/cpacos/',idcampo); 
        return;    
    }
  } 

  if (sPage1=='legajo'&&primera(titModal)==='Foto') {fetchMulti(arr1, '','legajo/setFoto', '../Assets/images/legajo/',idcampo); return null;}
  if (sPage1=='legajo'&&primera(titModal)==='Notificación') {fetch_URL='Sco/sendNotify'}
  if (sPage1=='legajo'&&primera(titModal)==='Familiares')  {fetchMulti(arr1, 'Sco/setParent','Sco/setImage', '../Assets/images/legajo/',idcampo); return null; }

  if (document.title=="Ecommerce"){
    fetch_URL=base_url+'ecommerce/setEcommerce'; 
    if (titModal=='Productos')fetch_URL=base_url+'ecommerce/setAlturaImagen'; 
    if (titModal=='Secciones'){
      fetch_URL=base_url+'ecommerce/setSections';
      sec = ''+arr1.campo1+arr1.campo2+arr1.campo3+arr1.campo4+arr1.campo5+arr1.campo6;
      showSection();
    }
    if (titModal==='Cobrar') {alert('cobrar desde eco');return}
    //if (campo1.length==0 || campo1==0) {alertError('Debe subir una imagen o escribir su enlace','campo1');return null;}    
    if (titModal=='Imagen principal'){fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return null;}
    if (primera(titModal)=='Galería'){
      arr1['campo6']=5; fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return;}
    if (primera(titModal)==='Sección'){fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return;}
    if (primera(titModal)==='Carousel'){fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return;}

  }

  if (sPage1=='orden'   )  {fetchMulti(arr1, 'Orden/setOrden','Orden/setImage', '../Assets/images/torepair/',idcampo); return null;}
  if (sPage1=='k_imagenes'){fetchMulti(arr1, '','K_imagenes/setImagePatient', '../Assets/images/klk/',idcampo); return null;}
  if (sPage1=='banner')    {fetchMulti(arr1, '','Banner/setBanne', '../Assets/images/bnr/',idcampo); return null;}
  //if (sPage1=='admin')     {fetchMulti(arr1, '','Admin/setDoc', '../Assets/docs/iny/',idcampo); return null;}
  //if (sPage1=='admin')     {subir(arr1, '','Admin/setDoc', '../Assets/docs/iny/',idcampo); return null;}
  if (sPage1=='admin')     {subir2(arr1, '','Upl_injector/upl', '../Assets/docs/iny/',idcampo); return null;}
  //

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

  if (typeof beforeSave === 'function') arrAlert=beforeSave([sPage1, titModal, arr1, arr2]);
  if (arrAlert.length>0) { 
    console.log(arrAlert);
    if (arrAlert[0]==='_exit') return;
    if (arrAlert[0]==='_close') {closeModal(); if (gIC('ca2'))ca2.focus();
      return;}
    alertError(arrAlert[0],arrAlert[1]);  return ;  }

  //prepare to save
  const data = new FormData();
    data.append('campos', JSON.stringify(arr1));
    addClass(['modalButton', 'disabled']); addClass(['modalButton', 'd-none']);
    if (gId('btnClose')) gId('btnClose').disabled=true;    
    if (gId('alert1')){gId('alert1').classList.remove('d-none');}
  //prepare to save: end
  save(fetch_URL, data); 
  if(pageReload) window.location.reload();

  //if (document.title=="Ecommerce") window.location.reload();
  if (document.getElementById('id')) document.getElementById('id').value = '';
}


function fetchMulti(arr1, fetch_URL, fetch_setImg='', imgTarget, campoImg=''){
  fetch_UPLD=base_url+'Controllers/upload.php'; 
  campoImg = (campoImg.length>0)?campoImg: idcampo;
  
  document.getElementById('alert1')?.classList.remove('d-none');
  const datMulti = new FormData(); datMulti.append('campos',JSON.stringify(arr1));
  if(fetch_URL.length>0) save(base_url+fetch_URL, datMulti); 
  if (fetch_setImg=='') return;
  if (gId(campoImg).value.length>0 && edtImgName.length==0) { //si imagen, no link
    if (defineSubirImagen()){
      imgName = getLS('imgToUpld');
      record_id = Number(document.getElementById('id').value);// anterior imagen tabla (si hay, para editar)
      console.log(imgName, record_id);
      subirImagen(fetch_UPLD, imgTarget, base_url+fetch_setImg, imgName, imgSubir, record_id);
    }else{save(base_url+fetch_setImg, datMulti); }
  }else{    
    if (fetch_setImg.length>0&&defineSubirImagen()) {save(base_url+fetch_setImg, datMulti); }
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
if (document.querySelector("#form")) {	form = document.querySelector("#form");
	form.onsubmit = function(e){
    e.preventDefault();
    if (!updating) {   //e.preventDefault();
       updating=true;      sav0();}}
}
/*
document.querySelector(".navbar")?.addEventListener('click',(e)=>{
  if (e.target&&e.target.tagName==='A') {
    ls_data=e.target.getAttribute('ls');  
    setLS (ls_data);}
});
*/
//LS options
  const setLS = data =>{[clave='',valor=''] = data; localStorage.setItem(clave, valor);}
  const getLS = clave => localStorage.getItem(clave);
  const delLS = clave => localStorage.removeItem(clave);
  const clearLS = () => localStorage.clear();
  // recuperar un Objeto
  const getLSobj = data =>{const _d = getLS(data);  const _r = JSON.parse(_d); return _r; }
//LS
function LSprod_source(valor){localStorage.setItem('prod_source', valor);}

function setXslt(op){
  localStorage.setItem('cppm', op);
  localStorage.setItem('showInactive', false);
}  
//tipo de cliente
function setXCli(clave,op){localStorage.setItem(clave, op); }  //xcliente/mail/id

function setDTp(op){localStorage.setItem('dttp', op); guardarCookie('dttp',op,100);} 
function setAcc(op){localStorage.setItem('account', op); localStorage.setItem('acco', op);} 


function getTbl(fetch_URL, data, el){
  //getSome(fetch_URL, data)
  fetch(fetch_URL, { method: 'POST', body: data})
  .then(function(response) {
    if(response.ok) return response.text(); else throw "Ajax error";
  })
  .then(function(texto) { //console.log(texto);
    cargarTabla(JSON.parse(texto), el);
  })
  .catch(function(err)  {console.log(err);  });
}

function getData(fetch_URL, data, el){  
  fetch(base_url+fetch_URL, { method: 'POST', body: data})
  .then(function(response) {
    if(response.ok) return response.text(); else throw "Ajax error";
  })
  .then(function(texto) { //console.log(texto);
    letData(JSON.parse(texto),el);
  })
  .catch(function(err)  {console.log(err);  });
}

function gJSON(url, d1) {
  return new Promise((resolve, reject) => {
    fetch(url, {method:'POST', body:d1})
      .then((response) => {
        if (response.ok) return response.json();
        reject("Código de respuesta: " + response.status );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

function getJson(fetch_URL, data, el='', campo='', selected=0, defValue, disabled=false, 
          label='',hidden=false, required=false, exception=0, cargaCombo=true, optAdd='', 
          s2=false, selectedHidden=false, actionA1, savOb) {
  fetch(fetch_URL, {method:'POST', body: data})
  .then(function(response) {if(response.ok) {return response.text(); } else {throw "Error Ajax";}})
  .then(function(texto) { //console.log(texto);
    texto = JSON.parse(texto);
    if (cargaCombo) cargarCombo(texto, el, campo, selected, defValue, disabled, label, hidden, required, exception, optAdd, s2, selectedHidden);
    if(typeof actionA1 === 'function') actionA1(el,campo);
    if(typeof savOb === 'function') savOb([el, texto, selected]);//filter
  })
  .catch(function(err){console.log(err);});
}

function chargeCombo(data, cont, campoId='', args){  h ='';
    caption     = (args.caption ===undefined)  ? '': `<label for="${campoId}">${arg.caption} </label>`;
    selected    =(args.selected===undefined)   ? '': args.selected;
    exception   =(args.exception===undefined)  ? '': args.exception;
    search   =(args.search===undefined)  ? '': 'Infinity'; 
    allowClear = (args.allowClear===undefined)?true:args.allowClear;
    placeholder = args.placeholder===undefined ? 'Seleccione': args.placeholder;
    otrasClases = args.clases===undefined ? '': args.clases.join(" ") ;  //frutas.join(" ")
    optAdd = (args.crud) ? `<a href="#" class="op_add" ><i class="fas fa-plus-circle disabled" disabled></i> +</a>`:'';    
    required =(args.required) ? "required": '';   disabled =(args.disabled) ? "disabled": '';
    s2 = (args.s2);
    const foundSelected = data.find((myData)=> myData.fieldId==selected);
    if (foundSelected===undefined||selected==0) selected = '';
    if (selected.length===0)  h = (s2)? '<option></option>': `<option selected hidden value="0">${placeholder}</option>`;   
    
  for (x of data) {   
    //console.log(x);
    bertoldi= (x.fieldId==73)?' bertoldi ':'';//tdel + line option value class bertoldi
    subcat=''; if (x.dad!==undefined) subcat = (x.dad>0)?'ml-4':'font-weight-bold';
    indent=''; if (x.dad!==undefined) indent = (x.dad>0)?'&nbsp&nbsp':'';
    precio = (x.precio)?`precio=${x.precio}`:'';  sele = (x.fieldId==selected)?'selected':''; 
    if (!(Number(x.fieldId)===Number(exception))) {
      h+=`<option value ="${x.fieldId}" ${sele} aux="${x.aux}" ${precio} 
          class="opt opt_${x.aux} ${subcat} ${bertoldi}">  ${indent} ${x.fieldName}</option>`; 
    }
  } 
  gId(cont).innerHTML = `${caption} ${optAdd} <select id="${campoId}" 
          name="${campoId.substring(0,5)}" ${disabled} class="form-control selectEl ${otrasClases}" 
          onchange ="cmbChange2(${campoId})" onclick ="cmbClick2(${campoId})" ${required}> ${h} </select>`;  
          parent=(gId(campoId).closest('.modal'))?gId(campoId).closest('.modal'):'body';
          //console.log(parent);
  if (s2) $('#'+campoId).select2({destroy:true, width:'100%', placeholder: placeholder, 
                        allowClear: allowClear, dropdownParent: parent,
                      language: {noResults: function() { return "No hay datos";}},
                      minimumResultsForSearch: search
                      });
                        
}

function cargarCombo(obj, el, campo='', selected=0, defValue='', disabled=false, label='', hidden=true, required=false, exception, optAdd='', s2=false, selectedHidden=false){
  optAdd  =(optAdd=='')?'':`<a href="#" class="op_add" ><i class="fas fa-plus-circle disabled" disabled></i> ${optAdd}</a>`;    
  disabled=(disabled)  ?'disabled':'';   required=(required)  ?'required':'';  hidden  =(hidden)    ?' hidden ':'';
  //if (selected.length===0)  h = (s2)? '<option></option>': `<option selected hidden value="0">Seleccione</option>`;   
  //let h='', x='', subcat='', precio='', sele='';
  //selectedHidden = (selectedHidden)? 'selected hidden':'';
  h = (s2)? '<option></option>': `<option selected hidden value="0">${defValue}</option>`;   
  if (!s2) h = `<option selected hidden value="0">${defValue}</option>`;  
  //console.log(obj);
  for (x of obj) {
    const hasChildren = x.children && x.children.length > 0;   
    kids = hasChildren ? x.children.map(child => `<option value="${child.fieldId}" ${child.fieldId == selected ? 'selected' : ''} aux="${child.dad}" class="opt opt_${child.aux} ml-4">&nbsp&nbsp ${child.fieldName}</option>`).join('') : '';

    subcat=''; if (x.dad!==undefined) subcat = (x.dad>0)?'sub-cat':'font-weight-bold';
    indent=''; if (x.dad!==undefined) indent = (x.dad>0)?'&nbsp&nbsp':'';
    precio = (x.precio)?`precio=${x.precio}`:'';   
    sele = (x.fieldId==selected)?'selected':''; 
    erp = (x.erp)?'erp':'';
    if (!(Number(x.fieldId)===Number(exception))) {
      h+=`<option value ="${x.fieldId}" ${sele} aux="${x.aux}" ${precio} class="opt opt_${x.aux} ${subcat} ${erp}">${indent}${x.fieldName}
          ${kids}</option>`; 
    }
  }
  
  if (label.length>0) label=`<label for="${campo}">${label} </label>`;
  document.getElementById(el).innerHTML = `${label} ${optAdd} 
    <select id="${campo}" name="${campo.substring(0,5)}" ${disabled} class="form-control selectEl" 
    onchange ="cmbChange2(${campo})" onclick ="cmbClick2(${campo})" ${required} defvalue = "${selected}"> ${h} </select>`;  
}

const fillOptions = data =>{
  console.log(data);
}

var full_options=[]


function cmbClick2(cmb){
  if(typeof click2 === 'function') click2([cmb]);
  
}
function cmbChange2(cmb){ 
  titModal = (document.querySelector('#titleModal'))?document.querySelector('#titleModal').innerHTML:''
  sPath = window.location.pathname; sPage = sPath.substring(sPath.lastIndexOf('/') + 1); 
  //console.log(cmb,sPage, sPath, document.title, cmb.id, cmb.value);
  if (titModal==='Confirmar pedido') {btnActionForm.disabled=false;  return;}
  if (document.title==='Ecommerce'&&cmb.id==='campo5') localStorage.dbk=campo5.value;
  if (document.title==='Ecommerce'&&cmb.id==='campo13') localStorage.depot=campo13.value;
  if (cmb.id=='campo20') chPList([cmb.value]);//change pricelist
  if (cmb.id=='cmbCat') filtrandoJSon('rubroid',cmb.value);//rubro en galería
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
      localStorage.setItem('cmbCli',cmb.value)
      const select = document.getElementById('cmbProducto');
      const options = Array.from(select.options);
      if (full_options.length==0) full_options = options;
      const input = document.getElementById('cmbCliente').value;    
      filterOptions(select, options,input, full_options)
      //document.getElementById('cmbProducto').disabled=false;    
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

  if (sPage==='resume'&&cmb.name=='optField') cargarCuentas([cmb.value]);
  if (sPage==='buysal'&&cmb.id==='field7') mostrarHoras(cmb.value)
  if (sPage==='buysal'&&cmb.id==='field1') mostrarPrecio(cmb[cmb.selectedIndex]?.getAttribute('precio'));
  if (sPage==='buysal'&&cmb.id==='campo13') localStorage.depot=cmb.value;
  if(typeof change2 === 'function') change2([sPage, titModal, cmb]);
  //if(typeof change3 === 'function') change3(e);
  
}

const fD = data =>{
  const partes = data.split('-'); // Divide la cadena en un array
  const ano = partes[0];  const mes = partes[1];  const dia = partes[2];

  // Asegura que el día y el mes tengan dos dígitos
  const diaFormateado = dia.padStart(2, '0');  const mesFormateado = mes.padStart(2, '0');

  // Reordena las partes y las une en el nuevo formato
  const formattedDate = `${diaFormateado}-${mesFormateado}-${ano}`;
  return formattedDate;

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

function sumarDias(fecha, dias) {
            fecha.setDate(fecha.getDate() + dias);
            return fecha;
}

async function subirImagen(f_url, target='', targetData='', imgName='', bGuardaImagen=false, record_id=0){
  nuevaImagen = document.getElementById(idcampo).value;  //nuevaImagen = imgName;
  f_url  = base_url+'Controllers/upload.php'; 
  //comprimir imagen
  const selectedFile = document.querySelector("#image").files[0]
    const blob = await comprimirImagenWhatsApp(selectedFile, MAX_WIDTH, JPEG_QUALITY);
    //src=URL.createObjectURL(blob);
    const dato  = new FormData(formUpload);  
    dato.append('image', blob, selectedFile.name);
    dato.append('id', imgName); 
    dato.append('uploadPath', target);
    dato.append('submit', '12345'); 
  fetch(f_url, {method:'POST', body: dato})
  .then(function(response) {  
    if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    //console.log(texto);
    var objData = JSON.parse(texto);
    //console.log('upload', texto, JSON.parse(texto),target);
    
    if (objData.status) {
      
      previewElement=document.getElementById(img_elem);
      if (previewElement) {
        folders = target.split('/'); folder = folders[folders.length - 2];
        previewElement.src= base_url+"Assets/images/"+folder+"/"+objData.msg+"?"+ new Date().getTime();}
      if (atAction=='editarLogo') {
        gId('logo').setAttribute("src", base_url+"Assets/images/logo/"+objData.msg+"?"+ new Date().getTime() )
        localStorage.setItem('imgLogo',objData.msg)
      }
      if (atAction=='editar_imgMain') gId('imgMain').setAttribute("src", base_url+"Assets/images/bnr/"+objData.msg+"?"+ new Date().getTime());
      arr1[idcampo]=objData.msg; 
      if (document.getElementById('alert2')) gId('alert2').classList.add('d-none');
      if (bGuardaImagen) guardarImagen(targetData, record_id);
    }else{
      alert(objData.msg);
    }
      
  })
}

function imageChanged(){ //td
  return (!(edtImgName===document.getElementById(idcampo).value));
}



document.querySelector("#btnDelete")?.addEventListener('click',(e)=>{  el=e.target;
  if (xPage()==='Buysal') {  
    btnDelete.classList.add('delSales');
    if(el.closest('svg') && el.tagName==='path') btnDelete.classList.add('delSales');
    //alert('Eliminar venta completa o ítem?');
  }
  eliminar2(gId('id').value,'','',el.closest('a'));
});

function xPage(){
  sPath = window.location.pathname;   sPage1 = sPath.substring(sPath.lastIndexOf('/') + 1);
  //console.log(sPage1, sPage1.charAt(0) + sPage1.slice(1))
  return sPage1.charAt(0) + sPage1.slice(1); //return sPage1.charAt(0).toUpperCase()+sPage1.slice(1); 
}

function eliminar2(id_del=(gId('id').value), par2, model='',_parent){
  sPage = xPage();
  if(typeof delDato === 'function') arrAlert=delDato([sPage, id_del, par2, _parent]); 
  console.log('Arr',arrAlert);
  if (arrAlert.length>0) { if (arrAlert[0]==='_exit') return;  }
  fetch_URL = base_url+sPage+'/del'+sPage.slice(0,-1);
  tModal = document.querySelector('#titleModal').innerText;
  if(gId('btnDelete').innerText==='Ticket') {ticket(); return;}
  
  if (model.length!==0)fetch_URL=base_url+model;
  if (sPage=="h_contracts") {    //('suspender alquiler')
    if (confirm('Confirme')) {
      fetch_URL = fetch_URL = base_url+sPage+'/endContracts';
      const data = new FormData();  data.append('campos',id_del);
      save(fetch_URL, data); 
    }
  } else {
    console.log(sPage, fetch_URL);
    if (confirm("Confirme la eliminación del registro")) {
      const data = new FormData();         
      data.append('id', id_del); data.append('par2', par2);
      if (sPage=='Banner') data.append('campo1', document.getElementById('campo1').value);
      if (primera(tModal)=='Galería'||primera(tModal)=='Sección'||primera(tModal)=='Carousel') {
        fetch_URL= base_url+'Banner/delBanne'; data.append('campo1', document.getElementById('campo1').value);}
      if (sPage=='Buysal'&&btnDelete.classList.contains('delSales')) data.append('par2', -99);
      updating = true; //reload dt
      save(fetch_URL, data); 
    }
  }
  
}  

function primera(texto){textoCortado = texto.split(" "); return textoCortado[0];}

function showAddData(div_option, txtoption){  
  if (document.getElementById(div_option).style.display=="none") {
    document.getElementById(div_option).style.display="";
    document.getElementById(txtoption).focus();
  }else{
    document.getElementById(div_option).style.display="none";
  }
}

function newAddData(data, type, cmb, txtAdd, div_crud){//txtAdd=id txtInput; 
  //console.log(type, div_crud,txtAdd)
  newData = document.getElementById(txtAdd).value;  
  if (newData.length===0) {alertError('error: campo vacío',txtAdd); return}
  c2=0;
  switch (txtAdd) {
    case 'txtAdd_subcat':   {c2=campo7.value; break;}
    case 'txtAdd_cuenta':   {c2=localStorage.account;break;}
    case 'txtAdd_concepto': {c2=campo1.value; break;}
    default: break;
  }
  addR2(data, type, cmb, newData,c2 );
  document.getElementById(div_crud).style.display="none";
  document.getElementById(txtAdd).value="";  
  //if (table)  table.ajax.reload();  //recarga el datatable
}

function addR2(data, type, cmb, c1, c2, _id=0){
  const dato = new FormData();  
  dato.append('data', data);    dato.append('type', type);  
  dato.append('campo1', c1);    dato.append('campo2', c2);
  arr1['campo1']=c1; arr1['campo2']=c2; arr1['id']=_id;
  fetch_URL = base_url+'Adr/SetAdr';  
  save(fetch_URL, dato, cmb);
  /*
  const agregar = () => {
    const option = document.createElement('option');
    const valor = new Date().getTime();
    option.value = valor;    option.text = c1;
    $select.appendChild(option);   
  };  */
}

function edtR2(_d={}){
  arr1['id']=_d._id;  arr1['campo1']=_d.c1; arr1['campo2']=_d.c2;   
  const dato = new FormData();  dato.append('campos', JSON.stringify(arr1));
  fetch_URL = base_url+'Adr/setUpr';  save(fetch_URL, dato);
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
  data.append('varVal', varVal);    data.append('varName', varName);
  fetch_URL = base_url+'Ssn/SetSsn';
  save(fetch_URL, data);  
}


function valideKey(evt){
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    //console.log(code)    ;
    if(code==8) { // backspace.
      return true;
    } else if((code>=48 && code<=57) || code==46 || code ==13) { // number. o enter
      return true;
    } else{       return false;    }// other keys.
}

function gtSo(model, fna, arg, elemento){
  //console.log(arguments)
  const data = new FormData();
  if(arg)data.append('arg', arg);  if(arg)data.append('src', arg);
  f_URL = base_url+model; fetch(f_URL, {method:'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {//console.log(texto);
    fna(texto, elemento);      
  })
}

function gtSo2(model, fna, par={}){    
  const data=new FormData(); for (const key in par){if (par.hasOwnProperty(key)){data.append(key, par[key]); }}
  f_URL = base_url+model; fetch(f_URL, {method:'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    if(fna) fna(JSON.parse(texto));  else {console.log('pp'); return JSON.parse(texto); }
  })
}

function gtSo3(model, fna, elemento, options){
  const data = new FormData();
  f_URL = base_url+model; fetch(f_URL, {method:'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    fna([JSON.parse(texto), elemento, ...options]);      
  })
}

function getSome(model, type, param, someData){  //console.log(someData)
  //const data = new FormData();
  //if(someData)data.append('someData', JSON.stringify(someData));
  fetch_URL  = base_url+model; 
  fetch(fetch_URL, {method: 'POST', body: someData})
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
    const res  = await fetch(base_url+model);
    const data = await res.json();
    fillTC(data,type)
    if (type==='token') {localStorage.setItem('tkn',data.data);}
  }
  catch (error){console.log(error);} 
}
const getSome3 = async (model='', par = {}, fn = null) => {
  const fD = new FormData(); 
  for (const key in par) { if (par.hasOwnProperty(key)) fD.append(key, par[key]);  }  
  try {
    const res = await fetch(base_url + model, { method: 'POST', body: fD });
    if (!res.ok) throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
    const data = await res.json();
    //return Array.isArray(data) ? data : (data.products || []);
    //if (fn) fn(data); else return data;
    if (fn) fn(data); else {return Array.isArray(data) ? data : (data|| []);};
  } catch (error) { console.error('errgts3',error); throw error;  } 
};


const getStoConsole = async(model, base=true)=>{
  if (base) model = base_url+model;
  try{
    const res =await fetch(model);
    const data=await res.json();
    console.log(data); return data;
  }
  catch (error){console.log(error);} 
}

const getStoReturn = async(model, base=true)=>{
  if (base) model = base_url+model;
  try{
    const res =await fetch(model);
    const data=await res.json();
    return data;
  }
  catch (error){console.log(error);} 
}

function guardarImagen(model='', record_id=0){
    if (record_id==0) record_id=localStorage.newIndex;
    const dato = new FormData();
    dato.append('campos', JSON.stringify(arr1));
    dato.append('imgName',arr1[idcampo]);
    dato.append('id',record_id);
    save(model, dato);
}

const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => {/*  https://parzibyte.me/blog   */  
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
    ///console.log('comprimiendo...');
    ///const blob = await comprimirImagen(archivo, 10);
    ///const blob = await comprimirImagenWhatsApp(archivo, MAX_WIDTH, JPEG_QUALITY);
    ///src=URL.createObjectURL(blob);
    src = URL.createObjectURL(archivo);
    //console.log('blob',blob);
    //console.log('src',src);
    ///document.querySelector("#image").files[0]=blob;
    document.getElementById('imgModal').src = src;
    document.querySelector('button[type="submit"]' ).disabled=false;
    /*
    if(archivo.size>500000) 
      document.getElementById('btnText').textContent='Imagen muy pesada max:200K'
    else
      document.getElementById('btnText').textContent=(document.getElementById('id').value==="")?"Guardar":"Actualizar";
    */
    edtImgName='';
    if (document.getElementById("enlace")) {
      document.getElementById("enlace").style.display='none';
      document.getElementById(idcampo).value = src;
    }
  });
}
function showPreview(event, img_elem='imgModal', c1='campo1'){  //toDel
  console.log('showPreview', event.target.files);
  if(event.target.files.length > 0){
    let archivo=event.target.files[0];
    async () => { //const archivo = $imagen.files[0];
      ///const blob = await comprimirImagen(archivo, 10);
                    
      const blob = await comprimirImagenWhatsApp(archivo, MAX_WIDTH, JPEG_QUALITY);
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
  idcampoStr=document.getElementById(idcampo)?.value||'';
  imgExterna=(idcampoStr.substring(0,4)=='http')?true:false;
  imgSubir=false; 
  if (!imgExterna){ 
    imgSubir=true;
    if (idcampoStr.length===0) imgSubir=false;//si no hay nada, no subir
  }else{// si edit
    if(localStorage.imgToUpld!==edtImgName){//si cambia, actualizar
      if (!imgExterna) imgSubir=true;
    }
  }
  return imgSubir;
}

function copy_new(){
    campo1 = gId('campo1');    
    if (campo1.type!=='date')  campo1.value+= ' (copia)';
    gId('id').value='';
    
    if (document.getElementById('imgModal')) gId('imgModal').src = nuevaImg('');
    if (document.getElementById(idcampo)) gId(idcampo).value = '';
    //openModal();
    modalHeader();
    gId('btnCopyNew').classList.add('d-none');
    gId('btnDelete').classList.add('d-none');
    document.querySelector('.offer')?.classList.add('d-none');
    //localStorage.imgToUpld='new';   
    edtImgName='';
    campo1.focus();
}

function enlace(){
  if (document.getElementById('a2').innerHTML=='Actualizar imagen') {
    src=gId(idcampo).value;  gId("imgModal").src=src
    gId('a2').innerText='escribir o pegar enlace';
  }else{
    if (document.getElementById('enlace').style.display=='none') {//si no se vé
      gId('enlace').style.display='block'; } else  gId('enlace').style.display='none';
  }
}

function ff(){document.getElementById('a2').innerHTML=
  (event.target.value.substr(0,4)=='http')?'Actualizar imagen'
  :'escribir o pegar enlace';
}

hideAddData = div_option => document.getElementById(div_option).style.display="none";
function comboBuilder(ref, dataType, field, insData, clase='', crud=true, label=true, caption='', advCrud = false) {
  capitalRef=ref.charAt(0).toUpperCase()+ref.slice(1);
  _advCrud = (advCrud)?`<a href="#" tabindex="-2" id="a2" class="a2">...</a>`:'';
  _crud = (crud)?`
    <a href="#" tabindex="-1" id="a1" class="a1" 
      onclick="showAddData('mini-crud_${ref}','txtAdd_${ref}')"><b>+</b></a>
      ${_advCrud}
    <div id="mini-crud_${ref}" style="display: none;" class="minicrud">
      <input type="text" id="txtAdd_${ref}" class="small">       
          <a class="minicrud-btn-ok minicrud-btns" href="#" onclick="newAddData('${insData}', ${dataType},'${field}','txtAdd_${ref}','mini-crud_${ref}')">✔</a>
          <a class="minicrud-btn-cancel minicrud-btns" href="#" onclick="hideAddData('mini-crud_${ref}')">❌</a>      
    </div>`:'';//<div class="minicrud-btns">
    label=(label)?`<label class="cmbLabel${field}" id="cmbLabel${field}" for="${field}">${capitalRef}</label>`:'';
    label = (caption.length>0)?caption: label;
    /*
          <input class="minicrud-btn-plus" type="button" value=" + " 
      onclick="newAddData('${insData}', ${dataType},'${field}','txtAdd_${ref}','mini-crud_${ref}')">
    */
    
  return ` <div id="cmb${capitalRef}" class ="${clase} " >
          ${label} ${_crud} <div id="combo_${ref}" class="combo_${ref}" > </div>  </div>`;  
}

function setPreview(nuevaImg, idcampo, imagen){  return `<br>
  <div class="col-md-12 " style="/*background-color: #f2ebeb;*/" onclick="document.getElementById('image').click();">
    <div class="preview"> <img id="file-ip-1-preview"> </div>
    <img id="imgModal" class="preview " src="${nuevaImg}" title="cambiar imagen" height="200">
  </div>
  <a href="#"  id="a2" onclick='enlace(); event.preventDefault();'> escribir o pegar enlace</a>&nbsp&nbsp
  <div id="enlace" style="display:none;">
    <div class="form-group ">
      <input class="form-control c1" id="${idcampo}" name="campo" type="text" value="${imagen}" oninput="ff();"> 
    </div>      </div>`;  }

function nuevaImg(imagen='', folder){
  if (imagen.length===0) return base_url+"Assets/images/fix/subir_imagen.jpg";
  else return(imagen.toString().substring(0,4)=='http')?imagen:base_url+"Assets/images/"+folder+'/'+imagen;
}

function noImage() {return base_url+"Assets/images/fix/noimage.jpg";}

function comboStatus(idCampo='', sele="selected", required=false){
  required=(required)?'required ':'';  return`
  <div class="">
    <div><label for="${idCampo}">Status</label> </div>
      <div id="combo_stat">
        <select name="${idCampo.substring(0,5)}" id="${idCampo}" class="form-control" ${required} defvalue="1">
          <option value="0">Inactivo</option> <option value="1" ${sele}>Activo</option>
        </select>       </div>     <br>   </div>`;
}

const comboSimple = data =>{ hOptions='';
    data[0].options.forEach(function(option){
    hOptions+=`<option value="${option.option}" ${(data[0].def==option.option)?'selected':''}>${option.value}</option>`;});
  return `<div class="">
    <div><label id ="cmbLabel${data[0]['idcampo']}" for="${data[0]['idcampo']}">${data[0]['cap']}</label>      </div>
      <div id="combo_simple"><select name="${data[0]['name']}" id="${data[0].idcampo}" class="form-control" ${data[0].required} onchange ="cmbChange2(${data[0]['idcampo']})">
          ${hOptions} </select> </div>   </div>  </div>`;
}
/*<div class="col-md-3 " style="padding-top: 15px;">   <div class="form-check"><label class="form-check-label" for="campo4">
                <input type="checkbox" class="form-check-input" id="campo4" name="campo" checked=""><b>Activo</b>     </label>     </div></div>*/
const simpleCheck = data =>{
  hOptions='';  data[0].options.forEach(function(option){
    //hOptions+=`<input type="checkbox" value="${option.option}" ${(data[0].default==option.options)?'selected':''}>${option.value}</option>`;});
    //${(data[0].default.includes(option.option))?'checked':''
    hOptions+=`
      <div class="form-check form-check-inline" title = "${(data[0]['title'])?data[0]['title']:''}">
        <input class="form-check-input" type="checkbox" id="${data[0]['idcampo']}_${option.option}" name="${data[0]['name']}" value="${option.option}" } >
        <label class="form-check-label mb-2" for="${data[0]['idcampo']}_${option.option}">${option.value}</label>
      </div>`;  
  });
  return `
      <div class="">  
          <label id ="cmbLabel${data[0]['idcampo']}" for="${data[0]['idcampo']}">${data[0]['cap']}
      <div id="simple_check">  ${hOptions}  </div>   </label></div>  
      </div>`;
}

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

const isValidUrl = urlString => {preReturn=false;  let url;
  try {        url = new URL(urlString);    }
  catch(e){      return false;    }
  preReturn = url.protocol === "http:" || url.protocol === "https:";
  if (urlString.includes('http',5)) preReturn= false;
  return preReturn;
}
function redondear(valor, digitos){
  const base = 10**digitos;  const precioxBase = valor*base;
  const rPrecioxBase = Math.round(precioxBase);
  const precioFinal = rPrecioxBase/base;
  return precioFinal;   
}

//const formatted = data=>{return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(data);}
const formatted = data=>{return new Intl.NumberFormat( { minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(data);}
//const currency  = data=>{return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(data).replace(/\./g, '\xa0');}
const currency = (data, decimals = 2) => {
  return new Intl.NumberFormat("es-AR", { 
    style: "currency", 
    currency: "ARS",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(data).replace(/\./g, '\xa0');
};


const eliminaDuplicados = (arr) => {  return [... new Set(arr)];}

function gTkn(campo){
  const data = new FormData();  fetch(base_url+'access_token/getToken', {method:'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {texto = JSON.parse(texto); campo.setAttribute('tkn',texto.data); })
}

function actionA1(e,c){
  document.getElementById(c).addEventListener('keyup', (event) => {
    if (event.keyCode == 107) {f=e.substring(6); showAddData('mini-crud_'+f,'txtAdd_'+f);}
   }, false);  
}

const crEl = data =>{return document.createElement(data)}
const crEl2 = (data, className, attributes, textContent) => {
  const element = document.createElement(data);
  if (className) element.className = className;
  if (attributes) for (const key in attributes) {element.setAttribute(key, attributes[key]);}
  if (textContent) element.textContent = textContent;
  return element;
}

const crEl3 = (data, className, attributes, innerHTML) => {
  console.log(data, className, attributes, innerHTML);
  const element = document.createElement(data);
  if (className) element.className = className;
  if (attributes) {
    for (const key in attributes) {      element.setAttribute(key, attributes[key]);    }
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

android = (navigator.userAgent.match(/Android/i))?true:false;
//const isMobile = () => {
//  return (android || navigator.userAgent.match(/iPhone|iPad|iPod/i))?true:false;
//}
const  isValidJSON = data => {
  isJson = true;
  try { JSON.parse(data) } catch { isJson = false }
  return isJson;
}
const gId = data=>{ return document.getElementById(data);}
const gIC = data=>{ return document.querySelector('.'+data);}

// Alias definitivo para seleccionar UN elemento (ID, clase o etiqueta)
const _$ = sel => document.querySelector(sel);
// Alias para seleccionar TODOS los elementos que coincidan
const _$$ = sel => document.querySelectorAll(sel);



///panda
/**
 * Lee el valor del Tag EXIF de Orientación de un archivo de imagen (File).
 * @param {File} imageFile - El objeto File de la imagen original.
 * @returns {Promise<number>} Promesa que resuelve con el valor de orientación (1 a 8).
 */
function getExifOrientation(imageFile) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        // Leemos solo los primeros 64KB del archivo, que es donde se encuentran los metadatos EXIF
        reader.readAsArrayBuffer(imageFile.slice(0, 65536));
        reader.onload = function(e) {
            const view = new DataView(e.target.result);
            // Si el archivo no es un JPEG, o es demasiado pequeño
            if (view.getUint16(0, false) != 0xFFD8) return resolve(1); 

            let offset = 2;
            let orientation = 1;

            while (offset < view.byteLength) {
                if (view.getUint16(offset, false) == 0xFFE1) { // 0xFFE1 es el marcador APP1 (donde va EXIF)
                    const exifStart = offset + 4;
                    const tiffOffset = exifStart + 6;

                    // Comprobación de la estructura EXIF (cadenas 'Exif\0\0')
                    if (view.getUint32(offset + 4, false) != 0x45786966) return resolve(1);

                    // Byte Order: false = Big Endian (Motorola), true = Little Endian (Intel)
                    const littleEndian = view.getUint16(tiffOffset) == 0x4949; 
                    
                    // Comprobar la bandera TIFF (42)
                    if (view.getUint16(tiffOffset + 2, littleEndian) != 0x002A) return resolve(1);
                    
                    // Obtener la posición del IFD0 (Image File Directory)
                    const ifd0Offset = view.getUint32(tiffOffset + 4, littleEndian);
                    
                    // Obtener el número de entradas en el IFD0
                    const entries = view.getUint16(tiffOffset + ifd0Offset, littleEndian);
                    
                    // Recorrer las entradas del IFD0 para encontrar la Orientación (Tag 0x0112)
                    for (let i = 0; i < entries; i++) {
                        const entryOffset = tiffOffset + ifd0Offset + 2 + (i * 12);
                        
                        // Si encontramos el Tag de Orientación (0x0112)
                        if (view.getUint16(entryOffset, littleEndian) == 0x0112) {
                            orientation = view.getUint16(entryOffset + 8, littleEndian);
                            resolve(orientation);
                            return;
                        }
                    }
                }
                offset += 2 + view.getUint16(offset + 2, false);
            }
            resolve(1); // Si no se encontró el tag, asumir Orientación 1
        };

        reader.onerror = () => resolve(1); // Fallback en caso de error
    });
}

/**
 * Aplica las transformaciones (rotación y volteo) al contexto 2D 
 * basándose en el valor de orientación EXIF.
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del Canvas.
 * @param {number} width - Ancho original de la imagen.
 * @param {number} height - Alto original de la imagen.
 * @param {number} orientation - Valor del Tag EXIF de Orientación (1-8).
 * @returns {object} Un objeto con las dimensiones de la rotación (width, height)
 */
function applyExifRotationAndGetDimensions(ctx, width, height, orientation) {
    // Si la orientación es 6, 8 o 5, 7, el ancho y alto deben intercambiarse.
    if (orientation >= 5 && orientation <= 8) {
        [width, height] = [height, width];
    }
    
    // Aplicar la traslación y rotación para que la imagen se dibuje correctamente
    switch (orientation) {
        case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
        case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
        case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
        case 5: ctx.translate(0, 0); ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
        case 6: ctx.translate(width, 0); ctx.rotate(0.5 * Math.PI); break; // Rotación 90° derecha
        case 7: ctx.translate(width, height); ctx.scale(-1, 1); ctx.rotate(0.5 * Math.PI); break;
        case 8: ctx.translate(0, height); ctx.rotate(-0.5 * Math.PI); break; // Rotación 90° izquierda
    }
    
    return { width, height };
}

async function __comprimirImagenWhatsApp(imageFile, maxWidth, jpegQuality) {
  console.log('Comprimir con EXIF', arguments);
    // 1. OBTENER LA ORIENTACIÓN EXIF (Paso Nuevo)
    const orientation = await getExifOrientation(imageFile);
    
    return new Promise((resolve, reject) => {
        if (!imageFile.type.startsWith('image/')) {
            return reject(new Error("El archivo no es una imagen."));
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                let width = img.width;
                let height = img.height;

                // --- 2. Aplicar corrección de orientación ---
                // Si la imagen está rotada 90/270 grados (orientaciones 5, 6, 7, 8), 
                // intercambiamos ancho y alto antes de calcular el escalado.
                const needsSwap = orientation >= 5 && orientation <= 8;
                if (needsSwap) {
                    [width, height] = [height, width];
                }
                
                // --- 3. Calcular nuevas dimensiones (Escalado) ---
                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }
                
                // --- 4. Configurar Canvas para la imagen final ---
                canvas.width = width;
                canvas.height = height;

                // --- 5. Aplicar la Transformación de Orientación ---
                // Aplicamos la rotación/traslación al contexto antes de dibujar.
                if (orientation > 1) {
                    const correctedDims = applyExifRotationAndGetDimensions(ctx, width, height, orientation);
                    // El canvas.width y canvas.height ya están configurados para la salida final,
                    // la función de rotación usa estos valores para las transformaciones.
                }

                // 6. Dibujar la imagen en el Canvas ya transformado
                // Usamos las dimensiones originales de la imagen (img.width, img.height) para 
                // dibujar, y el contexto ya se encarga de la rotación y el redimensionamiento.
                // IMPORTANTE: Dibujar usando las dimensiones corregidas por el escalado.
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

                // 7. Obtener el Blob comprimido con la calidad JPEG
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Error al comprimir la imagen en Blob."));
                    }
                }, 'image/jpeg', jpegQuality);

            };
            img.onerror = reject;
            img.src = event.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}

function comprimirImagenWhatsApp(imageFile, maxWidth, jpegQuality) {
    return new Promise((resolve, reject) => { // 1. Verificar si es un archivo de imagen
        if (!imageFile.type.startsWith('image/')) return reject(new Error("El archivo no es una imagen."));       
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {   // 2. Crear el elemento Canvas
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;                
                if (width > maxWidth) {// 3. Calcular nuevas dimensiones (Reducción de resolución)
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }
                // Asignar las nuevas dimensiones al canvas
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d'); // 4. Dibujar la imagen en el Canvas con las nuevas dimensiones
                // Esto reduce la resolución de la imagen.
                ctx.drawImage(img, 0, 0, width, height);
                // 5. Obtener el Blob comprimido (Reducción de calidad JPEG)
                // canvas.toBlob(callback, mimeType, quality)
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Error al comprimir la imagen en Blob."));
                    }
                }, 'image/jpeg', jpegQuality); // Aquí se aplica la compresión JPEG
            };
            img.onerror = reject;
            img.src = event.target.result;// Cargar la imagen usando el Data URL
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile); // Leer el archivo de la imagen como Data URL (Base64)
    });
}
const cleanChkboxes = (data, cleanTrue = false) => { //true>0
  const rubs = gIC(data).querySelectorAll("input[type='checkbox']");
  rubs.forEach(r=>{ 
    if (cleanTrue && r.value>0) r.checked=false; else r.checked=false; 
    //console.log(r.value, r.checked,r.value>0);
  });
}

const focusModal = (e) => {
  myModal.addEventListener('shown.bs.modal', function () {e.focus();});}

const focusModal2 = (e) => {
  myModal2.addEventListener('shown.bs.modal', function () {e.focus(); });}


const hasSubModal =()=>{return (form.querySelector('.inputs').querySelector('.cont')===null)? false :true;}

const cleanInputs = (cont) => { const inputs = cont.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      dv = input.getAttribute('defvalue') ? input.getAttribute('defvalue'):'';
      if (input.type === 'checkbox') {input.checked = false; } 
      if (input.tagName.toLowerCase() === 'select') {input.selectedIndex = 0;}
      if (input.tagName.toLowerCase() === 'textarea') {input.innerHTML = '';}
      input.value = dv;
    });
}

const dName = data =>{ [_ob, _id] = data;  //console.log(data,_ob);  
  _xx = _ob.find(r=>r.fieldId==_id);  return (_xx)?_xx.fieldName:'Desconocido';
}

const desactivar = data =>{  el = gId(data)||gIC(data); el.setAttribute('disabled', 1);}

const bankTypes = data => {return [{option:1,value:'Efectivo'},{option:2,value:'Banco'}, {option:3,value:'Billetera'}, {option:4,value:'Otro'}];}
/*
gIC('modal-content2').addEventListener('click', (e) => {
      el = e.target;
      console.log(el);
      if(typeof modalBt === 'function') modalBt(el);//arrAlert=delDato([sPage, par2]); 
})
*/

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  //document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  document.cookie = `${cname}=${cvalue}; ${expires}; path=/; SameSite=Strict`;
}

const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const deleteCookie = (cname) => {
  // Parámetros: nombre, valor vacío, tiempo en el pasado, ruta, dominio
  //document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

function guardarCookie(nombre, valor, diasExpiracion) {
  try {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
    const expiracion = "expires=" + fecha.toUTCString();
    // Asignación estándar a document.cookie
    document.cookie = `${nombre}=${valor}; ${expiracion}; path=/; SameSite=Strict`;    
    return {result: true, message: "Cookie guardada correctamente."};
  } catch (error) {
    console.error("No se pudo guardar la cookie:", error.message);
    return {result: false, message: "Error al guardar la cookie."};
  }
}

function btnSaveUI(before=true){
	  gId('btnGuardar').disabled = true;
  	gId('btnGuardarTexto').innerText = "Guardando...";
    gId('btnGuardarSpinner').classList.remove('hidden');
	if (!before){
		gId('btnGuardar').disabled = false;
  	gId('btnGuardarTexto').innerText = "Guardar";
    gId('btnGuardarSpinner').classList.add('hidden');		
	}
 }
