const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);
form2 = document.querySelector("#form2");
if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}
hProducts = '';
pedido=[]; arrTercer=[]; vendors={}; Products={};

function validM2(){
  arr2=new Object();
  arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
  arr2['o_id']=(document.getElementById('id'))? document.getElementById('id').value:0
  campos=document.getElementsByName("field")
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;     valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0&&i==0)valor='';
    arr2[clave]=valor;
  } 
  if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return null;}
  if(primera(titleModal2.innerText)==='Insumos'){
    const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
    fURL = base_url+'G_production/setProdDetails';  save(fURL, dato);
  }else{ //servicios
    const dato1=new FormData(); arr2['field7']=campo1.value;
    dato1.append('campos', JSON.stringify(arr2));
    fURL = base_url+'G_production/setOrderF';  save(fURL, dato1);
  }
}

ht1 =`<div class="row ">`;ht2 =`</div>`; ht3 =`<div class="col-sm-3">`; 
ht4 =`<div class="col-sm-4">`; ht6 =`<div class="col-md-6">`;   

function preparaModal(orden=0,fecha=hoy(), medida=0, molde='', product=0, notas='', o_id=0, qtalles=0){
  cmbProduct = comboBuilder('producto',1,'campo3','product','',true);
  inputs = [];
  inputs.push({id:'html', idHt:ht1});  inputs.push({id:'html', idHt:ht6});
  inputs.push({id:'campo1' ,campo:'Orden de producción',selector:'input',type:'text',placeholder:'Código o nro', value:orden, label:1})
  inputs.push({id:'html', idHt:ht2});  inputs.push({id:'html', idHt:ht6});
  inputs.push({id:'campo2' ,campo:'Fecha ',selector:'input', type:'date',value:fecha,label:1})
  inputs.push({id:'html', idHt:ht2}); inputs.push({id:'html', idHt:ht2})
  inputs.push({id:'combo',  idCmb:cmbProduct})// producto campo3
  inputs.push({id:'html', idHt:ht1});  inputs.push({id:'html', idHt:ht4});
  inputs.push({id:'campo7' ,campo:'Cant talles',selector:'input',type:'text', value:qtalles,label:1})
  inputs.push({id:'html', idHt:ht2});  inputs.push({id:'html', idHt:ht4});
  inputs.push({id:'campo4' ,campo:'Medida',selector:'input',type:'text', placeholder:'Descripción',value:medida,label:1})
  inputs.push({id:'html', idHt:ht2});  inputs.push({id:'html', idHt:ht4});
  inputs.push({id:'campo5' ,campo:'Molde',selector:'input', type:'number',value:molde,label:1})
  inputs.push({id:'html', idHt:ht2}); inputs.push({id:'html', idHt:ht2})
  inputs.push({id:'campo6', campo:'Notas',selector:'textarea',rows:'2', innerHTML: notas,label:1})
  inputs.push({id:'html', idHt:options()});
  inputs.push({id:'html', idHt:tblDetail()});
  inputs.push({id:'html', idHt:outsource()});
  inputs.push({id:'html', idHt:cost()});
  if (hProducts==='') load_hProducts(['combo_producto']);
  //var data = new FormData(); data.append('src', 'product'); 
  //getJson(base_url+'Data/getDataCmb/1', data, 'combo_producto', 'campo3', product,'Producto')

  if (o_id>0){drawTableDetails(o_id, orden);}

  openModal(inputs);
  titleModal.innerHTML='Orden de producción';
}

const load_hProducts = data=>{  
  gtSo('Data/getDataCmb/0', setObj, 'product', data[0]);
}

function setObj(texto, el){
  Products=JSON.parse(texto);  
  fltr([texto, el, 'campo3', 'Seleccionar producto', 0, 1]);
}

const fltr = data=>{
  console.log(data)
  if (data[1]==='combo_producto') {
    flt=JSON.parse(data[0]).filter(r => r.aux==data[5]);
    cargarCombo(JSON.stringify(flt), data[1], data[2], 0, data[3] );
    hProducts=data[2].innerHTML;
  }
}

function drawTableDetails(o_id, order){//  console.log(o_id);
  let dataTbl = new FormData(); dataTbl.append('src', 'prod_details'); 
  fURL=base_url+'Data/getDataTbl/'+o_id; getTbl(fURL, dataTbl, 'tDetails');//cargaTabla

  let dataTbl1 = new FormData(); dataTbl1.append('src', 'tercer'); 
  fURL=base_url+'Data/getDataTbl/'+order; getTbl(fURL, dataTbl1, 'tOutsource');//cargaTabla
}

function cargarTabla(texto, el){
  if (el==='tDetails') {insumos(texto, el);}
  if (el==='tOutsource') {tercer(texto, el);}
}

function costos(texto, el){
  console.log(el)
  //document.getElementById(el)?.innerHTML='<h1>Hola pepe</h1>'
}

function tercer(texto, el){
  obj=(texto);  h='';  arrTercer=obj;   i=0; importe=0; qprod=0;
  for (x of obj) {i++;
    h+=`<tr class="rowDet">
          <td class="vendor" idSel="${x.idvendor}">${x.fullname}</td>
          <td class="product" idSel="${x.idservice}">${x.product}</td>         
          <td class="text-center">${x.qa}</td><td class="text-right">${x.pri}</td>
          <td class="text-right">${x.pri*x.qa}</td>
          
          <td data-id= ${x.sid} class="text-center editDetail" onclick="showModal2B(${i-1});">
          <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
          <td data-id= ${x.sid} class="text-center deleteDetail" onclick="deleteDetail(${x.sid},'s')">
          <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
      importe += x.pri*x.qa; 
  }    
  h+= `<tfoot>      <tr style="color: blue;">
          <td class="text-center" colspan="4"><strong>Total</strong></td>          
          <td class="text-right tot-outsource"><strong>${importe}</strong></td>
       </tr>    </tfoot>`;
  h+= iconNuevo([el, 'Tercerización o compra']);  document.getElementById(el).innerHTML = h;

  totSer =Number(document.querySelector('.tot-outsource')?.innerText)
  totInsu=Number(document.querySelector('.tot-insumo')?.innerText)
  tCost.innerHTML=`
      <tr class="rowDet"> <td >Insumos</td> <td >${totSer}</td><td >${totSer/240}</td> </tr>
      <tr class="rowDet">  <td >Servicios y accesorios</td>
        <td >${totInsu}</td> <td >${totInsu/240}</td>  </tr>
      <tfoot>      <tr style="color: blue;">
          <td class="text-center" ><strong>Total</strong></td>          
          <td class="text-right "><strong>${totSer+totInsu}</strong></td>
          <td class="text-right "><strong>${(totSer+totInsu)/240}</strong></td>
       </tr>    </tfoot>      `;

}

function insumos(texto, el){
  obj=(texto); h=''; pedido=obj; i=0; 
  importe=0; qprod=0; cantidad=0; precio=0;
  for (x of obj) {i++;
    h+=`<tr class="rowDet">
          <td>${x.prodName}</td>         <td class="text-center">${x.cantidad}</td>
          <td class="text-right">${x.precio}</td><td class="text-right">${x.precio*x.cantidad}</td>
          <td class="text-right">${x.qprod}</td>
          <td data-id= ${x.detid} class="text-center editDetail" onclick="showModal2(${i-1});">
          <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
          <td data-id= ${x.detid} class="text-center deleteDetail" onclick="deleteDetail(${x.detid},'i')">
          <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
      importe  = importe+x.precio*x.cantidad;   
      qprod += x.qprod; cantidad += x.cantidad; precio += x.precio;
  }    
  h+= `<tfoot>      <tr style="color: blue;">
          <td class="text-center"><strong>Total</strong></td>
          <td class="text-center"><strong>${cantidad}</strong></td>
          <td class="text-right"><strong>${precio/i}</strong></td>
          <td class="text-right tot-insumo"><strong>${importe}</strong></td>
          <td class="text-right"><strong>${qprod}</strong></td>
       </tr>    </tfoot>`;
  h+= iconNuevo([el, 'Nuevo insumo']);  document.getElementById(el).innerHTML = h;

}


const newDetail=data=>{
  if (campo1.value==0) {alertError('campo obligatorio', 'campo1'); return;}
  switch (data.id){
    case 'tDetails':
      if (document.getElementById('id').value==='') { 
        setCampo();
        const dato0=new FormData(); dato0.append('campos', JSON.stringify(arr1)); 
        save(base_url+`G_production/setG_prod/new`, dato0);
      }
      showModal2(-1)
    break;
    case 'tOutsource':
      showModal2B(-1)
    break;
    default:
    break;
  }
};

function showModal2(arg){
  if(inputs2.innerHTML.length<40||!primera(titleModal2.innerText)==='Insumos')preparaModal2(pedido[arg]?.prid);
  if (arg>0||arg==0) {
    if (document.getElementById('field1'))document.getElementById('field1').value=pedido[arg].prid;
    if (document.getElementById('field2'))document.getElementById('field2').value=pedido[arg].cantidad;
    if (document.getElementById('field3'))document.getElementById('field3').value=pedido[arg].precio;
    if (document.getElementById('field4'))document.getElementById('field4').value=pedido[arg].qprod;
    if (document.getElementById('field5'))document.getElementById('field5').value=pedido[arg].notas;
    document.getElementById('id2').value =  pedido[arg].detid;
  }
  modal2.show();
  titleModal2.innerHTML=(id2.value==='')?'Insumos - Nuevo':'Insumos - Editar';
  //document.getElementById('modal2').querySelector('.modal-header').classList.replace("headerUpdate","headerRegister");
}

function showModal2B(arg){
  console.log(arrTercer[arg])  
  if(inputs2.innerHTML.length<40||primera(titleModal2.innerText)==='Insumos')preparaModal2B(arrTercer[arg]?.idvendor, arrTercer[arg]?.idservice,);
  if (arg>0||arg==0) {
    if (document.getElementById('field1'))document.getElementById('field1').value=arrTercer[arg].idVendor;
    if (document.getElementById('field2'))document.getElementById('field2').value=arrTercer[arg].fecha;
    if (document.getElementById('field3'))document.getElementById('field3').value=arrTercer[arg].idservice;
    if (document.getElementById('field4'))document.getElementById('field4').value=arrTercer[arg].qa;
    if (document.getElementById('field5'))document.getElementById('field5').value=arrTercer[arg].pri;
    if (document.getElementById('field6'))document.getElementById('field6').value=arrTercer[arg].notes;
    document.getElementById('id2').value =  arrTercer[arg].sid;
  }
  modal2.show();
}
function preparaModal2B(vendor=0,product=0, cantidad =0, precio =0, notas=''){inputs=[];
  cmbVendor  = comboBuilder('proveedor',2,'field1','client','',true);
  cmbProduct = comboBuilder('servicio',2,'field3','product','',true);
  inputs.push({id:'html', idHt:htR1}); inputs.push({id:'html', idHt:ht7});
    inputs.push({id:'combo', idCmb:cmbVendor})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht5});
    inputs.push({id:'field2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:htR2});
  inputs.push({id:'combo', idCmb:cmbProduct})
  inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'field4',campo:'Cantidad',selector:'input',type:'number',value:cantidad, step:'any', label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});    
    inputs.push({id:'field5',campo:'Precio',selector:'input',type:'number',value:precio, step:'any', label:1})

  inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'field6',campo:'Notas',selector:'textarea',rows:'2', innerHTML: notas,label:1})  
  openModal(inputs, '.inputs2')
  let data1 = new FormData(); data1.append('src', 'client'); fURL = base_url+'Data/getDataCmb/2'; 
  getJson(fURL, data1, 'combo_proveedor', 'field1',vendor,'Proveedor')

  //let data2 = new FormData(); data2.append('src', 'product'); fURL = base_url+'Data/getDataCmb/2'; 
  //getJson(fURL, data2, 'combo_servicio', 'field3',product,'Producto o servicio')
  fltr([texto, el, 'field3', 'Seleccionar servicio', product]);
  titleModal2.innerHTML ="Editar detalles"; 
}


function closeModal2(){
  document.querySelector('#form2').reset();
  document.getElementById('id2').value = ''; inputs2.innerHTML='';
  modal2.hide();
}

function deleteDetail(arg, source){
  if (source==='i') eliminar2(arg, document.getElementById('id').value);
  else eliminar2(arg, document.getElementById('id').value, 'G_production/delService');
}

function prepara_abreModal(){    preparaModal();    showModal(0,'modal-lg');}

function preparaModal2(insumo=0, cantidad =0, precio =0, notas='', cprod=0){inputs=[];
  cmbProduct = comboBuilder('insumo',3,'field1','product','',true);
  inputs.push({id:'combo', idCmb:cmbProduct})
  inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht4});
    inputs.push({id:'field2',campo:'Cantidad',selector:'input',type:'number',value:cantidad, step:'any', label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht4});    
  inputs.push({id:'field3',campo:'Precio',selector:'input',type:'number',value:precio, step:'any', label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht4});
  inputs.push({id:'field4',campo:'Cant. producida',selector:'input',type:'number',value:cprod, step:'any', label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'field5',campo:'Notas',selector:'textarea',rows:'2', innerHTML: notas,label:1})  
  openModal(inputs, '.inputs2')
  let data1 = new FormData(); data1.append('src', 'product'); fURL = base_url+'Data/getDataCmb/3'; 
  getJson(fURL, data1, 'combo_insumo', 'field1',insumo,'Insumo')
  //document.querySelector('#titleModal2').innerHTML ="Editar detalles"; 

  titleModal2.innerHTML = "Insumos - Editar detalles"; 
}


var table; ///datatable///
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>` ;
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableGproduction').DataTable({
    "aProcessing": true,  "aServerside": true,
    //"language": {"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"},
    "language": {"url": " "+ base_url+"Assets/js/plugins/Spanish.json"},
    "ajax"    : {"url": " " + base_url + "G_production/getG_prod/", "dataSrc": ""},
    "columns": [
      {"data": "o_id", className: "text-center"  },
      {"data": "o_code", className: "text-center"  },
      {"data": "ffecha", className: "text-center" },
      {"data": "producto"},
      {"data": "lt", className: "text-right" },
      {"data": "molde", className:"text-right"},
      {"data": null,"orderable": false},
    ],
    "columnDefs": [
      //{ targets: 0, visible: false},//id
      {targets: 6, "defaultContent":botones, data: null, className: "text-center"  }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order":[[0, "desc"]]
  });
})

$('#tableGproduction').on('click', 'button.botonmodificar', function() {
  const reg = table.row($(this).parents('tr')).data();
  preparaModal(reg.o_code, reg.fecha, reg.lt, reg.molde, reg.prodid, reg.notas,reg.o_id, reg.qtalles)
  showModal(0,'modal-lg');  
  document.getElementById('id').value = reg.o_id;
});


const beforeSave = data=>{arrAlert=[]; //  console.log(data)
  switch (data[0]) {
    case 'g_production': 
      if (campo3.value==0) arrAlert.push('Seleccione un producto','campo3')
      fetch_URL = base_url +'G_production/setG_prod'; 
    break;
    default:console.log('someaction before'); break;
  }
  return arrAlert;
}

const afterSave = data=>{  //  console.log(data)
  switch (data[1]) {
    case 'setProdDetails': case 'delG_productio':
      drawTableDetails(document.getElementById('id').value, campo1.value); 
      hideModal=0; closeModal2();
    break;

    case 'new': 
      document.getElementById('id').value= data[0];
      console.log(campo1.value)
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value, campo1.value); 
      hideModal=0; return;
    break;
    case 'setOrderF': case 'delService':
      if(data[0]>0||data[0]==undefined) drawTableDetails(document.getElementById('id').value, campo1.value); 
      hideModal=0; closeModal2();
    break;

    default: break;
        
  } 
}

const options=data=>{  return `
  <label ><input checked  type="radio"value="htDetail" name="htab">Insumos</label>
  <label ><input  type="radio"value="htOutsource" name="htab">Tercerización</label>
  <label ><input  type="radio"value="htCost" name="htab">Costos</label>  `;
}

const iconNuevo =data=>{return `
    <div class="row">  <div class="col">
        <a href="#"title ="${data[1]}" onclick="newDetail(${data[0]});">
          <div class="d-flex flex-column align-items-center text-center">
            <img  width="30px" src="./Assets/images/icons/addRec.png"> 
          </div></a></div>          <div class="col"></div>          </div>`;}

const tblDetail =data=>{return `
    <div class="form-group col-md-12 htDetail htTab" >
      <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: blue;"><th>Insumo</th><th>Cantidad</th><th>Precio</th><th>Importe</th><th>Cant prod</th><th colspan="2" class="text-center">Acciones</th></thead>
        <tbody id="tDetails"></tbody>      </table>    </div>    `;}

const outsource=data=> {  return `
    <div class="form-group col-md-12 htOutsource htTab d-none" >
      <table id="tabOut" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: blue;"><th>Proveedor</th><th>Serv /prod </th><th>Cantidad</th><th>Precio</th><th>Importe</th><th colspan="2" class="text-center">Acciones</th></thead>
        <tbody id="tOutsource"> </tbody></table> </div>  `;}

const cost=data=> {  return `
    <div class="form-group col-md-12 htCost htTab d-none" >
      <table id="tabCost" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: green;"><th>Costo</th><th>Importe</th><th>Costo Unit</th></thead>
        <tbody id="tCost"> </tbody></table> </div>  `;}

document.querySelector("#inputs")?.addEventListener('click',(e)=>{
  el=e.target;  if (el.type==='radio') tabs(el.value);
  if (el.tagName==='TD'&&el.classList.contains("vendor"))  tds([el,'v']);
  if (el.tagName==='TD'&&el.classList.contains("product")) tds([el,'p']);
});


const tabs=data=> {addClass(['htTab','d-none']);  removeClass([data,'d-none']);}

const tds=data=> {
  el = data[0];
  if (data[1]==='v') {
    if(el.querySelectorAll('select').length<1){
      if (selVendor.innerHTML==='') gtSo('Data/getDataCmb/2',setCombo,'client',el);
      else newSel(el);    } 
  }else{
    console.log(el)
    if(el.querySelectorAll('select').length<1){
      //fltr([Products, el, 'campo3', 'Seleccionar producto', 0, 2]);
      if (selServi.innerHTML==='') gtSo('Data/getDataCmb/2',setCombo,'product',el);
      else newSel(el);  
    }
  }
}

function setCombo(texto,el){
  h=`<option selected hidden value="0">Proveedor</option>`; 
  obj=JSON.parse(texto);  vendors=obj;
  for (x of obj) { 
    h+=`<option value ="${x.fieldId}" aux="${x.aux}">${x.fieldName}</option>`; 
  }
  if(el.classList.contains('vendor')) selVendor.innerHTML=h; else selServi.innerHTML=h;
  newSel(el);
}
const newSel = data=>{  
    neSel=document.createElement('select'); 
    neSel.className=el.className;
    if(data.classList.contains('vendor')) neSel.innerHTML=selVendor.innerHTML;
     else neSel.innerHTML = selServi.innerHTML;
    neSel.value=Number(data.getAttribute('idsel'));
    neSel.addEventListener("blur",(e)=>{lostfocus(data)});
    data.innerHTML='';  data.appendChild(neSel);
    neSel.focus();
}

inputs.addEventListener('change',(e)=>{ el=e.target;
  if(el.type==='select-one'&&el.classList.contains('tercer')) removeClass(['icn','d-none']);
});

function lostfocus(e){ //console.log(e)
  combo = e.firstChild; 
  const nv = vendors.find(vendor =>vendor.fieldId == combo.value);
  e.innerHTML = nv.fieldName;
}