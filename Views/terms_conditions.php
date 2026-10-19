<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    
    <title>terms</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/product/">
    
     <link href="<?=mediaBiz();?>/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> 
    

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
    </style>
    
    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="<?=media(); ?>/css/_xm.css" />

  </head>
  <body>
    
<header class="site-header sticky-top py-1">
  <nav class="container d-flex flex-column flex-md-row justify-content-between">
  <a class="navbar-brand" href="<?=base_url(); ?>">
        <img src="<?=media(); ?>/images/logo/<?=logo(h($_SESSION['app'],0));?>" alt="logo" width="40px;">   </a>
        <h2 class="py-2 d-none d-md-inline-block" style="color:white;">Términos y condiciones</h2>
    <a class="py-2 d-none d-md-inline-block" href="register">Crear cuenta</a>
  </nav>
  
</header>

<main>
  <div class="container">
    <br><br>
    <h5>El presente documento constituye un contrato entre el usuario (cliente) y <?=server();?> (el sitio)</h5>
    <p class="lead mt-4">
      El sitio es un servicio que facilita al cliente la creación de una tienda virtual 
      ofreciendo un acceso libre e irrestricto, por lo tanto el sitio no garantiza el 
      contenido gráfico o textual que pueda pubicarse, así como los precios de los mismos y sobreentiende 
      que el cliente conoce las implicancias por incumplir <a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/18803/texact.htm" target = "_ blank" >la ley de marcas</a>    
    </p>
    <p class="lead mt-3">
      El sitio ofrece al cliente una dirección en internet: <b>https://</b><?=server();?>/<b>su negocio</b> para ofrecer al público
      sus productos, precios, ofertas, etc
    </p>
    <p class="lead mt-3">Así como una dirección en internet, si no desea publicar su catálogo</p>
    <p class="lead mt-3">
      <b>El sitio</b> se compromete a no enviar publicidad al cliente y solo atenderá sugerencias y soporte</p>
  </div>

</main>

<?php 
  
  footerLand($data); ?>
               
 
  <script>
    localStorage.gallery=0; localStorage.galleryName='';
  </script>      
  </body>
</html>
