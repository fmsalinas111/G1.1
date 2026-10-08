<?php 
	class Logout extends Controllers {
		public function __construct(){parent:: __construct();}	
		public function logout(){
			$data['page_tag'] = 'Salir';
			$data['page_title'] = 'Salir';
			$data['page_name'] = 'logout';
			$this->views->getView($this,$data['page_name'],$data);
		}

	} 
?>