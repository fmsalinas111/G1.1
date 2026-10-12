function preparaModal(inquilino='',unidad='', alquiler=0, fecha='', fecFin=''){  inputs = [];
  inputs.push({id: 'campo1' ,campo:'Inquilino',selector:'input',type:'text',placeholder:'Nombre unidad', value:inquilino, label:1,disabled:''})
  inputs.push({id: 'campo2' ,campo:'Unidad',selector:'input',type:'text', placeholder:'Descripción',value:unidad,label:1,disabled:''})
  inputs.push({id: 'campo3' ,campo:'Precio',selector:'input', type:'number',value:alquiler,label:1});
  inputs.push({id: 'campo4' ,campo:'Fecha inicial',selector:'input', type:'date',value:fecha,label:1});
  inputs.push({id: 'campo5' ,campo:'Fecha final',selector:'input', type:'date',value:fecFin,label:1});
  openModal(inputs);
}

///datatable///
valChequed = localStorage.getItem('showInactive');
document.getElementById('checkbox1').checked = (valChequed==="false")?false:true;
inactive = (document.getElementById('checkbox1').checked)?1:0;
var table
botones = `<button type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>
           <button type='button' class='botonFile btn btn-outline-info btn-sm'><i class='fa fa-folder'></i></button>` ;
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableContracts').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": {"url": " " + base_url + "/H_contracts/getContracts/"+inactive, "dataSrc": ""},
    "columns": [
      {"data": "inquilino" },
      {"data": "unidad" },
      {"data": "alquiler",className: "text-right" },
      {"data": "fecInicial",className: "text-center" },
      {"data": null,"orderable": false},
    ],
    "columnDefs": [
      //{ targets: 0, visible: false},//id
      { targets: 4, "defaultContent":botones, data: null, className:"text-center" }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})

$('#tableContracts').on('click', 'button.botonmodificar', function() {
  let r = table.row($(this).parents('tr')).data();    
  document.getElementById('id').value = r.cid
  preparaModal(r.inquilino,r.unidad,r.alquiler,r.ffecha2, r.fecfin);
  showModal(parseInt(r.inactive)==1?0:1)
  document.getElementById('btnDelete').innerText = "Finalizar contrato";
});

$('#tableContracts').on('click', 'button.botonFile', function() {
  let r = table.row($(this).parents('tr')).data();    
  /*   document.getElementById('id').value = r.cid
  document.querySelector('.document').innerHTML=
    `<h4>${r.inquilino}</h4>
      <p>Conste por el presente documento privado de contrato de ALQUILER, que el mismo a solo reconocimiento de firmas y rúbricas entre partes suscribientes se podrá elevar a documento público; el mismo que es suscrito bajo las siguientes cláusulas:</p>
    `;
    prepareContract(r)
   */

    setXCli('xcli',r.clid);
    setXCli('xname',r.inquilino);
    setXCli('contract',r.cid);

    //window.location.href ="h_contr1";
    window.location.href =base_url+'h_contracts/'+r.cid;
});

function prepareContract(r){
  inputs=[];
  inputs.push({id:'html', idHt:htR1});  inputs.push({id: 'html', idHt:ht4});
    inputs.push({id:'campo1', campo:'Fecha del contrato',selector:'input',type:'date', label:1, value:hoy()})
  inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:ht8});
    inputs.push({id:'campo2', campo:'Lugar',selector:'input',type:'text', label:1})
  inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
  hDoc=document.querySelector('.document')
  hDoc.innerHTML += drawForm(inputs);
  removeClass(['document','d-none'])
  console.log(r)
}