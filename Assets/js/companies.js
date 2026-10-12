
function preparaModal(name='', description='', imagen='', city=0, status=1){
  inputs = [];
  cmbStt=comboStatus('campo5', (status>0)? 'selected':'');
  //para la imagen
  idcampo="campo3"; combo1 = setPreview(nuevaImg(imagen,'logo'), idcampo, imagen);
  console.log(check_1)
  check1 = check_1;
  cmbCiudad = comboBuilder('ciudad',12,'campo6','data',city);
  inputs.push({id:'combo',  idCmb:combo1})  //campo3 --imagen  
  inputs.push({id:'campo1',campo:'Nombre',selector:'input',type:'text',placeholder:'Emprendimiento', value:name, label:1})
  inputs.push({id:'campo2',campo:'Descripción',selector:'textarea',rows:2, innerHTML:description, label:1})
  inputs.push({id:'combo',  idCmb:cmbStt})// status
  inputs.push({id:'combo',  idCmb:cmbCiudad})
  inputs.push({id:'combo',  idCmb:check1})// gallery?

  openModal(inputs);
  const dataCiudad = new FormData(); dataCiudad.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/12', dataCiudad, 'combo_ciudad', 'campo6',city,'Ciudad')
  //atAction ='editarLogo'; img_elem = 'logo';
}

function prepara_abreModal(){preparaModal(); showModal();}

///datatable///
var table
var botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm' title='Editar'><i class='fa fa-edit'></i></button> 
               <button  type='button' class='botonEstablecer btn btn-warning btn-sm'title='Seleccionar empresa'><i class='fa fa-user'></i></button> 
                `;
                
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableEmpresas').DataTable({
  "aProcessing": true,  "aServerside": true,
  //"language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
  "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
  "ajax": { "url": " " + base_url + "/Companies/getEmpresas", "dataSrc": ""  },
  "columns": [
    { "data": "coId" },
    { "data": "coName" },
    { "data": "coDes" },
    { "data": null,"orderable": false},
  ],
  "columnDefs": [ 
    { targets: 0, visible: false},//id
    { targets: 3, "defaultContent":botones, data: null, className: "text-center"}
  ],
  "responsieve": "true",
  "bDestroy": true,
  "iDisplayLength": 10,
  "order": [  [0, "desc"] ]
  });
})

$('#tableEmpresas').on('click', 'button.botonmodificar', function() {
  let reg = table.row($(this).parents('tr')).data();
  preparaModal(reg.coName,reg.coDes, reg.logo, reg.city, reg.cardstatus);
  document.getElementById('id').value = reg.coId;

  localStorage.setItem('imgToUpld', reg.img);  edtImgName = reg.img;  
  
  document.getElementById('isGalery')?.classList.add('d-none')
  showModal();  
});

$('#tableEmpresas').on('click', 'button.botonEstablecer', function() {
  let registro = table.row($(this).parents('tr')).data();
  const data = new FormData(); 
  data.append('campo1', registro.coId);    
  data.append('campo2', registro.userid); 
  data.append('campo3', registro.projid); 
  data.append('campo4', registro.coName); 
  data.append('campo5', registro.logo); 
  data.append('campo6', registro.productconfig); 
  data.append('campo7', registro.coDes); 

  document.getElementById('id').value = registro.companyid
    fetch(base_url+'Companies/establecerEmpresa', { method: 'POST', body: data})
    .then(function(response) {//console.log(response)
       if(response.ok) { return response.text() } else {throw "Error Ajax";}
    })
    .then(function(texto) {//console.log(texto)
      var objData = JSON.parse(texto);
      if (objData.status) {  
        location.reload();
        window.location.href = 'home';
      }
    })
    .catch(function(err) {console.log(err);});
});

const beforeSave = data=>{ arrAlert=[];  
  console.log(idcampo);
    setImg =  (localStorage.imgToUpld==arr1[idcampo])? '' : 'Companies/setLogo';
    fetchMulti(arr1, 'Companies/setCompanie', setImg, '../Assets/images/logo/', idcampo);
    arrAlert[0]='_exit';
  return arrAlert;
}
