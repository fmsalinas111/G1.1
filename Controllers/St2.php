<?php 
	if (session_status() == PHP_SESSION_NONE) session_start(); 
	class St2 extends Controllers {public function __construct(){parent:: __construct();}	

	public function st2(){
		$data['page_id']=11; 
		$data['page_name']= 'st2';		
		$data['page_title']= 'temp.';
	//	$data['page_tag'] 	= 'dash  <small>'.$_SESSION["company"].'</small>';
		
		$this->views->getView($this, $data['page_name'], $data);
	}
	public function test(){
		$arrData = $this->model->test();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}


}?>