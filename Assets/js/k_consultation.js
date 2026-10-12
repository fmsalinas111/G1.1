function preparaModal(medico='', paciente='', drid=0, patid=0, schid=0) {  
  inputs = []; h='';
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo10', campo:'Médico',selector:'input',type:'hidden', value:drid,disabled:''})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo11', campo:'Paciente',selector:'input',type:'hidden', value:patid, disabled:''})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'campo12', campo:'schid',selector:'input',type:'text', value:schid, disabled:''})
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
  document.getElementById('titleModal').innerHTML =`Nueva consulta <br>(Médico: <mark>${medico}</mark>; paciente: <mark>${paciente}</mark>)`;
}
var table; var drid; var paid; var schid;
    //alert(document.getElementById('xslt').value)
//type = localStorage.getItem('cppm');
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Mis Consultas';
cobrar =`<button  type='button' class='botondetalles btn btn-secondary btn-block'>Pagado</button>`
//pagado =`<button  type='button' class='botondetalles btn btn-success btn-sm'>Pagado</button>`
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'>Iniciar consulta <i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
    table=$('#tableConsultas').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": { "url": " " + base_url + "/K_turnos2/getTurnos/",   "dataSrc": ""  },
        "columns": [
            { "data": "schid" },
            { "data": "ffecha" },
            { "data": "fhora" },
            { "data": "paciente" },
            { "data": "doctor" },

            { "data": "paid",
                render: function (data, type, row) {
                    if (data === "0") {
                        return  `<button  type='button' class='botondetalles btn btn-danger btn-block'>Pendiente</button>`;
                    }
                    if (data == 0) {
                        return  '<i class="far fa-dot-circle" style="color:green" /*aria-hidden="true"*/></i>';
                    }
                    return cobrar;
                 }
            },
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
$('#tableConsultas').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('drid').value = r.dr
    document.getElementById('paid').value = r.patient 
    
    preparaModal(r.doctor, r.paciente, r.dr, r.patient, r.schid)
    showModal();

    document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Paciente: '+r.paciente;
});

$('#tableConsultas').on('click', 'button.botondetalles', function() {//  paciente File  
    let r = table.row($(this).parents('tr')).data(); 
    alert('botondetalles')
    document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Paciente: '+r.paciente;

    //window.location.href ='#nuevaConsulta';
    //document.getElementById('id').value = r.schid    
    // cobrarTurno2(r.speciality, r.paciente, r.clientid);
});







