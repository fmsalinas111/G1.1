<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Alquilando extends Controllers {
	public function __construct(){parent:: __construct();}	
	public function alquilando(){
		$data['page_tag']    = 'Gestión de alquileres';
		$data['page_title']  = 'Gestión de alquileres';
		$data['hero_title']  = "<h1>Gestión de <span>Alquileres</span></h1>";
		$data['hero_title2'] = "Administración de inquilinos y propiedades";
	  	$data['page_app']    = 2;
		//$data['page_name']   = (isset($_SESSION['login'])&&$_SESSION['login'])? 'hm'
		//:'_multipage';	
		//$data['page_name'] = USR()>0? 'alquilar':'login';
		$data['page_name'] = 'alquilando';
		$this->views->getView($this,$data['page_name'], $data);
	}
	public function updtHM(){		//dep($_POST);
		if (isset ($_SESSION['app'])&& intval($_SESSION['app'])===11) 	
			 $request = $this->model->updtPass();
			
		else $request = $this->model->updtAccounts();

      $option = 1;	echo analizeSet($request, $option);	die();
	}

	public function updtRent(){		//dep($_POST);
		$campos	= (json_decode($_POST['campos'],true));
		$intId  = intval(strClean($campos['id']));
		$date   = strClean($campos['campo2']);
		$due  = strClean($campos['campo3']);  //due
		$notes	 = strClean($campos['campo9'],true);
		$amount  = strClean($campos['campo13']);	 

	  	$request = $this->model->updtRent($intId, $date, $due, $notes, $amount);

		$option = 2;	echo analizeSet($request, $option);	die();
	}


	public function availableAvg(){
		$arrData = $this->model->avaiAvg();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}




}?>