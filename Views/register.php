<!DOCTYPE html>
<html lang="es">
<style type="text/css">
    @media (max-width:480px)  { /* smartphones, Android phones, landscape iPhone */ 
      .form-group label{  display:none;  }
      .eye{cursor:pointer;}
    }
</style>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Registro</title> 
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
    
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/main.css">

    <?php 
      getModal('modal',$data);
      $app = (isset($_SESSION['app']))? $_SESSION['app']:0;
        echo'
          <script>
            const base_url = "'.base_url().'";
            const APP = "'.$app.'";      
          </script>';   
    ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>          
  </head>
    <body class="bg-primary">      
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">

  <div class="card-header"><h3 class="text-center font-weight-light my-2">Crear cuenta</h3></div>
    <div class="card-body">
      <form class="needs-validation" novalidate id="formulario">
        <div class="form-group"> </div>                                          
          <div class="form-row" >
            <div class="col-md-12">
              <div class="form-group">
                <label class="small mb-1 input1" for="inputLastName">Nombre de usuario</label>
                <input class="form-control" id="inputLastName" type="text" placeholder="nombre de usuario (8 a 20 car.)" minlength="4" maxlength="20" required="" pattern="[a-z]{8,20}"/>
                <div class="valid-feedback"> Luce bien!   </div>
              </div>
            </div>
          </div>

          <div class="form-group" >
            <label class="small mb-1" for="inputEmailAddress">Email (opcional)</label>
            <input class="form-control " id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Correo electrónico" />
            <!-- <span id="icon"><i class="fas fa-key"></i></span> -->
            <div class="valid-feedback"> Luce bien!   </div>
          </div>
          <div class="form-group">
            <label class="small mb-1" for="cellNumber">Celular (opcional)</label>
            <input class="form-control " id="cellNumber" type="text" placeholder="Celular" />
            <div class="valid-feedback"> Luce bien!   </div>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputPassword">Contraseña</label>
                <span class="eye closed"><i class='fa fa-eye-slash'></i></span>
                <input class="form-control " id="inputPassword" type="password" placeholder="Ingrese contraseña" minlength="4" />
                <div class="valid-feedback"> Luce bien!   </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="small mb-1" for="inputConfirmPassword">Confirme contraseña</label>
                <input class="form-control " id="inputConfirmPassword" type="password" placeholder="Confirmar contraseña" />
                <div class="valid-feedback"> Luce bien!   </div>
              </div>
            </div>
          </div>


        <br>

          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="inlineFormCheck">
              <label class="form-check-label" for="inlineFormCheck">
                <a href="terms_conditions" target = "_ blank" >He leído los términos y condiciones</a>
              </label>
            </div>
          </div>
          <br>

          <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
          
      </form>
    </div>

    <div id="alert1" class="alert alert-primary d-none" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true"onclick="closeAlert()">&times;</span></button>
      <strong>Mensaje: </strong> <span id="mensaje">Acceso correcto</span>
    </div>

    <div class="card-footer text-center">
        <div class="small"><a href="login">Tiene cuenta? Ingrese</a></div>
    </div>


              </div>
            </div>
          </div>
        </div>
      <div id="liveAlertPlaceholder"></div>                    
    </main>
  </div>

 

    </div>        
        
        <script src="<?=media(); ?>/js/sign.js"></script>
  </body>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  function validarFormulario(evento) {
    evento.preventDefault();

    let usuario = document.getElementById('inputLastName');
    if(usuario.value.length == 0) {
      document.getElementById('mensaje').innerHTML='No has escrito nada en el usuario';
      document.getElementById('alert1').classList.remove('d-none');
      usuario.focus();return;}
      
    let clave = document.getElementById('inputPassword');
    if (clave.value.length < 6) {
      document.getElementById('mensaje').innerText='Clave inválida';
      document.getElementById('alert1').classList.remove('d-none');
      clave.focus(); return;}
    registrar();
  }
</script>
</html>
