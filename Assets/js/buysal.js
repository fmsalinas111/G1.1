Clients={}; Products={}; Colors={}; prodType=1;

d1=new FormData(); d1.append('src','client'); f_URL=base_url+'Data/getDataCmb/0';
gJSON(f_URL,d1).then((json)=>{Clients=json;}).catch((err)=>console.log("Err:", err));

d1=new FormData(); d1.append('src','product'); f_URL=base_url+'Data/getDataCmb/0';
gJSON(f_URL,d1).then((json)=>{Products=json;}).catch((err)=>console.log("Err:", err));

d1=new FormData(); d1.append('src','data'); f_URL=base_url+'Data/getDataCmb/16';
gJSON(f_URL,d1).then((json)=>{Colors=json;}).catch((err)=>console.log("Err:", err));

clients={}; products={}; products_loaded=false; show=false
acType = localStorage.cppm; pedido=[]; arrDets=[];
acTypeLbl = ['', 'Cliente', 'Proveedor'];
//title.innerHTML=`<i class="fa fa-user-tag"></i>${(acType==1)?' Ventas':' Compras'}`;
title_caption.innerText = (acType==1)?' Ventas':' Compras';

//modal2 start
const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);
form2 = document.querySelector("#form2");
if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}

function validM2(){
  arr2=new Object();  setField();
  arr2['id']=(gId('id2'))? gId('id2').value:0;
  arr2['sid']=(gId('id'))? gId('id').value:0

  if (APP===7)  if (arr2.field5==0) {alertError ('Campo obligatorio','field5'); return;}
  if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return;}
  arr2.field5 = campo13.value; //depot
  const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
  //fURL = base_url+`Buysal/setDetails/${(title.innerText).replace(/\s+/g,'')}`; 
  save(base_url+`Buysal/setDetails/${acType}`, dato);
}

const newDetail=data=>{
  if (campo1.value==0) {alertError('campo obligatorio', 'campo1'); return;}
  if (document.getElementById('id').value==='') { 
    setCampo();
    const dato0=new FormData(); dato0.append('campos', JSON.stringify(arr1)); 
    //save(base_url+`Buysal/setOrder/${(title.innerText).replace(/\s+/g, '')}`, dato0);
    save(base_url+`Buysal/setOrder/${(title_caption.innerText)}`, dato0);
    return;
  }
  $('#field1').val('').trigger('change.select2');
  showModal2(-1)
};

function deleteDetail(arg){eliminar2(arg, document.getElementById('id').value);}

function showModal2(arg){  
  console.log('inputs2.innerHTML.length',inputs2.innerHTML.length, 'arg', arg, 'pedido', pedido);
  if (arg>=0) {
    if(tabDet.rows[arg+1].cells[4].querySelector('a').classList.contains('disabled')) return;
    if(tabDet.rows[arg+1].cells[5].querySelector('a').classList.contains('disabled')) return;
  
    if (inputs2.innerHTML.length==0) preparaModal2(pedido[arg].prid);
    if (!(products.length === undefined)){ filterAndLoadProducts(pedido[arg].prid, acType); console.log('refitrado');}
  	//if (document.getElementById('field1'))document.getElementById('field1').value=pedido[arg].prid;
    if (document.getElementById('field1')) $('#field1').val(pedido[arg].prid).trigger('change.select2');
  	if (document.getElementById('field2'))document.getElementById('field2').value=pedido[arg].cantidad;
  	if (document.getElementById('field3'))document.getElementById('field3').value=pedido[arg].precio;
  	if (document.getElementById('field4'))document.getElementById('field4').value=pedido[arg].notas;
    if (document.getElementById('field5'))document.getElementById('field5').value=pedido[arg].staff;
    if (document.getElementById('field6'))document.getElementById('field6').value=pedido[arg].eventdate;
    if (document.getElementById('field7'))document.getElementById('field7').value=(pedido[arg].type);
    if (document.getElementById('field8'))document.getElementById('field8').value=pedido[arg].cantidad;
    if (document.getElementById('field9'))document.getElementById('field9').value=pedido[arg].precio;

  	document.getElementById('id2').value =  pedido[arg].detid;
  }else{
    if(inputs2.innerHTML.length==0)preparaModal2();
  }
  if (!(products.length === undefined)){ filterAndLoadProducts(pedido[arg].prid, acType); console.log('refitrado')}
  modal2.show();  
}

function preparaModal2(producto=0, cantidad =0, precio =0, notas=''){
  cap=`<fieldset style="margin-bottom: -5px;">
              <label for="p1"><input type="radio" id="p1" name="prFiltr" value="1" />Productos</label>
              <label for="i1"><input type="radio" id="i1" name="prFiltr" value="3"/>Insumos</label>
            </fieldset>`          
  cmbProduct = comboBuilder('producto', acType, 'field1', 'product', 'class', false, true, cap);//unabled crud unrechargeable modal
  staff=0;	inputs=[];
  if (APP===7) {
    //cmbProduct = comboBuilder('producto',2,'field1','product','',(APP===7));  
    cmbStaff = comboBuilder('staff',1,'field5','staff','',false);
      inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
        inputs.push({id:'combo', idCmb:cmbStaff, value:staff});
      inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});    
        inputs.push({id:'field6', campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
      inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});      
      options = [{option:1,value:'Jornada'},{option:2,value:'Precio fijo'}];
      cmbTipo = comboSimple([{idcampo:'field7', name:'field', cap:'Tipo', def:2, options}])
      inputs.push({id:'combo', idCmb:cmbTipo})// 

      inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
        inputs.push({id:'field8', campo:'Horas',selector:'input',type:'number', step:'any', label:1, disabled:'', value:1})
      inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});    
        inputs.push({id:'field9', campo:'Valor hora',selector:'input',type:'number', step:'any', label:1})
      inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});      
  }
  inputs.push({id:'combo', idCmb:cmbProduct})
  
  inputs.push({id:'html', idHt:`<div id="cant_pre">`});
  	inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
  		inputs.push({id:'field2',campo:'Cantidad',selector:'input',type:'number',value:cantidad, step:'any', label:1})
  	inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});		
  	inputs.push({id:'field3',campo:'Precio',selector:'input',type:'number',value:precio, step:'any',label:1})
  	inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'html', idHt:htR2});

  inputs.push({id:'field4',campo:'Notas',selector:'textarea',rows:'2', innerHTML:notas, label:1})	
	openModal(inputs, '.inputs2');

  if (APP===7){
    const dClient = new FormData(); dClient.append('src', 'staff');
    f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dClient,'combo_staff','field5',staff,'staff')
    document.getElementById('cmbLabelfield5').innerText='Servicios';
    document.getElementById('cant_pre').style.display='none';
  }
  //cargarCombo(JSON.stringify(srcCmb), 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor');
  
  cargarCombo((Products), 'combo_producto', 'field1', producto, (APP===7)?'Servicio':'Producto', false,'', true, '','','',false);
  
  /*  if (products.lengh === undefined){
    data1 = new FormData(); data1.append('src', 'product');
    getJson(base_url+'Data/getDataCmb/0', data1, 'combo_producto', 'field1', producto, (APP===7)?'Servicio':'Producto',false,'', '','','',false);
  }   */
    $('#field1').select2({dropdownParent: $('#modal2'), destroy: true, placeholder: 'Seleccionar'});
  
  titleModal2.innerHTML ="Editar detalles"; 
  document.getElementById('p1').click();
}

function filterAndLoadProducts(producto=0, prodType=1){
  
  srcCmb = products.filter(r => r.aux==(APP===13||APP===5)? 1: prodType);
  
  srcCmb = products.filter(r => r.aux==1);   
  //JSON.stringify
  cargarCombo((srcCmb), 'combo_producto', 'field1', producto, (acType==1)?'Producto':'producto o servicio');
}
function cargarTabla(texto, el){
  obj=(texto);  h='';  pedido=obj;   i=0; importe=0; disabled=(titleModal.classList.contains('cancelled'))?'disabled':'';
  for (x of obj) {i++;
    arrDets.push(x.eid);  ddd=(disabled=='disabled')?'':`onclick="deleteDetail(${x.detid})"`;
    htIuri =  (APP===7)? `<td class="iuri">${x.staffName}</td> <td class="iuri">${x.eventdate}</td>
      <td class="iuri">${(x.type==1)?'Jornada':'Valor fijo'}</td>`:'';
    h+=`<tr class="rowDet">
  				<td>${x.product}</td>  ${htIuri}
          <td class="text-right">${x.cantidad}</td>	<td class="text-right">${x.precio}</td>
          <td class="text-right">${formatted(x.precio*x.cantidad)}</td>
  				<td data-id= ${x.detid} class="text-center editDetail action" onclick="showModal2(${i-1});">
          <a class="btn btn-warning btn-sm ${disabled}"><i class="fas fa-edit"></i></a></td>
  				<td data-id= ${x.detid} class="text-center deleteDetail action" ${ddd}>
          <a class="btn btn-danger btn-sm ${disabled}" ><i class="fas fa-trash"></i></a></td>
  			</tr>`;
      importe = importe+x.precio*x.cantidad;
  }    
  h+= `<tfoot> <tr>
          <td colspan="${(APP===7)?6:3}" class="text-center"><strong>Total</strong></td>
          <td id="total" class="text-right" data="${importe}"><strong>${formatted(importe,2)}</strong></td>
       </tr>    </tfoot>`;
  document.getElementById('tDetails').innerHTML = h;
  if (disabled=='disabled') {
    hide(['action']); gId('btnDelete').classList.add ('d-none');

  }
  if (APP!==7)
   { var x = document.getElementsByClassName('iuri');
    for (var i = 0; i < x.length; i++) { x[i].style.display= "none";}}
}


//evaluar si queda
function chgObserver(){
  const textos=document.getElementsByName("campo");
  textos.forEach (function(texto){
    if (texto.type='select-one')    console.log(texto.id)
    //textos.addEventListener('input', editDetail)
    //pepe.addEventListener('input', editDetail)
  });


}


function editDetail(e) {
  //console.log(e.target)
  if (e.target&&e.target.className==='editDetail'&&e.target.tagName==='TD') 
    editItem(e.target.getAttribute("data-id"));
}
function editItem(keyword){ 	}
//


function prepara_abreModal(){
  //if (!show){prepForm();return;}
  preparaModal();
  //prepModal(); 
  showModal(0,'modal-lg');
}

function preparaModal(client=0, fecha=hoy(), sid=0, notas='', ref='', cancelled='',dep=localStorage.depot, stt){
  inputs = [];  cli_pro=(acType==1)?'cliente':'proveedor';
  btnActionForm.style.display=''; 
  cmbClient = comboBuilder(cli_pro, acType, 'campo1', 'client','s-2');
  cmbDep  = comboBuilder('depósito', 21, 'campo13', 'data');
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbClient, autofocus:'1'});
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo2',campo:'Fecha',selector:'input',type:'date', value:fecha, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo12',campo:'Remito',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2}); 
  inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:'1.5', innerHTML:notas, label:1})   
  inputs.push({id: 'combo', idCmb:cmbDep});
  inputs.push({id:'html', idHt:tblDetail()});
  if (cancelled==='')inputs.push({id:'html', idHt:iconNuevo(["newDetail()"])});
  var data = new FormData(); data.append('src', 'client'); 
  //getJson(base_url+'Data/getDataCmb/0', data, 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor') 

  var d1 = new FormData(); d1.append('src', 'data'); 
  getJson(base_url+'Data/getDataCmb/21', d1, 'combo_depósito', 'campo13', dep, 'Depósito',false,'', false, ); 

  openModal(inputs); addClass(['iuri','d-none']);
  srcCmb=clients.filter(r => r.aux==acType);
  //JSON.stringify
  cargarCombo((srcCmb), 'combo_'+cli_pro, 'campo1', client, (acType==1)?'':'Proveedor',false,'',false,false,'','',true);
  //function cargarCombo(texto, el, campo, selected, defValue, disabled=false, label='', hidden=true, required=false, exception, optAdd='', s2=false){
  
  $('#campo1').select2({ dropdownParent: $('#modalForm'), destroy: true, placeholder:acTypeLbl[acType] });
  
  if(parseInt(sid)>0)  drawTableDetails(sid);
  titleModal.innerHTML=title.innerText;//(acType===2)?'Presupuesto ':'Compra ';
  removeClass(['modal-title','cancelled']);
  if(cancelled.length>0) {addClass(['modal-title',cancelled]); }
  //document.getElementById('btnActionForm').style.display='none';
  document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar`;

  otherBtns.innerHTML='<a class="btn btn-info d-none" id="btnCopyNew" title="Copia los datos visibles en un nuevo registro, es muy útil para evitar reescribir" href="#" onclick="copy_new();" ><i class="fa fa-fw fa-lg fa-copy"></i>Copiar y nuevo</a>'; 
  if (titleModal.innerText.trim()==='Ventas') { // y si no es compra
    otherBtn(['pdf',-2]);   otherBtn(['excel',-3]);    otherBtn(['remito',-5]);
    if (stt==-1) {otherBtn(['facturar',-4,'disabled']);
      btnActionForm.style.display='none'; 
      cmbDepósito.style.display='none';
    }
  }

}



const otherBtn = data =>{  btn_name = data[0]; 
  tName = document.createElement('a');   tName.className = "btn btn-info export";
  tName.innerHTML = btn_name.charAt(0).toUpperCase()+btn_name.slice(1);
  if(data[2]) {if(data[2]==='disabled'); tName.disabled=true;}//tName.setAttribute(data[2],'');}
  tName.setAttribute("exportto",btn_name);tName.setAttribute("tabindex",data[1]);
  tName.href=""; document.getElementById('otherBtns').appendChild(tName);
}

//export
  document.querySelector("#otherBtns").addEventListener("click", exportar);
  function exportar(e) { e.preventDefault();     
    if (e.target&&e.target.tagName==='A'&&!(e.target.getAttribute('disabled')=='true')) exportTo(e.target.getAttribute("exportto"));
  }
  function exportTo(keyword){ 
    if (keyword==='pdf') {
      window.open('pdf_presup/getExport','_blank'); 
    }
    if (keyword==='excel') {console.log('export excel'); 
      sheet = (campo1.options[campo1.selectedIndex].text)      
      tableToExcel('tabDet',sheet);
    }
    if (keyword==='facturar') facturar(); 
    if (keyword==='remito') window.open('pdf_remito/getExport','_blank'); 

  }
//



function drawTableDetails(sid){
  dataTbl = new FormData(); dataTbl.append('src', 'details'); 
  getTbl(base_url+'Data/getDataTbl/'+sid, dataTbl, 'tabla_detalles')  
}


var table; ///datatable///
if(acType==='undefined') acType=1;
botones = "<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> ";
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableSales').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/buysal/getSales/"+acType,   "dataSrc": ""  },
    "columns": [
      { "data": "si" },
      { "data": "saux" },
      { "data": "clType" },
      //{ "data": "fecha", className:"text-center"},
      {data: {_: 'fecha', sort: 'ffecha'},className:"text-center"},
      { "data": "fullname", className:"lnkCta", "render":function(data,type,row){
        b=data.indexOf('|'); c = data.substring(b+1);
        if (data.substring(0, b)=='-1') return c+'<b style="color:blue;"> (Presupuesto)</b>'; else return c;}
      },
      { "data": "amount",className:"text-right" },
      { "data": "notes" },
      { "data": null,"orderable": false},
    ],
    "columnDefs": [
      { targets: 0, visible: false},//id
      { targets: 1, visible: false},//saux
      { targets: 2, visible: false},//clType
      { targets: 7, "defaultContent":botones, data:null, className:"text-center"}],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
  el=(acType==2)?'c':'v';
  document.getElementById(el).click();

  gtSo('Data/getDataCmb/0',(texto)=>clients=JSON.parse(texto),'client');

});

$('#tableSales').on('click', 'button.botonmodificar', function() {
  const reg = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = reg.si;
  preparaModal(reg.clid, reg.ffecha, reg.si, reg.notes, reg.ref, (reg.stt===2)?'cancelled':'', reg.dep, reg.stt)
  showModal(1,'modal-lg'); //btnDelete.classList.add('delSales');
});

//lnk
 $('#tableSales').on('dblclick', '.lnkCta', function() {  
  let r = table.row($(this).parents('tr')).data();
  if (r.clid==0) return; 
  b=r.fullname.indexOf('|'); c = r.fullname.substring(b+1);
  setXslt(r.cltype);  setXCli('xcli',r.clid);  setXCli('xname',c);
  window.location.href ='Ctactes';
})


$("input[type=radio]").change(function(){
  if(this.name==='prType')  {prodType=(this.value); prodFilter2([this.value, this.name]);  return;}
  dd=(this.id=='v')?'1':'2';  
    $.fn.dataTable.ext.search.push(
      function(settings, data, dataIndex) {  
         return data[2] ==dd } )
  table.draw();  
  //title.innerHTML=`<i class="fa fa-user-tag"></i>${this.parentElement.innerText}`;
  title_caption.innerText = `${this.parentElement.innerText}`;
  localStorage.cppm=dd; localStorage.account=dd; acType=dd;
  if (!(products.length === undefined)){filterAndLoadProducts(0,1);console.log('pp');}
});


const mostrarHoras = data=>{  
  if (data[0]=='2') { //document.getElementById('journal').style.display=(data[0]=='2')?'none':'block';
    field8.value=1; field8.disabled=true;
    lbl_field9.innerText='Valor'; lbl_field8.innerText=''; 
    field9.focus();
  }else{
    field8.disabled=false;
    lbl_field8.innerText='Horas'; 
    lbl_field9.innerText='Valor hora'; field8.focus();
  }
}
const mostrarPrecio = data=>{  field3.value = data;}

const facturar = data=>{  
  console.log('cambios en sales id', document.getElementById('id').value)
  /*abrir un nuevo dialog 
  fecha:
  comments
  iva:
  Fase 1: xcrear un nuevo sales record 
  */  
  setCampo()
  arr1['campo3']=document.getElementById('total').getAttribute('data');
  arr1['campo4']=JSON.stringify(arrDets);
  arr1['campo15'] = "1";
    console.log(arr1, arrDets)
  const dato=new FormData(); dato.append('campos', JSON.stringify(arr1));
  fURL = base_url+'Cpacos/setInvoice';  save(fURL, dato);
}

const beforeSave = data=>{ arrAlert=[]; //  console.log(data)
  arr1['campo4'] = (gId('total'))?gId('total').getAttribute('data'):0
  //arr1['campo4'] = document.getElementById('total').getAttribute('data');
  console.log(arr1, data[0])
  switch (data[0]) {
    case 'buysal':
      fetch_URL=base_url+'Buysal/setBuysa/buy';
    break;
    default:console.log('someaction'); break;
  }
  return arrAlert;
}

const afterSave = data=>{  
  [index, model, arr1, objData] = data;
  switch (model) {
    case 'Compras': case 'Ventas':
      gId('id').value = index; hideModal=0;  showModal2(-1);
      /*
      document.getElementById('id').value= data[0];
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0;  
      */
      break;
    case 'buy': 
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=1; 
      break;
    case 'setDetails': case '2': case '1':
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0; updating = true;
    break;
    case 'setInvoice':
      updating = true;
      break;
    case 'delBuysa': 
      if (data[3].sid>0) {
        drawTableDetails(document.getElementById('id').value);
        hideModal=0; 
      }
      updating=true;
      break;
    default:console.log('someaction buy', data[1]); break;
  } 
  //if (model=='delBuysa'||model=='delInventor'||model=='delSubcat') {drawTableDetails(document.getElementById('id').value);return null;}

}

const tblDetail =data=>{
  htIuri = (APP===7)? `<th class="iuri">Staff</th> <th class="iuri">Fecha</th> <th class="iuri">Tipo</th>`:'';
  return `<div class="form-group ">
            <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
            <thead><th>Producto</th>${htIuri}
            <th>Cantidad</th><th>Precio</th><th>Importe</th><th colspan="2" class="text-center action">Acciones</th></thead>
            <tbody id="tDetails"></tbody></table></div>		`;}

const iconNuevo = data =>{ return `
<div class="row"><div class="col">
  <a href="#"title ="Nuevo item" onclick="${data[0]}">
    <div class="d-flex flex-column align-items-center text-center">
      <img  width="30px" src="./Assets/images/icons/addRec.png"> 
    </div>     </a></div><div class="col">              </div></div>`;}

    
const savOb = data=>{ 
  //console.log(data);
  if (data[0]==='combo_producto') {
    products = JSON.parse(data[1]);  
    filterAndLoadProducts(data[2],acType);
  }
}

/*new buy form*/
function prepModal(client=0, fecha=hoy(), sid=0, notas='', ref='', cancelled='',dep=localStorage.depot){
  inputs = [];  cli_pro=(acType==1)?'cliente':'proveedor';
  cmbClient  = comboBuilder(cli_pro, acType, 'campo1', 'client');
  cmbDep  = comboBuilder('depósito', 21, 'campo13', 'data');
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbClient, autofocus:'1'});
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo2',campo:'Fecha',selector:'input',type:'date', value:fecha, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo12',campo:'Remito',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2}); 
  inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:'1.5', innerHTML:notas, label:1})   
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbDep});
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'html', idHt:'<br>'});
  inputs.push({id:'html', idHt:tblDetail()});
  if (cancelled==='')inputs.push({id:'html', idHt:iconNuevo(["newRow()"])});
  var data = new FormData(); data.append('src', 'client'); 
  //getJson(base_url+'Data/getDataCmb/0', data, 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor') 

  var d1 = new FormData(); d1.append('src', 'data'); 
  getJson(base_url+'Data/getDataCmb/21', d1, 'combo_depósito', 'campo13', dep, 'Depósito') 


  openModal(inputs);  //addClass(['iuri','d-none']);
  srcCmb=clients.filter(r => r.aux==acType);
  cargarCombo((srcCmb), 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor');
  if(parseInt(sid)>0)  drawTableDetails(sid);
  titleModal.innerHTML=(acType===2)?'Presupuesto ':'Compra ';
  removeClass(['modal-title','cancelled']);if(cancelled.length>0) addClass(['modal-title',cancelled]);
  //document.getElementById('btnActionForm').style.display='none';
  document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar`;

  if (document.querySelectorAll('.export').length ==0) {
    otherBtn(['pdf',-2]);                   otherBtn(['excel',-3]);
    otherBtn(['facturar',-4,'disabled']);   otherBtn(['remito',-5]);
  }
}

const newRow=data=>{
  h+=`<tr class="rowDet">
  <td>prod</td>
    <td class="text-right">cantidad</td>	<td class="text-right">precio</td>
    <td class="text-right">importe</td>
  </tr>`;
  
  document.getElementById('tDetails').innerHTML = h;
}    


document.querySelector("#inputs2")?.addEventListener('click',(e)=>{
  el=e.target;    //if (el.type==='radio') tabs(el.value);
  if(el.type==='radio') prodFilter2([el.value, el.name])
});


const prodFilter = data =>{
  [value_, name_] = data;
  console.log(value_,name_)
  if (name_==='prFiltr') { 
    addClass(['opt','d-none']);  removeClass(['opt_'+value_,'d-none']);
    field1.value=0;  }
  if (name_==='prType') { 
    addClass(['opt','d-none']);  removeClass(['opt_'+value_,'d-none']);//field1.value=0;  
    }
}

const prodFilter2 = data =>{ [value_, name_] = data;
  console.log(data)
  field1.innerHTML='';
  srcCmb = Products.filter(r => r.aux==((APP===7)?2:1));
  cargarCombo((srcCmb), 'combo_producto', 'field1', 0, (APP===7)?'Servicio':'Producto', false,'', true,false,'','',true)
  
  $('#field1').select2({
    dropdownParent: $('#modal2'), destroy: true,  placeholder: 'Producto'
  });
}

$(document).on("select2:open", () => {
  document.querySelector(".select2-container--open .select2-search__field").focus()
})