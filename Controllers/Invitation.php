<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
$path = __DIR__ . '/../Helpers/Sanitizer.php';
if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
require_once $path;

class Invitation extends Controllers {
	public function __construct(){	parent:: __construct();	}	
	public function invitation(){
		$data['page_id'] = 121;
		$data['page_tag'] = 'ufs';
		$data['page_title'] = 'Invitación ';
		$data['page_name'] = 'invitation';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'], $data);
	}


} ?>
