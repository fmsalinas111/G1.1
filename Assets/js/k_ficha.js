var suar;
cltype  = localStorage.getItem('cppm');   xcli  = localStorage.getItem('xcli');
xname   = localStorage.getItem('xname');  xmail = localStorage.getItem('xmail');
function drawPatient() {  
  document.getElementById('patient_plus').style.display='inline';
  document.getElementById('doctor_plus').style.display='none';
  combo = `<div class="col-md-12"><label class="labels">Sexo</label><select name="cmbSex" id="campo7" class="form-control" ><option value="0" selected="" hidden="">Seleccione</option><option style="display:none;"></option><option value="1">Masculino</option><option value="2">Femenino</option> </select></div>`;
  inputs = []; h='';
  inputs.push({id:'c1', campo:'Nombre completo',selector:'input',type:'text',placeholder:'', label:1, disabled:''})
  inputs.push({id:'c2', campo:'Fecha de nacimiento',selector:'input',type:'date', label:1,md:8})
  inputs.push({id:'edad',   campo:'Edad',selector:'input',type:'number',placeholder:'', label:1,disabled:'',md:4})
  inputs.push({id:'c3', campo:'Antecedentes clínicos',selector:'textarea',rows:'2',placeholder:'Alergias, enfremedades...',label:1})
  inputs.push({id:'c4', campo:'Notas',selector:'textarea',rows:'2',placeholder:'ej: Medicación...',label:1})
  inputs.push({id:'c5', campo:'Altura',selector:'input',type:'number',placeholder:'0', label:1,md:6})
  inputs.push({id:'c6', campo:'Peso',selector:'input',type:'number',placeholder:'0', label:1,md:6})
  inputs.push({id:'combo'})// campo7 status
  //inputs draw
    h='';
    inputs.forEach(function(input, index) {
        //console.log(`${index} : ${input.selector} : ${input.id}`);    
        if (input.label==null){label=''}else{label=`<label class="labels"  id="lbl_${input.id}">${input.campo}</label>`}
        placeholder = (input.placeholder==null)? '':` placeholder = "${input.placeholder}"`;
        type = (input.type==null)? '':` type = "${input.type}"`;
        value = (input.value==null)? '':` value = "${input.value}"`;
        disabled = (input.disabled==null)? '':` disabled = "${input.disabled}"`;
        rows = (input.rows==null)? '':` rows = "${input.rows}"`;
        isArea = (input.rows==null)? '':` </textarea>`;
        md = (input.md==null)?'12':input.md
        //      onchange = (input.onchange==null)?'':` onchange = "${input.onchange}"`;
        //if (input.onchange!==null) {alert(input.onchange)}
        if (input.id=='combo') {
            h+=combo;        
        }else{
          h+=`
              <div class="col-md-${md}" >
                ${label}
                <${input.selector} class="form-control" id="${input.id}" name="${input.id}" 
                ${type} ${value} ${placeholder} ${rows} ${disabled} ${onchange}> 
                ${isArea}</br>
               </div>
            `;
        }
      });
      document.getElementById('legajo').innerHTML=h;
}
function drawDoctor(spec) {
  document.getElementById('patient_plus').style.display='none';
  document.getElementById('doctor_plus').style.display='inline';
  
  combo2 = `<div class="col-md-12 spec "><label class="labels">Especialidad</label> <button class="specBtn" title='si hay mas de una'>...</button>
      <div id="combo_especialidad"></div> <br></div>`; 
  combo1  = `<div class="col-md-12"><label class="labels">Sexo</label><select name="cmbSex" id="campo3" class="form-control" ><option value="0" selected="" hidden="">Seleccione</option><option style="display:none;"></option><option value="1">Masculino</option><option value="2">Femenino</option> </select></br></div>`;
  inputs = []; h='';
  inputs.push({id:'c1', campo:'Nombre completo',selector:'input',type:'text',placeholder:'', label:1, disabled:''})
  inputs.push({id:'c2', campo:'Fecha de nacimiento',selector:'input',type:'date',placeholder:'', label:1,md:8})
  inputs.push({id:'edad',  campo:'Edad',selector:'input',type:'number',placeholder:'', label:1,disabled:'',md:4})
  inputs.push({id:'combo', idCmb:combo1})// campo3 sex
  inputs.push({id:'combo', idCmb:combo2})// campo4 especialidad
  inputs.push({id:'c5', campo:'Notas',selector:'textarea',rows:'2',placeholder:'Comentarios',label:1})
  //inputs draw
    h='';
      inputs.forEach(function(input, index) {
          //console.log(`${index} : ${input.selector} : ${input.id}`);    
          if (input.label==null){label=''}else{label=`<label class="labels"  id="lbl_${input.id}">${input.campo}</label>`}
          placeholder = (input.placeholder==null)? '':` placeholder = "${input.placeholder}"`;
          type = (input.type==null)? '':` type = "${input.type}"`;
          value = (input.value==null)? '':` value = "${input.value}"`;
          disabled = (input.disabled==null)? '':` disabled = "${input.disabled}"`;
          rows = (input.rows==null)? '':` rows = "${input.rows}"`;
          isArea = (input.rows==null)? '':` </textarea>`;
          md = (input.md==null)?'12':input.md
          if (input.id=='combo') {
            h+=input.idCmb;
          }else{
            h+=`
              <div class="col-md-${md}">
                ${label}
                <${input.selector} class="form-control" id="${input.id}" name="${input.id}" 
                ${type} ${value} ${placeholder} ${rows} ${disabled} > 
                ${isArea}</br>
               </div>`;
          }          
      });
    document.getElementById('legajo').innerHTML=h;
    arrSpec = spec.split(',');

    const data=new FormData(); data.append('src', 'data'); URL = base_url+'Data/getDataCmb/4';
    getJson(URL, data, 'combo_especialidad', 'campo4',spec,'Especialidad' )

    if (arrSpec.length>1) {
      combo_especialidad.classList.add('d-none')
      th=`<thead><tr><th>Producto</th><th>Cant</th><th>Precio</th><th class="text-right">Importe</th></tr></thead><tbody>`;
      tr=''; tot_minor=0; //tMinor.innerHTML='';
      arrSpec.forEach(function(sp){
/*        tr+=`<tr><td drid=${chan.pid}>${chan.producto}</td>
             <td class="text-center q_" contentEditable = "true">${chan.cantidad}</td>
             <td class="text-right p_" contentEditable = "true">${chan.precio}</td>
             <td class="text-right a_">${chan.cantidad*chan.precio}</td></tr>`
             tot_minor+=(chan.cantidad)*(chan.precio);
*/        console.log(sp)
      }); 

    }else{
    }
}
// end inputs draw
arrSpecs=[];
getSome('Data/getDataByType_Co/4','spec');
function fillTC(texto, type){
  if (type==='spec')  arrSpecs=(texto);
}


	const dato = new FormData();  dato.append('xcli', xcli);	
  URL = base_url+'Klinike/GetLegajo/'+cltype;
	fetch(URL, { method: 'POST', body: dato})
  	.then(data =>data.json())
  	.then(data =>{	      		
  	    var DatosJson = JSON.parse(JSON.stringify(data));
        if (cltype==3) {
          drawPatient();
          document.getElementById('c1').value = xname;
          document.getElementById('nombrePame').innerHTML = `${xname}`;
          document.getElementById('emailPame').innerHTML  = xmail;
  		    document.getElementById('c2').value = DatosJson.birthdate;
  		    document.getElementById('edad').value   = calcularEdad(DatosJson.birthdate);
			    document.getElementById('campo3').value = DatosJson.medhistory;
			    document.getElementById('campo4').value = DatosJson.obs;
          document.getElementById('c5').value = DatosJson.height;
          document.getElementById('c6').value = DatosJson.weight;
          document.getElementById('c7').value = DatosJson.sex;

          document.getElementById('c8').value = DatosJson.osteo;
          document.getElementById('c9').value = DatosJson.orto;
          document.getElementById('c10').value = DatosJson.sicks;
          document.getElementById('c11').value = DatosJson.specifics;
        }
        if (cltype==4) {
          drawDoctor(DatosJson.speciality);// esta linea debe estar comentada ya que se ejecuta antes
          //para evitar el asinc con spec
          document.getElementById('c1').value = xname;
          document.getElementById('nombrePame').innerHTML = `${xname}`;
          document.getElementById('emailPame').innerHTML  = xmail;
          document.getElementById('c2').value = DatosJson.birthdate;
          document.getElementById('edad').value   = calcularEdad(DatosJson.birthdate);
          document.getElementById('campo3').value = DatosJson.sex;
          //document.getElementById('campo4').value = DatosJson.speciality;
          document.getElementById('c5').value = DatosJson.obs;
          document.getElementById('c6').value = DatosJson.username;
          document.getElementById('c7').value = DatosJson.password;
          document.getElementById('c8').value = DatosJson.status;

          setXCli('idr',DatosJson.drid);
          suar=DatosJson.suar;

        }
  	})

//document.getElementById('c1').style.font-size= large;
    //font-weight: bold;
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
  campos=document.getElementsByName("field")
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;     valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0&&i==0)valor='';
    arr2[clave]=valor;
  } 

  if (cltype==3) {//patient
    //data.append('c1', document.getElementById('txt_campo1').value);    
    dato.append('c2', document.getElementById('c2').value);    
    dato.append('c3', document.getElementById('c3').value);
    dato.append('c4', document.getElementById('c4').value);
  	dato.append('c5', document.getElementById('c5').value);
    dato.append('c6', document.getElementById('c6').value);
    dato.append('c7', document.getElementById('c7').value);
    dato.append('c8', document.getElementById('c8').value);
    dato.append('c9', document.getElementById('c9').value);
    dato.append('c10', document.getElementById('c10').value);
    dato.append('c11', document.getElementById('c11').value);
  }
  if (cltype==4) {//dr
    dato.append('c2', document.getElementById('c2').value);    
    dato.append('c3', document.getElementById('c3').value);
    dato.append('c4', document.getElementById('c4').value);
    dato.append('c5', document.getElementById('c5').value);
    dato.append('c6', document.getElementById('c6').value);
    dato.append('c7', document.getElementById('c7').value);
    dato.append('c8', document.getElementById('c8').value);
    dato.append('suar', suar);
    //6,7 y 8 son las credenciales de acceso
    //ver c4 si es multi spec

  }
  URL = base_url+'Klinike/SetLegajo/'+cltype;
  save(URL,dato)
})


legajo.addEventListener('change',function(e){
  if (e.target.id==='c2') document.getElementById('edad').value=calcularEdad(campo2.value);  
});

legajo.addEventListener('click',function(e){
  if (e.target.className==='specBtn') {
    multiSpec();
  }
});

function multiSpec(){
  inputs=[];
  options=campo4.querySelectorAll('option');h='';
  options.forEach(c =>{
    console.log(c.value, c.textContent);
    h+=`<div class="form-check"><label class="form-check-label" for="campo4">
          <input type="checkbox" class="form-check-input" id="campo4" name="campo" value= "${c.value}"">${c.textContent}
          </label>     </div>    `;
  })
  inputs.push({id: 'html', idHt:h});
  openModal(inputs);
  showModal();
  titleModal.textContent='peppe'
}

const beforeSave = data=>{ 
  console.log(data)
  switch (data[0]) {
    case 'generics': 
      fetch_URL=base_url+'Generics/setGen';
    break;
    default:console.log('someaction'); break;
  }
}
