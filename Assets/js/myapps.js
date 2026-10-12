function preparaModal(pName='',pDescription=''){
  combo1 = `<div class="col-md-12"><div><label for="">Aplicación</label></div>
        <div id="combo_app"></div> <br> </div></div>`;
  inputs = []; 
  inputs.push({id: 'combo',  idCmb:combo1})// 
  inputs.push({id: 'campo2' ,campo:'Descripción',selector:'input',type:'text',  disabled:'',value:pDescription,label:1}) 
  openModal(inputs);
  const data = new FormData();        data.append('src', 'myapp');
  getJson(base_url+'Data/getDataCmb/1', data, 'combo_app', 'campo1',0,'Aplicación');
}

function prepara_abreModal(){    preparaModal();    showModal();}

var table
botones = btnGrid('detail', 'Cambiar de aplicación');
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableApps').DataTable({
    "aProcessing": true,  "aServerside": true,
          "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "Myapps/getMyapps",   "dataSrc": ""  },
    "columns": [          
      { "data": "prid" },
      { "data": "pname" },
      { "data": "pdescription" },
      { "data": null,"orderable": false},
    ],
    "columnDefs": [
      { targets: 0, visible: false},//id
      { targets: 3, "defaultContent":botones, data: null, className: "text-center"  }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})

$('#tableApps').on('click', 'button.botondetalles', function() {
  let registro = table.row($(this).parents('tr')).data();
  document.getElementById('alertBox').style.display='inline-block';
  localStorage.clear()
  localStorage.setItem('APP',registro.prid);
  localStorage.setItem('iCo',registro.pCo);
  localStorage.setItem('clType',1); localStorage.setItem('cppm',1);
  const dato = new FormData();  
  dato.append('proj', registro.prid);  
  dato.append('projname', registro.pname);  
  dato.append('pco', registro.pCo); 
  f_URL = base_url+'Myapps/changeMyapp';
  save(f_URL,dato)
//  window.location.href = base_url+"home"; 
});

