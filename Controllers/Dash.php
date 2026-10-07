<?php 
	if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Dash extends Controllers {public function __construct(){parent:: __construct();}	

	public function dash(){
		$data['page_id']=1; 
		$data['page_name']= '_dash';		
		$data['page_title']= 'Panel General';
		//$data['page_tag'] 	= 'dash  <small>'.$_SESSION["company"].'</small>';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this, $data['page_name'], $data);
	}
	public function test(){
		$arrData = $this->model->test();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}


}?>