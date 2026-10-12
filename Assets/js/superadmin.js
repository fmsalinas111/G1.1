datCo = document.getElementById('datCo');

const prepareToSend = data=>{
  document.getElementById('campo4').value=data;
  document.querySelector('#alert1').innerHTML =`
    <a href="https://api.whatsapp.com/send?phone=${document.getElementById('campo3').value}&text=Hola, siga este enlace para recuperar su cuenta: 
          ${base_url}/access_token?token=${data}&type=usr">Enviar por whatsapp</a></br>
    <a href="https://api.whatsapp.com/send?phone=${document.getElementById('campo2').value}&text=Hola, siga este enlace para recuperar su cuenta: 
          ${base_url}/access_token?token=${data}&type=usr">Enviar por email</a></br>
    <a href="${base_url}/access_token?token=${data}&type=usr">Seguir el enlace</a>
    `; 
} 

function preparaModal(usuario='',email='',cell='',token=''){
    inputs = []; h='';
    inputs.push({id:'campo1' ,campo:'Usuario',selector:'input',type:'text',placeholder:'Nombre de usuario',value:usuario, label:1, disabled:''})
    inputs.push({id:'campo2' ,campo:'Email',selector:'input',type:'email', placeholder:'correo',value:email,label:1})
    inputs.push({id:'campo3' ,campo:'Celular',selector:'input',value:cell,label:1}) 
    inputs.push({id:'campo4' ,campo:'token',selector:'input',value:token,placeholder:'token',disabled:''}) 
    openModal(inputs)
    document.querySelector('#titleModal').innerHTML ="Micro sitio"; 
    document.querySelector('#btnText').innerHTML ="Generar"; 
    document.querySelector('#titleModal').innerHTML ="Recuperar contraseña"; //modal title
}

function prepara_toK(coName, usi, coi){    inputs = []; h='';
    inputs.push({id: 'campo1' ,campo:'Nombre negocio',selector:'input',type:'text',placeholder:'Nombre de usuario',value:coName, label:1, disabled:''})
    inputs.push({id: 'campo2' ,campo:'us',selector:'input',type:'text',value:usi, disabled:''})
    inputs.push({id: 'campo3' ,campo:'sto',selector:'input',type:'text',value:coi, disabled:''})
    openModal(inputs)
    document.querySelector('#titleModal').innerHTML ="killer"; 
    document.querySelector('#btnText').innerHTML ="to kill"; 
}
function tokill(){
  console.log('pepe');
  const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
  f_URL = base_url+'Superadmin/delStore';  save(f_URL, dato);
}

function Cos(){
  const data = new FormData(); 
  URL = base_url+'Superadmin/getCos'; 
  fetch(URL, {method: 'POST', body: data  })
  .then(function(response) {//console.log(response);
     if(response.ok) { return response.text() } else { throw "Error  Ajax"; }
  })
  .then(function(texto) {  	//console.log(texto);
    datCo.innerHTML= (texto.length>0)? texto:'Sin datos';
  })
}

function galleries(){
  getSome2('Companies/getCards/gallery','galleries')
}

function fillTC(texto, type){
  if (type=='galleries') {
    console.log(texto);
    //for(x of JSON.parse(texto)) arrayRubros[x.dataid]=x.dataname;
    //getSome('companies/getMyBlines','misRubros');
  }
  if (type=='misRubros') misRubros(texto);
}



Cos();
galleries()
Banner();


datCo.addEventListener("click", e=>{
  if(e.target.tagName==='A'&& e.target.innerText==='Reset'){
    data=e.target.getAttribute('data');
    usrName=e.target.getAttribute('usrName');
    usrEmail=e.target.getAttribute('usrEmail');
    usrCell=e.target.getAttribute('usrCell');
    document.getElementById('id').value=data;
    preparaModal(usrName, usrEmail, usrCell)
    showModal(); gId('titleModal').textContent='Recuperar contraseña';
  }

  if(e.target.tagName==='A'&& e.target.innerText==='kill'){
    if (confirm('Confirme')) {
      dataU=e.target.getAttribute('dataUs');
      dataC=e.target.getAttribute('dataCo');
      coName=e.target.getAttribute('coName');
      prepara_toK(coName, dataU, dataC);
      showModal();
    }
  }
  if(e.target.tagName==='A'&&e.target.innerText==='mKey'){
    dataU=e.target.getAttribute('dataUs');
    uName = e.target.getAttribute('usrName');
    proj=e.target.getAttribute('proj');
    co=e.target.getAttribute('dataco');
    iniciar(dataU,proj,co, uName)
  }

})


function iniciar(dU,proj,co, uName){
    const data = new FormData(); 
    data.append('u', dU);    data.append('n', uName);   
    data.append('proj', proj); data.append('co', co);
    data.append('mode','login');
    fetch('superadmin/mKey/'+1, {method: 'POST', body: data  })
    .then(function(response) {
      if(response.ok) return response.text(); else throw "Er:Ajax";
    })
    .then(function(texto) {//      console.log(texto)
      var objData = JSON.parse(texto);
      type = (objData.status=='ok')?'success':'danger';
      localStorage.setItem('APP',objData.app)
      localStorage.setItem('iCo',objData.iCo)
      localStorage.setItem('usrName',objData.usrName);
      localStorage.setItem('page',objData.page);
      localStorage.setItem('logged',objData.login);
      //alert (objData.msg,type)
      //document.getElementById('mensaje').innerHTML=objData.msg;
      //document.getElementById('alert1').classList.remove('d-none');
      if (objData.status)  {
        destino = objData.page==null? 'misdatos': objData.page;
        //console.log(objData, destino)
        window.location.href = base_url+destino;
      }
    })
    .catch(function(err) {   console.log(err);  });
}
