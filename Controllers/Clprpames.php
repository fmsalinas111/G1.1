<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Clprpames extends Controllers {public function __construct(){parent:: __construct();}	
	public function clprpames(){
		$data['page_id']=1; 
		$data['page_name']= 'clprpames';		
		$data['page_title']= 'Clientes';//clientes, pacientes, inquilinos, etc
		$data['page_tag'] 	= 'clprpames  <small>'.$_SESSION["company"].'</small>';
		$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'],$data);
	}

	public function getClprpames(int $tipo){ //dep($_POST);
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selectClprpames($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}

	public function getClprpames2(int $tipo){ //dep($_POST);
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selectClprpames2($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}


	public function getSuty(int $id){ //dep($_POST);
		$Id = intval(strClean($id));
		$arrData = $this->model->selSuty($Id);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}


    public function contarClprpames(int $tipo){        //dep();
        $intTipo = intval(strClean($tipo)); 
        $arrData = $this->model->countClprpames($intTipo);
        echo json_encode($arrData,JSON_UNESCAPED_UNICODE);  die();
    }

	public function getClprpame(int $id){  dep();
		$intId = intval(strClean($id));			
		if ($intId>0) {
			$arrData = $this->model->selectClprpame($intId);
			if (empty($arrData)) {
				$arrResponse = array('status'=>false, 'msg'=>'Sin datos.');
			}else{
				$arrResponse = array('status'=>true, 'data'=>$arrData);
			}
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}
		die();
	}

    public function setClprpame(){	//dep($_POST);
    	//if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["datos"]) && isset($_POST["csrf_token"])) {
        $campos     = json_decode($_POST['campos'],true);
        if (!$this->verifyTkn(strClean($campos['tkn']))) {echo ':401<hr>'.$_SESSION['tkn'].'<hr>'.$campos['tkn']; exit();}
		
        $intId  = intval(strClean($campos['id']));
        $name   = strClean($campos['campo1']);        $lname = strClean($campos['campo2']);
        $fono   = strClean($campos['campo3']);        $ci    = strClean($campos['campo4']);
        $addr	= strClean($campos['campo5'],true);   $email = strClean($campos['campo6']);
        $notas	= strClean($campos['campo7'],true);   $iStt  = intval(strClean($campos['campo8']));
        $intIva = intval(strClean($campos['campo9']));
		$iClType = intval(strClean($campos['clType']));

        $request=$this->model->ins_updClprpame($intId, $name, $lname, $fono, $ci, $addr, $email,  $notas, $iStt, $iClType, $intIva);
        $option = ($intId==0)?1:2;
        echo analizeSet($request, $option);	die();
	    
    }

    public function setClprpame2(){	//dep($_POST);
 	   $campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));		
		$name   = Sanitizer::cleanString($campos['nombre']);
		$last   = Sanitizer::cleanString($campos['apellido']);
		$email   = Sanitizer::cleanString($campos['email']);
		$dni    = Sanitizer::cleanString($campos['documento']);
		$status = Sanitizer::cleanNumbersOnly($campos['estado']);
		$dType  = intval(strClean($campos['dttp']));
		$datosSanitizados = [ 'id' => $intId,
            'nombre' => $name,     'apellido'   => $last, 'email' => $email,
            'estado'   => $status,  'datatype'  => $dType,  'dni' =>$dni    ];
        $guardadoOk = $this->model->crudCl($datosSanitizados);
        if ($guardadoOk ) {   
            echo json_encode(['status' => 'success', 'message' => 'Configuración guardada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos.']);
        } 
    }


	public function delCl ( $id ){	
		// dep($_POST);
		$c = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($c['_id']));
		$type  = intval(Sanitizer::cleanNumbersOnly($c['cltp']));		
		# tratar  el caso de que el dato esté asociado a otros registros
		$e= ($this->model->existe('ms_sales', 'clientid', $intId));
      	print_r($e); 
		echo $e['existe'];die();


		# tipo de datos que no se pueden eliminar
		# frontend: aviso de confirmación
		# backend: mensaje de error si no se puede eliminar	
		
		$request = $this->model->delCl($intId, $type);
		echo analizeDel($request, $intId);  die();
	}
	


    public function delClprpame(){
        if($_POST){
            $intId = intval($_POST['id']);
            $requestDelete = $this->model->deleteClprpame($intId);
            if($requestDelete == 'ok'){
                $arrResponse = array('status' => true, 'msg' => 'Registro eliminado');
            }else if($requestDelete == 'exist'){
                $arrResponse = array('status' => false, 'msg' => 'No es posible eliminar: asociación comercial.');
            }else {
                $arrResponse = array('status' => false, 'msg' => 'Error al eliminar');
            } 
            echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        } 
        die();
    }	    

}?>