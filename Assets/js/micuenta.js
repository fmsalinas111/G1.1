function preparaModal(nombre='',email=''){
    inputs = []; h='';
    inputs.push({id: 'campo1' ,campo:'Usuario',selector:'input',type:'text',placeholder:'Nombre de usuario',value:nombre, label:1})
    inputs.push({id: 'campo2' ,campo:'Email',selector:'input',type:'email', placeholder:'correo',value:email,label:1})
    
    inputs.push({id: 'campo3' ,campo:' Actual',selector:'input',type: 'password',value:'',label:1})
    inputs.push({id: 'campo4' ,campo:'Clave nueva',selector:'input',type: 'password',label:1}) 
    inputs.push({id: 'campo5' ,campo:'Repetir clave nueva',selector:'input',type: 'password',label:1}) 
    
    openModal(inputs)
    document.querySelector('#titleModal').innerHTML ="Cambiar clave"; //modal title
    document.getElementById('campo3').value='';
    document.getElementById('campo3').setAttribute('autocomplete', 'new-password')
     
}

function modalTemplate(){inputs = []; 
  options = [{option:'eco5',value:'eco5'},{option:'_yummy',value:'yummy'}, {option:'_delicious',value:'delicious'}, {option:'_restaurantly',value:'restaurantly'} ];
  cmbTipo = comboSimple([{idcampo:'campo1', name:'campo', cap:'Plantilla', def:2, options}])

  inputs.push({id:'combo', idCmb:cmbTipo})// 
  
  openModal(inputs)
  document.querySelector('#titleModal').innerHTML ="Plantilla"; //modal title
     
}

document.getElementById('cambiarClave').addEventListener('click',function(){
    //document.getElementById('id').value = document.getElementById('cambiarClave').getAttribute("data");
    document.getElementById('id').value = data;
    preparaModal(uname, usremail) 
    showModal();
});

document.getElementById('template').addEventListener('click',function(){
    document.getElementById('id').value = data;
    modalTemplate() 
    showModal();
});

function verificarCambioClave(){
  var everything=true;
    actual  = document.getElementById('campo3').value;
    clave1  = document.getElementById('campo4').value;
    clave2  = document.getElementById('campo5').value;


  if (actual.length==0) {
    everything =false;
    alert('ingrese clave actual');
    document.getElementById("campo3").focus();
    return 
  }
  if (clave1.length==0) {
    everything =false;
    alert('contraseña nueva errónea');
    document.getElementById("campo4").focus();
    return;
  }

  if(clave1 != clave2)  {
    everything=false;
    alert("Las contraseñas deben coincidir"); 
    document.getElementById("campo4").focus();
    return;
  }  

  //observar este if
  if (arr1.campo1.length<4 ||arr1.campo1.length>20) {
    everything=false;
    alert("usuario inválido. (entre 4 y 20 caracteres"); 
    document.getElementById('campo1').focus();
    return;
  }

  if (everything) {
    console.log('everything is ok')
  }    
  return everything
}