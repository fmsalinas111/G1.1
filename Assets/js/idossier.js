document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());
function actionA1(e,c){}


function preparaModal(fecha=hoy(), cliente=0, notas='', status=1) {  
  sele = (status>0)? 'selected':'';  
  cmbStt = comboStatus('campo4', sele, true);
  cmbClient= comboBuilder('cliente',1,'campo2','client',true);
  inputs=[];
  inputs.push({id:'campo1', campo:'Fecha',selector:'input',type:'date',value:fecha, label:1})
  inputs.push({id: 'combo', idCmb:cmbClient, value:cliente});
  inputs.push({id: 'campo3', campo:'Motivo',selector:'input',type:'text',placeholder:'Motivo', value:notas, label:1,md:6})
  inputs.push({id:'combo', idCmb:cmbStt})// campo8 status  
  openModal(inputs);
  const dClient = new FormData(); dClient.append('src', 'client');
  f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dClient,'combo_cliente','campo2',cliente,'Cliente')
  
}

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

var table; 
tabla='tableFiles'

var drid; var paid; 
//type = localStorage.getItem('cppm');

botones = `<button  type='button' class='btnEdit btn btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button> 
           <button type='button' class='btnEvents btn btn-success btn-sm'title ='Eventos'><i class='fa fa-book'></i></button>`;
document.addEventListener('DOMContentLoaded', function() {
    table=$('#'+tabla).DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": { "url": " " + base_url + "/Idossier/getDossier",   "dataSrc": ""  },
        "columns": [
            { "data": "fid" },
            { "data": "fecha" },
            { "data": "fid" },
            { "data": "fullname" },
            { "data": "asunto" },
            {"data":"estado", 
                "render":function(data,type,row){
                    return (data==1)? `<span class = "badge badge-success">Activo</span>`: `<span class = "badge badge-danger">Inactivo</span>`;
                },className:"text-center"
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
$('#'+tabla).on('click', 'button.btnEdit', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value=r.fid;
    preparaModal(r.ffecha, r.clid, r.asunto, r.estado)
    showModal();

});

$('#'+tabla).on('click', 'button.btnEvents', function() {//  paciente File  
    let r = table.row($(this).parents('tr')).data(); 
  //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
  //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
  //localStorage.setItem('dossier', r.fid);
  setXCli('dossier',r.fid)
  setXCli('xcli', r.clid);
  window.location.href =`ievent?cli=${r.fullname}&subject=${r.asunto}`;

    
});







