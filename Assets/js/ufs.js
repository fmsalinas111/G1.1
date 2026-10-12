function preparaModal(ufName='',ufDescription='', ufPrice=0, status=1, tenant=''){
  combo1=comboStatus('campo4', (status>0)? 'selected':'');
  inputs = []; h='';
  inputs.push({id:'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Nombre unidad', value:ufName, label:1})
  inputs.push({id:'campo2' ,campo:'Descripción',selector:'input',type:'text', placeholder:'Descripción',value:ufDescription,label:1})
  inputs.push({id:'campo3' ,campo:'Precio',selector:'input', type:'number',value:ufPrice,label:1})
  //inputs.push({id: 'campo4' ,campo:'Descripción',selector:'textarea',rows:'2',label:1})
  inputs.push({id:'combo',  idCmb:combo1})
  if (tenant.length>0) inputs.push({id: 'campo5' ,campo:'Alquilado a',selector:'input', type:'text',value:tenant,label:1, disabled:''})
  openModal(inputs);
}
function prepara_abreModal(){preparaModal(); showModal(); }

///datatable///
var table
  botones = "<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> ";
  document.addEventListener('DOMContentLoaded', function() {
		table=$('#tableUfs').DataTable({
	    "aProcessing": true,  "aServerside": true,
	    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
	    "ajax": { "url": " " + base_url + "/Ufs/getUfs",   "dataSrc": ""  },
	    "columns": [
        { "data": "ufid" },
        { "data": "ufname" },
        { "data": "ufdescription" },
        { "data": "ufprice",className: "text-center" },
        { "data": "fullname" },
        { "data": null,"orderable": false},
	    ],
      "columnDefs": [
        { targets: 0, visible: false},//id
        { targets: 5, "defaultContent":botones, data: null }  ],
	    "responsieve": "true",
	    "bDestroy": true,
	    "iDisplayLength": 10,
	    "order": [  [0, "desc"] ]
    });
  })

///datatable modificar
$('#tableUfs').on('click', 'button.botonmodificar', function() {
  const reg = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = reg.ufid
  tenant = reg.tenantid>0? reg.clientname : '';
  preparaModal(reg.ufname, reg.ufdescription, reg.ufprice, reg.ufstatus, tenant);
  showModal(); 
});

function alquila(ufid, ufname, price){
  combo1 = `<div class=""><label for="">Inquilino</label> <div id="combo_tenant"></div> <br> </div></div>`;
  inputs = []; h='';
  inputs.push({id: 'campo1' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id: 'campo2' ,campo:'Importe',selector:'input',type:'number', placeholder:'Importe', value: price, label:1, required:''})
  inputs.push({id: 'combo',  idCmb:combo1})//campo3
  inputs.push({id: 'campo4' ,campo:'ufid',selector:'input', type:'hidden', value:ufid, disabled:''})
  inputs.push({id: 'campo5' ,campo:'Uf',selector:'input', type:'text',label:1, value:ufname, disabled:''})
  openModal(inputs)
  const data = new FormData(); data.append('src','client');  F_URL = base_url+'Data/getDataCmb/5';
  getJson(F_URL, data, 'combo_tenant', 'campo3',0,'Seleccione inquilino');  
  showModal();
  document.querySelector('#titleModal').innerHTML ="Alquilar"; //Cambiamos el titulo
}
function fillTC(){}