<?php 
	if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Ecommerce extends Controllers {
	public function __construct(){ parent:: __construct(); }	

	public function getProducts(int $iCo){
		$int_iCo = intval(strClean($iCo));
		$arrResponse = $this->model->selectProducts($int_iCo);			
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE); die();
	}

	public function getProducts5(int $iCo){
		$iCo = intval(strClean($iCo));
		$pl = isset($_POST['src']) ? intval($_POST['src']) : 0;
		echo json_encode ($this->model->selectProducts5($iCo, $pl));die();
	}
	
	
	public function getStores(){
		echo json_encode ($this->model->selStores());
		die();
	}

	public function getProducts6(int $iCo){
		$iCo = intval(strClean($iCo));
		$pl = isset($_POST['src']) ? intval($_POST['src']) : 0; //price list
		$arrResponse = $this->model->selectProducts6($iCo, $pl);
		foreach ($arrResponse as &$product) {
			// 1. Procesar imágenes
			$rawImages = explode(',', $product['images']);
			$product['images'] = array_map(function($img) {
				$img = trim($img);
				// Verificar si es una URL externa (empieza con http:// o https://)
				if (filter_var($img, FILTER_VALIDATE_URL)) return $img;
				// Si no es externa, agregar la ruta local
				return base_url().'Assets/images/uploads/' . $img;
			}, $rawImages);
			// 2. Procesar specs
			$product['specs'] = array_map('trim', explode(',', $product['specs']));
		}
		unset($product); // Romper la referencia del último elemento
		echo json_encode ($arrResponse); die();
	}

	public function getProducTEX(int $iCo){
		$iCo = intval(strClean($iCo));
		$pl = isset($_POST['src']) ? intval($_POST['src']) : 0;
		echo json_encode ($this->model->selProducTEX($iCo, $pl));die();
	}

	public function getCategory(int $iCo){
		$int_iCo = intval(strClean($iCo));
		$arrData = $this->model->selectCategory($int_iCo);			
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}

	public function getPagedetails(int $bId){
		$code    = '';//strClean($_POST['code']);
		$int_bId = intval(strClean($bId));
		$arrData = $this->model->selectPagedetails($int_bId, $code);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
	}

	public function getTicket(int $salesid){
		$arrData = $this->model->selTicket($salesid);			
		$_SESSION['pdfJson'] = json_encode($arrData, JSON_UNESCAPED_UNICODE);
		$clData =  $this->model->selTicketClient($salesid);
		$_SESSION['pdfClient'] = json_encode($clData, JSON_UNESCAPED_UNICODE);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();

	}



	public function setEcommerce(){
		//dep($_POST);
        $intId 	= isset($_POST['id']) ? intval($_POST['id']) : 0;
        $texto = strClean($_POST['campo1']).'|'
        .strClean($_POST['campo2'],true).'|'
        .strClean($_POST['campo3']).'|'
        .strClean($_POST['campo4']).'|'
        .strClean($_POST['campo5']).'|'
        .strClean($_POST['campo6']).'|'
        .strClean($_POST['campo7']).'|'
        .strClean($_POST['campo8']).'|'
        .strClean($_POST['campo9']).'|'
        .strClean($_POST['campo10']);
        $code = strClean($_POST['campo11']);
        $bcardid=isset($_POST['campo12'])?intval($_POST['campo12']):0;
        $request = $this->model->setPagedetails($intId, $texto, $bcardid, $code);
        //$option = ($request==1)?2:1;
        $option=2;
        echo analizeSet($request, $option);	die();
	}

	public function setAlturaImagen(){
		//dep($_POST);
        $intId 	= isset($_POST['id']) ? intval($_POST['id']) : 0;
        $altura = strClean($_POST['campo1']);
        $code = strClean($_POST['campo11']);
        $bcardid=isset($_POST['campo12'])?intval($_POST['campo12']):0;
        echo "altura:".$altura;
        exit();
        $request = $this->model->setAlturaImagen($intId, $bcardid, $code);
        $option=2;
        echo analizeSet($request, $option);	die();
	}

	public function setSections(){
        $campos	   = (json_decode($_POST['campos'],true));
        $intId      = intval(strClean($campos['id']));
        
        $t_Virtual = strClean($campos['campo1']);
        $nosotros  = strClean($campos['campo2']);
        $info1	   = strClean($campos['campo3']);
        $info2	   = strClean($campos['campo4']);
        $showBuy   = strClean($campos['campo5']);
        $instagram = strClean($campos['campo6']);

        $request   = $this->model->setSections($intId, $t_Virtual.$nosotros.$info1.$info2.$showBuy.$instagram); $option=2;
        echo analizeSet($request, $option);	die();
	}

	public function getCarousel(int $iCo){
		$int_iCo = intval(strClean($iCo));
		$arrData = $this->model->selectCarousel($int_iCo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
		die();
	}
	public function setBanner(){
		//dep($_POST);
        $campos=(json_decode($_POST['campos'],true));
        $intId 	= isset($_POST['id']) ? intval($_POST['id']) : 0;
        $burl = strClean($campos['campo1']);
        $outst = intval(strClean($campos['campo3']));
        $target = strClean($campos['campo2']);
        $target = '';//strClean($_POST['campo3']);        
        $request = $this->model->setBanner($intId, $burl, $outst, $target);
    	$option = ($intId==0)?1:2;
		echo analizeSet($request, $option);	die();	    
	}
		
	public function getProductsBy(int $prodType){//product, service, supply
		$Prod = intval(strClean($prodType));
		//$arrData = $this->model->selectProducts($ProdType);
		//echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
		echo 'mostrar info de'.$Prod;
		die();
	}	

} ?>