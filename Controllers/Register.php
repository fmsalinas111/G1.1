<?php 
	class Register extends Controllers {public function __construct(){parent:: __construct();}	
		public function register(){
			$data['page_id']    = -4;
			$data['page_tag']   = 'Registro';
			$data['page_title'] = 'Registro';
			$data['page_name']  = 'register';
			$this->views->getView($this, "register", $data);
		}


	} ?>