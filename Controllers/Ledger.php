<?php
if (session_status() == PHP_SESSION_NONE) session_start(); 
getSanitizer();
class Ledger extends Controllers {public function __construct(){parent:: __construct();}	
	public function ledger(){
		$data['page_id']=4; 
		$data['page_name']= 'ledger';		
		$data['page_title']= 'Extracto';//clientes, pacientes, inquilinos, etc
		$data['page_tag'] 	= 'resumen  <small>'.STORE().'</small>';
		$data['page_clName'] = $_COOKIE['cliente_fullname'] ;
		$cli = intval($_COOKIE['cliente_cid'] );
		$arrResp = $this->getCC($cli);
        $data['data'] = json_encode($arrResp);    
    	$data['banks'] = json_encode($this->getBanks());    
		$this->views->getView($this, $data['page_name'], $data);
	}

		public function getCC(int $cli){ //dep($_POST);
			$intCli = intval(strClean($cli));			
			$arrData = $this->model->selCC($intCli);
			return $arrData;
		}
		
		public function getBanks(){ //dep($_POST);
			#do reCallable
			$arrData = $this->model->selBanks(2);			
			return $arrData;
		}
public function setIncome () {	// dep($_POST);
 		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(Sanitizer::cleanNumbersOnly($campos['_id']));		
		$fecha   = Sanitizer::cleanString($campos['fecha']);
		//$desc   = Sanitizer::cleanString($campos['descripcion']);
		$importe = Sanitizer::cleanNumbersOnly($campos['importe']);
		$bank = Sanitizer::cleanNumbersOnly($campos['banco']);
		$cli = intval($_COOKIE['cliente_cid'] );
		$newAux=$this->model->maxAux($fecha);
		$datosSanitizados = [ 'id' => $intId,
            'client' => $cli,     'fecha'   => $fecha,   'aux'   => $newAux,
            'bank'   => $bank,  'actype'  => 1,  'importe' =>$importe    ];
        $guardadoOk = $this->model->setIncome ($datosSanitizados);
        if ($guardadoOk ) {   
            echo json_encode(['status' => 'success', 'message' => 'Configuración guardada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos.']);
        } 
	}



//*******
}

