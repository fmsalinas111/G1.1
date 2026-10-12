document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());
document.querySelector("#btnTrans").addEventListener('click',()=>prepara_abreTrans());

arrClipro=['Cliente','Proveedor','Paciente','Médico','Inquilino']
clType = localStorage.getItem('cppm');
acco = localStorage.getItem('acco');
lblClipro=arrClipro[clType-1];
//document.getElementById('clipro').innerText=lblClipro;

addEventListener("DOMContentLoaded", () => {
  getSome('Data/getDataByType/18','accounts');
});

function fillTC(texto, type){  
  arrCuentas=(type=='accounts')?JSON.parse(texto):[];
}

function preparaModal(paydate=hoy(), importe=0, bankid=localStorage.getItem('dbk'), 
  clName='', clid=0, slsid=0, accou=0, notas=''){
  combo4   = `<div class=" "><div><label for="">Banco (caja)</label></div><div id="combo_banco"></div><br></div></div>`;
  inputs   = []; h='';
  inputs.push({id:'campo1', campo:lblClipro, selector:'input', type:'text',label:1, value:clName, disabled:''})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date',value:paydate, label:1})
  inputs.push({id:'campo3', campo:'Importe', selector:'input',type:'number', placeholder:'Importe', value: importe,step:'any', label:1})
  inputs.push({id:'combo',  idCmb:combo4})// campo4 banco
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:'2',placeholder:'Detalle',innerHTML:notas, label:1})
  inputs.push({id:'campo5', campo:'clid',selector:'input', type:'hidden', value:clid, disabled:''})
  inputs.push({id:'campo6', campo:'slsid',selector:'input', type:'hidden', value:slsid, disabled:''})
  inputs.push({id:'campo7', campo:'orig_amount',selector:'input', type:'hidden', value:importe, disabled:''})
  inputs.push({id:'campo8', campo:'acco', selector:'input', type:'hidden', value:accou,    disabled:''})

  openModal(inputs)
  //document.querySelector('#titleModal').innerHTML ="Cobrar/Pagar";
  const data = new FormData();   data.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/2', data, 'combo_banco', 'campo4',bankid,'Banco' )

  const dataCli = new FormData(); dataCli.append('src', 'client');
  //getJson(fetch_URL, data, el, campo, selected, defValue, disabled, label='',hidden, required){
  getJson(base_url+'Data/getDataCmb/0', dataCli,'combo_clipro','campo11',clid,clid,'clipro', false)
}

function prepara_abreModal(){preparaWallet(); showModal(); gId('titleModal').textContent = "Movimiento de fondos";}
function prepara_abreTrans(){preparaTrans(); showModal(); gId('titleModal').textContent ="Transferencia";}

///datatable///
var table
bank = parseInt(localStorage.getItem('dbk')); nameBank =(localStorage.getItem('dbkName'));
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Resumen: '+'<mark>'+nameBank+'</mark>'
botones = `  <button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>   `;
document.addEventListener('DOMContentLoaded', function() {
	table=$('#tableResume').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {
      "url": " "+ base_url+"/Assets/js/plugins/Spanish.json", 
      "thousands": ","},
    "ajax": { "url": " " + base_url + "/Resume/getResumeBI/"+bank, "dataSrc": "" },
    "columns": [
      { "data":"saux" },
      { "data":"ffecha", className:"text-left", "orderable":false},
      { "data":"acctype"},
      //{ "data":"clientname", className:"text-left", "orderable":false},
      { "data": "clientname",
        "render":function(data,type, full){return '<span class="lnkCta">'+data+'</span>'}
      },
/*       { "data":"clientname", 
      "render": function(data, type, full){
        str = data.indexOf('|') + 1; w_at = data.substring(str+1);
        arr = data.substring(0, str-1).split('-'); arr.push(w_at);
        //console.log(arr)
        if(arr[0]==1||arr[0]==2) {
          return '<a class ="ctacte'+ arr[0]+'"ref="' + base_url+ 'Ctactes" onclick="event.preventDefault(); linkCta('+arr+')">' + w_at + '</a>';   
        }
        else return w_at;
      }},
 */      
      { "data":"cargo", className:"text-right", "orderable":false,render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
      { "data":"abono", className:"text-right", "orderable":false,render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
      { "data":"balance", className:"text-right", "orderable":false,render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
      

      { "data": null, "orderable": false},
    ],
    "columnDefs": [
      { targets: 0, visible: false},//saux
      { targets: 2, visible: false},//act      
      
      { targets: 7, "defaultContent":botones, data: null, className:'text-center' }
    ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [[0, "desc"]]
  });  
})
//linkCli = document.querySelector('.ctacte')
function linkCta(arr){
  setXslt(arr[0]);  setXCli('xcli',arr[1]);  setXCli('xname',arr[2]);

}
var tabRe = $("#tableResume").DataTable({
  "createdRow":function(row,data,index){                   
      //pintar una celda
      console.log(data)
      if(data[5] >= 1000){
           $('td', row).eq(5).css({
              'background-color':'#ff5252',
              'color':'white', 
          }); 
        }
      }})

$('#tableResume').on("init", function(){
  for (i=0; i<$('#tableResume').rows.count(); i++){
    row = $('#tableResume').row(i);
    acType = row.data().acctype;
    console.log(acType)
    if (acType==3) {//wire
      console.log('trasfer')
    }else{
      console.log('cred - deb')
    }
  }
})


///datatable modificar
$('#tableResume').on('click', 'button.botonmodificar', function() {  
  let r = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = r.si  
  console.log(r, r.accType)
  if ((r.acctype==2||r.acctype==1)&&r.clid>0) {
    preparaModal(r.ffecha2, r.amount, r.bankid, r.clientname, r.clid, r.ref, acco,r.notes);  
    _title = "Cobrar/Pagar";
  }else if(r.acctype==3){
    preparaTrans(r.ffecha2, r.amount, r.bankid, r.clientname, r.clientid, r.ref, r.acctype, r.notes, r.account); 
    _title = "Transferencia";
  }else{
    preparaWallet(r.ffecha2, r.amount, r.bankid, r.clientname, r.clientid, r.ref, r.acctype, r.notes, r.account);
    _title = "Movimiento de fondos";
  }
  showModal(-1);  gId('titleModal').textContent = _title
});

$('#tableResume').on('dblclick', '.lnkCta', function() {  
  let r = table.row($(this).parents('tr')).data();
  if (r.clid==0) return; 
  setXslt(r.acctype);  setXCli('xcli',r.clid);  setXCli('xname',r.clientname);
  window.location.href ='Ctactes';
})
function preparaWallet(paydate=hoy(), importe=0, bankid=localStorage.getItem('dbk'),
  clName='', clid=0, slsid=0, accType=2, notes='', account=0){
  options  = [{option:1,value:'Ingresos'},{option:2,value:'Egresos'}];
  cmbTipo  = optionSimple([{name:'optField', cap:'Operación', def:accType, options}])
  
  cmbCuenta= comboBuilder('cuenta',18,'campo1','data')
  inputs = []; 
  localStorage.account = accType; //Bitac: ver de usar el setCampo
  inputs.push({id:'html' , idHt:cmbTipo});//campo1
  inputs.push({id:'combo', idCmb:cmbCuenta})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date',value:paydate, label:1})
  inputs.push({id:'campo3', campo:'Importe', selector:'input',type:'number', placeholder:'Importe', value: importe,step:'any', label:1})
  inputs.push({id:'campo4', campo:'Notas',selector:'textarea',rows:'2',placeholder:'Detalle', innerHTML:notes, label:1})
  inputs.push({id:'campo5', campo:'clid',selector:'input', type:'hidden', value:clid, disabled:''})

  openModal(inputs)

  cuentas=arrCuentas.filter(r => r.aux==accType); //
  cargarCombo((cuentas), 'combo_cuenta', 'campo1',account,'Cuenta');
  
}

const optionSimple = data =>{def=(data[0].def);name=(data[0].name);  hOptions='';
  data[0].options.forEach(function(option){
    hOptions+=`<div class="form-check form-check-inline">
        <input type="radio" id="op${option.option}" name="${name}" value="${option.option}" 
          ${(Number(def)==Number(option.option))?' checked ':''} 
          onclick="cmbChange2(this)" />
        <label for="op${option.option}">${option.value}</label> </div>`;
  });
  return(`<div class="col-md-12" id="optionSimple" >
      <label><b>${data[0].cap}:  </b></label> ${hOptions} </div>`);
}

const cargarCuentas = data=>{  
  localStorage.account = data[0];//!i
  hijos=arrCuentas.filter(r => r.aux==data[0]); 
  cargarCombo((hijos), 'combo_cuenta', 'campo1',data[1],'Cuenta');  
}
const updCmbAccount = data=>{  
  data[0]=Number(data[0]);data[2]=Number(data[2]);
  jsons={fieldId:data[0], fieldName:data[1], aux:data[2]};
  arrCuentas.push (jsons);
  arrCuentas.sort((a,b)=> (a.fieldName > b.fieldName ? 1 : -1))
}
 
const afterSave = data=>{  
  if (data[1]==='SetAdr') {
    jsons={fieldId:data[0], fieldName:data[2].campo1, aux:data[2].campo2};
    arrCuentas.push (jsons);
    arrCuentas.sort((a,b)=> (a.fieldName > b.fieldName ? 1 : -1))
  }
}

function actionA1 (){}

function preparaTrans(paydate=hoy(), importe=0, bankid=localStorage.getItem('dbk'), 
  clName='', clid=0, slsid=0, accType=0, notes='', src_tgt=0){
  cmbBank= comboBuilder('banco',2,'campo1','data','',false)
  inputs = [];  localStorage.account = 3;

  inputs.push({id: 'combo', idCmb:cmbBank})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date',value:paydate, label:1})
  inputs.push({id:'campo3', campo:'Importe', selector:'input',type:'number', placeholder:'Importe', value: importe,step:'any', label:1})
  inputs.push({id:'campo4', campo:'Notas', selector:'textarea',rows:'2',placeholder:'Detalle', innerHTML:notes, label:1})
  inputs.push({id:'campo5', campo:'clid',selector:'input', type:'hidden', value:clid, disabled:''})

  openModal(inputs)
  const data = new FormData();   data.append('src', 'data');
  
  getJson(base_url+'Data/getDataCmb/2', data, 'combo_banco', 'campo1',src_tgt,'Banco destino',false, '', false, false, bankid);
  
}
