<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Cpc extends Controllers {public function __construct(){parent:: __construct();}	
	public function cpc(){
		//$data['page_id'] = 1; 
		$data['page_name']= 'cpc';		
		$data['page_title']= 'Cuentas por ';//clientes, pacientes, inquilinos, etc
		//$data['page_tag'] 	= 'clprpames  <small>'.STORE().'</small>';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'],$data);
	}


}?>