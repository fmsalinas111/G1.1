let params = new URLSearchParams(location.search);
let token = params.get('token');
let ttype = params.get('type');
let coId, uId, tkn;
function verificar(token){
    const data = new FormData();  data.append('token', token);  data.append('type', ttype);    
    fURL = base_url+'Access_token/verifyToken'; 
    fetch(fURL, {method: 'POST', body: data  })
    .then(function(response) {//console.log(response);
       if(response.ok) { return response.text() } else { throw "Ajax error"; }
    })
    .then(function(texto) {  //console.log(texto);
      if(ttype==1){resumen(texto); return;}
      
      var objData = JSON.parse(texto); 
      
      if (objData.status===true){
        
      	coId = objData.data.coId; uId = objData.data.uId;
        tkn = objData.data.microSite;
        console.log(coId, uId, tkn);
        usuario = (objData.data.usuario)?objData.data.usuario:'invitado/a';
      	document.getElementById('usrName').innerText = `${usuario}: `;
        document.getElementById('usuario').value = usuario;
        document.getElementById('pwrd').placeholder = 'Nueva contraseña';
        document.getElementById('usrData').style.display = 'inline';
      }else{
      	document.getElementById('title').innerText = 'Sin acceso..';
        document.getElementById('usrData').style.display = 'none';
      }
    })
}

verificar(token)
if(ttype==='usr'){
  document.getElementById('usuario').disabled = true;
  //document.getElementById('title').innerText = 'Recuperar contraseña';
  document.getElementById('micrositio').style.display = 'none';
}


document.getElementById('btnGuardar').addEventListener('click', function(){
  var everything='ok';
  usuario = document.getElementById('usuario').value;
  page    = document.getElementById('page').value;
  clave1  = document.getElementById('pwrd').value;
  clave2  = document.getElementById('repetir').value;
  if (clave1.length==0) {
    alert('contraseña errónea');
    document.getElementById("pwrd").focus();
    everything ='no';
  }
  if(clave1 != clave2)  {
    alert("Las contraseñas deben coincidir"); 
    document.getElementById("pwrd").focus();
    everything='no';
  }  
  if (usuario.length<4 ||usuario.length>20) {
    alert("usuario inválido. (entre 4 y 20 caracteres"); 
    document.getElementById('usuario').focus();
    everything='no';
  }
  if ((page.length<4 ||page.length>20)&&!ttype==='usr') {
    alert("micrositio inválido. (entre 4 y 20 caracteres"); 
    document.getElementById('page').focus();
    everything='no';
  }  
  if (everything =='ok') {
  	const dato = new FormData();  
    if(!ttype==='usr'){
    	dato.append('coId', coId); dato.append('uId', uId);
      dato.append('tkn', tkn);
    	dato.append('campo1', document.getElementById('usuario').value);
      dato.append('campo2', document.getElementById('pwrd').value);
      dato.append('campo3', document.getElementById('page').value);
      URL = base_url+'Access_token/setMicrosite';
    }else{
      dato.append('tkn',token);
      dato.append('campo2', document.getElementById('pwrd').value);
      URL = base_url+'Access_token/setNewPwd';
    }
    save(URL,dato);
  }
})


function resumen(texto){
  body = ''; tot=0;
  obj = JSON.parse(texto);   obj = (obj.data); 
  clName = (JSON.parse(texto).clientName);
  imgPath = base_url+'Assets/images/cpacos/'; imag = '';
  head = `<br><br><h2>Resumen de cuenta</h2>
  <h4>${clName}</h4>
  <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
  <thead><th class="text-center">Fecha</th> <th>Detalle</th> <th class="text-right">Compra</th> <th class="text-right">Pago</th> <th class="text-right">Saldo</th> <th >img</th>`;
   //<th >img</th>`;
  for (x of obj) { tot=+x.balance; 
    imag = isValidUrl(x.img)? x.img: imgPath+x.img;    
    imgTD = (x.img.length>0)?`<td> <img src= ${imag} width="70"> </td>`:'<td></td>';
    body+=`<tr>
      <td class="text-center">${x.ffecha}</td> <td>${(x.bank==x.notes)?x.bank: x.bank+': '+ x.notes}</td> <td class="text-right">${x.cargo}</td> <td class="text-right">${x.abono}</td> <td class="text-right">${x.balance}</td> 
      ${imgTD}
    </tr>`;  }
  tabResumen = head+body; 
  document.querySelector('.simple').innerHTML = tabResumen;

  part = crEl("h5");  part.className = `px-3 `; 
  part.innerHTML=`<hr>Total saldo ${(tot<0)?'acreedor':'deudor'}:  ${tot}`;
  document.querySelector('.simple').appendChild(part);
  
}
const clSuty=data=>{

}