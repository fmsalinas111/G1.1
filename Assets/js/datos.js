const prepara_abreModal = () =>{ preparaModal(); showModal(0,'modal-lg');}
caption_array = ["Marca","Banco","Categoría","Especialidad", "Sexo",,,,,,,,,,,'Color','Rol',,,,'Depósito'];
pluralCaption_array = ["Marcas","Bancos","Categorías","Especialidades", "Sexos",,,,,,,,,,,'Colores','Roles',,,,'Depósitos'];

Dtype = parseInt(localStorage.getItem('dttp')); caption = caption_array[Dtype-1];
pedido=[];
if(Dtype==3) show(['chk-subcat']); //, 'subcats', 'iconplus'
//guardar e localstorage cada vez que se clicke chcksubcat para mantener su estado al abrir el modal
gId('chksubcat').addEventListener('change',function(){ setLS('chksubcat', this.checked);});

chksubcat.checked=(localStorage.getItem('chksubcat') === 'true');

getSome('Data/getDataByType/19', 'mods' );
function fillTC(texto, type){ arrMod=(type=='mods')?JSON.parse(texto):[];}

//modal2
  const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);
  form2 = document.querySelector("#form2");
  if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}  
  const newDetail=data=>{
    if (campo1.value==0) {alertError('campo obligatorio', 'campo1'); return;}
    if (gId('id').value==='') {setCampo();
      const dato0 = new FormData(); dato0.append('campos', JSON.stringify(arr1));  
      save(base_url+'Data/setData/dad', dato0); return;} 
    showModal2(-1);
  };

  function validM2(){  arr2=new Object();  setField();
    arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
    arr2['sid']=(document.getElementById('id'))? document.getElementById('id').value:0
    if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return;}
    const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
    save(base_url+'Data/setSubcateg', dato);
  }
  //function deleteSubcat(arg){eliminar2(arg,'subcat');} to del
  function showModal2(arg){
    const foundPedido = pedido.find((r) => r.dataid == arg);
    if(inputs2.innerHTML.length==0)preparaModal2((foundPedido)? foundPedido.dataname:'');
    gId('id2').value = (foundPedido)? foundPedido.dataid: '';    
    modal2.show();      
    if(gId('field1')) {focusModal2(field1);}  //  document.execCommand('selectAll');
  }
  function preparaModal2(subcat=''){     inputs=[];
    inputs.push({id: 'field1',campo:'Subcategoría',selector:'input',type:'text',value:subcat, label:1})
    openModal(inputs, '.inputs2'); gId('titleModal2').innerText ="Subcategorías"; 
  }

  function drawTableDetails(sid){
    dataTbl = new FormData(); dataTbl.append('src', 'subcat'); 
    getTbl(base_url+'Data/getDataTbl/'+sid, dataTbl, 'tabla_detalles')
  }

  function cargarTabla(texto, el){
    obj=(texto);  h='';
    pedido=obj;   i=0; importe=0;  //showModal2(${i-1}
    for (x of obj) {i++;
      h+=`<tr class="rowDet">
            <td>${x.dataname}</td>                   
            <td data-id= ${x.dataid} class="text-center editDetail" onclick="showModal2(${x.dataid});">
            <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
            <td data-id= ${x.dataid} class="text-center deleteDetail" onclick="deleteDetail(${x.dataid},event);">
            <a class="btn btn-danger btn-sm delRow"  ><i class="fas fa-trash"></i></a></td>
          </tr>`;
    }    
    document.getElementById('tDetails').innerHTML = h;
  }

  function deleteDetail(arg, event){
    _parent = event.target.closest('a');
    eliminar2(arg, gId('id').value, 'data/delSubcat', _parent);
    if (_parent.classList.contains('todel')) event.target.closest('tr').remove();
  }
//fin modal2

const getSwitch = data =>{
  return `<label class="toggle">
      <input class="toggle-checkbox" type="checkbox" ${data[0]}id="${data[1]}" name="campo" value=${data[3]}>
      <div class="toggle-switch"></div> <span class="toggle-label">${data[2]}</span>
    </label>  <br><br>  `;
}

function preparaModal(campo1='', campo2='', status=1, padre=0, price=0){

    combo1=comboStatus('campo3', (status>0)? 'selected':'');
    srcCombo3=
    [
        {"fieldId":"1","fieldName":"Brand"},
        {"fieldId":"2","fieldName":"Bank"},
        {"fieldId":"3","fieldName":"Category product"},
        {"fieldId":"4","fieldName":"Speciality dr"},
        {"fieldId":"5","fieldName":"Sexo"},
        {"fieldId":"6","fieldName":"hereditary disease"},
        {"fieldId":"7","fieldName":"Blood type"},
        {"fieldId":"8","fieldName":"hereditary disease"},
        {"fieldId":"9","fieldName":"Intensity:nunca, casual, mod.."},
        {"fieldId":"10","fieldName":"bussiness category"},
        {"fieldId":"12","fieldName":"City"},
        {"fieldId":"13","fieldName":"Parentezco"},
        {"fieldId":"14","fieldName":"Materia"},
        {"fieldId":"15","fieldName":"item(rubro)"},
        {"fieldId":"16","fieldName":"color"},
        {"fieldId":"17","fieldName":"rol"},
        {"fieldId":"19","fieldName":"module"},
        {"fieldId":"20","fieldName":"project"},
        {"fieldId":"21","fieldName":"depot"}
      ];

    //cambiar este origen de datos por datadef que venga de controllers
    clase = (Number(localStorage.iCo)>-1)?'d-none':'xd';
    combo3 = `<div class="${clase}"><div><label for="">dtype </label></div><div id="combo_type"></div></div></div>`;
    inputs = []; h='';
    inputs.push({id:'campo1' ,campo:caption,selector:'input',type:'text',placeholder:'Nombre '+caption, value:campo1, label:1, required:''})
    
    if (Dtype==17&&iCo>0) { //modularidad
      arrAllowModules=(campo2.split(',')); hChecks='';idc=10;
          arrMod.forEach(function(modu){
            dd=(modu.ddesc.split(','));checked='';
              if (dd.includes(APP.toString())){ idc++;
                checked=(arrAllowModules.includes(modu.aux.toString())) ?' checked ':' ';
                hChecks+=`<label class="toggle" for="campo${idc}">
                            <input class="toggle-checkbox" type="checkbox" ${checked} 
                            id="campo${idc}" name="campo" value=${modu.aux}>
                            <div class="toggle-switch"></div>
                            <span class="toggle-label"> ${modu.fieldName}</span>
                          </label>    <br><br>  `;
              }
          }); 
        
      checks=`
      <div class="container"> <label class='font-weight-bold lead'> Permisos:</label><br>
        ${hChecks}
      </div>`;
      inputs.push({id:'html', idHt:checks});
    }else{
      if (Dtype==16) {
        inputs.push({id:'campo2', campo:'Muestra', selector:'input', type:'color', value:campo2, label:1});
        } else  {
        inputs.push({id:'campo2' ,campo:'Descripción',selector:'textarea',rows:'2',placeholder:'Descripción', innerHTML:campo2, label:1});
      }
    }
    inputs.push({id:'campo9' ,campo:'aux',selector:'input', value:padre})

    if (Dtype==4) inputs.push({id: 'campo5' ,campo:'Precio',selector:'input',type:'number',value:price, label:1,disabled:null});
    if (APP==13&&Dtype==3) {
        checked = (padre===-1)? 'checked': '';
        chkFraction =`<div class="col-md-12 " style="padding-top: 15px;">
          <div class="form-check"><label class="form-check-label" for="campo8">
          <input type="checkbox" class="form-check-input" id="campo8" name="campo" ${checked}> Fraccionable
          </label>     </div><br></div>`
        inputs.push({id:'html',  idHt:chkFraction, value:0});    
    }
    if(Dtype===2){
      options = bankTypes(); cmbTipo = comboSimple([{name:'campo', idcampo:'campo10', cap:'Tipo', def:padre, options}])
      inputs.push({id:'combo', idCmb:cmbTipo})// 
    }else{
      inputs.push({id:'combo',  idCmb:combo1})// campo3 status
    }
    inputs.push({id:'combo',  idCmb:combo3})// dtype

    if (chksubcat.checked&&Dtype==3){ //(Dtype==3 && APP==13)
      tblDetail  = `
        <div class="form-group subcats ">
          <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="2" cellspacing="4" style="width:98%;"" >
            <thead><th>Subcategorías</th><th colspan="2" class="text-center">Acciones</th></thead>
            <tbody id="tDetails"></tbody>
          </table>    </div>    
          <div id=subC><div id="itms"></div>        
          </div>`;
      
        iconNuevo = `
            <div class="row iconplus " id="iconNuevo"> <div class="col">
              <a href="#"title ="Nuevo item" onclick="newDetail(0);">
                <div class="d-flex flex-column align-items-center text-center">
                  <img  width="30px" src="./Assets/images/icons/addRec.png"> 
                </div>   
              </a>   </div>  </div> `;
      inputs.push({id: 'html', idHt:tblDetail});
      inputs.push({id: 'html', idHt:iconNuevo});
      
        if(gId('id').value.length>0) drawTableDetails(gId('id').value);
      }// campo4 padre}
      
    openModal(inputs);    

    cargarCombo((srcCombo3), 'combo_type', 'campo6', Dtype);
    if (iCo>0) {campo9.classList.add('d-none')}
    if (Dtype===3||Dtype===1) { //cat and brand
      if (Number(document.getElementById('id').value)>0){
        gtSo2('Data/existsProducts/'+document.getElementById('id').value, enableDelBtn, {'type':Dtype});
      } else gId('btnDelete').classList.add('d-none');      
    }
}

function enableDelBtn(texto){
  if (texto.length>0) {
    gId('btnDelete').classList.add('disabled');
    btnDelete.setAttribute('title', 'No se puede eliminar. Existen productos asociados'); 
    btnDelete.setAttribute('disabled', 'true');
  }
}

///datatable///
var table
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> '+pluralCaption_array[Dtype-1];
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>`;
ojoAbierto = "<center><button  type='button' class='botonInvisible btn btn-success btn-sm' ><i class='fa fa-eye'></i></button> </center>";
ojoCerrado = "<center><button  type='button' class='botonInvisible btn btn-danger btn-sm' ><i class='fa fa-eye-slash'></i></button> </center>";

if (Dtype==4) document.getElementById('dPrecio_Saldo').innerHTML = 'Precio';
if (Dtype==2) botones+=`<button  type='button' class='botondetalles btn btn-success btn-sm'><i class='fa fa-desktop'></i></button>`;

fec_URL=base_url + "Data/getData/"+Dtype;
//if (Number(document.getElementById('tableDatos').getAttribute('co'))<0) fec_URL=base_url+"Data/getDataAdm";
dd=((iCo)>0)?'dataid':'datatype';
document.addEventListener('DOMContentLoaded', function() {
	table=$('#tableDatos').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + fec_URL,   "dataSrc": ""  },
    "columns": [
        { "data": dd },
        { "data": "dataname" },
        { "data": "datadescription" },
        /*
        { "data": "datadescription",
          "render":function(data, type, row){
                    return (!data==null)? `${data}`:`<div style="background-color:${data};">&nbsp&nbsp&nbsp  </div>`;
                }, className:"text-center"
        },
        */
/*                {"data":"estado", 
                    "render":function(data,type,row){
                        return (data==1)? `<span class = "badge badge-success">Activo</span>`: `<span class = "badge badge-danger">Inactivo</span>`;
                    },className:"text-center"
                },
*/        
        {"data": "saldo" , className: "text-right",
          render: $.fn.dataTable.render.number( ',', '.', 0 )},        
        {"data": "stt",
          "render":function(data,type,row){
           return (data==0)? ojoCerrado: ojoAbierto;
          },"orderable": false 
        },
        { "data": null,"orderable": false},
    ],
    "columnDefs": [ 
      { targets: 0, visible: false}, 
      { targets: 3, visible: (Dtype==2||Dtype==4)},
      { targets: 5, "defaultContent":botones, data: null, className:'text-center' }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 20,
    "order": [  [0, "desc"] ]
  });
})

///datatable modificar
$('#tableDatos').on('click', 'button.botonmodificar', function(){
  let r = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = r.dataid;
  preparaModal(r.dataname, r.datadescription, r.stt, r.dad)
  _showDel=(!r.saldo==0)?false:true;
  showModal(_showDel);
  if (Dtype==4) {  //speciality
      document.getElementById('campo5').value = r.saldo;
      //document.getElementById('campo5').disabled=true
  }
});

$('#tableDatos').on('click', 'button.botonInvisible', function(){
  const r = table.row($(this).parents('tr')).data();
  arr1.id = r.dataid;  arr1.campo1 = (r.stt==0)?1:0;
  const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
  updating = true;  save(base_url+'Data/setStatus', dato);
});

$('#tableDatos').on('click', 'button.botondetalles', function(){
  let registro = table.row($(this).parents('tr')).data(); 
  //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
  //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
  localStorage.setItem('dbk', registro.dataid);
  localStorage.setItem('dbkName', registro.dataname);
  window.location.href ='resume';
});

const afterSave = data=>{ 
  [index, model, arr1, objData] = data;
  console.log('AfterSave',data);
  switch (model) {
    case 'delSubcat':  hideModal=0;   console.log('pepe');
    break;
    case 'dad':
      gId('id').value = index; table.ajax.reload(); hideModal=0;  showModal2(-1);
    break;
    case 'setSubcateg': 
      hideModal=0;  drawTableDetails(gId('id').value); closeModal2(); break;
    default:     console.log('afterSave defa', data);    
    break;
  }         
}

const beforeSave = data =>{ arrAlert=[];
  [spage, titModal] = data;  console.log('beforeSave',data);
  switch (spage) {
    case "datos":
      fetch_URL=base_url+'Data/setData'; arr1.campo4=localStorage.getItem('dttp');
      break;
    default:      console.log('no definido');      break;
  }
  return arrAlert;
}    

const delDato = data =>{  arrAlert=[];  console.log('delDato', data);
  [sPage, id_del, par2, el] = data; btn = el.classList.contains('delRow')? 'child':'dad';
  switch (btn) {
    case 'child':
      if (confirm("Confirme la eliminación del registro...")) {
        fetch_URL = base_url+'Data/delData/delSubcat';const data = new FormData();
        data.append('id', id_del); data.append('par2', Dtype);
        save(fetch_URL, data); hideModal=0;  updating = true;
        el.classList.add('todel');
      }      arrAlert[0]='_exit'; 
      break;
    case 'dad'  :
      _scats = '';
      if (gId('tabDet')) _scats = (gId('tabDet').rows.length>1)?' y Subcategorías':'';
      if (confirm("Confirme la eliminación del registro..." + _scats)) {
        fetch_URL = base_url+'Data/delData';const data = new FormData();
        data.append('id', gId('id').value); data.append('par2', Dtype);
        save(fetch_URL, data); hideModal=1;  updating = true;
      }      arrAlert[0]='_exit';
      break;
    default:      arrAlert[0]='_exit';      break;  
  }
  return arrAlert;
}    

function isJson(str) {
    try {        JSON.parse(str);
    } catch (e) {        return false;    }
    return true;
}
