function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);

cppmi=['Clientes','Proveedores','Pacientes','Médicos','Inquilinos'];
localStorage.setItem('imgToUpld','');  edtImgName='', idcampo='';

cli_pro='Cliente'; clipro=['Cliente','Proveedor','Paciente','Médico','Inquilino']
co_pa=['Cobrar','Pagar'];   arrDets=[];
type = localStorage.getItem('cppm');  acco = localStorage.getItem('acco');

if (APP==='hm')  cli_pro='Inquilino';  if (APP==='klk') cli_pro='Paciente/Cliente';
if (acco==2) cli_pro='Proveedor';

title.innerHTML = '<i class="fa fa-user-tag"></i> Cuentas por <mark>'+co_pa[acco-1]+'</mark>';
hide(['breadcrumb']);
arrConcept ={};
if (acco==1) hide(['btnNuevo']); else {
  show(['btnNuevo']); 
  d1=new FormData(); d1.append('src','productPay'); f_URL=base_url+'Data/getDataCmb/4';
  gJSON(f_URL,d1).then((json)=>{arrConcept=json;}).catch((err)=>console.log("Err:", err));
}

document.getElementById('clipro').innerText=cli_pro; //table title
///datatable///
var table; 
document.addEventListener('DOMContentLoaded', function() {
  botones= `<button  type='button' class='botonmodificar btn btn-warning btn-sm '><i class='fa fa-edit'></i></button> 
          <button  type='button' class='botonPercibir  btn btn-success btn-sm'><i class='fas fa-money-bill-wave'></i></button>`;
	table=$('#tableCpaco').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Cpacos/getCpacos/"+acco,   "dataSrc": ""  },
    "columns": [
      { "data": "saux" },
      {        data: {          _: 'ffecha',          sort: 'fecha'        }      },

      //{ "data": "ffecha", className: "text-center" },
      { "data": "vencimiento", className: "text-center",
        "render":function(data,type,row){ b=data.indexOf('|'); c = data.substring(b+1);
          if (data.substring(0, b)=='1') return '<b style="color:red;">'+c+'</b>'; else return c;}
       },
      { "data": "sid" },
      { "data": "fullname",
        "render":function(data,type, full){return '<span class="lnkCta">'+data+'</span>'}
      },

      { "data": "amount", className: "text-right",
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
});  // end DOMContentLoaded
  
$('#tableCpaco').on("init"), function(){
    console.log('pepe');
    for (i = 0; i < table.rows().count(); i++) {
      row = table.row(i);
      fv  = row.data().fecVen;
      console.log(fv)
      if (fv=='') {
        $(row).css("background-color","#f00");
      }else{
        $(row).css("background-color","#fef236");
      }
    }
 }
  
///lnk
 $('#tableCpaco').on('dblclick', '.lnkCta', function() {  
  let r = table.row($(this).parents('tr')).data();
  if (r.clid==0) return; 
  setXslt(r.cltype);  setXCli('xcli',r.clid);  setXCli('xname',r.fullname);
  window.location.href ='Ctactes';
})

///datatable modificar
$('#tableCpaco').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value = r.sid;   cancelled = (r.stt>1)? true:false;
    preparaModal(r.clid, r.fecha, r.fecVen, r.sid, r.notes, r.ref, cancelled, r.cltype, r.prodName,r.amount);
    showModal(0,'modal-lg');
});

///datatable percibir
$('#tableCpaco').on('click', 'button.botonPercibir', function() {
  let r = table.row($(this).parents('tr')).data();    regImagen='';
  percibir(r.sid, r.saldo, r.fullname, r.clid, regImagen)
});

function fillTC(texto, type, param){
  console.log(texto,type,param);
}

async function reqSaldo(url,fn){
  let response = await fetch(url);
  let json = await response.json();
  fn(json);
}

function log(content){console.log(content);}

function percibir(slsid, importe, clName, clid, notas='', imagen=''){
  chkAfavor =`<div class="col-md-12 " style="padding-top: 15px;">
            <div class="form-check"><label class="form-check-label" for="campo11">
                <input type="checkbox" class="form-check-input" id="campo11" name="campo" ><b>Aplicar </b>
                </label>     </div></div>`

  idcampo="campo10"; imgCpaco=setPreview(nuevaImg(imagen,'hm'), idcampo, imagen);
  
  combo1 = `<div class=""><div><label for="campo4">Banco (caja)</label></div><div id="combo_banco"></div></div></div>`;
  inputs = []; h='';
  inputs.push({id:'campo1' ,campo:cli_pro,selector:'input', type:'text',label:1, value:clName, disabled:1,defVal:clName})

  dd1=`<div class="row" id="div_aFavor">`
  inputs.push({id:'html', idHt:dd1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'combo',  idCmb:chkAfavor, value:0});
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo12', campo:'Saldo a favor',selector:'input',type:'number', step:'any', label:1, disabled:''})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});

  inputs.push({id:'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1, defVal:hoy()})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo3', campo:'Importe/saldo',selector:'input',type:'number', step:'any',value:importe, label:1, defVal:importe})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'combo',  idCmb:combo1})// campo4 banco
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:1.5, innerHTML:notas, label:1})
  inputs.push({id:'campo5', campo:'clid',  selector:'input', type:'hidden', value:clid,    disabled:''})
  inputs.push({id:'campo6', campo:'slsid', selector:'input', type:'hidden', value:slsid,   disabled:''})
  inputs.push({id:'campo7', campo:'amount',selector:'input', type:'hidden', value:importe, disabled:''})
  inputs.push({id:'campo8', campo:'acco',  selector:'input', type:'hidden', value:acco,    disabled:'', defVal:acco})
  
  inputs.push({id:'combo',  idCmb:imgCpaco})// enlace-actualizar
  openModal(inputs);
  const data = new FormData(); data.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/2', data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )
  
  d3 = new FormData(); d3.append('curSid', slsid); 
  getData('Ctactes/getAfavor/'+clid, d3, campo12)
  gId('id').value=99;  showModal();
  document.querySelector('#titleModal').innerHTML =co_pa[acco-1]; //Cambiamos el titulo
  document.querySelector('#btnActionForm').removeAttribute('disabled');
  document.getElementById('btnActionForm').style.display='';    
  document.getElementById('campo3').setAttribute('Importe',importe)
  focusModal(campo3);
}

function letData(texto, el){
  if (texto.length==1) {div_aFavor.style.display='none'; return}
  deuda = texto[0]['saldo'];  a_favor=texto[1]['saldo']; 
  caption = (deuda>0)?'deuda previa':'a favor';
  lbl_campo12.innerText=caption; lbl_campo12.setAttribute('action',(deuda>0)?'deudor':'acreedor');
  el.value = (deuda>0)?deuda:a_favor;

}


document.querySelector("#inputs").addEventListener("change", chk);
function chk(e) {
  if(e.target.id==='campo11'){
    if(campo11.checked){
      newVal = (lbl_campo12.getAttribute('action')==='acreedor')? 
          Number(campo3.getAttribute('Importe'))-Number(campo12.value):
          Number(campo3.getAttribute('Importe'))+Number(campo12.value);
      campo3.value = newVal; campo3.style.color='blue';
    }else{
      campo3.value=Number(campo3.getAttribute('Importe'));
      campo3.style.color='black';
    }
  }
};

function preparaModal(client=0, fecha=hoy(), fecVen=hoy(), sid=0, notas='', ref='',cancelled=true,cltype=6, prodName='', amt=0){
  clpr = ['','Cliente','Proveedor','Paciente','Médico','Inquilino','Entidad']
  cmbClient  = comboBuilder(clpr[cltype],cltype,'campo1','client');
  //cmbClient = comboBuilder(cli_pro, acType, 'campo1', 'client','s-2');
  localStorage.cppm = cltype; 
  inputs = [];
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbClient, autofocus:'1'});
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo2',campo:'Fec emisión',selector:'input',type:'date', value:fecha, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
    inputs.push({id: 'campo3',campo:'Fec Vencimiento',selector:'input',type:'date', value:fecVen, label:1})
    //inputs.push({id: 'campo12',campo:'Factura',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2}); 
  notes= (prodName===null)? notas:prodName;
  inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:'1.5', innerHTML: notes, label:1})   
  //if (APP==2)   inputs.push({id: 'campo13',campo:'Importe total',selector:'input',type:'number', step:'any', value:amt, label:1})
  inputs.push({id:'html', idHt:tblDetail()});
  if (cltype>5)inputs.push({id:'html', idHt:iconNuevo(["newDetail()"])});

  var data = new FormData(); data.append('src', 'client'); 
  fURL = base_url+'Data/getDataCmb/'+cltype; 
  getJson(fURL, data, 'combo_'+clpr[cltype], 'campo1', client, clpr[cltype], (cltype==2||cltype==1) );
  
  if (cltype==5)  inputs.push({id: 'campo13',campo:'Importe total',selector:'input',type:'number', step:'any', value:amt, label:1, disabled:cancelled})
  
  openModal(inputs); btnActionForm.style.display='';
  if(cancelled) addClass(['modal-title',cancelled]);
  if(parseInt(sid)>0)  drawTableDetails(sid);
  titleModal.innerHTML = (cltype==6)?'Impuestos y servicios':'Compra venta';
  if (cltype==5) titleModal.innerText ='Alquileres'; 

  if (cltype<3) { x = document.getElementsByName('campo'); a1.style.display='none';
      for (var i = 0; i < x.length; i++) {x[i].disabled = true;}   
      document.getElementById('btnActionForm').style.display='none';    }
  document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar`;
  if (APP==2&&cltype==5) hide(['tbldetail']);
    
}

//starting modal2
  form2 = document.querySelector("#form2");
  if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}

  const newDetail=data=>{
    if (campo1.value==0) {alertError('campo obligatorio', 'campo1'); return;}

    console.log((title.innerText).replace(/\s+/g, ''), gId('id').value);
    if (gId('id').value==='') {setCampo();
      const dato0 = new FormData(); dato0.append('campos', JSON.stringify(arr1));  
      save(base_url+`Buysal/setOrder/${(title.innerText).replace(/\s+/g, '')}`, dato0); 
      return;} 
    showModal2(-1)
  };

  function validM2(){  arr2=new Object(); setField();
    arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
    arr2['sid']=(document.getElementById('id'))? document.getElementById('id').value:0    
    if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return;}
    const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
    save(base_url+'Buysal/setDetails/2', dato);
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


  function preparaModal2(producto=0, cantidad=1, precio =0, notas=''){inputs=[];
    cmbProduct = comboBuilder('concepto',4,'field1','productPay','',true);
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
    /*
    data2 = new FormData(); data2.append('src', 'productPay'); data2.append('cli', campo1.value); 
    fURL = base_url+'Data/getDataCmb/4';     
    getJson(fURL, data2, 'combo_concepto', 'field1','pepe','Servicio/Producto')
    */
   cargarCombo(arrConcept, 'combo_concepto', 'field1','producto','Servicio o impuesto');

    document.querySelector('#titleModal2').innerHTML ="Editar detalles"; 

  }
  //preparaModal2();

function cargarTabla(texto, el){
  obj=(texto); h=''; pedido=obj; i=0; importe=0; 
  disabled=(titleModal.classList.contains('cancelled'))?'disabled':'po';
  if(localStorage.cppm==1||localStorage.cppm==2) disabled='disabled';
  for (x of obj) {i++;
    arrDets.push(x.eid); 
    ddd=(disabled==='disabled')?'':`onclick="deleteDetail(${x.detid})"`; 
    eee=(disabled==='disabled')?'':`onclick="showModal2(${i-1});"`; 
    h+=`<tr class="rowDet">
          <td>${x.product} </td>
          <td class="text-center">${x.cantidad}</td>
          <td class="text-right">${x.precio}</td>
          <td class="text-right">${redondear((x.precio*x.cantidad),2)}</td>
          <td data-id= ${x.detid} class="text-center editDetail" ${eee}>
          <a class="btn btn-warning btn-sm ${disabled}"><i class="fas fa-edit"></i></a></td>
          <td data-id= ${x.detid} class="text-center deleteDetail ${disabled}" ${ddd}>
          <a class="btn btn-danger btn-sm ${disabled}" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
      importe = importe+x.precio*x.cantidad;
  }    
  h+= `<tfoot> <tr>
          <td colspan="3" class="text-center"><strong>Total</strong></td>
          <td id="total" class="text-right"><strong>${redondear(importe,2)}</strong></td>
       </tr>    </tfoot>`;
  gId('tDetails').innerHTML = h;
}

function drawTableDetails(sid){
  var dataTbl = new FormData(); dataTbl.append('src', 'details'); 
  getTbl(base_url+'Data/getDataTbl/'+sid, dataTbl, 'tabla_detalles')  
}


const savOb = data=>{  
  concepto=( data[1]) //concepto=JSON.parse( data[1])
  if (data[0]==='combo_concepto') {
    fi=concepto.filter(r => r.aux==campo1.value); 
    //cargarCombo(texto, el, campo, selected, defValue, disabled=false, label='', hidden=true, required=false, exception ){
    cargarCombo((fi), 'field1', 'campo6',data[1],'Servicio o impuesto');
  }
}


const beforeSave = data=>{ arrAlert=[];
  console.log(data );
  switch (data[0]) {
    case '_cpacos': 
      total = (document.getElementById('total')?.innerText);
      arr1['campo4'] = (typeof(total)==="undefined")? 0: total;
      //if (total==0) {arrAlert.push('','');break};
      if (title.textContent.trim()==='Cuentas por Pagar')  fetch_URL=base_url+'Buysal/setBuysa';
      if (titleModal.textContent.trim()==="Alquileres") fetch_URL=base_url+'hm/updtRent';
    break;
    case 'Alquileres':
      fetch_URL=base_url+'hm/updtRent';
      break;
    default:console.log('someaction'); break;
  }
  return arrAlert;
}


const afterSave = data=>{  
  [index, model, arr1, objData] = data;
  console.log(data);
  switch (model) {
    case 'CuentasporPagar': 
      console.log('Cuentas por Pagar saved');
      gId('id').value = index; hideModal=0;  showModal2(-1);
    case 'iser': case '2':
      console.log('iser i 2');
      hideModal=0;  
      drawTableDetails(gId('id').value); closeModal2(); break;
    default: 
      //table.ajax.reload(null, false); closeModal(); hideModal=0;
      console.log('some action', data);
    break;       
  } 
}

function actionA1(e,c){
  document.getElementById(c).addEventListener('keyup', (event) => {
    if (event.keyCode == 107) {   f=e.substring(6);
      showAddData('mini-crud_'+f,'txtAdd_'+f);
    } }, false);
}

const tblDetail =data=>{
  htIuri = (APP===7)? `<th class="iuri">Staff</th> <th class="iuri">Fecha</th> <th class="iuri">Tipo</th>`:'';
  return `<div class="form-group tbldetail">
            <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:100%;"" >
            <thead><th>Producto</th>${htIuri}
            <th>Cantidad</th><th>Precio</th><th>Importe</th>
            <th colspan="2" class="text-center">Acciones</th></thead>
            <tbody id="tDetails"></tbody></table></div>		`;}

const iconNuevo = data =>{ return `
<div class="row"><div class="col">
  <a href="#"title ="Nuevo item" onclick="${data[0]}">
    <div class="d-flex flex-column align-items-center text-center">
      <img  width="30px" src="./Assets/images/icons/addRec.png"> 
    </div>     </a></div><div class="col">              </div></div>`;}
