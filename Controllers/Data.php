<?php 
		
	if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Data extends Controllers {public function __construct(){parent:: __construct();}	
	protected function sendJsonResponse($data) {
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
		return;
	}

	public function getData(int $tipo){		//dep($_POST); //fullData
		$intTipo = intval(strClean($tipo));
		$userId = isset($_SESSION['userid']) ? intval(strClean($_SESSION['userid'])) : 0;
		$arrData = ($userId == -1) ? $this->model->selectDataAdm() : $this->model->selectData($intTipo);
		#si es admin
		//$arrData = $this->model->selectDataAdm();
		//$arrData = ($_SESSION['userid']==-1)? $this->model->selectDataAdm():
		//	$this->model->selectData($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function getDataByType(int $tipo){//dep($_POST);  //to combo
		#propósito:? BUsca rubros por eso filtra por iCo=-1, pero reuso en txtil
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selDataByType($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function getFData(){//dep($_POST);
		#propósito: BUsca datos por datatype para inventario
		$arrData = $this->model->selFData();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function getDataByType_Co(int $tipo){//dep($_POST);
		$intTipo = intval(strClean($tipo));
		$arrData = $this->model->selDataByType_Co($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function getSubcat(int $dad){//dep($_POST);
		$Dad = intval(strClean($dad));
		$arrData = $this->model->selSubcat($Dad);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function getDataAdm(){
		$arrData = $this->model->selectDataAdm();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	
	/*public function getDefaults(){
		$arrData = $this->model->selDefaults();	
		$elementos = explode(',', $arrData['defaults']);
		$nArr=[];
		$nArr['bank'] = $elementos[0];
		$nArr['depo'] = $elementos[1];	
		$this->sendJsonResponse($nArr);
	}
		*/
	public function getDefaults(){  // dep($_POST);
		$ar = isset($_POST['ar'])  ? strClean($_POST['ar'])  : '';
		//verificar que $ar sea una cadena convertible a array con numeros
		$arrData = $this->model->selDefaults($ar);
		$this->sendJsonResponse($arrData);
	}		
	public function setDefaults(){  //dep($_POST);
		$campos= (json_decode($_POST['campos'],true));
		$intId = intval(strClean($campos['id']));
		$defaults= intval(strClean($campos['campo1']));

		$request = $this->model->setDefaults($intId, $defaults);
		$option  = ($intId==0)?1:2;
		echo analizeSet($request, $option);	die();
	}

	public function getDataCmb($tipo){  //dep($_POST);
		$intTipo = intval(strClean($tipo));
		$ar = isset($_POST['ar'])  ? strClean($_POST['ar'])  : '';
		if (h($_POST['src'],'p')=='p') {echo':(';exit();}
		$srcs=['arancel','client','product','productPay','staff','myapp','gallery','data'];
		$src = strClean($_POST['src']);
		if (!in_array($src, $srcs)) {echo':((';exit();}
		$cli = intval(strClean(h($_POST['cli'])));
		$arrData = $this->model->selectDataCmb($intTipo, $src, $cli, $ar);
		if($intTipo==3) $arrData = $this->buildCleanTree($arrData);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	private function buildCleanTree(array $items) {
		$map = [];    $tree = [];

		// 1. Creamos el mapa de referencias
		// Importante: No borramos 'dad' aquí aún porque lo necesitamos para el paso 2
		foreach ($items as $item) {
			$item['children'] = [];
			$map[$item['fieldId']] = $item;
		}

		// 2. Construimos la jerarquía
		foreach ($items as $item) {
			$id = $item['fieldId'];
			$parentId = $item['dad'];
			if ($parentId != 0 && isset($map[$parentId])) {
				// Añadimos la referencia del hijo al padre
				$map[$parentId]['children'][] = &$map[$id];
			} elseif ($parentId == 0 || $parentId == -1) {
				// Es un nodo raíz
				$tree[] = &$map[$id];
			}
		}
		// 3. Limpieza final: eliminamos 'dad' de todos los nodos en el mapa
		// Como $tree tiene referencias a $map, el cambio se refleja en el árbol
		//foreach ($map as &$node) {			unset($node['dad']);	}
		unset($node); // Buena práctica: romper la referencia del último elemento del foreach
		//echo json_encode($resultado, JSON_PRETTY_PRINT);
		return $tree;
	}

	public function gClient_PDF($id){  //by sid
		$iid = (strClean($id));
		$clData =  $this->model->selClientBySid(intval($iid)); 
		$_SESSION['pdfClient'] = json_encode($clData, JSON_UNESCAPED_UNICODE);
	}

	public function gReceipt_PDF($id){  //by sid
		$iid = (strClean($id));
		$letras =  (h($_POST['letras'],''));
		$receipt =  $this->model->selReceiptBySid(intval($iid)); 
		//$f = new NumberFormatter("es", NumberFormatter::SPELLOUT);
		print_r($receipt);
		echo ($letras); 
		//echo ntoL(1524.50); 
		//echo $this->numero_a_letras($receipt['credit']); 
		$_SESSION['pdfReceipt'] = json_encode($receipt, JSON_UNESCAPED_UNICODE);
	}




	public function getDataTbl($id){//dep($_POST);
		$iid = (strClean($id));

		$src = strClean(h($_POST['src'],''));
		$prid = intval(strClean(h($_POST['prid'])));
		$arrData = $this->model->selDataTbl($iid, $src, $prid);
		
		$_SESSION['pdfJson'] = json_encode($arrData,JSON_UNESCAPED_UNICODE);

		$clData =  $this->model->selClientBySid(intval($iid)); 
		$_SESSION['pdfClient'] = json_encode($clData, JSON_UNESCAPED_UNICODE);

		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function setData(){ //dep($_POST);
		$campos = json_decode($_POST['campos'],true);
		$intId  = intval(strClean($campos['id']));
		
		$name   = strClean($campos['campo1']);
		$desc   = strClean(h($campos['campo2'],true));
		$status = intval(strClean(h($campos['campo3'],1)));
		$dType  = intval(strClean($campos['campo6']));

		$dad    = intval(strClean(h($campos['sid'])));
		if ($dType==2) $dad = intval(strClean($campos['campo10'])); 
		$fract  = intval(strClean(h($campos['campo8']),0));
		$priceK = strClean(h($campos['campo5']));
		$isArr =  explode(',',$name);
		if ($_SESSION['userid']==-1)
			$dad=intval(strClean(h($campos['campo9'])));
		if ($dType===17&&$_SESSION['userid']>0) $desc=strClean($campos['campo11']);
		
		if (count($isArr)>1&&$intId==0){
			$request = $this->model->ins_list($isArr, $dType);
		}else{
			$request = $this->model->ins_updData($intId, $name, $desc, $status, 
											$dType, $priceK, $dad, $fract);
		}
		$option = ($intId==0)?1:2;
		echo analizeSet($request, $option);	die();
	}

	public function setStatus(){    	//dep($_POST);
		$campos= (json_decode($_POST['campos'],true));
		$intId = intval(strClean($campos['id']));
		$status= intval(strClean($campos['campo1']));

		$request = $this->model->updStatus($intId, $status);
		$option  = ($intId==0)?1:2;
		echo analizeSet($request, $option);	die();
	}


	public function setSubcateg(){    	//dep($_POST);
		$campos=(json_decode($_POST['campos'],true));
		$id  = intval(strClean($campos['id']));
		$dad = intval(strClean(h($campos['sid'])));
		$scat 	=(strClean($campos['field1']));
		$request = $this->model->ins_subCat($id, $scat, $dad );

		$option = ($id==0)?1:2;
		echo analizeSet($request, $option);	die();
	}
	public function delSubcat(){
		if($_POST){
			$intId = intval($_POST['id']);  $sid = intval($_POST['par2']);
			$requestDelete = $this->model->delSubcat($intId, $sid);
			if($requestDelete == 'ok'){
				$arrResponse = array('status' => true,'msg'=>'Registro eliminado');
			}else if($requestDelete == 'exist'){
				$arrResponse=array('status' => false,'msg'=>'Imposible eliminar.');
			}else {
				$arrResponse=array('status' => false,'msg'=>'Error al eliminar');
			} 
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}   die();
	}			

	public function setScat(string $arg){  //dep($_POST);
		$scats  = json_decode(($_POST['subcats']),true);
		$request = $this->model->ins_Scat($scats);

		$option = 1;//($intId==0)?1:2;
		echo analizeSet($request, $option);	die();
	}

	//existsProducts
	public function existsProducts(int $id){ // dep($_POST);
		$id = intval(strClean($id)); 
		$type = intval($_POST['type']);
		$arrData = $this->model->selExistsProducts($id, $type);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
	}

	public function delData(){	//dep($_POST);
		# tratar  el caso de que el dato esté asociado a otros registros
		# tipo de datos que no se pueden eliminar
		# frontend: aviso de confirmación
		# backend: mensaje de error si no se puede eliminar	
		if($_POST){
			$intId = intval($_POST['id']);  $type = intval($_POST['par2']);
			# si el tipo es 3 o 1, verificar si existe en productos o clientes
			if ($type==3){  //3=categs
				$exist = $this->model->selExistsProducts($intId, $type);
				if (is_array($exist) && count($exist)>0){
					$arrResponse=array('status' => false,'msg'=>'Imposible eliminar. Registro asociado a productos');
					echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE); die(); //exit();
				}
			}
			if ($type==2){  //bank
				$exist = $this->model->selExistsTrans($intId, $type);
				if (is_array($exist) && count($exist)>0){
					$arrResponse=array('status' => false,'msg'=>'Imposible eliminar. Transacciones existentes');
					echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE); die(); //exit();
				}
			}

			$requestDelete = $this->model->delData($intId, $type);
			echo analizeDel($requestDelete,$intId);die();
		}   die();
	}

	private function numero_a_letras($numero) {
		$unidades = array('', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve');
		$decenas = array('', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa');
		$centenas = array('', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos');
		if ($numero == 0) {
			return 'cero';
		}
		if ($numero < 0) {
			return 'menos ' . numero_a_letras(abs($numero));
		}
		$letras = '';
		if ($numero >= 1000) {
			$parte_entera = floor($numero / 1000);
			$letras .= numero_a_letras($parte_entera) . ' mil';
			$resto = $numero - ($parte_entera * 1000);
			if ($resto > 0) {
				$letras .= ' ' . numero_a_letras($resto);
			}
		} else {
			if ($numero < 20) {
				$letras .= $unidades[$numero];
			} elseif ($numero < 100) {
				$letras .= $decenas[floor($numero / 10)];
				$resto = $numero % 10;
				if ($resto) {
					$letras .= ' y ' . $unidades[$resto];
				}
			} else {
				$letras .= $centenas[floor($numero / 100)];
				$resto = $numero % 100;
				if ($resto) {
					$letras .= ' ' . numero_a_letras($resto);
				}
			}
		}
		return $letras;
	}
	public function numero_a_letras_con_decimales($numero) {
		$parte_entera = floor($numero);
		$parte_decimal = round(($numero - $parte_entera) * 100);
		$parte_entera_letras = numero_a_letras($parte_entera);
		$parte_decimal_letras = numero_a_letras($parte_decimal);
		if ($parte_decimal == 0) {
			return $parte_entera_letras . ' con cero centavos';
		} else {
			return $parte_entera_letras . ' con ' . $parte_decimal_letras . ' centavos';
		}
	}

}?>