function preparaModal() {  
  inputs = []; h='';
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo1', campo:'Fecha',selector:'input',type:'date', label:1,value:hoy(),md:8})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo2', campo:'Hora',selector:'input',type:'time', value:hoy('h'),label:1,md:4})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'html', idHt:htR1});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo3', campo:'Motivo',selector:'input',type:'text',placeholder:'Motivo', label:1,md:6})
  inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo4', campo:'Síntomas',selector:'input',type:'text',placeholder:'Síntomas', label:1,md:6})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});    
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo5', campo:'Signos vitales',selector:'textarea',rows:'2',placeholder:'',label:1,md:6})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});    
    inputs.push({id: 'campo6', campo:'Aparatos y sistemas',selector:'textarea',rows:'2',placeholder:'',label:1,md:6})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});        
  inputs.push({id: 'campo7', campo:'Diagnóstico',selector:'input',type:'text',placeholder:'diagnóstico', label:1})
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});  
    inputs.push({id: 'campo8', campo:'Terapia',selector:'textarea',rows:'2',placeholder:'',label:1,md:6})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});        
    inputs.push({id: 'campo9', campo:'Tratamiento',selector:'textarea',rows:'2',placeholder:'',label:1,md:6}) 
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});        

  //document.getElementById('detalle').innerHTML=drawForm(inputs);
  openModal(inputs);
}
//drawConsulta();
///datatable///
var table; var drid; var paid; var schid;
    //alert(document.getElementById('xslt').value)
xcli = localStorage.getItem('xcli');
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Mis Consultas: <b>'+localStorage.xname+'</b>';

botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'>Mostrar consulta <i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
    table=$('#tableHisConsultas').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
        "ajax": { "url": " " + base_url + "/K_hisconsultas/getHisConsulta/"+xcli, "dataSrc": ""  },
        "columns": [
            { "data": "consid" },
            { "data": "consdate" },
            { "data": "constime" },
            { "data": "reason" },
            { "data": "doctorname" },
            { "data": "patientname" },
            { "data": null,"orderable": false},
        ],
        "columnDefs": [
         { targets: 0, visible: false},//id
         { targets: 6, "defaultContent":botones, data: null }],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
})

///datatable modificar
$('#tableHisConsultas').on('click', 'button.botonmodificar', function() {
    let registro = table.row($(this).parents('tr')).data();

    document.getElementById('id').value = registro.consid
    preparaModal(registro.coName,registro.coDes)
    //document.getElementById('campo2').value = registro.coDes// xq no func preparaModal
    showModal();

    document.getElementById('id').value = registro.consid
/*    document.getElementById('drid').value = registro.dr
    document.getElementById('paid').value = registro.patient     
*/    document.getElementById('campo1').value = registro.consdate
    document.getElementById('campo2').value = registro.constime
    document.getElementById('campo3').value = registro.reason
    document.getElementById('campo4').value = registro.symptom
    document.getElementById('campo5').value = registro.signs
    document.getElementById('campo6').value = registro.appsystems
    document.getElementById('campo7').value = registro.diagnostic
    document.getElementById('campo8').value = registro.therapy
    document.getElementById('campo9').value = registro.treatment
 
    schid = registro.schid;
    document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Paciente: '+registro.patientname;
});




