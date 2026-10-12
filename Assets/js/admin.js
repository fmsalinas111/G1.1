
function prepara_abreModal(){  preparaModal();   showModal();   }
function preparaModal(imagen='', fecha=hoy(), description=''){
  idcampo="campo1"; combo1=setPreview(nuevaImg(imagen,'klk'), idcampo, imagen);
  inputs = []; h='';  
  inputs.push({id:'combo',  idCmb:combo1})  
  inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date', value:fecha, label:1})  
  inputs.push({id:'campo3', campo:'Descripción',selector:'textarea',rows:4, innerHTML: description, label:1})
  openModal(inputs);
}
function subir2(f_url, target='', targetData='', imgName='', bGuardaImagen, record_id){
  f_url = "Upl_injector/upl";
  const dato  = new FormData(formUpload);  
    target = '../Assets/docs/iny';
    dato.append('id', 0); dato.append('uploadPath',target);
    //dato.append('tmpimg', document.getElementById(idcampo).value);
  fetch(f_url, {method:'POST', body: dato})
  .then(function(response) {  
    if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    var objData = JSON.parse(texto);
    if (objData.status) {
      //console.log(objData)
      previewElement=document.getElementById(img_elem);
      if (previewElement) previewElement.src= 
          base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime();
      if (atAction=='editarLogo') {
        document.getElementById('logo').setAttribute("src", base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime() )
        localStorage.setItem('imgLogo',objData.msg)
      }
      arr1[idcampo]=objData.msg; 
      if (document.getElementById('alert2')) document.getElementById('alert2').classList.add('d-none');
      //console.log (bGuardaImagen,targetData, arr1[idcampo], record_id);

      if (bGuardaImagen) guardarImagen(targetData, record_id);
    }else{
      alert(objData.msg);
    }
  })
  .catch(function(err) {console.log(err);});
}
function subir(f_url, target='', targetData='', imgName='', bGuardaImagen, record_id){
  f_url  = base_url+'Controllers/upl_inyector.php'; 
  newDoc = imgName;
  const dato  = new FormData(formUpload);  
    target = '../Assets/docs/iny';
    dato.append('id', 0); dato.append('uploadPath',target);
    //dato.append('tmpimg', document.getElementById(idcampo).value);
  fetch(f_url, {method:'POST', body: dato})
  .then(function(response) {  
    if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    var objData = JSON.parse(texto);
    if (objData.status) {
      //console.log(objData)
      previewElement=document.getElementById(img_elem);
      if (previewElement) previewElement.src= 
          base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime();
      if (atAction=='editarLogo') {
        document.getElementById('logo').setAttribute("src", base_url+"Assets/images/"+objData.msg+"?"+ new Date().getTime() )
        localStorage.setItem('imgLogo',objData.msg)
      }
      arr1[idcampo]=objData.msg; 
      if (document.getElementById('alert2')) document.getElementById('alert2').classList.add('d-none');
      //console.log (bGuardaImagen,targetData, arr1[idcampo], record_id);

      if (bGuardaImagen) guardarImagen(targetData, record_id);
    }else{
      alert(objData.msg);
    }
  })
  .catch(function(err) {console.log(err);});
}

function crearTabla(data){
  alert(data)
  const filas = data.split(/\r?\n|\r/);
  let tabla ='<table>';
  for (let fila = 0; fila < filas.length; fila++) {
    if(fila===0){tabla+='<thead>'; tabla+='<tr>';} else tabla+='<tr>';
    const celdasFila = filas[fila].split(';');
    for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
      if (fila === 0) {
        tabla += '<th>'; tabla += celdasFila[rowCell]; tabla += '</th>';
      }else{
        tabla += '<td>'; tabla += celdasFila[rowCell]; tabla += '</td>'; 
      }    
    }
    if (fila === 0) { 
      tabla += '/<tr>'; tabla += '</thead>'; tabla += '</tbody>';
    }else{
      tabla += '</tr>';
    }
  }
  tabla += '</body>'; tabla += '</table>';
  document.querySelector('.card').innerHTML = tabla;
  console.log(tabla);
}

function mostrarContenido(contenido){
  alert(contenido);
}
function leerArchivo(e){
  const archivo = e.target.files[0];
  if (!archivo)     return;
  const lector = new FileReader();
  lector.onload = function(e){
    const contenido = e.target.result;
    //mostrarContenido(contenido);
    crearTabla(contenido);
  };
  lector.readAsText(archivo);
}

document.querySelector('#image').addEventListener('change', leerArchivo, false);