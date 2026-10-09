<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Products extends Controllers {
	public function __construct(){	parent:: __construct();	}	
	public function products(){
	  $data['page_id'] = 2;
	  $data['page_tag'] = 'products';
	  $data['page_title'] = 'Productos y servicios ';
	  $data['page_name'] = 'products';
	  //$data['page_name'] = 'prods';
	  	if ($_SESSION['app']==3) {
			$data['page_name'] = 'product_K';
			$data['page_jquery'] = true; $data['page_datatable'] = true;
		}
		$data['page_css'] = 'products.css';
		if ($_SESSION['app']==6) {
			$data['page_name'] = 'app error'; 
			$data['content']='403';
		}
		$this->views->getView($this,$data['page_name'],$data);
	}
	public function getProducts($tipo){//product, service, supply
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selectProducts($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}
	public function getMyProducts(int $tipo){//product, service, supply
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selMyProducts($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}
	public function getMyProducts2(int $tipo){//product, service, supply
		$intTipo = intval(strClean($tipo));
		$arrResponse = $this->model->selMyProducts2($intTipo);
		foreach ($arrResponse as &$product) {// 1. Procesar imágenes
			$rawImages = explode(',', $product['images']);
			$product['images'] = array_map(function($img) {
				$img = trim($img);// Verificar si es una URL externa (empieza con http:// o https://)
				if (filter_var($img, FILTER_VALIDATE_URL)) return $img;
				// Si no es externa, agregar la ruta local
				return base_url().'Assets/images/uploads/' . $img;
			}, $rawImages);
			// 2. Procesar specs
			//$product['specs'] = array_map('trim', explode(',', $product['specs']));
		}
		unset($product); // Romper la referencia del último elemento
		echo json_encode ($arrResponse); die();
	}
	public function setProduct2() { //dep($_POST);
		// 1. Ver qué datos de texto llegaron
		$campos	 = json_decode($_POST['campos'],true);
		$prid 	= filter_var($campos['productoId'], FILTER_VALIDATE_INT);
		//echo $prid;
		$nombre = strClean($campos['prodNombre']); 
		$sku 	= strClean($campos['prodSku']); 
		$categ 	= strClean($campos['prodCategoria']); 
		$price  = strClean($campos['prodPrecioLista']);
		$factor  = intval(h($campos['prodCurva'],0));
		$inv = intval(h($campos['prodVisibleWeb'],0));
		$invisible = ($inv == 0) ? 1 : 0;
		$activo = intval(h($campos['prodActivo'], 1));
		//$descrip = strClean($campos['campo2']); 
		//$factor = (strClean($['campo12'])==='')?1:intval(strClean($campos['campo12']));
		//$baco = strClean(h($campos['campo14']));
		//$bline = strClean(h($campos['campo11']));
		/*
			$proveedor =  intval(h($campos['campo8']));
			$insumo    = intval(strClean(h($campos['campo9'])));
			$request=$this->model->ins_updProduct($intId, $nombre, $descrip, $precio, $estado, $doc_marca, $espec_categ, $factor, $proveedor, $insumo, $imageName, $bline, $art, $baco);
*/
		$fotosConservadas = $_POST['existentes'] ?? []; 
		if ($prid>0) {// si se está editando
			$fotosAnterioresBD = $this->model->selImageProd($prid); 
			$emptyImgField = strlen($fotosAnterioresBD['imagename'])==0;
			if (!$emptyImgField){
				// 3. BORRAR DEL DISCO LAS FOTOS ELIMINADAS
				// Comparamos las que había en la BD contra las que el usuario decidió conservar
				foreach ($fotosAnterioresBD as $fotoAntigua) {
					if (!in_array($fotoAntigua, $fotosConservadas)) {
						$rutaFisica = "./Assets/images/uploads/". $fotoAntigua;
						if (file_exists($rutaFisica)) unlink($rutaFisica);
					}
				}
			}
		}
		$imgs = [];
		// 2. Ver las imágenes recibidas
		if (isset($_FILES['imagenes_nuevas'])) {
			$fotosNuevas = $_FILES['imagenes_nuevas'];			
			for ($i = 0; $i < count($fotosNuevas['name']); $i++) {
				$tmpName  = $fotosNuevas['tmp_name'][$i];
				$error    = $fotosNuevas['error'][$i];
				$fileSize = $fotosNuevas['size'][$i];
				if ($error === UPLOAD_ERR_OK) {
					$nombreArchivo = time() . '_' . $i . '.webp'; // Generar nombre único 
					$destino = "./Assets/images/uploads/" . $nombreArchivo; // ruta de uploads
					move_uploaded_file($tmpName, $destino);
					$imgs[] = $nombreArchivo;
				}
			}
		}
		$galeriaFinal = array_merge($fotosConservadas, $imgs);
		$imgs = implode(", ", $galeriaFinal);
		$request=$this->model->crudProduct($prid, $nombre, $sku, $categ, $price, $factor, $imgs,
					$activo, $invisible);
		$option = ($prid==0)?1:2;
		//echo json_encode(['status' => 'success', 'message' => 'Producto e imágenes guardados correctamente', 'imgs'=>$imgs2]);
		echo analizeSet($request, $option);	die();	    
	}
    public function setProduct(){  //dep($_POST); dep($_FILES['imagenes_nuevas']);
        $campos	 = json_decode($_POST['campos'],true);
        if (strClean($campos['id'])==='m') { //multi
        	$clave = intval(strClean($campos['campo1']));
        	$valor = strClean($campos['campo2']);
        	$categ = intval(strClean($campos['campo6'])); 
        	$prids = strClean($campos['campo3']); 
        	$bline = strClean($campos['campo11']);
			$request=$this->model->updProdMulti($clave, $valor, $prids, $categ, $bline);
        	$option=2; 
        }else{
	        $intId   = intval(strClean($campos['id']));
        	//ver en el caso textil cat debe ser campo6
			$nombre  = strClean($campos['campo1']); 
			$descrip = strClean($campos['campo2']); 
			$precio  = strClean($campos['campo3']);
			$estado  = strClean(h($campos['campo4']),1);
			//echo $estado;
			//para el caso klk las sigtes dos filas
			$doc_marca   = intval(strClean(h($campos['campo5']))); 
			$espec_categ = intval(strClean(h($campos['campo7'])));
			//
			$proveedor =  intval(h($campos['campo8']));
			$insumo    = intval(strClean(h($campos['campo9'])));
			$imageName = strClean(h($campos['campo10']));
			$bline = strClean(h($campos['campo11']));
			$factor = (strClean($campos['campo12'])==='')?1:intval(strClean($campos['campo12']));
			$art = strClean(h($campos['campo13']));
			$baco = strClean(h($campos['campo14']));
			$request=$this->model->ins_updProduct($intId, $nombre, $descrip, $precio, $estado, $doc_marca, $espec_categ, $factor, $proveedor, $insumo, $imageName, $bline, $art, $baco);
			$option = ($intId==0)?1:2;
		}
		echo analizeSet($request, $option);	die();	    
	}
    public function setImage(){  //dep($_POST);
        $campos=(json_decode($_POST['campos'],true));
        $intId 	= isset($_POST['id']) ? intval($_POST['id']) : 0;
		$imageName 	= isset($_POST['imgName']) ? strClean($_POST['imgName']) : '';
        $imageName = strClean($campos['campo10']);
		$request = $this->model->updateImage($intId, $imageName); $option = 2;
		echo analizeSet($request, $option);	die();	    
	}
	public function toggle(){		//dep($_POST);
        $campos=(json_decode($_POST['campos'],true));		
        $intId 	 = intval(strClean($campos['id']));
		$newValue = intval(strClean($campos['campo1']));
		$arg = strClean($campos['campo2']);
		$request = $this->model->updTogle($intId, $newValue, $arg);	$option = 2;
		echo analizeSet($request, $option);	die();	    
	}
	public function setConfig(){ //dep($_POST);
        $campos	= (json_decode($_POST['campos'],true));
        $factor = strClean(h($campos['campo1']));
        $marca  = strClean($campos['campo2']);
        $categ 	= strClean($campos['campo3']);
        $prov 	= strClean($campos['campo4']);
        $con_img= strClean(h($campos['campo5'],0));
		$imgLay = strClean($campos['campo6']);
        $request= $this->model->setConfig($factor.$marca.$categ.$prov.$con_img.$imgLay); $option=2;
        echo analizeSet($request, $option);	die();
	}
	public function delProduct(){		//dep($_POST);
		if($_POST){
	        $intId = intval($_POST['id']);
	        $request = $this->model->deleteProduct($intId);
	        if($request == 'ok'){
	            $arrResponse = array('status' => true,'msg'=>'Registro eliminado');
	        }else if($request == 'exist'){
	            $arrResponse = array('status' => false,'msg'=>'No es posible eliminar.');
	        }else {
	            $arrResponse = array('status' => false,'msg'=>'Error al eliminar');
	        } 
	        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
	    } 
	    die();
	} 

	public function delProduct2(int $id){ //dep($_POST);
		$intId = intval(strClean($id));
		$request = $this->model->deleteProduct($intId);
		echo $request;
		if($request == 'ok'){
			$arrResponse = array('status' => true,'msg'=>'Registro eliminado');
		}else if($request == 'exist'){
			$arrResponse = array('status' => false,'msg'=>'No es posible eliminar.');
		}else {
			$arrResponse = array('status' => false,'msg'=>'Error al eliminar');
		} 
		echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
	    die();
	} 


	public function setProductK(){   //dep($_POST);
        $campos	 = json_decode($_POST['campos'],true);
        $intId   = intval(strClean($campos['id']));
		$nombre  = strClean($campos['campo1']); 
		$descrip = strClean($campos['campo2']); 
		$precio  = strClean($campos['campo3']);
		$estado  = intval(strClean($campos['campo4']));
		//para el caso klk las sigtes dos filas
		$doc_marca =   intval(strClean(h($campos['campo5']))); 
		$espec_categ = intval(strClean(h($campos['campo6']))); 
		//
		$factor = ($_SESSION['app']==13)?1:intval(strClean(h($campos['campo7'])));
		$proveedor =  intval(h($campos['campo8']));
		$insumo  = intval(strClean(h($campos['campo9'])));
		$imageName = strClean(h($campos['campo10']));
		$bline = strClean(h($campos['campo11']));
		$request=$this->model->ins_updProduct($intId, $nombre, $descrip, $precio, $estado, $doc_marca, $espec_categ, $factor, $proveedor, $insumo, $imageName, $bline);
		$option = ($intId==0)?1:2;
		echo analizeSet($request, $option);	die();	    
	}
}?>
