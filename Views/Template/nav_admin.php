<?php 
  $appId = intval(h($_SESSION['app'],0)); 
  $farray = ["logo_pos.png",    "logo_hm.png",    "logo_klk.png",    "log_gpt.png", 
    "logo_pos.png",     "logo_pos.png",      "logo_iuri.png",     "logo_test.png", 
    'logo_sco.png',    'logo_taller.jpg',    'logo_gcomercial.png','logo_gcomercial.png', 
    'logo_textil.png', 'logo_textil.png'
  ];

  $logo = (h($_SESSION['logo'],'')!=='')? $_SESSION['logo']: $farray[$appId];
  
  function mdatos($dropTit, $data){
    $disabled=''; $divider='<li><hr class="dropdown-divider"></li>'; $c='';
    $a= "<li class='nav-item dropdown' >
          <a class='nav-link dropdown-toggle' href='#'' id='navbarDropdown' role='button'
          data-bs-toggle='dropdown' aria-expanded='false' $disabled >$dropTit</a>
          <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>";

    $drops='';
          for ($i = 0; $i < sizeof($data); ++$i){
              if ($data[$i][0]==='divider') $drops.=$divider;
              else $drops.=dropItem($data[$i][0],$data[$i][1],$data[$i][2]);
          }    

    $c.='</a></li>'   //.$admin.
          .'</ul>  </li>';
    return $a.$drops.$c;
  }

  function sesion($sesion, $app)  {
    $url = saca_dominio(server());
    $dropApps=(substr($url, 0, 7)=='galeria'||substr($url, 0, 7)=='villace')
    ? '': dropItem('myapps', '','Mis Aplicaciones'); 
    
    $appName = APNAME().' '.firstDB();//$appName=h($_SESSION['appName']);
    $rolname=(h($_SESSION['rid'])==-99)?'Admin':h($_SESSION['rolName']);
    return"
    <ul class='app-nav me-auto mb-2 mb-lg-0'>
      <li class='nav-item dropdown' >
        $sesion
        <ul class='dropdown-menu' aria-labelledby='navDropUsr'>"
          .dropItem('misdatos', '','Mis datos')
          //.$dropApps
          .'<li><hr class="dropdown-divider"></li>'
          .dropItem('','onclick="config2(); event.preventDefault();','Configurar secciones','d-none dropSection')
          .'<li><hr class="dropdown-divider d-none dropSection"></li>'
          .dropItem('logout', 'onclick="removeLS(\'iCo\')','Salir')
          ."<li class='dropdown-item' disabled>($rolname) $appName </li>
          
        </ul>      </li>    </ul>";
  }

  function cuentas($disabled){  return'
    <li class="nav-item dropdown" >
      <a class="nav-link dropdown-toggle" href="#" id="navDropCuentas" role="button" data-bs-toggle="dropdown" aria-expanded="false"'.$disabled.'>Cuentas</a>
      <ul class="dropdown-menu" aria-labelledby="navDropCuentas">'
        .dropItem('cpacos', 'onclick="setAcc(1)"','Por cobrar')
        .dropItem('cpacos', 'onclick="setAcc(2)"','Por pagar')
        .'<li><hr class="dropdown-divider"></li>'
        .dropItem('datos', 'onclick="setDTp(2)"','Bancos').'
      </ul>    </li>';
   }

  function navItem($control, $event, $caption, $disabled){
    return ($disabled=='invisible')?'':'
      <li class="nav-item"> <a class="nav-link '.$disabled.'" aria-current="page" 
        href="'.base_url().$control.'" '.$event.'">'. $caption.'      </a></li>';}

  function dropItem($control, $event, $caption, $class=''){$enlace=base_url().$control.'" '.$event;
    return '<li><a class="dropdown-item '.$class.'" href="'.$enlace.'">'.$caption.'</a></li>';}

  function navApp($app) {        
    $usrName=''; $usrId ='';
    if (isset($_SESSION["username"])) $usrName = $_SESSION["username"]; 
    if (isset($_SESSION["userid"])) $usrId = $_SESSION["userid"]; 
    //$nombreEmpresa=(isset($_SESSION["companyname"]))? $_SESSION["companyname"]:'';
    $coId=(isset($_SESSION['idcompany']))?$_SESSION['idcompany']:0;
    $disabled = ($usrId=='')? 'disabled':'active';
    $sesion =''; $perfil='';  $color=''; $admin='';
    if ($usrName=='') { 
    }else{
      $color=' style="color: blue;"';
      $sesion='<a class="nav-link dropdown-toggle" href="#" id="navDropUsr" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-user fa-lg" aria-hidden="true"></i> '.$usrName.'</a>';
    }

    //$sesion.=$app.':: '.$coId;
    if ($usrId==-1)$admin ='<li><a class="dropdown-item" href="'.base_url().'admin">Admin</a></li>';

  switch ($app) {
    case 0: 
      $data = [['datos','onclick="setDTp(1)"','Marcas'],
              ['datos','onclick="setDTp(3)"','Categorías'],['divider','',''],
              ['inventory','','Inventario']];

      return '
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          //.navItem('negocios', '','Mis negocios','active')
          .navItem('info', '','Info','active')
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes','active')
          //.navItem('micuenta', '','Mi cuenta','active')
          //.navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
          .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
          .mdatos('Datos',$data)
          .navItem('blog', '','Blog','disabled')
        .'</ul>'
        .sesion($sesion,$app);
      break;
    case 2: case 6://hm
      $data = [['usuarios','"','Usuarios'],
          ['datos','onclick="setDTp(17)"','Roles'],
          ['divider','',''],['companies','','Mis propiedades'],
          ['divider','',''],['inventory','','Inventario']   ];
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(5)"','Inquilinos',$disabled)
        .navItem('ufs', '','Unidades alquilables',$disabled)
        .navItem('h_contracts', '','Contratos',$disabled)
        .mdatos('Datos',$data)
        .cuentas($disabled)
        .'</ul>'    .sesion($sesion,$app);
    break;

    case 3: //klk
      $data = [['datos','onclick="setDTp(4)"','Especialidades'],
              ['products','onclick="LSprod_source(5)"','Productos y servicios'],['divider','',''],
              ['usuarios','','Usuarios'],['companies','','Mis empresas']];
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(3)"','Pacientes',$disabled)
          .navItem('clprpames', 'onclick="setXslt(4)"','Médicos',$disabled)
          .navItem('k_turnos', '','Turnos',$disabled)
          .navItem('k_consultation', '','Consultas',$disabled)
          .mdatos('Datos',$data)
          .cuentas($disabled)
          .navItem('help','','Ayuda',$disabled).'
        </ul>'    .sesion($sesion,$app);
    break;    
    case 4: //geprotex
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
        $data = [['datos','onclick="setDTp(1)"','Marcas'],
                ['datos','onclick="setDTp(3)"','Categorías'],
                ['divider','',''],            ['usuarios','','Usuarios'],
                ['inventory','onclick="LSprod_source(1)','Inventario productos'],
                ['inventory','onclick="LSprod_source(3)','Inventario insumos']];

        $dProd= [['products','onclick="LSprod_source(1)"','Productos'],
                 ['products','onclick="LSprod_source(2)"','Servicios'],
                 ['products','onclick="LSprod_source(3)"','Insumos']];
        
        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('g_production', 'onclick="setLS(\'prod_source\',1)"','Producción',$disabled)
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
          .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
          .mdatos('Productos',$dProd)
          .mdatos('Datos',$data)
          .cuentas($disabled)
          .'</ul>'       .sesion($sesion,$app);      
    break;
    case 5: //POS
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas=(substr($url,0,7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
        
        $data = [['datos','onclick="setDTp(1)"','Marcas'],
            ['datos','onclick="setDTp(3)"','Categorías'],
            ['datos','onclick="setDTp(21)"','Depósitos'],
            ['divider','',''], ['inventory','','Inventario'],
            ['usuarios','"','Usuarios'], 
            ['datos','onclick="setDTp(17)"','Roles'],
          ];
        
        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
            .navItem('ssale', '','Ventas',$disabled)
            .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
            .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
            .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
            .navItem('buysal', '','Reportes', $disabled)
            .mdatos('Datos',$data)          
            .cuentas($disabled).'           
          </ul>'.sesion($sesion,$app);
    break;    
    case 7: //iuri
      $data = [['usuarios','"','Usuarios'], 
               ['datos','onclick="setDTp(17)"','Roles'],
               ['products','onclick="LSprod_source(2)"','Servicios'] ];

      return '
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
          //.navItem('idossier', '','Expedientes',$disabled)
          .navItem('buysal', '','Expedientes',$disabled)
          .mdatos('Datos',$data)
          .cuentas($disabled)
          .$admin.'
        </ul>'    .sesion($sesion,$app);
    break; 
    case 9: //SCOLA
        //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
        $url = saca_dominio( $_SERVER["SERVER_NAME"]);
        $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Escuelas');
        $data = [['datos','onclick="setDTp(1)"','Marcas'],
            ['datos','onclick="setDTp(3)"','Categorías'],['divider','',''], 
            ['usuarios','','Usuarios'], ['inventory','','Inventario']];

        return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(8)"','Alumnos',$disabled)
          .navItem('clprpames', 'onclick="setXslt(9)"','Maestros',$disabled)
          //.navItem('clprpames', 'onclick="setXslt(10)"','Familiares',$disabled)
          .mdatos('Datos',$data)
          .cuentas($disabled).'           
          </ul>'        .sesion($sesion,$app);
    break;    

    case 10: //Taller
      //$dropApps=(!$app==5)?dropItem('myapps', '','Mis Aplicaciones'):'';
      $url = saca_dominio( $_SERVER["SERVER_NAME"]);
      $empresas = (substr($url, 0, 7)=='galeria')?'':dropItem('companies', '','Mis Empresas');
      $data = [['datos','onclick="setDTp(1)"','Marcas'],
            ['datos','onclick="setDTp(3)"','Categorías'],['divider','',''], 
            ['usuarios','','Usuarios'], ['inventory','','Inventario']];
      
      return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .navItem('clprpames', 'onclick="setXslt(1)"','Clientes',$disabled)
        .navItem('clprpames', 'onclick="setXslt(2)"','Proveedores',$disabled)
        .navItem('orden', '','Ordenes de reparación',$disabled)
        .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
        .mdatos('Datos',$data)
        .cuentas($disabled).'           
        </ul>'      .sesion($sesion,$app);
    break; 
    case 11:  case 1: case 12://xmayor
      $galeríasAdmin=($usrId==-1)?dropItem('companies', '','Galerías'):'';
      //$menuDatosAdmin = ($usrId==-1)?$menuDatos:'';
      $url = saca_dominio(server());
      $data=[['datos','onclick="setDTp(1)"','Marcas'],
             ['datos','onclick="setDTp(3)"','Categorías'],
             //['datos','onclick="setDTp(21)"','Depósitos'],
             ['datos','onclick="setDTp(16)"','Colores'],
             ['divider','',''],
             ['inventory','onclick="LSprod_source(1)','Inventario productos'],
             ['inventory','onclick="LSprod_source(3)','Inventario insumos'],
             ['datos','onclick="setDTp(21)"','Depósitos'],
             ['divider','',''],['usuarios','"','Usuarios'], 
             ['datos','onclick="setDTp(17)"','Roles']
           ];
      $agenda=[['clprpames','onclick="setXslt(1)"','Clientes'],
               ['clprpames','onclick="setXslt(2)"','Proveedores'],
               ['divider','',''],
               ['clprpames','onclick="setXslt(6);setAcc(2);"','Impuestos y servicios'], 
            ];
      $dProd= [['products','onclick="LSprod_source(1)"','Productos'],
               ['products','onclick="LSprod_source(2)"','Servicios'],
               ['products','onclick="LSprod_source(3)"','Insumos']];
      if($_SESSION['login']==1) return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
        .mdatos('Agenda',$agenda)
        //.navItem('products', 'onclick="LSprod_source(1)"','Productos', $disabled)
        .mdatos('Productos', $dProd)
        .navItem('buysal', '','Reportes', $disabled)
        .mdatos('Datos', $data)
        .cuentas($disabled)
        //.navItem('blog', '','Blog','disabled') ' + data + ', \' ' + row.nombre + ' \'
        .navItem('g_production', 'onclick="setLS(\'prod_source\',1)"','Producción',$disabled)
        .sesion($sesion, $app);
      else 
       return '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'.navItem('info', '','Info','active').'</ul>';
    break;   
    case 12: //celinavive
        
    break;   

    case 13: //textil
      $data = [['datos','onclick="setDTp(1)"','Marcas'],
          ['datos','onclick="setDTp(3)"','Categorías'],
          ['datos','onclick="setDTp(16)"','Colores'],
          ['divider','',''], ['inventory','','Inventario'],
          ['divider','',''], ['usuarios','"','Usuarios'], ['datos','onclick="setDTp(17)"','Roles']        ];

      return 
        '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
          .navItem('clprpames', 'onclick="setXslt(1)"','Clientes','active')
          .navItem('clprpames','onclick="setXslt(2)"','Proveedores','active')
          .navItem('pedidos_tex', 'onclick="setXslt(1)"','Pedidos','active')
          .navItem('products', 'onclick="LSprod_source(1)"','Productos',$disabled)
          //.navItem('reports', '','Reportes',$disabled)
          .navItem('buysal', '','Reportes',$disabled)
          .mdatos('Datos',$data)
          .cuentas($disabled)
        .'</ul>'
        .sesion($sesion,$app)
        /*."<div class='e-commerce' id='e-commerce'>
        <a href='#cart'><label id='qty' class='qty'>0</label>
          <i class='bi-cart' style='font-size: 2rem; color: cornflowerblue; margin-left: 5px;'></i>
        </a>      </div>
      <div id='liveAlertPlaceholder'></div> "*/
      ;
    break;   

    default:
      #fff
    break;
  }
}

?>

<div>      
  <nav class="navbar navbar-expand-lg navbar-light  bg-light" >
    <div class="container-fluid">
      <a class="navbar-brand" href="<?=base_url(); ?>">
        <img id="logo" src="<?=media(); ?>/images/logo/<?= $logo;?>" alt="logo <?php echo time(); ?>" width ="70px;">   </a>
      <?php 
        $company    =  (isset($_SESSION['company']))? $_SESSION['company']:'';
        $controller =  h($_SESSION['controller'],'');
        $gallery    =  (isset($_SESSION['app'])&&$_SESSION['app']==11)? $controller.'/':'';
        $gallery='';//porque no hace falta la ruta con controller
      ?>
      <!-- <a href="<?=$gallery.$company; ?>">  <mark id="markCo"><?=$company ?> </mark></a> -->
      <a href="<?=$_SESSION['page'];?>">  <mark id="markCo"><?=$_SESSION['page'];?> </mark></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"><?=
        navApp($appId); ?>
      </div>
      <!-- <?=media(); ?>/images/logo/<?= $logo;?> -->
    </div>
  </nav>
  
 </div>