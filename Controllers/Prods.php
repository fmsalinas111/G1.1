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

	public function setProduct2() { //dep($_POST);
		// 1. Ver qué datos de texto llegaron
		$campos	 = json_decode($_POST['campos'],true);
		$prid 	= filter_var($campos['productoId'], FILTER_VALIDATE_INT);
		//echo $prid;
		$nombre = strClean($campos['prodNombre']); 
		$sku 	= strClean($campos['prodSku']); 
		$categ 	= strClean($campos['prodCategoria']); 
		$price  = intval(strClean($campos['prodPrecioLista']));
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



}?>