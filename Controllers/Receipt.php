<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Receipt extends Controllers {		public function __construct(){parent:: __construct();}	
	public function receipt(){
		$data['page_id'] 	= 21;
		$data['page_title'] = 'Recibo';
		$data['page_name'] 	= 'receipt';
		//$data['page_tag'] 	= 'ctactes  <small>'.$_SESSION["company"].'</small>';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;

		$this->views->getView($this, $data['page_name'], $data);
	}


	public function gReceipt(int $pyd){ //dep($_POST); //analizar
		$ft     = h($_POST['ft'],'');		$intPyd = intval(strClean($pyd));			
		$arrData = $this->model->selReceipt($intPyd, $ft);		
		if (!empty($arrData) && isset($arrData['co'])) {
			require_once 'Models/M_Companies.php';    $companiesModel = new M_Companies(); 
			$coData = $companiesModel->selectBcard($arrData['co']);  
			$arrData['company_data'] = $coData;// AQUÍ SE HACE LA UNIÓN:
		} else {$arrData['company_data'] = null;} //si no hay empresa
		$concept = $this->model->selConcept($intPyd);
		//echo  count($concept);
		$arrData['concept']=$concept['concept'];
		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);  die();
	}


		public function getReceipt(int $id){
			$intId = intval(strClean($id));
			$arrData = $this->model->selReceipt($intId);
			$_SESSION['pdfJson'] = json_encode($arrData, JSON_UNESCAPED_UNICODE);
			$_SESSION['pdfArray'] = ($arrData);
			echo json_encode($arrData, JSON_UNESCAPED_UNICODE);	die();
		}		

    
	} ?>