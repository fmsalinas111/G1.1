<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Gen1_1 extends Controllers {
		public function __construct(){parent:: __construct();}	
		public function gen1_1(){			
			$data['page_id'] = -3;
			$data['page_tag'] = 'Gen';
			$data['page_title'] ='Gestión de negocios';
			//$data['page_app'] = 11;
			$data['page_name'] = 'gen1_1';
			$this->views->getView($this,$data['page_name'],$data);
		}
	}
/*
	el listado de galerías son companies+bcard donde companyid=(<-1), solo las puede crear el SU
	plan 1 los usuarios pueden darse de alta como brcard y 'existir' en la galería sin cargo
	plan 2 si un usuario desea publicar una tienda virtual, deberá pagar un mínimo de mantenimiento mensual 
	el primer mes es gratuito
*/

?>
