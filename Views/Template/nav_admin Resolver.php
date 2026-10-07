<?php 
  $appId = (isset($_SESSION['app']))? intval($_SESSION['app']) :0;
  $logo ="logouniversal.png"; 
  if ($_SERVER['SERVER_NAME']=='www.galeriaquivincha.com.ar') $logo='logo_q.png';
  if ($_SERVER['SERVER_NAME']=='www.villacelina.com.ar') $logo='logo_cel.png';
  $farray = [$logo,
    "logo_hm.png",
    "logo_klk.png",
    "log_gpt.png", 
    "logo_pos.png", 
    "logo_gal.png", 
    "logo_iuri.png", 
    "logo_test.png", 
    'logo_sco.png',
    'logo_taller.jpg',
    'logo_gcomercial.png'
  ];
  if ($appId>0)$logo = $farray[$appId-1];

  if (isset($_SESSION['app'])) {
    if (isset($_SESSION['logo'])&&$_SESSION['logo']!=='') $logo=$_SESSION['logo'];
  }
  function sesion1(){
    $usrName='';
    if (isset($_SESSION["username"])) $usrName = $_SESSION["username"]; 
    $sesion =''; 
    if ($usrName=='') { 
      $registro =($_SERVER['SERVER_NAME']=='www.galeriaquivincha.com.ar')?'':
      '<a href="'.base_url().'register"><button class="btn btn-outline-success" type="submit">Crear cuenta</button></a>';
      $sesion = '
        <a href="'.base_url().'login"><button class="btn btn-outline-success" type="submit">Iniciar sesión</button></a>'.$registro;
    }
    return $sesion;
  }




  function sesion($sesion, $app)  {
    $url = saca_dominio( $_SERVER["SERVER_NAME"]);
    $dropApps=(substr($url, 0, 7)=='galeria'||substr($url, 0, 7)=='villace')
    ? '': dropItem('myapps', '','Mis Aplicaciones');
    return'
    <ul class="app-nav">
      <li class="nav-item dropdown" >
        '.$sesion.'
        <ul class="dropdown-menu" aria-labelledby="navDropUsr">'
          .dropItem('misdatos', '','Mis datos')
          .$dropApps
          .'<li><hr class="dropdown-divider"></li>'
          .dropItem('logout', '','Salir').'                  
        </ul>
      </li>
    </ul>';//.$app;
  }

  function cuentas($disabled){
    return'
    <li class="nav-item dropdown" >
      <a class="nav-link dropdown-toggle" href="#" id="navDropCuentas" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Cuentas</a>
      <ul class="dropdown-menu" aria-labelledby="navDropCuentas">'
        .dropItem('cpacos', 'onclick="setAcc(1)"','Por cobrar')
        .dropItem('cpacos', 'onclick="setAcc(2)"','Por pagar').'
        <li><hr class="dropdown-divider"></li>'
        .dropItem('datos', 'onclick="setDTp(2)"','Bancos').'
      </ul>
    </li>';
  }

  function navItem($control, $event, $caption, $disabled){
    $valRet = ($disabled=='invisible')?'':'
      <li class="nav-item" > 
        <a class="nav-link '.$disabled.'" aria-current="page" 
        href="'.base_url().$control.'" '.$event.'">'. $caption.'
      </a></li>';  
      return $valRet;}

  function dropItem($control, $event, $caption){
    return ($control==='separador')?'<li><hr class="dropdown-divider"></li>'
    :' <li><a class="dropdown-item" 
        href="'.base_url().$control.'" '.$event.'">'.$caption.'
      </a></li>';
    }

  function menu_datos($datos, $admin, $disabled ){
    $mdatos = '<li class="nav-item dropdown" >
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
    foreach ($datos as list($control, $event, $caption)) 
      $mdatos .= dropItem($control, $event, $caption);    
    return $mdatos.'</a></li>'.$admin.' </ul>  </li>';
  }

  function navApp($app) {        
    $usrName=''; $usrId ='';
    if (isset($_SESSION["username"])) $usrName = $_SESSION["username"]; 
    if (isset($_SESSION["userid"])) $usrId = $_SESSION["userid"]; 
    //$nombreEmpresa=(isset($_SESSION["companyname"]))? $_SESSION["companyname"]:'';
    $coId=(isset($_SESSION['idcompany']))?$_SESSION['idcompany']:0;
    $disabled = ($usrId=='')? 'disabled':'active';
    $sesion =''; $perfil='';  $color=''; $admin='';
    if ($usrName!=='') { 
    $color=' style="color: blue;"';
      $sesion='<a class="nav-link dropdown-toggle" href="#" id="navDropUsr" role="button" data-bs-toggle="dropdown" 
      aria-expanded="false"><i class="fa fa-user fa-lg" aria-hidden="true"></i> '.$usrName.'</a>';
    }

    //$sesion.=$app.': '.$coId;
    if ($usrId==-1)$admin ='<li><a class="dropdown-item" href="'.base_url().'admin">Admin</a></li>';

  switch ($app) {
    case 0: case 1:
      $menuDatos ='
      <li class="nav-item dropdown" >
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
            //.dropItem('usuarios', '','Usuarios')
            .dropItem('datos', 'onclick="setDTp(1)"','Marcas')
            .dropItem('datos', 'onclick="setDTp(3)"','Categorías')
            .'<li><hr class="dropdown-divider"></li>'
            //.dropItem('inventory', '','Inventario')
            .'</a></li>'.$admin.'
          </ul>
      </li>';
      $revista =  ($_SERVER['SERVER_NAME']=='celinavive.com.ar')?'Revista':'Blog';
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        //.navItem('negocios', '','Mis negocios','active')
        .navItem('info', '','Info','active')
        .navItem('micuenta', '','Mi cuenta','active')
        //.navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
        //.$menuDatos
        .navItem('blog', '',$revista,'active')
        .'</ul>'
        .sesion($sesion,$app);
      //if ($_SERVER['SERVER_NAME']=='galeriaquivincha.com.ar');
      //$url=explode('/',$url);//partir por diagonales
      //$url=array_pop($url);//extraer ultima palabra
      //$url=explode('.',$url);//partir palabra por .
      //return sesion($sesion,$app).$app;
    break;
    case 2: case 6://hm
      $datos = array(
        array('usuarios', '','Usuarios'),
        array('companies', '','Mis Propiedades'),
        array('separador', '', ''),
        array('inventory', '','Inventario')
      );
      
      $menuDatos ='
      <li class="nav-item dropdown" >
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
            .dropItem('usuarios', '','Usuarios')
            .dropItem('companies', '','Mis propiedades').'
            <li><hr class="dropdown-divider"></li>'
            .dropItem('inventory', '','Inventario').'
            </a></li>'.$admin.'
          </ul>
      </li>';
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(5)"','Inquilinos',$disabled)
        .navItem('ufs', '','Unidades alquilables',$disabled)
        .navItem('h_contracts', '','Contratos',$disabled)
        .menu_datos($datos, $admin, $disabled)
        .cuentas($disabled)
        .'</ul>'
        .sesion($sesion,$app);
    break;
    case 3: //klk
      $datos = array(
        array('datos', 'onclick="setDTp(4)"','Especialidades'),
        array('products', '','Productos y servicios'),
        array('separador', '', ''),
        array('usuarios', '','Usuarios'),
        array('companies', '','Mis Empresas')   );
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(3)"','Pacientes',$disabled)
        .navItem('clprpames', 'onclick="setXslt(4)"','Médicos',$disabled)
        .navItem('k_turnos', '','Turnos',$disabled)
        .navItem('k_consultation', '','Consultas',$disabled)
        .menu_datos($datos, $admin, $disabled)
        .cuentas($disabled)
        .navItem('help','','Ayuda',$disabled).'
        </ul>'
        .sesion($sesion,$app);
    break;    
    case 4: //geprotex
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
        
        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('g_production', 'onclick="setLS(1)"','Producción',$disabled)
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
          .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
          .'<li class="nav-item dropdown" >
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Productos</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
                .dropItem('products', 'onclick="LSprod_source(1)"','Productos')
                .dropItem('products', 'onclick="LSprod_source(2)"','Servicios')
                .dropItem('products', 'onclick="LSprod_source(3)"','Insumos')
              .'</a></li>'.$admin.'
              </ul>
          </li>'
          
          .'<li class="nav-item dropdown" >
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
                .dropItem('datos', 'onclick="setDTp(1)"','Marcas')
                .dropItem('datos', 'onclick="setDTp(3)"','Categorías')
                .dropItem('usuarios', '','Usuarios')
                .dropItem('inventory', '','Inventario')
                .$empresas
              .'</a></li>'.$admin.'
              </ul>
          </li>'
          .cuentas($disabled).'           
          </ul>'
          .sesion($sesion,$app);      
    break;
    case 5: //POS
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
        $datos = array(
          array('datos', 'onclick="setDTp(1)"','Marcas'),
          array('datos', 'onclick="setDTp(3)"','Categorías'),
          array('separador', '', ''),
          array('usuarios', '','Inventario')
        );
        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
          .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
          .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
          .menu_datos($datos, $admin, $disabled)
          .cuentas($disabled).'           
          </ul>'
        .sesion($sesion,$app);
    break;    
    case 7: //iuri
      return '
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
          .navItem('casos', '','Casos',$disabled)
          .$admin.'
        </ul>'
      .sesion($sesion,$app);
    break; 
    case 9: //SCOLA
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Escuelas');
        $datos = array(

          array('separador', '', ''),
          array('usuarios', '','Usuarios'),
          array('inventory', '','Inventario'),
          array('companies', '','Mis escuelas')
        );
        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(8)"','Alumnos',$disabled)
          .navItem('clprpames', 'onclick="setXslt(9)"','Maestros',$disabled)
          .navItem('clprpames', 'onclick="setXslt(10)"','Familiares',$disabled)
          .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
          .menu_datos($datos, $admin, $disabled)
          .cuentas($disabled).'
          </ul>'
        .sesion($sesion,$app);
    break;    

    case 10: //Taller
      //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
      $url = saca_dominio( $_SERVER["SERVER_NAME"]);
      $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
      
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
        .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
        .navItem('orden', '','Ordenes de reparación',$disabled)
        .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
        .'<li class="nav-item dropdown" >
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
              .dropItem('datos', 'onclick="setDTp(1)"','Marcas')
              .dropItem('datos', 'onclick="setDTp(3)"','Categorías')
              .dropItem('usuarios', '','Usuarios')
              .dropItem('inventory', '','Inventario')
              .$empresas
              .'</a></li>'.$admin.'
            </ul>
          </li>'
          .cuentas($disabled).'           
        </ul>'
      .sesion($sesion,$app);
    break; 
    case 11: //gcomercial
      $dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
      $url = saca_dominio( $_SERVER["SERVER_NAME"]);
      $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
        .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)

        .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
        .'<li class="nav-item dropdown" >
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Datos</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">'
              .dropItem('datos', 'onclick="setDTp(1)"','Marcas')
              .dropItem('datos', 'onclick="setDTp(3)"','Categorías')
              .dropItem('usuarios', '','Usuarios')
              .dropItem('inventory', '','Inventario')
              .$empresas
              .'</a></li>'.$admin.'
            </ul>
          </li>'
          .cuentas($disabled).'           
        </ul>'
      .sesion($sesion,$app)
      ;
    break;   

    default:
      #fff
    break;
  }
}

?>

<div>      
  <nav class="navbar navbar-expand-lg navbar-light" >
    <div class="container-fluid">
      <a class="navbar-brand" href="<?=base_url(); ?>">
        <img src="<?=media(); ?>/images/logo/<?= $logo;?>" alt="logo <?php echo time(); ?>" width ="70px;">
      </a>
      <?php   $company =  (isset($_SESSION['company']))? $_SESSION['company']:'';    ?>
      <a href="<?=$company; ?>">  <mark><?=$company ?> </mark></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"><?=
        navApp($appId); ?>
      </div>
      <!-- <?=media(); ?>/images/logo/<?= $logo;?> -->
    </div>
  </nav>

  <?php 
    if($appId<12)  echo sesion(sesion1(),$appId); 
  ?>

 </div>
