const eyeIcons = {
   open: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" /></svg>',
   closed: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" /><path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" /><path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" /></svg>'
};
 
function addListeners() {
   const toggleButton = document.querySelector(".toggle-button");   
   if (!toggleButton) {      return;   }
   toggleButton.addEventListener("click", togglePassword);
}

function togglePassword() {
   const passwordField = document.querySelector("#password-field");
   const toggleButton = document.querySelector(".toggle-button");   
   if (!passwordField || !toggleButton) {      return;   }
   toggleButton.classList.toggle("open");
   const isEyeOpen = toggleButton.classList.contains("open");
   toggleButton.innerHTML = isEyeOpen ? eyeIcons.closed : eyeIcons.open;
   passwordField.type = isEyeOpen ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", addListeners);

const eyes={closed:`<i class='fa fa-eye-slash'></i>`, open:`<i class='fa fa-eye'></i>`}
const eye = document.querySelector('.eye');
if (eye) {
  eye.addEventListener('click', function(){
    const isEyeOpen = eye.classList.contains("closed");  
    if (isEyeOpen) {eye.classList.remove('closed'); eye.classList.add('open');
    }else{eye.classList.remove('open'); eye.classList.add('closed');}

    inputPassword.type = isEyeOpen ? 'text': 'password';
    if (document.getElementById("inputConfirmPassword")) inputConfirmPassword.type = isEyeOpen ? 'text': 'password';
    eye.innerHTML = isEyeOpen ? eyes.open : eyes.closed;
  })
}
function iniciar(){
    const data = new FormData(); 
    data.append('usuario', document.getElementById('inputEmailAddress').value);    
    data.append('password', document.getElementById('inputPassword').value);
    data.append('mode','login'); 
    fetch('Login/loginUser/', {method: 'POST', body: data  })
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
      localStorage.setItem('db',objData.db);
      //alert (objData.msg,type)
      document.getElementById('mensaje').innerHTML=objData.msg;
      document.getElementById('alert1').classList.remove('d-none');

      if (objData.status)  {
        destino = objData.page==null? 'misdatos': objData.page;
        //console.log(objData, destino)
        //window.location.href = base_url+destino;
        window.location.href = base_url+'dash';
      }
    })
    .catch(function(err) {   console.log(err);  });
}

function registrar(){
  var everything='ok';  
  usuario = document.getElementById('inputLastName').value;
  clave1  = document.getElementById('inputPassword').value;
  clave2  = document.getElementById('inputConfirmPassword').value;
  if(clave1 != clave2)  {
    alert("Las contraseñas deben coincidir"); 
    document.getElementById("inputPassword").focus();
    everything='no'; return;
  }  
  if (usuario.length<4 ||usuario.length>20) {
    alert("usuario inválido"); 
    document.getElementById('inputLastName').focus();
    everything='no';
  }
  //document.querySelector('input[name="radio"]:checked')==null ? (alert('debe seleccionar un tipo de empresa o ERP'), everything='no') : '';

  if (!inlineFormCheck.checked) {
    alert('debe leer las condiciones');
    inlineFormCheck.focus();
    everything='no';
  }
  if (everything =='ok') {
    let texto=usuario;
    let patron=/^[A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9;._*$%&!()\/-]+$/;
    if(!patron.test(texto)) {
      alert('nombre de usuario no permitido');
      document.getElementById('inputLastName').focus();
      return null;
    }

    const data = new FormData(); 
    data.append('usuario', usuario);    
    data.append('password', clave1);
    data.append('email', document.getElementById('inputEmailAddress').value);
    data.append('cell', document.getElementById('cellNumber').value);
    data.append('gallery', localStorage.gallery);
    data.append('app', document.querySelector('input[name="radio"]:checked')?.value||5);
    //data.append('tienda', document.getElementById('tienda').value);
    fetch(base_url+'/Usuarios/registrar', {method: 'POST', body: data  })
    .then(function(response) {
       if(response.ok) { return response.text() } else { throw "Error  Ajax"; }
    })
    .then(function(texto) {
      var objData = JSON.parse(texto); //console.log(objData)
      type = (objData.status=='ok')?'success':'danger';
      document.getElementById('mensaje').innerHTML=objData.msg;
      document.getElementById('alert1').classList.remove('d-none');
      localStorage.clear();
      if (objData.status) window.location.href = base_url+"/login"; 
      if (objData.msg==='ya existe! ') document.getElementById('mensaje').innerText='Usuario ya registrado';
        document.getElementById('alert1').classList.remove('d-none');//si no es ok, mostrar el alert
    })
         if (texto ==1) { alert('Registro exitoso'); window.location.href = base_url+"/home"; }
  }    
}


function AbrirModalRestablecer(){ //obsolete?
  alert('rest')
}

function guardarMyApp() {localStorage.myapp = myapp;}

function recuperarMyApp() {
    if (localStorage.myapp != undefined)  {
        return localStorage.myapp;
    } else return 0; 
}


function Restablecer_Contra(){
    var email=$("#inputEmailAddress").val();
    console.log(email);
    if (email.length==0) {
      alert('ingrese correo electrónico de recuperación de clave')
      $("#inputEmailAddress").focus;
      return null
    }
    var caracteres="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    var contrasena ="";
    for (var i = 0; i < 6; i++) {
        contrasena+=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    $.ajax({
        url:'Controllers/C_restablecerpass.php',
        type:'POST',
        data:{email:email, contrasena:contrasena}
    }).done(function(resp){
        console.log('resp: '+resp);
        if (resp>0) {
          if (resp==1) {
              //$("#modal_restablecer_contra").modal('hide');
              LimpiarEditarContra();
              alert('contrasena restablecida')
              .then ( ( value ) =>  {                    
                  });
          }else alert('correo no encontrado');
        }else{
          alert('no se pudo');
        }
   })
}

function closeAlert(){document.getElementById('alert1')?.classList.add('d-none');}
function showAlert(){document.getElementById('alert1')?.classList.remove('d-none');}

document.querySelector('.input1')?.focus(); closeAlert();
//-----------------------------sin registro

if (localStorage.sr == 1){
  bt = document.createElement('BUTTON');
  bt.setAttribute('id','btnDemo');
  bt.innerText = 'demo';
  document.querySelector('.card-body').appendChild(bt);  
}
const btnDemo = document.getElementById('btnDemo');
const usernameInput = document.getElementById('inputEmailAddress');
const passwordInput = document.getElementById('inputPassword');
const loginForm = document.getElementById('loginForm');

// Configuración de las credenciales de prueba
const demoUser = "sinregistro";
const demoPass = "sinReg010726";

btnDemo?.addEventListener('click', async () => {
  // 1. Limpiar campos y deshabilitar interacción temporalmente
  usernameInput.value = '';
  passwordInput.value = '';
  btnDemo.disabled = true;
  
  // 2. Efecto de escritura para el usuario
  await typeEffect(usernameInput, demoUser);
  
  // Pequeña pausa entre usuario y contraseña para que se vea natural
  await new Promise(resolve => setTimeout(resolve, 200)); 
  
  // 3. Efecto de escritura para la contraseña
  await typeEffect(passwordInput, demoPass);
  
  // 4. Pausa final y envío automático del formulario
  setTimeout(() => {
    // Aquí puedes hacer el submit real o redirigir directamente:
    // window.location.href = "/dashboard"; 
    iniciar();
    //loginForm.dispatchEvent(new Event('submit')); 
    //alert('¡Redirigiendo al Dashboard de prueba!');
  }, 400);
});

// Función reutilizable para simular el tipeo
function typeEffect(inputElement, text) {
  return new Promise((resolve) => {
    let index = 0;
    // Velocidad en milisegundos por letra (30ms es rápido y fluido)
    const speed = 40;   
    function type() {
      if (index < text.length) {
        inputElement.value += text.charAt(index);
        index++; setTimeout(type, speed);
      } else {
        resolve(); // Termina la animación de este campo
      }
    }
    type();
  });
}
if (localStorage.sr == 1) {
  const data = new FormData();  
  data.append('varVal', 'xd');    data.append('varName', 'id-26');
  fetch_URL = base_url+'Ssn/SetSsn'; fetch(fetch_URL,{method: 'POST', body: data});
  btnDemo.click();
  localStorage.removeItem('sr');}