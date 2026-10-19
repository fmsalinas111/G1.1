<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
class Terms_conditions extends Controllers {
	public function __construct(){parent:: __construct();}   
	public function terms_conditions(){
		$data['page_id'] = -1;
		$data['page_tag'] = 'Login';
		$data['page_title']= 'Login';
		$data['page_name'] = 'terms_conditions';

		$data['page_app'] = $_SESSION['app'] ;
		$this->views->getView($this,$data['page_name'],$data);
	}
}
?>