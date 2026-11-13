<?php 
	if (session_status() == PHP_SESSION_NONE) session_start(); 
	class H_contracts extends Controllers {		
		public function __construct(){	parent:: __construct();	}	

		public function h_contracts(){
			$data['page_id'] = 22;
			$data['page_tag'] = 'Contracts';
			$data['page_title'] = 'Contratos ';
			$data['page_name'] = 'h_contracts';
			$data['page_jquery'] = true; $data['page_datatable'] = true;
			$this->views->getView($this,"h_contracts",$data);
		}
		
		public function getContracts($inactive){
			$intInactive = intval(strClean($inactive));
			//echo 'a: '.$intInactive;
			$arrData = $this->model->selectContracts($intInactive);
			echo json_encode($arrData,JSON_UNESCAPED_UNICODE);			die();
		}


	    public function setH_contract(){ //dep($_POST);
	        $campos	 = json_decode($_POST['campos'],true);
            $intId   = intval(strClean($campos['id']));
	
	        $precio = strClean($campos['campo3']);
	        $fecIni = strClean($campos['campo4']);
	        $fecFin	= strClean($campos['campo5']);

	        $request = $this->model->updContract($intId, $precio, $fecIni, $fecFin);
	        $option = ($intId==0)?1:2;
	        echo analizeSet($request, $option);	die();
	    }



	    public function endContracts(){//	    	dep($_POST);
	        $campos	 = json_decode($_POST['campos'],true);
	        $intId   = intval(strClean($campos));

	        if ($intId==0) { //crear
	            //$request = $this->model->insertClprpame($nombre, $telefono, $direccion, $email, $ci, $notas, $intStatus, $intClType, $apellido);
	            //$option = 1;
	        }else{	            //actualizar
	            $request = $this->model->endContract($intId);
	            //$request = $this->model->releaseUnit($intId, $unit);
	            $option = 2;
	        }
	        echo analizeSet($request, $option);	die();
	    }



} ?>