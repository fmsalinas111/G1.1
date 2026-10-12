function preparaModal(fecha=hoy(), staff=0, notas='', status=1, amount=0) {  
  sele = (status>0)? 'selected':'';  
  //cmbStt = comboStatus('campo4', sele, true);
  cmbStaff= comboBuilder('staff',1,'campo2','staff');
  options = [{option:1,value:'Jornada'},{option:2,value:'Precio fijo'}];
  cmbTipo = comboSimple([{idcampo:'campo4', cap:'Tipo', def:2, options}])


  inputs=[];
  inputs.push({id:'campo1', campo:'Fecha',selector:'input',type:'date',value:fecha, label:1})
  inputs.push({id:'combo', idCmb:cmbStaff, value:staff});
  inputs.push({id:'campo3', campo:'Motivo',selector:'input',type:'text',placeholder:'Motivo', value:notas, label:1,md:6})
  inputs.push({id:'combo', idCmb:cmbTipo})// 
  //inputs.push({id:'combo', idCmb:cmbStt})// campo8 status  
  inputs.push({id:'campo5', campo:'Importe',selector:'input',type:'number', value:amount, label:1,md:6})
  openModal(inputs);
  const dClient = new FormData(); dClient.append('src', 'staff');
  f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dClient,'combo_staff','campo2',staff,'staff')
  
}

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

var table; 
tabla='tableReports'

botones = `<button  type='button' class='btnEdit btn btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button> 
           <button type='button' class='btnEvents btn btn-success btn-sm'title ='Eventos'><i class='fa fa-book'></i></button>`;
document.addEventListener('DOMContentLoaded', function() {
    table=$('#'+tabla).DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": { "url": " " + base_url + "/Reports/getReport", "dataSrc": "" },
        "columns": [
            { "data": "did" },
            { "data": "clName" },
            { "data": "qt", className:"text-center" },
            { "data": "pName" },
            { "data": "pr", className:"text-right" },
            { "data": "amount" , className:"text-right"},
            {"data":"fecha", className:"text-center"},
            { "data": null,"orderable": false},
        ],
        "columnDefs": [
         { targets: 0, visible: false},//id
         { targets: 7, "defaultContent":botones, data: null }],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
})

///datatable modificar
$('#'+tabla).on('click', 'button.btnEdit', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value=r.fid;
    preparaModal(r.ffecha, r.clid, r.asunto, r.estado)
    showModal();

});

$('#'+tabla).on('click', 'button.btnEvents', function() {//  patient File  
    let r = table.row($(this).parents('tr')).data(); 
    alert('abre los eventos del expediente seleccionado')
});







