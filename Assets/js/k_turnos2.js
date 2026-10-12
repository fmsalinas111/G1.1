function preparaModal(patient=0, scdate=hoy(),sctime='09:00',doc=0,notes=''){

    combo1 = `<div class="col-md-12"><label class="labels">Paciente</label>
      </div><div id="combo_paciente"></div> <br></div>`;
    combo2 = `<div class="col-md-12"><label class="labels">Doctor</label>
      </div><div id="combo_doctor"></div> <br></div>`;

    inputs = []; h='';
    inputs.push({id: 'combo',  idCmb:combo1})// campo1 paciente
    inputs.push({id: 'campo2', campo:'Fecha',selector:'input',type:'date',value:scdate, label:1})
    inputs.push({id: 'campo3', campo:'Hora',selector:'input',type:'time',value:sctime, label:1})
    inputs.push({id: 'combo',  idCmb:combo2})// campo4 dr
    inputs.push({id: 'campo5', campo:'Notas',selector:'textarea',value:notes,label:1,rows:'2'})
    openModal(inputs)
    const data = new FormData(); 
    data.append('src', 'client');
    f_URL = base_url+'Data/getDataCmb/3';
    getJson(f_URL, data, 'combo_paciente', 'campo1',patient,'Seleccione paciente' )

    f_URL = base_url+'Data/getDataCmb/4';

    getJson(f_URL, data, 'combo_doctor', 'campo4',doc,'Doctor' )
    
    document.querySelector('#titleModal').innerHTML ="Turnos"; //Cambiamos el titulo
}

preparaModal();
function prepara_abreModal(){
    preparaModal();
    showModal();
}
var table
//type = localStorage.getItem('cppm');
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Turnos';
cobrar =`<button  type='button' class='botondetalles btn btn-danger btn-block'>Cobrar</button>`
//pagado =`<button  type='button' class='botondetalles btn btn-success btn-sm'>Pagado</button>`
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
	table=$('#tableTurnos').DataTable({
	    "aProcessing": true,  "aServerside": true,
	    "language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
	    "ajax": { "url": " " + base_url + "/K_turnos2/getTurnos/",   "dataSrc": ""  },
	    "columns": [
	        { "data": "schid" },
	        { "data": "ffecha" },
	        { "data": "fhora" },
            { "data": "paciente" },
            { "data": "doctor" },
            { "data": "paid",
                render: function (data, type, row) {
                    if (data === "0") {return  cobrar;}
                    if (data == 0) {return  '<i class="far fa-dot-circle" style="color:green"></i>';}
                    return '<button class="btn btn-secondary btn-block">pagado</button>';
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

$('#tableTurnos').on('click', 'button.botonmodificar', function() {
    //cambiar el caption de registrar/actualizar
    let registro = table.row($(this).parents('tr')).data();    
    document.getElementById('id').value = registro.schid
    preparaModal(registro.patient,registro.scdate,registro.sctime,registro.dr,registro.obs)
    showModal();
});

$('#tableTurnos').on('click', 'button.botondetalles', function() {//  paciente File  
    let registro = table.row($(this).parents('tr')).data(); 
    //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
    //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
    document.getElementById('id').value = registro.schid    
    cobrarTurno2(registro.speciality, registro.paciente, registro.clientid, registro.drid);
});




function cobrarTurno2(spe, nomPaciente, client, drid){//esp, nomPac, idPaciente, did
    inputs = [];
    combo1 = `<div><label for="">Arancel</label></div><div id="combo_arancel"></div><br></div>`;
    combo2 = `<div><label for="">Banco (caja)</label></div><div id="combo_banco"></div><br></div>`;

    inputs.push({id: 'campo1' ,campo:'Paciente',selector:'input',type:'text',  value: nomPaciente, disabled:'', label:1})
    inputs.push({id: 'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
    inputs.push({id: 'combo',  idCmb:combo1})// campo3 arancel
    inputs.push({id: 'combo',  idCmb:combo2})// campo4 banco
    inputs.push({id: 'campo5' ,campo:'importe',selector:'input', type:'hidden', value:client, disabled:''})   
    openModal(inputs)
    document.querySelector('#titleModal').innerHTML ="Cobrar"; //Cambiamos el titulo
    const data = new FormData();     data.append('src', 'arancel');
    f_URL = base_url+'Data/getDataCmb/'+drid;
    getJson(f_URL, data, 'combo_arancel', 'campo3',0,'Precio' )

    const data1 = new FormData();    data1.append('src', 'data');
    f_URL = base_url+'Data/getDataCmb/2'; 
    getJson(f_URL, data1, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco')//memoriza    
    showModal();

}
