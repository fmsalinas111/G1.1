
function preparaModal(nombre='', direccion='', face=''){
  combo = `
    <div><label for="">Status</label>
      </div><div id="combo_stat"><select name="campo5" id="campo5" class="form-control">
      <option value="0">Inactivo</option>
      <option value="1" selected>Activo</option>
     </select></div> <br> </div>`;

  inputs = []; h='';
/*
bcardid
companyname
address
face
insta
twitter
phone
wsp
web
logo
img
notes
email
companyid
city
businesscategory

*/

  inputs.push({id: 'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Emprendimiento', value:nombre, label:1})
  inputs.push({id: 'campo2' ,campo:'Dirección',selector:'textarea',rows:2, value: direccion, label:1})
  inputs.push({id: 'campo3' ,campo:'Facebook',selector:'input',type:'text',placeholder:'Face', value:face, label:1})
  openModal(inputs);
}
preparaModal();
function prepara_abreModal(){preparaModal(); showModal();}

///datatable///
var table
    botones = `
      <button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> 
      <button  type='button' class='botonEstablecer btn btn-warning btn-sm'><i class='fa fa-user'></i></button> 
      `;
    document.addEventListener('DOMContentLoaded', function() {
		table=$('#tableBcard').DataTable({
	    "aProcessing": true,  "aServerside": true,
	    "language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
	    "ajax": { "url": " " + base_url + "/Negocios/getBcardCeli",   "dataSrc": ""  },
	    "columns": [
        { "data": "bid" },
        { "data": "nomNegocio" },
        { "data": "direccion" },
        { "data": "fb" },
        { "data": null,"orderable": false},
	    ],

      "columnDefs": [ 
        { targets: 0, visible: false},//id
        { targets: 4, "defaultContent":botones, data: null, className: "text-center"  }  
      ],
	    "responsieve": "true",
	    "bDestroy": true,
	    "iDisplayLength": 10,
	    "order": [  [0, "desc"] ]
	    });
    })

///datatable modificar
$('#tableEmpresas').on('click', 'button.botonmodificar', function() {

  let registro = table.row($(this).parents('tr')).data();
  
  document.getElementById('id').value = registro.coId
  preparaModal(registro.nomNegocio, registro.direccion, registro.fb)
  document.getElementById('campo2').value = registro.coDes// xq no func preparaModal

  showModal();
});

$('#tableEmpresas').on('click', 'button.botonEstablecer', function() {

  let registro = table.row($(this).parents('tr')).data();
  URL= base_url+'Companies/establecerEmpresa'
  const data = new FormData(); 
  data.append('campo1', registro.coId);    
  data.append('campo2', registro.userid); 
  data.append('campo3', registro.projid); 
  data.append('campo4', registro.coName); 

  document.getElementById('id').value = registro.companyid
    fetch(URL, { method: 'POST', body: data})
    .then(function(response) {//console.log(response)
       if(response.ok) { return response.text() } else {throw "Error Ajax";}
    })
    .then(function(texto) {//console.log(texto)
      var objData = JSON.parse(texto);
      //alert (objData.msg)                  
      if (objData.status) {       
        location.reload();
        window.location.href = 'home';
      }
    })
    .catch(function(err) {   console.log(err);    });
});

