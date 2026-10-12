document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());

const preparaModal = data=>{ 
  if (!data) data=[c1='',c2='',c3='', c4='',c5='',c6='', c7='', c8=1];
  inputs=[];
    inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'campo1', campo:'Nombre ', selector:'input', type:'text', placeholder:'Nombre ', required:'', autofocus:'', value:data['c1'], label:1})
    inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'campo2', campo:'Apellido ', selector:'input', type:'text', placeholder:'Apellido', value:data['c2'], label:1})
    inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
    sele=(data['c8']>0)? 'selected':'';  combo1=comboStatus('campo8', sele, true);
    inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});      
      inputs.push({id:'campo3', campo:'Teléfono', selector:'input', type:'text', placeholder:'nro celular', value:data['c3'], label:1})
    inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});      
      inputs.push({id:'campo4', campo:'DNI', selector:'input', type:'text', placeholder:'CI o nro de documento', value:data['c6'], label:1})
    inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});      
    inputs.push({id:'campo5', campo:'Dirección', selector:'input', type:'text', placeholder:'Domicilio', value:data['c5'], label:1})
    inputs.push({id:'campo6', campo:'Email', selector:'input', type:'text', placeholder:'Email', value:data['c4'], label:1})
    inputs.push({id:'campo7', campo:'Notas', selector:'textarea', rows:'2', innerHTML:data['c7'], label:1})
    inputs.push({id:'combo',  idCmb:combo1})// campo8 status
  openModal(inputs);

}

const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0;

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

var table
document.addEventListener('DOMContentLoaded', function() {
  botones = `<button type='button' class='botonmodificar btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button> `;
	table=$('#tableGen').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Generics/getGen/3",   "dataSrc": ""  },
    "columns": [
      { "data": "xid" },
      { "data": "fullname" },
      { "data": "c5" },
      { "data": "c9"},
      { "data": "c8"},
      { "data": null,"orderable": false},
    ],
      "columnDefs": [ 
      { targets: 0, visible: false},//id
      { targets: 4, visible: false},//stt
      { targets: 5, "defaultContent":botones, data: null, className: "text-center" }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
  a.click();  
})

$('#checkbox2').on('change', function() {
  if ($(this).is(':checked')) document.getElementById('i').click(); 
  else document.getElementById('a').click(); 
})
$("input[type=radio]").change(function(){
  dd=(this.value==='a')?1:0;  
    $.fn.dataTable.ext.search.push(
      function(settings, data, dataIndex) {  
         return data[4] ==dd } )
  table.draw()
});

$('#tableGen').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value = r.xid
    preparaModal(r)
    showModal();
});


