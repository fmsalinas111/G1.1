<?php
  require_once ("Views/Template/header_sign.php"); 
  ?>
    <body class="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">Ingreso</h3>
                    </div>

        <div class="card-body">
          <form>
            <div class="form-group">
              <label class="small mb-1 input1" for="inputEmailAddress">Email o usuario</label>
                <input class="form-control py-4" id="inputEmailAddress" type="text" placeholder="email o usuario" />
            </div>

            <div class="form-group">
                <label class="small mb-1" for="inputPassword">Contraseña</label>
                  <span class="eye closed"><i class='fa fa-eye-slash'></i></span>
                  <input class="form-control py-4" id="inputPassword" type="password" placeholder="Ingrese contraseña" />
            </div>
            <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input class="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                    <label class="custom-control-label" for="rememberPasswordCheck">Recordar contraseña</label>
                </div>
            </div>
            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                <a class="small" href="logRetrieve">Olvidó su clave?</a>
                <!-- <a class="btn btn-primary" href="#" onclick="iniciar()">Ingresar</a> -->
                <button type="submit" class="btn btn-primary ">Ingresar</button>
            </div>
          </form>
        </div>
        <?php //bitac:
          $url = saca_dominio( $_SERVER["SERVER_NAME"]);          
          if (substr($url, 0, 7)!=='galeria') echo '
            <div class="card-footer text-center small">
              <a href="register">No tiene cuenta? <b> Regístrese</b> </a>
            </div>';
        ?>
          <div id="alert1" class="alert alert-primary d-none" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true"onclick="closeAlert()">&times;</span></button>
            <strong>Mensaje: </strong> <span id="mensaje">Acceso correcto</span>
          </div>
      </div>
    </div>
  </div>
</div>

<!-- <div id="liveAlertPlaceholder"></div> -->




<!--         <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">            
          <div class="alert fade_success .fade"> <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> <strong>success!</strong> </div>

          <div class="alert fade_warning .fade"> <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> <strong>warning!</strong> </div>
        </div>
 -->

                </main>
            </div>
            <!-- 
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; VC 2021</div>
                            <div>
                                <a href="#">Política de privacidad</a>
                                &middot;
                                <a href="#">Terms &amp; Condiciones</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
             -->
        </div>        
        <script type="text/javascript">
          var form
          if (document.querySelector("form")) {
            form = document.querySelector("form");
            form.onsubmit = function(e){
             e.preventDefault();    
             iniciar();
            }
          }
        </script>
        <script src="<?=media(); ?>/js/sign.js"></script>
