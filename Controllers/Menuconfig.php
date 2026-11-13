<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Menuconfig extends Controllers {public function __construct(){parent:: __construct();}	
	public function menuconfig(){
		//$data['page_id'] = 1; 
		$data['page_name']= '_menuconfig';		
		$data['page_title']= 'menú personalizado ';//clientes, pacientes, inquilinos, etc
		$this->views->getView($this,$data['page_name'],$data);
	}


}?>