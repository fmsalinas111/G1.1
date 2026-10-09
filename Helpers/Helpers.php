<?php 
	function base_url(){return BASE_URL;}

	function media(){  return base_url()."Assets";  }
	function mediaBiz(){return media().'/BizPage/assets';}

	/*admin2*/
		function headerAdmin2($data=""){
			$view_header ="Views/Template/header_admin2.php"; 
			require_once ($view_header);
		}

		function footerAdmin2($data =""){
			$view_footer= "Views/Template/footer_admin2.php";
			require_once ($view_footer);
		}

	/*admin2*/


	function dark(){		echo "<style></style>";	}

	function headerAdmin($data=""){
		$view_header ="Views/Template/header_admin.php";
		require_once ($view_header);
	}

	function navAdmin($data=""){
		$view_header ="Views/Template/nav_admin.php";
		require_once ($view_header);
	}

	function CO($data=''){return h($_SESSION['idcompany'],0);}	
	function USR($data=''){return h($_SESSION['userid'],0);}
	function USRNAME($data=''){return h($_SESSION['username'],'guest');}
	function APP($data=''){return h($_SESSION['app'],0);}
	//$_SESSION['company']
	function STORE($data=''){return h($_SESSION['company'],TENANT_SLUG);}
	function APNAME($data=''){return h($_SESSION['appName'],'');}
	function firstDB($data=''){return DB_NAME[0];}
	    
	    
	function footerAdmin($data =""){
		$view_footer= "Views/Template/footer_admin.php";
		require_once ($view_footer);
	}

	function footerLand($data =""){
		$view_footer= "Views/Template/footer_land.php";
		require_once ($view_footer);
	}

	function PAGEAPP($page = ''){
		$pages = array('clprpames', 'products', 'products2', 'cpacos', 'ssale', 'buysal', 
				'inventory', 'inventory2', 'reports', 'sreports', 'datos', 'daten', '_stock', 
				'usuarios', 'misdatos', 'logout', 'login', 'dash', '_dash', 'ctacte', 'eco','mydata', 'eco6','prods');
		return (in_array($page, $pages));	
  }

	function NOINDEX($page = ''){
 		return PAGEAPP($page)?'<meta name="robots" content="noindex">':$page; 		
	}

	function headerAdminSimple($data=""){
		$view_header ="Views/Template/header_admin_simple.php";
		require_once ($view_header);
	}   
	function footerAdminSimple($data =""){
		$view_footer= "Views/Template/footer_admin_simple.php";
		require_once ($view_footer);
	}

	function getModal(string $nameModal, $data){
	   $view_modal = "Views/Template/Modals/{$nameModal}.php";       
	   require_once $view_modal;
	}

	function specJS($data){return  media()."/js/{$data['page_name']}.js";}
	function specCSS($data){
		$return = ' pp ';
		$mediafile = media()."/css/{$data}.css";
		echo (is_file($mediafile));
		echo "<a href=".$mediafile.">css</a>";
		if (file_exists($mediafile)) $return = "<link rel="."stylesheet"." type="."text/css"." href=."."'$mediafile'";
		return $return;
	}
	function analizeSet($request, $option){
		if($option<3) $_SESSION['tkn']=''; if ($option==3) $option=1;
	  	if (intval($request>0)) {
			if ($option==1)  {
				$arrResponse = array ('status'=>true, 
					'msg'=>'Datos Guardados', 'newIndex' => $request);
			}else{
				$arrResponse = array ('status'=>true,
					'msg'=>'Datos Actualizados');
			}
	  	}else if($request==-2){
		  $arrResponse = array('status' => false,'msg' =>'ya existe! ');
	  	}else $arrResponse= array("status"=> false,'msg'=>'Imposible almacenar.','req'=>$request);
	  	
	  	return json_encode($arrResponse, JSON_UNESCAPED_UNICODE);       
	}

	function analizeGet($arrData){
		$arrResponse = (empty($arrData))? array('status'=>false, 'msg'=>'Datos no encontrados.')
									 	 :array('status'=>true, 'data'=>$arrData);
		return json_encode($arrResponse,JSON_UNESCAPED_UNICODE);	}

	function analizeDel($requestDelete,$intId){
			if($requestDelete == 1){
				$arrResponse = array('status' => true,'msg'=>'Registro eliminado',
				'newIndex' => $intId);
			}else if($requestDelete == 0){
				$arrResponse=array('status' => false,'msg'=>'Imposible eliminar.');
			}else {
				$arrResponse=array('status' => false,'msg'=>'Error al eliminar');
			} 
			return json_encode($arrResponse,JSON_UNESCAPED_UNICODE);	
	}

	function dep($data){
		$format = print_r('<pre>');
		$format .= print_r($data);
		$format = print_r('</pre>');
		return $format;
	}

	function strClean($strCadena,$intMultilinea=false){
		$string = $strCadena;
		if (!$intMultilinea) {
			$string = preg_replace(['/\s+/','/^\s$/'], [' '.''], $strCadena ?? '');
			$string = trim($string); //Eimina espacio al inicio y final
			$string = stripslashes($string); //elimina las barras invertidas
		}

		$string = strip_tags($string,'<\S>'); //elimina todo
		$string = str_replace(['<', '>'], '', $string);
		$string = str_ireplace("<","",$string);      
		$string = str_ireplace("<script>","",$string);      
		$string = str_ireplace("</script>","",$string);
		$string = str_ireplace("<script src>","",$string);
		$string = str_ireplace("<script type=>","",$string);
		$string = str_ireplace("SELECT * FROM","",$string);
		$string = str_ireplace("DELETE FROM","",$string);
		$string = str_ireplace("INSERT INTO","",$string);
		$string = str_ireplace("SELECT COUNT(*) FROM","",$string);
		$string = str_ireplace("DROP TABLE","",$string);
		$string = str_ireplace("'OR '1'='1","",$string);
		$string = str_ireplace('OR "1"="1"',"",$string);
		$string = str_ireplace('OR `1`=`1`',"",$string);
		$string = str_ireplace("IS NULL; --","",$string);
		$string = str_ireplace("IS NULL; --","",$string);
		$string = str_ireplace("LIKE '","",$string);
		$string = str_ireplace("LIKE '","",$string);
		$string = str_ireplace("LIKE `","",$string);
		$string = str_ireplace("OR 'a'='a","",$string);
		$string = str_ireplace('OR" "a"="a',"",$string);
		$string = str_ireplace("OR 'a'='a","",$string);
		$string = str_ireplace("OR `a`=`a","",$string);
		$string = str_ireplace("--","",$string);
		$string = str_ireplace("^","",$string);
		$string = str_ireplace("[","",$string);
		$string = str_ireplace("]","",$string);
		$string = str_ireplace("==","",$string);
		return $string;
	}

	function passGenerator($length = 10 ){
		$pass ="";
		$longitudPass=$length;
		$cadena ="abcdefghijklmnopqrstuxyz1234567890";
		$longitudCadena=strlen($cadena);

		for($i=1; $i<=$longitudPass; $i++){
			$pos = rand(0,$longitudCadena-1);
			$pass .= substr($cadena,$pos,1);
		}
		return $pass;
	}

	//generar token para restablecer contraseñas de usuarios 
	function token(){
		$r1= bin2hex(random_bytes(10));
		$r2= bin2hex(random_bytes(10));
		$r3= bin2hex(random_bytes(10)); 
		$r4= bin2hex(random_bytes(10));
		$token =$r1.'-'.$r2.'-'.$r3.'-'.$r4;
		return $token;
	}
	
	function formatMoney($cantidad){
		$cantidad = number_format($cantidad,2,SPD,SPM);
		return $cantidad;
	}

	function cmb_constructor($cmb, $label, $cmbName, $data, $id, $col ){
		//to del
		$respuesta='';
		$respuesta = '<div class="'.$col.'">';
		//$respuesta.='<label for="">'.$label.'</label>';
		//$respuesta.= '<a href="#'.$cmb.'"  tabindex="-1" onclick="showAdd(\'crud-'.$cmb.'\',\''.$cmb.'Add\' )"> <b>+</b></a> ';
		/*$respuesta.= '<div id="crud-'.$cmb.'" style="display: none;">
	 						<input type="text" id="'.$cmb.'Add" required="" class="small">
							<button class="small" onclick="newAdd(\''.$data.'\',\''.$cmb.'Add\',\'crud-'.$cmb.'\',\'txtNew'.$cmb.'\','.$id.', \''.$cmbName.'\',\'combo_'.$cmb.'\' )">+ </button>
						</div>';
						*/
		$respuesta.= '<div id="combo_'.$cmb.'" >  </div> <br> </div> ';
		return $respuesta;
	}

	function  txtarea($divId, $txtId, $title){
		$respuesta= '<div class="col-lg-12">
						<label>'.$title.'</label><br>
						<textarea rows = "3"  style="width:100%;" id="'.$txtId.'" class="form-control fields"></textarea>
					 </div>';
		return $respuesta;                
	}


  	function saca_dominio($url, $substr=0){
  		$url=explode('/',str_replace('www.','',str_replace('http://, https//','', $url))); 
		if ($substr>0) return substr($url[0], 0, $substr);
  		return $url[0];
  	}

  	function dTable($heads='', $tableId='', $footer='', $class='row dttbl') {
  		return "
	    <div class='$class' >
	      <div class='col-md-12'>
	        <div class='tile sin-tile'>
	          <div class='tile-body'>              
	            <div class='table-responsive'>
	              <table class='table table-hover table-bordered table-striped' id='$tableId'>
	                <thead>
	                  <tr>$heads</tr>
	                </thead>
	                <tbody></tbody>
					$footer					
	              </table>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>   ";

  	}


	function h( &$var, $default = null) {
	    return isset( $var ) ? $var: $default;
	}

	function server(){return $_SERVER['SERVER_NAME'];}
	function termux(){return $_SERVER['SERVER_NAME']==="0.0.0.0";}
	function favicon(){
		switch (server()){
			case 'www.xmayor.com.ar':
				$return = './Assets/images/icons/gcomercial.ico';
				break;
			case 'www.coli.com.ar':
				$return = './Assets/images/icons/coli48.ico';
				break;
			default:
				$return='';
				break;
		}
		return $return;
	}


	function logo(int $app){
	  	$farray = ["logouniversal.png",'logo_pos.png',
		    "logo_hm.png",    "logo_klk.png",    "log_gpt.png", 
		    "logo_pos.png",   "logo_gal.png",    "logo_iuri.png", 
		    "logo_test.png",  'logo_sco.png',    'logo_taller.jpg',
		    'logo_gcomercial.png',  'logo_celinavive.png', 'logo_textil.png',
		    'logo_project.png'];
		return $farray[$app];
	}
	function logoJPG(int $app){		
	  	$farray = ["logouniversal.png",'logo_pos.png',
		    "logo_hm.png",    "logo_klk.png",    "log_gpt.png", 
		    "logo_pos.png",   "logo_gal.png",    "logo_iuri.png", 
		    "logo_test.png",  'logo_sco.png',    'logo_taller.jpg',
		    'logo_gcomercial.jpg',  'logo_celinavive.png', 'logo_textil.png',
		    'logo_project.png'];
		return $farray[$app];
	}

	function imageType($rutaArchivo) {//para el logo PDF
		// Comprobar si el archivo existe
		/* no sé por qué no funciona, :(
			echo $rutaArchivo.'<hr>';
			if (!file_exists($rutaArchivo)) {
				return "El archivo no existe.".$rutaArchivo;
			}
		*/
		// exif_imagetype devuelve el tipo de imagen o false si no es soportado
		$tipo = exif_imagetype($rutaArchivo);
		switch ($tipo) {
			case IMAGETYPE_JPEG:
				return "jpg";
			case IMAGETYPE_PNG:
				return "png";
			default:
				return "No es un formato JPG o PNG válido";
		}
	}

	function argTo2(int $arg){
		if	($arg<10||$arg===0) return [	'arg1'=>$arg,	'arg2'=>0  ];
		$div10 = $arg/10;		$a1 = intval($div10);
		$dif = $div10 - $a1;	$a2 = $dif*10;
		return ['arg1'=>$a1, 'arg2'=>$a2  ];
	}



	function obtenerNombreDominio($url) { //no lo uso !
			// 1. Detectar el servidor de dominio actual
			$host = $_SERVER['HTTP_HOST'];
			// 2. Extraer el nombre principal sin subdominios
			$partes = explode('.', $host);
			// Toma la segunda y primera palabra por el final (ej: dominio.com)
			if (count($partes) > 2) {
				$dominio_con_extension = $partes[count($partes) - 2] . '.' . $partes[count($partes) - 1];
			} else {				$dominio_con_extension = $host;			}
			// 3. Quitar la extensión del dominio (.com, .net, .com.ar, etc.)
			// Esto elimina todo después del primer punto en el nombre base
			$dominio_sin_extension = strtok($dominio_con_extension, '.');
			return $dominio_sin_extension; // Resultado: "midominio"
	}

	function dse(){		//dominio_sin_extension
		// 1. Detectar el protocolo y el servidor para armar la URL actual
		$protocolo = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		$servidor = $_SERVER['HTTP_HOST']; // Detecta el dominio del servidor actual
		$url_completa = $protocolo . $servidor;
		// 2. Extraer el host (ej. ://tuservidor.com)
		$host = parse_url($url_completa, PHP_URL_HOST);
		// 3. Limpiar subdominios y obtener el nombre base
		$partes = explode('.', $host);
		if ($partes[0] === 'www') { // Elimina 'www' si existe
			unset($partes[0]); $partes = array_values($partes);
		}
		// 4. Obtener solo el nombre del dominio (sin TLD/.com)
		$dominio_sin_extension = isset($partes[0]) ? $partes[0] : '';
		return $dominio_sin_extension; // Si el host es "://midominio.com", imprimirá "midominio"
	}

?>