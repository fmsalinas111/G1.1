<?php 	if (session_status() == PHP_SESSION_NONE) session_start(); 
class Prods extends Controllers {
	public function __construct(){parent:: __construct();}	
	public function prods(){
		$data['page_name'] 	= 'prods';
		$data['page_title'] = 'Productos';
		$this->views->getView($this,$data['page_name'], $data);
	}
/*
    public function getProducts(int $id){//product, service, supply
		$intCo = intval(strClean($id));
		$arrData = $this->model->selProducts($intCo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}
*/
}?>