btnNuevo=document.querySelector("#btnNuevo"); 
//if (btnNuevo) btnNuevo.addEventListener('click',()=>{preparaModal(); showModal(0,'modal-lg');});
function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);

cppmi=['Clientes','Proveedores','Pacientes','Médicos','Inquilinos'];
localStorage.setItem('imgToUpld','new');  edtImgName='', idcampo='';

var table; var cli_pro='Cliente';
var clipro=['Cliente','Proveedor','Paciente','Médico','Inquilino']
var co_pa=['Cobrar','Pagar']; arrDets=[];
type = localStorage.getItem('cppm');  acco = localStorage.getItem('acco');

if (APP==='hm')  cli_pro='Inquilino';
if (APP==='klk') cli_pro='Paciente/Cliente';
if (acco==2) cli_pro='Proveedor';

title.innerHTML = '<i class="fa fa-user-tag"></i> Cuentas por <mark>'+co_pa[acco-1]+'</mark>';

if (acco==1) document.getElementById('btnNuevo').style.display = 'none';
document.getElementById('clipro').innerHTML=cli_pro; //table title

///datatable///
document.addEventListener('DOMContentLoaded', function() {
  botones= `<button  type='button' class='botonmodificar btn btn-warning btn-sm '><i class='fa fa-edit'></i></button> 
          <button  type='button' class='botonPercibir  btn btn-success btn-sm'><i class='fas fa-money-bill-wave'></i></button>`;
	table=$('#tableCpaco').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Cpacos/getCpacos/"+acco,   "dataSrc": ""  },
    "columns": [
      { "data": "saux" },
      { "data": "ffecha", className: "text-center" },
      { "data": "vencimiento", className: "text-center" },
      { "data": "sid" },
      { "data": "fullname" },
      { "data": "amount",className: "text-right",
          render: $.fn.dataTable.render.number( ',', '.', 0 )},
      {data: 'saldo',className: "text-right",
          render: $.fn.dataTable.render.number( ',', '.', 0 )},
      { "data": null,"orderable": false},
    ],
    "columnDefs": [ 
      { targets: 0, visible: false},//saux
      { targets: 3, visible: false},//id
      { targets: 7, "defaultContent":botones, data: null, className: "text-center"  }  
    ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ],

    footerCallback: function (row, data, start, end, display) {
      let api = this.api();
      // Remove the formatting to get integer data for summation
      let intVal = function (i) {
          return typeof i === 'string'
              ? i.replace(/[\$,]/g, '') * 1
              : typeof i === 'number'
              ? i
              : 0;
      };

      // Total over all pages
      total = api
          .column(6)
          .data()
          .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Total over this page
      pageTotal = api
          .column(6, { page: 'current' })
          .data()
          .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Update footer
      api.column(6).footer().innerHTML =
          'Total: ' + pageTotal + ' ( $' + total + ' total)';          
    }

  });

})

///datatable modificar
$('#tableCpaco').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();
    console.log(r)
    document.getElementById('id').value = r.salesid;      
    preparaModal(r.clientid);    
    document.getElementById('campo1').value = r.salesdate
    document.getElementById('campo2').value = r.amount
    //document.getElementById('campo3').value = r.clientid
    document.getElementById('campo4').value = r.notes
    
    showModal(0,'modal-lg');
});

///datatable percibir
$('#tableCpaco').on('click', 'button.botonPercibir', function() {
  let r = table.row($(this).parents('tr')).data();  
  console.log(r)
  regImagen='';
  percibir(r.sid, r.saldo, r.fullname, r.clid, regImagen);
});

function fillTC(texto, type, param){
  console.log(texto,type,param);
}

async function reqSaldo(url,fn){
  let response = await fetch(url);
  let json = await response.json();
  fn(json);
}

//function log(content){console.log(content);} to del

function percibir(slsid, importe, clName, clid, notas='', imagen=''){
  chkAfavor =`<div class="col-md-12 " style="padding-top: 15px;">
            <div class="form-check"><label class="form-check-label" for="campo11">
                <input type="checkbox" class="form-check-input" id="campo11" name="campo" ><b>Aplicar </b>
                </label>     </div></div>`

  idcampo="campo10"; imgCpaco=setPreview(nuevaImg(imagen,'hm'), idcampo, imagen);
  
  combo1 = `<div class=""><div><label for="campo4">Banco (caja)</label></div><div id="combo_banco"></div></div></div>`;
  inputs = []; h='';
  inputs.push({id:'campo1' ,campo:cli_pro,selector:'input', type:'text',label:1, value:clName, disabled:''})

  dd1=`<div class="row" id="div_aFavor">`
  inputs.push({id:'html', idHt:dd1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'combo',  idCmb:chkAfavor, value:0});
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo12', campo:'Saldo a favor',selector:'input',type:'number', step:'any', label:1, disabled:''})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});

  inputs.push({id:'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo3', campo:'Importe/saldo',selector:'input',type:'number', step:'any',value:importe, label:1})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'combo',  idCmb:combo1})// campo4 banco
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:1.5, innerHTML:notas, label:1})
  inputs.push({id:'campo5', campo:'clid',  selector:'input', type:'hidden', value:clid,    disabled:''})
  inputs.push({id:'campo6', campo:'slsid', selector:'input', type:'hidden', value:slsid,   disabled:''})
  inputs.push({id:'campo7', campo:'amount',selector:'input', type:'hidden', value:importe, disabled:''})
  inputs.push({id:'campo8', campo:'acco',  selector:'input', type:'hidden', value:acco,    disabled:''})
  
  inputs.push({id:'combo',  idCmb:imgCpaco})// enlace-actualizar
  openModal(inputs)
  document.querySelector('#titleModal').innerHTML =co_pa[acco-1]; //Cambiamos el titulo
  const data = new FormData(); data.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/2', data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )

  getData('Ctactes/getAfavor/'+clid, campo12)
  showModal();
  document.querySelector('#btnActionForm').removeAttribute('disabled');
  document.getElementById('campo3').setAttribute('Importe',importe)
}

function letData(texto, el){
  if (texto.saldo===0) {div_aFavor.style.display='none'; return}
  lbl_campo12.innerText=texto.action; lbl_campo12.setAttribute('action',texto.action);
  el.value=texto.saldo;
}


document.querySelector("#inputs").addEventListener("change", chk);
function chk(e) {
  if(e.target.id==='campo11'){
    console.log(lbl_campo12.getAttribute('action'))
    if(campo11.checked){
      newVal= (lbl_campo12.getAttribute('action')==='credit')? 
          Number(campo3.getAttribute('Importe'))-Number(campo12.value):
          Number(campo3.getAttribute('Importe'))+Number(campo12.value);
      campo3.value=newVal;
      campo3.style.color='blue';
    }else{
      campo3.value=Number(campo3.getAttribute('Importe'));
      campo3.style.color='black';
    }
  }
};

function preparaModal(client=0, fecha=hoy(), sid=0, notas='', ref=''){
  cmbClient  = comboBuilder('entidad',6,'campo1','client');
  localStorage.cppm = 6; //localStorage.getItem('cppm'); 
  tblDetail  = `
    <div class="form-group col-md-12">
      <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead><th>Concepto</th>
        <th>Cantidad</th><th>Precio</th><th>Importe</th><th colspan="2" class="text-center">Acciones</th></thead>
        <tbody id="tDetails"></tbody>
      </table>    </div>    `;
    iconNuevo = `
      <div class="row">
        <div class="col"> <a href="#"title ="Nuevo item" onclick="newDetail();">
            <div class="d-flex flex-column align-items-center text-center">
              <img  width="30px" src="./Assets/images/icons/addRec.png"> 
            </div>             </a>        </div>
        <div class="col">       </div>     </div>        `;
  inputs = [];
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbClient, autofocus:'1'});
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo2',campo:'Fec emisión',selector:'input',type:'date', value:fecha, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo3',campo:'Fec Vencimiento',selector:'input',type:'date', value:fecha, label:1})
    //inputs.push({id: 'campo12',campo:'Factura',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2}); 
  inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:'1.5', innerHTML:notas, label:1})   
  inputs.push({id:'html', idHt:tblDetail});
  inputs.push({id:'html', idHt:iconNuevo});
  var data = new FormData(); data.append('src', 'client'); 
  fURL = base_url+'Data/getDataCmb/6'; getJson(fURL, data, 'combo_entidad', 'campo1', client,'Proveedor')
  
  openModal(inputs);
  if(parseInt(sid)>0)  drawTableDetails(sid);

  titleModal.innerHTML='Impuestos y servicios';
  //document.getElementById('btnActionForm').style.display='none';
  document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar`;
}

form2 = document.querySelector("#form2");
if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}

function validM2(){
  arr2=new Object();
  arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
  arr2['sid']=(document.getElementById('id'))? document.getElementById('id').value:0
  campos=document.getElementsByName("field")
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;     valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0&&i==0)valor='';
    arr2[clave]=valor;
  } 
  
  if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return;}
  const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
  fURL = base_url+`Buysal/setDetails/2`; 
  save(fURL, dato);
}

const newDetail=data=>{
  if (campo1.value==0) {alertError('campo obligatorio', 'campo1'); return;}
  if (document.getElementById('id').value==='') { 
    setCampo();
    const dato0=new FormData(); dato0.append('campos', JSON.stringify(arr1)); 
    save(base_url+`Buysal/setOrder/${(title.innerText).replace(/\s+/g, '')}`, dato0);
  }
  showModal2(-1)
};


function closeModal2(){
  modal2.hide(); document.querySelector('#form2').reset();
  document.getElementById('id2').value = '';
}

function deleteDetail(arg){  eliminar2(arg, document.getElementById('id').value);}

function showModal2(arg){
  if (arg>=0) {
    if(inputs2.innerHTML.length==0)preparaModal2(pedido[arg].prid);
    if (document.getElementById('field1'))document.getElementById('field1').value=pedido[arg].prid;
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
  modal2.show();  
}


function preparaModal2(producto=0, cantidad=1, precio =0, notas=''){
  cmbProduct = comboBuilder('concepto',4,'field1','productPay','',true);
  inputs=[];
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
  
  data2 = new FormData(); data2.append('src', 'productPay'); data2.append('cli', campo1.value); 
  fURL = base_url+'Data/getDataCmb/4'; 
  
  getJson(fURL, data2, 'combo_concepto', 'field1','pepe','Servicio/Producto')

  document.querySelector('#titleModal2').innerHTML ="Editar detalles"; 

}
//preparaModal2();

function cargarTabla(texto, el){
  obj=(texto);  h='';  pedido=obj;   i=0; importe=0;
  for (x of obj) {i++;
    arrDets.push(x.eid);
    h+=`<tr class="rowDet">
          <td>${x.product}</td>
          <td class="text-center">${x.cantidad}</td>
          <td class="text-right">${x.precio}</td>
          <td class="text-right">${redondear((x.precio*x.cantidad),2)}</td>
          <td data-id= ${x.detid} class="text-center editDetail" onclick="showModal2(${i-1});">
          <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
          <td data-id= ${x.detid} class="text-center deleteDetail" onclick="deleteDetail(${x.detid})">
          <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
      importe = importe+x.precio*x.cantidad;
  }    
  h+= `<tfoot> <tr>
          <td colspan="3" class="text-center"><strong>Total</strong></td>
          <td id="total" class="text-right"><strong>${redondear(importe,2)}</strong></td>
       </tr>    </tfoot>`;
  document.getElementById('tDetails').innerHTML = h;
}

function drawTableDetails(sid){
  var dataTbl = new FormData(); dataTbl.append('src', 'details'); 
  getTbl(base_url+'Data/getDataTbl/'+sid, dataTbl, 'tabla_detalles')  
}


const savOb = data=>{  
  concepto=JSON.parse( data[1])
  if (data[0]==='combo_concepto') {
    fi=concepto.filter(r => r.aux==campo1.value); 
    //cargarCombo(texto, el, campo, selected, defValue, disabled=false, label='', hidden=true, required=false, exception ){
    cargarCombo((fi), 'field1', 'campo6',data[1],'Servicio o impuesto');
  }
}


const beforeSave = data=>{ arrAlert=[];
  console.log(data)//'cpacos, nuevo, title='Cuentas por pagar'
  switch (data[0]) {
    case 'cpacos': 
      total = (document.getElementById('total')?.innerText);
      arr1['campo4'] = (typeof(total)==="undefined")? 0: total;
      //if (total==0) {arrAlert.push('','');break};
      if (title.textContent.trim()==='Cuentas por Pagar'){fetch_URL=base_url+'Buysal/setBuysa';}
    break;
    default:console.log('someaction'); break;
  }
  return arrAlert;
}


const afterSave = data=>{  
  console.log(data)
  switch (data[1]) {
    case 'CuentasporPagar':       
      document.getElementById('id').value= data[0];
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0; 
      
    break;
    case 'iser': case '2':
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0; 
      if (document.getElementById('total')) document.querySelector('#btnActionForm').removeAttribute('disabled');  
    break;
    default:console.log('someaction buy'); break;       
  } 
}
