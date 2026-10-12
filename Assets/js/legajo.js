var suar;var edtImgName='';var contChk;

cppmi=['','Cliente','Proveedor','Paciente','Médico','Inquilino', '','','Estudiante', 'Profesor', 'Familiares'];
const cltype = localStorage.getItem('cppm');   const xcli  = localStorage.getItem('xcli');
const xname  = localStorage.xname;  const xmail = (localStorage.getItem('xmail')==='null')?'':localStorage.xmail;


gtSo('Legajo/GetLegajo/'+xcli, fillLegajo, cltype);

function drawLegajo(fecNac, field3, obs, altura, peso, sexo) { inputs = []; 
  age='';  fecNac = (fecNac=='0000-00-00')?'':fecNac;
  age=calcularEdad(fecNac);  //age=99;
  
  gender = `<div class ="col-md-12"><label class="labels">Sexo</label><select name="field" id="field7" class="form-control" >
  <option value="0" selected="" hidden="">Seleccione</option><option style="display:none;"></option>
  <option value="1" ${(sexo==1)?" selected ":''}>Masculino</option><option value="2"${(sexo==2)?" selected ":''}>Femenino</option> </select></div>`;
  
  inputs.push({id:'field1', campo:`Nombre completo (${cppmi[cltype]})`,selector:'input',type:'text',placeholder:'', label:1, disabled:'', value:xname })
  inputs.push({id:'html', idHt:htR1});  inputs.push({id: 'html', idHt:ht8});
    inputs.push({id:'field2', campo:'Fecha de nacimiento',selector:'input',type:'date', label:1, value:fecNac})
  inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:ht4});
    inputs.push({id:'edad', campo:'Edad',selector:'input',type:'text', label:1, disabled:'', value:age})
  inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
  if (cltype==8) inputs.push({id: 'field3', campo:'Antecedentes de salud',selector:'textarea',rows:'2',placeholder:'Alergias, enfermedades...',label:1,innerHTML:field3})
  inputs.push({id:'field4', campo:'Notas',selector:'textarea',rows:'1.5',label:1, innerHTML:obs})
  inputs.push({id:'html', idHt:htR1});inputs.push({id: 'html', idHt:ht6});  
  inputs.push({id:'field5', campo:'Altura',selector:'input',type:'number',placeholder:'0', label:1,md:6, value:altura})
  inputs.push({id:'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
  inputs.push({id:'field6', campo:'Peso',selector:'input',type:'number',placeholder:'0', label:1,md:6, value:peso})
  inputs.push({id:'html', idHt:htR2});inputs.push({id:'html', idHt:htR2});
  inputs.push({id:'combo', idCmb:gender})
  if (cltype==9) {    
    combo2 = comboBuilder('materia',14,'field3', 'data');  
    inputs.push({id:'combo',  idCmb:combo2})// field3
    data=new FormData(); data.append('src', 'data');  
    getJson(base_url+'Data/getDataCmb/14', data, 'combo_materia', 'field3',field3,'Materia')
  }
  if (cltype==4) {    
    combo2 = comboBuilder('especialidad',4,'field3', 'data');  
    inputs.push({id:'combo',  idCmb:combo2})// field3
    createButton();
    data=new FormData(); data.append('src', 'data');  
    getJson(base_url+'Data/getDataCmb/4', data, 'combo_especialidad', 'field3',field3,'Especialidad')
    console.log(field3)
    //await nb=document.createElement('button');
    //mc=document.getElementById('mini-crud_especialidad').appendChild(nb)

  }
  
  async function createButton(){
    data=new FormData(); data.append('src', 'data');  
    await getJson(base_url+'Data/getDataCmb/4', data, 'combo_especialidad', 'field3',field3,'Especialidad')
    nb=crEl('button'); nb.textContent='...';
    nb.title='Si hay más de una'; nb.className='specBtn';
    nb.setAttribute('disabled', ''); nb.style="margin-bottom: 2px;"
    minicrud=document.querySelector('.mini-crud');
    mc=document.getElementById('cmbEspecialidad').insertBefore(nb, minicrud)    
    console.log(nb)
  }

  legajo.innerHTML=drawForm(inputs);
}

legajo.addEventListener('click',function(e){
  if (e.target.className==='specBtn') {
    multiSpec();
  }
});
function multiSpec(){  inputs=[];
  options=field3.querySelectorAll('option');h='';i=0;
  options.forEach(c =>{
    console.log(c.value, c.textContent);
    if (c.value>0){
      i++;  h+=`
            <div class="form-check"><label class="form-check-label" for="campo${i}">
                <input type="checkbox" class="form-check-input" id="campo${i}" name="campo" value= "${c.value}"">${c.textContent}
                </label>     </div>    `;}
  })
  inputs.push({id: 'html', idHt:h});
  openModal(inputs);  showModal();
  arr_spec=[]; arr_spec[4]='Especialidad'; arr_spec[9]='Materias';
  titleModal.textContent=(arr_spec[cltype]);
}



function fillLegajo(texto){  
  let DJ = JSON.parse((texto));
  if (DJ.imgname.length>0){
    let img2=(DJ.imgname.substring(0,4)!=='http')? base_url+"Assets/images/legajo/"+DJ.imgname: DJ.imgname;
    document.getElementById('foto').src = img2;
    document.getElementById('foto').setAttribute("imgActual",img2);
    document.getElementById('foto').setAttribute("imgSiid",DJ.siid);
  }
  document.getElementById('nombrePame').innerHTML = xname;
  document.getElementById('emailPame').innerHTML  = xmail;
  let field3=(cltype==8)?DJ.medhistory:DJ.speciality;
  //console.log(field3)

  drawLegajo(DJ.birthdate, field3, DJ.obs, DJ.height, DJ.weight, DJ.sex);
  fillSection3(DJ.osteo, DJ.orto, DJ.sicks, DJ.specifics, DJ.uname, DJ.pwd, DJ.stt)
}

function fillParents(texto){
  if (cltype==9||cltype==4) {console.log('fillSection3');fillSection3();return;} 
  obj=JSON.parse(texto);  h='';maxParents=0;
  for (x of obj) {
    if (x.imgname=='') img2=base_url+"Assets/images/fix/sinfoto.png";
    else img2=(x.imgname.substring(0,4)!=='http')? base_url+"Assets/images/legajo/"+x.imgname: x.imgname;
    h+=`
    <div class="card">
      <div class="row g-0">
        <div class="col-md-4">
          <img class="bd-placeholder-img" width="100%" height="100" src="${img2}" >
        </div>
        <div class="col-md-8 card-body" style="padding:0.25rem;">
          <a href="#" onclick="editParent(${x.parentid},'${x.parentName}','${x.parentAddress}',
          '${x.parentPhone}','${x.parentEmail}','${x.notas}',${x.relShip},'${x.imgname}',${x.siid})">
          <h5 class="card-title nom-fam" data-id=${x.parentid}>${x.parentName}</h5></a>
          <h6 class="card-title"> ${x.relationship}</h6>
        </div>
      </div>
    </div>`;
    maxParents++
  }
  document.getElementById('legajo_plus').innerHTML= h;  
  if(maxParents>3)document.getElementById('btnNewFamlily').style.display='none';  
  if(maxParents<1)document.getElementById('notify').style.display='none';  
}




function fillSection3(osteo='', orto='', sicks='', specifics='', a='', b='', c=0){
  btnSector3=`<div class="mt-2 text-center"> <button class="border px-3 p-1 btn-outline-primary"><i class="fa fa-save"></i> Guardar</button></div>`;
  if (cltype==3) {
    inputs=[];  
    inputs.push({id:'field8', campo:'Osteopático',selector:'textarea',rows:'2',label:1, innerHTML:osteo});
    inputs.push({id:'field9', campo:'Ortopedia',selector:'textarea',rows:'2',label:1, innerHTML:orto});
    inputs.push({id:'field10', campo:'Enfermedades',selector:'textarea',rows:'2',label:1, innerHTML:sicks});
    inputs.push({id:'field11', campo:'Particularidades',selector:'textarea',rows:'2',label:1, innerHTML:specifics});
    sector3.innerHTML=`
        <div class="p-1 py-3" >
          <div class="d-flex justify-content-between align-items-center experience"><span><b>Otros diagnósticos:</b></span></div>
          <button class="border px-3 p-1 "><i class="fa fa-clock"></i>&nbsp;<a href="${base_url}k_hisconsultas">Consultas</a></button>
          <button class="border px-3 p-1 "><i class="fa fa-user"></i>&nbsp;<a href="${base_url}k_imagenes">Imágenes</a></button>
          <button class="border px-3 p-1 "><i class="fa fa-tooth"></i>&nbsp;<a href="${base_url}k_og">OG</a></button>
        </div>`+drawForm(inputs)+ btnSector3;
  }

  if (cltype==4||cltype==9) {
    inputs=[];  
    sele=(c>0)? 'selected':''; combo1=comboStatus('field11', sele, true);
    inputs.push({id:'field9', campo:'Usuario', selector:'input',label:1, value:a});
    inputs.push({id:'field10', campo:'Contraseña', selector:'input',label:1, value:b});
    inputs.push({id:'combo', idCmb:combo1});

    sector3.innerHTML=`
      <div class="p-1 py-3" >
        <div class="d-flex justify-content-between align-items-center experience">
          <div class="col my-2"><h4>Acceso al sistema</h4></div>
        </div><br>`+drawForm(inputs)+ btnSector3
        
  }

  if (cltype==8) gtSo('Legajo/GetParents/'+xcli, fillParents);
}


function calcularEdad(fecha) {
	if (fecha == null)  return 0;
    var hoy = new Date();    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}


document.getElementById('btnGuardar').addEventListener('click', function(){
  id = (document.getElementById('id'))? document.getElementById('id').value:0
  campos=document.getElementsByName("field")
  arr2=new Object();
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;     valor=campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0&&i==0)valor='°';
    arr2[clave]=valor;
  } 
  arr2['clType']=cltype; 
  const dato=new FormData(); dato.append('campos',JSON.stringify(arr2));
  fURL = base_url+'Legajo/setLegajo/'+xcli;
  save(fURL, dato);
})

sector3.addEventListener('click',(e)=>{
  if (e.target.tagName==='BUTTON') {btnGuardar.click();console.log(e.target)} //save sector3
});

function preparaModal(cli=0, nombre='',direccion='',telefono='',email='',notas='', parentezco=0, imagen='',siid){
  idcampo="campo10";//para la imagen
  combo3=setPreview(nuevaImg(imagen,'legajo'), idcampo, imagen);
  combo7 = comboBuilder('parentezco',13,'campo7', 'data');
  inputs = []; 
  inputs.push({id:'html', idHt:htR1});
    inputs.push({id:'html', idHt:'<div class="col-md-4">'});
      inputs.push({id:'combo',  idCmb:combo3})// preview
    inputs.push({id:'html', idHt:htR2});
    inputs.push({id:'html', idHt:'<div class="col">'});
      inputs.push({id:'campo1', campo:'Nombre del familiar',selector:'input',type:'text', label:1,value:nombre})
      inputs.push({id:'campo2', campo:'Dirección',selector:'input',type:'text', label:1, value:direccion})
      inputs.push({id:'campo3', campo:'Teléfono',selector:'input',type:'text', label:1, value:telefono})
      inputs.push({id:'campo4', campo:'Correo electrónico',selector:'input',type:'text',placeholder:'', label:1, value:email})
    inputs.push({id:'html', idHt:htR2});  
    inputs.push({id:'campo5', campo:'Notas',selector:'textarea',rows:'2',label:1, innerHTML:notas})
    inputs.push({id:'campo6', campo:'clid',  selector:'input', type:'hidden', value:xcli, disabled:''})
    inputs.push({id:'combo',  idCmb:combo7})
    inputs.push({id:'campo8', campo:'siid',  selector:'input', type:'hidden', value:siid, disabled:''})
  inputs.push({id: 'html', idHt:htR2});
  openModal(inputs)
  var data = new FormData(); data.append('src', 'data');
  fURL = base_url+'Data/getDataCmb/13';
  getJson(fURL, data, 'combo_parentezco', 'campo7',parentezco,'Parentezco')
  showModal(0,'modal-lg');
}

if (document.getElementById('btnNewFamlily'))document.getElementById('btnNewFamlily').addEventListener('click', function(){
  preparaModal();
  localStorage.setItem('imgToUpld','new'); img_elem='imgModal';  edtImgName='';  
  document.querySelector('#titleModal').innerHTML ="Familiares (nuevo)"; 
})

function editParent(a, b, c, d, e, f, g, h, i) {
  localStorage.setItem('imgToUpld','new');  
  if( i == null) {i=0;h='';}
  if(h!=='') {localStorage.setItem('imgToUpld',h); edtImgName=h;}
  document.getElementById('id').value = a;
  preparaModal(a, b, c, d, e, f, g, h, i);
  img_elem='imgModal';
  document.querySelector('#titleModal').innerHTML ="Familiares (editar)"; 
}

document.getElementById('btnCambiarFoto').addEventListener('click', function(){
  imgActual=(document.getElementById('foto').getAttribute("imgActual"))?foto.getAttribute("imgActual"):'';
  imgSiid=(document.getElementById('foto').getAttribute("imgSiid"))?foto.getAttribute("imgSiid"):0;
  if(document.getElementById('foto').getAttribute("imgActual")=='null') {imgActual='';imgSiid=0;}
  cambiarFoto(xcli, imgActual, imgSiid);
  img_elem='imgModal';
  localStorage.setItem('imgToUpld',imgActual);
  edtImgName=imgActual;
  document.getElementById('id').value = imgSiid;
})

function cambiarFoto(cli=0, imagen='',siid=0){    inputs = []; 
  idcampo="campo1"; combo3=setPreview(nuevaImg(imagen,'legajo'), idcampo, imagen);
  inputs.push({id:'combo',  idCmb:combo3})// preview
  inputs.push({id:'campo2', campo:'xcli',  selector:'input', type:'hidden', value:cli, disabled:''})
  inputs.push({id:'campo8', campo:'siid',  selector:'input', type:'hidden', value:siid, disabled:''})
  openModal(inputs);
  titleModal.innerHTML = "Foto (cambiar)"; 
  if (imagen.length==0){
    titleModal.textContent = "Foto nueva"; localStorage.setItem('imgToUpld','new'); edtImgName='';  }
  document.getElementById('id').value =  siid;
  showModal(); document.querySelector('#btnActionForm').removeAttribute('disabled');
}

if(document.getElementById('btnContacto')) btnContacto.addEventListener('click', function(){
  h1=''; i=2;   parents = document.querySelectorAll('.nom-fam');
  parents.forEach(function(parent){ 
    h1+=` <label>
            <input type="checkbox" name="campo" id="campo${i++}" class="parent"  
            data-id="${parent.getAttribute('data-id')}"> ${parent.innerHTML}  
          </label></br>`
  });
  h=`<div class="col"><div class="form-group col-md-12">
      <label class="control-label" style="width: auto;" id="lbl_campo1">De:</label>
      <input class="form-control col-md-12" id="campo1" name="campo" type="text" value="${localStorage.usrName}", disabled="">
      <div class="row">
        <div class="col"> <label class="control-label">Para:</label></br>  ${h1} </div>
        <div class="col">
          <label class="control-label" style="width: auto;" id="lbl_campo8">Fecha </label>
          <input class="form-control col-md-12" id="campo8" name="campo" type="date" value="${hoy()}">
        </div>
      </div>
      <label class="control-label" style="width: auto;" id="lbl_campo6">Notas</label>
      <textarea class="form-control col-md-12" id="campo6" name="campo" rows="2"></textarea>
    `;

  openModal();  
  document.querySelector('.inputs').innerHTML     = h;
  document.querySelector('#btnText').innerHTML    ="Enviar"; 
  document.querySelector('#titleModal').innerHTML ="Notificación (nueva)"; 
  document.getElementById('id').value=0;
  showModal(0,'modal-lg');
  valida();
  contChk = document.querySelectorAll(".parent");
  for (var i = 0; i < contChk.length; i++) { contChk[i].addEventListener("click", valida);}
  if(document.getElementById('campo6')) document.getElementById('campo6').addEventListener('input',valida);
})


function valida(e) { 
  desactivar = false;
  cantCHCKD = document.querySelectorAll('input[type="checkbox"]:checked').length;
  if (cantCHCKD===0) desactivar=true;
  if (document.getElementById('campo6').value.length===0) desactivar=true;
  if (document.getElementById('campo8').length===0) desactivar=true;
  
  if (desactivar){
    //document.querySelector('#btnActionForm').classList.add("disabled");
    document.getElementById('btnActionForm').disabled ='true'
  } else {
    //document.querySelector('#btnActionForm').classList.remove("disabled")
    document.getElementById('btnActionForm').removeAttribute('disabled');
  };  
}

/*document.getElementById('btnHistorial').addEventListener('click', function(){
  window.location.href ='hnotify';
})
*/
legajo.addEventListener('change',function(e){
  console.log('ch')
  if (e.target.id==='field2') {
    document.getElementById('edad').value=calcularEdad(field2.value);
  }
});


const beforeSave = data=>{ arrAlert=[];
  console.log ({data})
  switch (data[1]) {
    case 'Especialidad': 
      console.log('cambiando url')
      fetch_URL=base_url+'Legajo/setSpec';//arrAlert[0]='_exit';
    break;
    default:console.log('someaction'); break;
  }
}

const afterSave = data=>{  
  console.log(data[1])
  switch (data[1]) {
    case 'Compras': case 'Ventas':
      document.getElementById('id').value= data[0];
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0;  return;
    break;
    case 'buy': 
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=1; return
    break;
    case 'setDetails': case '2': case '1':
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value); 
      closeModal2(); hideModal=0; return
    break;

    default:console.log('someaction buy'); break;
        
  } 

}

