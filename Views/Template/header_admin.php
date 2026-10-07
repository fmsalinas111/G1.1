<!DOCTYPE html>
<?php 
  if (session_status() == PHP_SESSION_NONE) session_start(); 
  if ($data['page_name']==='eco6') return null;
  $exceptions = (//pueden entrar sin sesión
    $data['page_name']!=='access_token'
    &&$data['page_name']!=='receipt'
    &&$data['page_name']!=='galeria'
    &&$data['page_name']!=='gcomercial'
    &&$data['page_name']!=='gallery'
    &&$data['page_name']!=='info'
    //&&$data['page_name']!=='negocios'
    &&$data['page_name']!=='tienda'
    &&$data['page_name']!=='gpt'
    &&$data['page_name']!=='revista'
    //&&$data['page_name']!=='pedidos_tex'
    &&$data['page_name']!=='guia'
    &&$data['page_name']!=='comercios'
    &&$data['page_name']!=='blog2'

  )? true:false;

  
  if ($exceptions)if(!isset($_SESSION['login'])) header('location:'.base_url().'login');
  $logged=(isset($_SESSION['login'])&&($_SESSION['login']))?true:false;
  if ($data['page_name']=='galeria'&&!$logged&&!$data['page_tag']=='CelinaVive') $_SESSION['app'] = '1';

/*  
  $usrName=''; $usrId ='';
  if (isset($_SESSION["username"])) $usrName = $_SESSION["username"]; 
  if (isset($_SESSION["userid"])) $usrId = $_SESSION["userid"]; 
*/
  $title = "Gestionando "; $canonical='';
  $favicon='./ges.ico';
  $server=server();
  if ($server=='www.xmayor.com.ar') {
    $title ='xmayor';    //$canonical="/gcomercial/";
    $favicon='./Assets/images/icons/gcomercial.ico';}
  if ($server=='www.gestionando.com.ar')      {$title = 'Gestionando';}
  //if ($server=='www.villacelina.com.ar'){$title='Villa Celina';$canonical="/galeria/";}
  /*if ($server=='www.coli.com.ar'|| $server=='coli.com.ar'){
    $title = 'coli'; $canonical = "/coli/";
    $favicon='./Assets/images/icons/coli48.ico';
  }*/

  //$canonical="http://www.villacelina.com.ar/".$canonical;
  // <link rel="canonical" href="https://www.example.com<?=$_SERVER['REQUEST_URI']" />
  $canonical='http://'.$server.$canonical;
  //echo 'tr-'.$_SESSION['app'];
  //echo $favicon;
  //echo saca_dominio($server).'-'.$server.'-'.$_SERVER['REQUEST_URI'];
?>

<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="description" content="Sistemas de gestión en línea">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="programmer" content="Miguel Salinas">
    <meta name="theme-color" content="#009688">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php 
      //registrar el funcionamiento de referencia dinámica de canonical y favicon
      echo '<link rel="canonical" href="'.$canonical.'" />';
     ?>

    <link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>">
    
    <!-- Bootstrap CSS -->
    <script src="<?= media();?>/js/plugins/bootstrap.bundle.min.js"></script>
    <!-- <script src="<?= media();?>/js/plugins/all.min.js"></script> -->
    <script>
      //if (navigator.onLine)     cargarLibreria();
      
      function cargarLibreria() {
        // Solo carga si la librería no está ya cargada (para evitar duplicados)
        if (typeof tuLibreria === 'undefined') { // Reemplaza 'tuLibreria' con el nombre global de la librería
          const script = document.createElement('script');
          script.src = src='"https://kit.fontawesome.com/4f06fc191d.js" crossorigin="anonymous"';
          document.head.appendChild(script);
        }
      }
    </script>
    <script src="https://kit.fontawesome.com/4f06fc191d.js" crossorigin="anonymous"></script>     
    <!-- Google Fonts -->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/css.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/style.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/estilos.css">
    <?php     if (isset($data['page_css'])) {     ?>
    <!-- estilos personalizados -->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/<?= $data['page_css'];?>">
    <?php } ?>
    
    <title><?=$title; ?></title>
  
    
  </head>
  <?php require_once('nav_admin.php'); ?>
