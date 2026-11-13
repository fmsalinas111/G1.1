<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Adr extends Controllers {public function __construct(){parent:: __construct();}	

public function getAdr(int $tipo){//inactiva			
	$intTipo = intval(strClean($tipo));
	$arrData = $this->model->selectAdr($intTipo);
	echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
}

public function getAdrs(int $tipo){//inactiva
	$intTipo = intval(strClean($tipo));
	$arrData = $this->model->selectAdr($intTipo);
	echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
}

public function setAdr(){   //dep($_POST);
	$intId   = isset($_POST['id']) ? intval($_POST['id']) : 0;
	$intType = isset($_POST['type']) ? intval($_POST['type']) : 0;	//
	$data    = strClean($_POST['data']);   	  
	$strCampo1=strClean($_POST['campo1']);
	$strCampo2=(isset($_POST['campo2']))? strClean($_POST['campo2']):'';
	$strCampo3=(isset($_POST['campo3']))? strClean($_POST['campo3']):'';
	$strCampo4=(isset($_POST['campo4']))? strClean($_POST['campo4']):'';
	$strCampo5=(isset($_POST['campo5']))? strClean($_POST['campo5']):'';
	$strCampo6=(isset($_POST['campo6']))? strClean($_POST['campo6']):'';
	$strCampo7=(isset($_POST['campo7']))? strClean($_POST['campo7']):'';
	$strCampo8=(isset($_POST['campo8']))? strClean($_POST['campo8']):'';
	$strCampo9=(isset($_POST['campo9']))? strClean($_POST['campo9']):'';
	$strCampo10=(isset($_POST['campo10']))?strClean($_POST['campo10']):'';
	$request = $this->model->insertAdr($data, $intType, $strCampo1, $strCampo2, $strCampo3, $strCampo4, $strCampo5, $strCampo6, $strCampo7, $strCampo8, $strCampo9,$strCampo10);
	if ($request>1 && $intType===4) {// insert speciallity in products
		$this->model->inSpec_prod($strCampo1, $request);	}
	echo analizeSet($request, 3);	die();
}

public function setUpr(){   //dep($_POST);
	$campos = json_decode($_POST['campos'],true);
	$intId   = strClean($campos['id']);
	$c1   = strClean($campos['campo1']);        //$c2 = strClean($campos['campo2']);
	$request=$this->model->upData($intId, $c1);
	$option = ($intId==0)?1:2;
	echo analizeSet($request, $option);	die();
}


public function alter(){
	$request = $this->model->alter();
	echo 'pepe';die();
}
//************* */
} ?>