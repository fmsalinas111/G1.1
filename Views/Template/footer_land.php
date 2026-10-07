    <!-- wsp button -->
      <a href="https://api.whatsapp.com/send?phone=5491123431774&text=Hola, necesito información " class="btn-wsp" target="_blank">
          <i class="fa fa-whatsapp icono"></i>
      </a>

    <!-- fin wsp button -->


<footer class="container py-5">
  <div class="row">
    <div class="col-12 col-md">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg> -->
      <img src="<?=media(); ?>/images/logo/<?=logo(1);?>" alt="logo" width="30px;">   </a>
      <small class="d-block mb-3 text-muted">&copy; 2026</small>
    </div>
<!--     <div class="col-6 col-md">
      <h5>Características</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary" href="#">Cool stuff</a></li>
        <li><a class="link-secondary" href="#">Random feature</a></li>
        <li><a class="link-secondary" href="#">Team feature</a></li>
        <li><a class="link-secondary" href="#">Stuff for developers</a></li>
        <li><a class="link-secondary" href="#">Another one</a></li>
        <li><a class="link-secondary" href="#">Last time</a></li>
      </ul>
    </div>
 -->    <div class="col-6 col-md">
      <h5>Recursos</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary" href="terms_conditions">Términos y condiciones</a></li>
        <li><a class="link-secondary" href="tips">Consejos</a></li>
        
        <?php  $faceRef = ($data['page_name']==='xm')?'xmayor.com.ar':'coli.com.ar'; ?> 
<!-- 
        <li><a class="link-secondary" href="https://www.facebook.com/<?=$faceRef;?>">Fan page</a></li>
        <li><a class="link-secondary" href="#">Blog</a></li>
 -->
      </ul>
    </div>
    <div class="col-6 col-md">
<!-- 
      <h5>Comercios</h5>
      <ul class="list-unstyled text-small">
      <?php  if ($faceRef=='xmayor.com.ar'){?> <li><a class="link-secondary" href="gcomercial">Galerías</a></li> <?php  }?> 
        <li><a class="link-secondary" href="#">Rubros</a></li>
        <li><a class="link-secondary" href="#" >Personalizaciones</a></li>
        <li><a class="link-secondary" href="#" >Aplicaciones</a></li>
      </ul>

 -->      
    </div>
    <div class="col-6 col-md">
<!-- 
      <h5>Acerca de </h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary" href="#">Nosotros</a></li>
        <li><a class="link-secondary" href="#">Trabaja con nosotros</a></li>
        <li><a class="link-secondary" href="#">Programa de afiliados</a></li>
        <li>info@<?=saca_dominio(server());?></li>
      </ul>

 -->      
    </div>
  </div>
</footer>
