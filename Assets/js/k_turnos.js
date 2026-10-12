function drawConsulta() {  
  inputs = []; h='';
  combo1 = `<div class="col-md-8"><label class="labels">Paciente</label>  
              <a href="#" class="op_add" ><i class="fas fa-plus-circle "></i></a>
              <div id="combo_paciente"></div> <br></div>`;
  combo2 = `<div class="col-md-6"><label class="labels">Banco/caja</label>
              <div id="combo_banco"></div> <br></div>`;
  combo3 = `<div class="col-md-12"><h3>   Nueva consulta<br></h3></div>`;
  combo4 =`<div class="col-md-2 " style="padding-top: 15px; text-align: center;">
            <div class="form-check"> <label class="form-check-label" for="campo9">
              <input type="checkbox" class="form-check-input" id="campo9" name="campo" checked><b>Cobrar</b>
            </label> </div></div>`

  inputs.push({id:'combo',  idCmb:combo3})// título
  inputs.push({id:'campo1', campo:'Médico',selector:'input',type:'text',placeholder:'Médico', label:1})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date', label:1,value:hoy(),md:8})
  inputs.push({id:'campo3', campo:'Hora',  selector:'input',type:'time', value:hoy('h'),label:1,md:4})
  inputs.push({id:'combo',  idCmb:combo1})// campo4 paciente
  inputs.push({id:'campo5', campo:'',      selector:'input',type:'button',value:'Búsqueda avanzada', label:1,md:4})
  inputs.push({id:'combo',  idCmb:combo4})
  inputs.push({id:'campo6', campo:'Importe',selector:'input',type:'text',placeholder:'Importe', disabled:'', label:1,md:4})
  inputs.push({id:'combo',  idCmb:combo2})// campo7 banco
  inputs.push({id:'campo10', campo:'drid',  selector:'input',type:'hidden'})
  inputs.push({id:'campo8', campo:'Notas', selector:'input',type:'text',placeholder:'Notas', label:1})

  //inputs draw
    h='';
    inputs.forEach(function(input, index) {
    if (input.label==null){label=''}else{label=`<label class="labels"  id="lbl_${input.id}">${input.campo}</label>`}
    placeholder = (input.placeholder==null)? '':` placeholder = "${input.placeholder}"`;
    type = (input.type==null)?   '':` type = "${input.type}"`;
    value = (input.value==null)? '':` value = "${input.value}"`;
    disabled = (input.disabled==null)? '':` disabled = "${input.disabled}"`;
    rows = (input.rows==null)?   '':` rows = "${input.rows}"`;
    isArea = (input.rows==null)? '':` </textarea>`;
    md = (input.md==null)?'12':input.md
    // onchange = (input.onchange==null)?'':` onchange = "${input.onchange}"`;
    //if (input.onchange!==null) {alert(input.onchange)}
    if (input.id=='combo') {h+=input.idCmb; 
    }else{h+=`
      <div class="col-md-${md}">
        ${label}
        <${input.selector} class="form-control" id="${input.id}" name="${input.id.substr(0,5)}" 
        ${type} ${value} ${placeholder} ${rows} ${disabled} ${onchange}> 
        ${isArea}
       </div>`;
    }
  });
  document.getElementById('consulta').innerHTML=h;
}

drawConsulta();
const data = new FormData();     data.append('src', 'client');
getJson(base_url+'Data/getDataCmb/3', data, 'combo_paciente', 'campo4',0,'Seleccione paciente')

const data1 = new FormData();    data1.append('src', 'data');
getJson(base_url+'Data/getDataCmb/2', data1, 'combo_banco', 'campo7',localStorage.getItem('dbk'),'Banco',1)//memoriza


document.getElementById('fec_turno').value = hoy()

function render(){	
  const data = new FormData(); 
  data.append('src', 'data');
  fetch(base_url+'K_turnos/getSpecTurnos', { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {    //console.log(texto);
    fillTableContent(texto);
  })
  .catch(function(err) {console.log(err);});
}

render();

function fillTableContent(texto){
	obj=JSON.parse(texto);
	i=0; h=''	;  j='';ultimoValor=''
  var array = obj;  let hash = {};
  array = array.filter(o => hash[o.prodoc] ? false : hash[o.prodoc] = true);

  obj=array
	for (x of obj) {
    console.log(x.especialidad, x.doctor)
    if (ultimoValor!==x.especialidad) {
      currentValue = x.especialidad;
      aran = aranceles(currentValue, obj);
          //<p>${x.doctor} ${x.producto} ${x.precio}</p>
 		  h+=`
      <div class = "tarjeta">
        <h3 class="text-center">${x.especialidad} (${x.precio})</h3>
        <p>${aran}</p> <p>lista de espera:</p>
      </div>`;
      ultimoValor = x.especialidad;
    }
	}       
  document.getElementById('cards').innerHTML = h;	
}


function aranceles(currentValue, obj){ 
  doc = '';
  for (y of obj) {    
    if (currentValue == y.especialidad)  doc += `
      <p><a href="#nuevaConsulta"onclick="prepararTurnero(${y.did}, '${y.doctor}',${y.precio})">${y.doctor} 
    (<b>$ ${y.precio}</b>)</a></p>`
  }
  return doc;
}

function prepararTurnero(did,doctor,precio){
  document.getElementById('cards').style.display ='none';
  document.getElementById('nuevaConsulta').style.display ='block';
  document.getElementById('id').value =did;
  document.getElementById('campo1').value =doctor;
  document.getElementById('campo2').value =hoy();
  document.getElementById('campo3').value =hoy('h');
  document.getElementById('campo6').value =precio;
  document.getElementById('campo10').value =did;
  localStorage.setItem('precio',precio)

}
document.getElementById('campo5').addEventListener('click', function(){
    $("#modalCl").modal('show');    
});
document.getElementById('campo9').addEventListener('change', function(){
  //checkbox Cobrar
  if(document.getElementById('campo9').checked){//true
    document.getElementById('campo7').disabled=false;
    document.getElementById('campo7').value=localStorage.dbk;
    document.getElementById('campo6').value=localStorage.precio;
  }else{
    document.getElementById('campo7').disabled=true;
    document.getElementById('campo7').value=0; //banco=0
    //document.getElementById('campo6').value=0; //importe=0
  }
});

function getCli(){
    $('#modalCl').modal({backdrop:'static',keyboard:false});    
    $("#modalCl").modal('show');  
}
function closeCli(){ $("#modalCl").modal('hide');}

document.getElementById('btnConfirmarTurno').addEventListener('click', function(){
  cmbPati = document.getElementById('campo4');
  cmbBnk  = document.getElementById('campo7');
  chk  = document.getElementById('campo9');
  if (cmbPati.value == 0) {alert('campo obligatorio');cmbPati.focus();return null}
  if (cmbBnk.value==0&&chk.checked==true  ) {alert('campo obligatorio');cmbBnk.focus(); return null}
  document.getElementById('campo9').value = document.getElementById('campo9').checked;
  sav0();
  if (cmbBnk.value!=0) localStorage.setItem('dbk', cmbBnk.value);
  resetPage();
  if (table) table.ajax.reload();
})
function resetPage(){
  document.getElementById('nuevaConsulta').style.display ='none';
  document.getElementById('cards').style.display ='none';
  document.getElementById('listado').style.display ='flex';
  document.getElementById('simple').scrollIntoView({ behavior: 'smooth'});
  document.getElementById('nuevoTurno').disabled =false;
}
///datatable///
var table
    //alert(document.getElementById('xslt').value)
//type = localStorage.getItem('cppm');
//document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Turnos';
boton = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableTurnos').DataTable({
      "aProcessing": true,  "aServerside": true,
      "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
      "ajax": { "url": " " + base_url + "K_turnos2/getTurnos/",   "dataSrc": ""  },
      "columns": [
        { "data": "schid" },
        { "data": "ffecha", className: "text-center" },
        { "data": "fhora", className: "text-center" },
        { "data": "paciente" },
        { "data": "doctor" },
        { "data": "paid",className: "text-center",
          render: function (data, type, row) {
            if (data==="0") {return `<span class="badge bg-danger text-dark ">No</span>`;}
            if (data == 0) {return  '<i class="far fa-dot-circle" style="color:green"></i>';}
            return `<span class="badge bg-info text-dark ">Si</span>`;
         }
        },
        { "data": null,"orderable": false},
      ],
      "columnDefs": [
         { targets: 0, visible: false},//id
         { targets: 6, "defaultContent":boton, data: null, className: "text-center" }],
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
    alert('sin acción')
    //alert('Un turno puede ser editado para reagendar en caso de ausencia, conservando el pago')
/*    document.getElementById('id').value = registro.schid;

    document.getElementById('campo1').value = registro.dr;
    document.getElementById('campo2').value = registro.scdate;//fecha
    document.getElementById('campo3').value = registro.sctime;//time

    document.getElementById('campo4').value = registro.patient;

    document.getElementById('listado').style.display = 'block';
    document.getElementById('nuevaConsulta').style.display = 'block';
*/
    //showModal();
});

/*$('#tableTurnos').on('click', 'button.botondetalles', function() {//  paciente File  
    let registro = table.row($(this).parents('tr')).data(); 
    //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
    //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
    alert(boton)
    document.getElementById('id').value = registro.schid    
    cobrarTurno2(registro.speciality, registro.paciente, registro.clientid, registro.drid);
});
*/

function nuevoTurno(){
  document.getElementById('nuevoTurno').disabled=true;
  document.getElementById('cards').style.display='flex';
  document.getElementById('listado').style.display='none';
  document.getElementById('campo4').value=0;
  document.getElementById('campo9').checked=true;
}

function preparaModal(name='', lastname='', phone='',  ci='', adress='', mail='', obs='', status=1, iva=0){
  inputs = []; 
  sele=(status>0)? 'selected':'';  combo1 = comboStatus('field8', sele, true);
  cmbIva = comboBuilder('iva',22,'field9','data','',true);    
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'field1', campo:'Nombre ', selector:'input', type:'text', placeholder:'Nombre ', required:'', autofocus:'', value:name, label:1})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'field2', campo:'Apellido ', selector:'input', type:'text', placeholder:'Apellido', value:lastname, label:1})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'field3', campo:'Teléfono', selector:'input', type:'text', placeholder:'nro celular', value:phone, label:1})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'field4', campo:'CUIT/DNI/CI', selector:'input', type:'text', placeholder:'CI o nro de documento', value:ci, label:1})
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});      
  inputs.push({id:'field5', campo:'Dirección', selector:'textarea', rows:'2', innerHTML:adress, label:1});
  inputs.push({id:'field6', campo:'Email', selector:'input', type:'text', placeholder:'Email', value:mail, label:1});
  inputs.push({id:'field7', campo:'Notas', selector:'textarea', rows:'2', innerHTML:obs, label:1});
  inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'combo',  idCmb:combo1})// campo8 status
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
  inputs.push({id:'combo',  idCmb:cmbIva})// 
  inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2}); 
  inputs.push({id:'field10', campo:'csrf', selector:'input', type:'hidden', value:'TOKEN_CSRF_GENERADO'});
  var d1 = new FormData(); d1.append('src', 'data'); 
  getJson(base_url+'Data/getDataCmb/22', d1, 'combo_iva', 'field9', iva, 'Condición impositiva') 

  openModal(inputs);
  document.querySelector('#titleModal').innerHTML = 'Paciente nuevo'; //Cambiamos el titulo
}
const beforeSave = data=>{ arrAlert = [];
  console.log(data)
  switch (data[1]) {
    case 'Paciente nuevo': 
      setField(); arr2['id']=0; 
      const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
      newData = arr2['field1']+ ' ' + arr2['field2'] ;
      save(base_url+`K_turnos/setClprpame`, dato, 'campo4');
      arrAlert[0]='_exit';
      break;
    default: console.log('someaction', data); break;
  }
  return arrAlert;
}

const afterSave = data=>{    //console.log(data[1])
  switch (data[1]) {
    case 'setClprpame': 
      hideModal=1; updating = true; tableCli.ajax.reload();  break;
    default:console.log('someaction buy', data[1]); break;
  } 

}


document.querySelector('.op_add').addEventListener('click',function(e){
  if( e.target.tagName==='path'){
    preparaModal();  showModal();
  }  
});

