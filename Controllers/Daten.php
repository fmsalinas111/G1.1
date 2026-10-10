<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Daten extends Controllers { public function __construct(){parent:: __construct();}	
	private function dtypes(int $type){
		$dataTypes = [
			"1" => ["Marca", "Marcas"],
			"2"=> ["Banco","Bancos"],
			"3"=>["Categoría","Categorías"],
			"4"=>["Especialidad","Especialidades"],
			"5"=>["bussinesstype","bussinesstypes"],
			"16"=>["Color","Colores"],
		];
		if (array_key_exists($type, $dataTypes)) {
			$r = ( $dataTypes[$type]);
			$return = $r;
		} else $return = 'No existe';
		return $return;
	}

	public function daten(){
		$dttp = h($_COOKIE['dttp'],'0');
		$data['page_src']=
		'[  {"fieldId":"1","fieldName":"Brand"},
			{"fieldId":"2","fieldName":"Bank"},
			{"fieldId":"3","fieldName":"category", labels:{"s":"Categoría", "p":"Categorías"},
			{"fieldId":"4","fieldName":"Speciallity"},
			{"fieldId":"10","fieldName":"business type"} ]';

			$data['page_appmodules']=$_SESSION['modules'];
		$data['page_id'] = 16;  
		$data['page_tag'] = 'Datos';
		$data['page_title'] = $this->dtypes($dttp)[1];
		$data['page_name'] = 'daten';
		$this->views->getView($this,$data['page_name'], $data);
	}

	public function getData(int $tipo){		//dep($_POST); //fullData
		$intTipo = intval(strClean($tipo));
		$userId = isset($_SESSION['userid']) ? intval(strClean($_SESSION['userid'])) : 0;
		$arrData = ($userId == -1) ? $this->model->selDataAdm() : $this->model->selData($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function setTitle(int $tipo){
		$dataTypes = [
			"1" => ["Marca", "Marcas"],
			"2"=> ["Banco","Bancos"],
			"3"=>["Categoría","Categorías"],
			"4"=>["Especialidad","Especialidades"],
			"5"=>["bussinesstype","bussinesstypes"],
			"16"=>["Color","Colores"],
			];
			if (array_key_exists($tipo, $dataTypes)) {
				$return = $dataTypes[$tipo];
			} else $return = 'No existe';
			echo json_encode($return,JSON_UNESCAPED_UNICODE); die();
	}

	public function setDaten() {	 //dep($_POST);
 		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));		
		$name   = Sanitizer::cleanString($campos['nombre']);
		$desc   = Sanitizer::cleanString($campos['descripcion']);
		$status = Sanitizer::cleanNumbersOnly($campos['estado']);
		$dType  = intval(strClean($campos['dttp']));
		$datosSanitizados = [ 'id' => $intId,
            'nombre' => $name,     'description'   => $desc,
            'estado'   => $status,  'datatype'  => $dType,  'dad' =>0    ];
        $guardadoOk = $this->model->crudDaten($datosSanitizados);
        if ($guardadoOk ) {   
            echo json_encode(['status' => 'success', 'message' => 'Configuración guardada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos.']);
        } 
	}

	public function delDaten( $id){	
		// dep($_POST);
		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));
		$type  = intval(Sanitizer::cleanNumbersOnly($campos['dttp']));		
		# tratar  el caso de que el dato esté asociado a otros registros
		# tipo de datos que no se pueden eliminar
		# frontend: aviso de confirmación
		# backend: mensaje de error si no se puede eliminar	
		
		$request = $this->model->delData($intId, $type);
		echo analizeDel($request, $intId);  die();
	}
	

    
//************************* */
} ?>