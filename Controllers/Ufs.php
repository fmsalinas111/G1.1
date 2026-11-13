<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Ufs extends Controllers {
	public function __construct(){	parent:: __construct();	}	
	public function ufs(){
		$data['page_id'] = 21;
		$data['page_tag'] = 'ufs';
		$data['page_title'] = 'Activos ';
		$data['page_name'] = 'ufs';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'], $data);
	}
	public function getUfs(){
		$arrData = $this->model->selectUfs();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function setUf() {	 //dep($_POST);
 		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));		
		$name   = Sanitizer::cleanString($campos['nombre']);
		$desc   = Sanitizer::cleanString($campos['descripcion']);
		$status = Sanitizer::cleanNumbersOnly($campos['estado']);
		$price = intval(Sanitizer::cleanNumbersOnly($campos['precio']));
		$tenant  = Sanitizer::cleanNumbersOnly($campos['tenant']);
		$datosSanitizados = [ 'id' => $intId,
            'nombre' => $name,     'description'   => $desc, 'price' => $price,
            'tenant' => $tenant,  'estado'   => $status,    'dad' =>0    ];
        $guardadoOk = $this->model->crudUf($datosSanitizados);
        if ($guardadoOk ) {   
            echo json_encode(['status' => 'success', 'message' => 'Configuración guardada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos.']);
        } 
	}

	public function setUfs(){
		$campos	 = json_decode($_POST['campos'],true);
		$intId   = intval(strClean($campos['id']));
		
		$fecha 	 = strClean($campos['campo1']);  		$importe = strClean($campos['campo2']); 
		$tenant  = intval(strClean($campos['campo3']));	$uf 	 = intval($campos['campo4']);
		//paso1	        
		$request = $this->model->insertContract($fecha,$importe,$tenant,$uf);
		//paso 2:  genera deuda. ms_sales
		//momentaneamente suprimir la primer deuda
		/*
		$intAux=(new DateTime("1899-12-30"))->diff(new DateTime($strCampo1))->days;
		$max_aux = $this->model->maxAux($intAux);
		$newAux = $max_aux['newAux']!=null? $max_aux['newAux']: $intAux ;

		$request = $this->model->insertPrimeraDeuda($strCampo1, $strCampo2, $strCampo3, $strCampo4, $newAux);
		*/
		//paso 3 - editar uf.tenant
		if ($request>0) $request=$this->model->updateUfTenant($uf, $tenant);
		echo analizeSet($request, 2);	die();	    

	}

	public function setContract(){
		//dep($_POST);
		// 1.- Add contract     2.- Agregar primera deuda     3.- Editar uf.tenantid 
		$campos	 = json_decode($_POST['campos'],true);
		$intId   = intval(strClean($campos['id']));
		
		$fecha 	 = strClean($campos['campo1']);  		$importe = strClean($campos['campo2']); 
		$tenant  = intval(strClean($campos['campo3']));	$uf 	 = intval($campos['campo4']);
		//paso1	        
		$request = $this->model->insertContract($fecha,$importe,$tenant,$uf);
		//paso 2:  genera deuda. ms_sales
		//momentaneamente suprimir la primer deuda
		/*
		$intAux=(new DateTime("1899-12-30"))->diff(new DateTime($strCampo1))->days;
		$max_aux = $this->model->maxAux($intAux);
		$newAux = $max_aux['newAux']!=null? $max_aux['newAux']: $intAux ;

		$request = $this->model->insertPrimeraDeuda($strCampo1, $strCampo2, $strCampo3, $strCampo4, $newAux);
		*/
		//paso 3 - editar uf.tenant
		if ($request>0) $request=$this->model->updateUfTenant($uf, $tenant);
		echo analizeSet($request, 2);	die();	    

	}		


	public function delUf( $id){			// dep($_POST);
		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));
		//$type  = intval(Sanitizer::cleanNumbersOnly($campos['dttp']));		
		# tratar  el caso de que el dato esté asociado a otros registros
		# tipo de datos que no se pueden eliminar
		# frontend: aviso de confirmación
		# backend: mensaje de error si no se puede eliminar	
		# tal vez no se deba eliminar si existe en ms_contracts
		//$existe = $this->model->existe("ms_products", "categoryid",  $intId);
		$request = $this->model->delData($intId, $type, $existe);
		echo analizeDel($request, $intId);  die();
	}


} ?>
