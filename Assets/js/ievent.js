document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());
let params = new URLSearchParams(location.search);
cli = params.get('cli');
subject = params.get('subject');


subtitle.innerHTML = `Cliente: <mark>${cli}: ${subject}</mark>`


function actionA1(e,c){}


function preparaModal(fecha=hoy(), staff=0, notas='', status=1, amount=0) {  
  sele = (status>0)? 'selected':'';  
  //cmbStt = comboStatus('campo4', sele, true);
  cmbStaff= comboBuilder('staff',1,'campo2','staff');
  options = [{option:1,value:'Jornada'},{option:2,value:'Precio fijo'}];
  cmbTipo = comboSimple([{idcampo:'campo4', cap:'Tipo', def:2, options}])
    hJournal=`
    <div id="journal" style="display:none;">
    <div class="row"  >
        <div class="col-md-6">
            <div class="form-group col-md-12">  <label class="control-label" style="width: auto;" id="lbl_campo6" for="campo6">Horas</label>
                <input class="form-control col-md-12" id="campo6" name="campo" type="number" value="1">
            </div></div>
        <div class="col-md-6">
            <div class="form-group col-md-12">  <label class="control-label" style="width: auto;" id="lbl_campo7" for="campo7">Valor hora</label>
                <input class="form-control col-md-12" id="campo7" name="campo" type="number" value="0">
         </div></div>
    </div></div> `;
  inputs=[];
  inputs.push({id:'campo1', campo:'Fecha',selector:'input',type:'date',value:fecha, label:1})
  inputs.push({id:'combo', idCmb:cmbStaff, value:staff});
  inputs.push({id:'campo3', campo:'Motivo',selector:'input',type:'text',placeholder:'Motivo', value:notas, label:1,md:6})
  inputs.push({id:'combo', idCmb:cmbTipo})// 
  //inputs.push({id:'combo', idCmb:cmbStt})// campo8 status  
  inputs.push({id:'html', idHt:hJournal})

  inputs.push({id:'campo5', campo:'Importe',selector:'input',type:'number', value:amount, label:1,md:6})
  openModal(inputs);
  const dClient = new FormData(); dClient.append('src', 'staff');
  f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dClient,'combo_staff','campo2',staff,'staff')
  
}

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

var table; 
tabla='tableEvents'

file = localStorage.dossier;

botones = `<button  type='button' class='btnEdit btn btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button> 
           <button type='button' class='btnEvents btn btn-success btn-sm'title ='Eventos'><i class='fa fa-book'></i></button>`;
document.addEventListener('DOMContentLoaded', function() {
    table=$('#'+tabla).DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": { "url": " " + base_url + "/IEvent/getEvents/"+file, "dataSrc": "" },
        "columns": [
            { "data": "salesid" },
            { "data": "eventdate" },
            { "data": "staff" },
            { "data": "type" },
            { "data": "amount" },
            {"data":"subject", 
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
    alert('abre los eventos del expediente seleccionado')
});

const mostrarHoras = data=>{  
        document.getElementById('journal').style.display=
        (data[0]=='2')?'none':'block';
}






