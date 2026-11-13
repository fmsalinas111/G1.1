<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Contracts extends Controllers {
	public function __construct(){	parent:: __construct();	}	
	public function contracts(){
		$data['page_id'] = 21;
		$data['page_tag'] = 'ufs';
		$data['page_title'] = 'Contratos ';
		$data['page_name'] = 'contracts';
		$this->views->getView($this,$data['page_name'], $data);
	}
	public function getContracts(){
		$arrData = $this->model->selContracts();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function setContract() {	 //dep($_POST);
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


	public function delContract( $id){			// dep($_POST);
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
