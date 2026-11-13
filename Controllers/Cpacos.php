<?php 
if (session_status() == PHP_SESSION_NONE) session_start();
class Cpacos extends Controllers {
//////////////
public function __construct(){parent:: __construct();}	

public function cpacos(){
	$data['page_id'] 	= 5;
	$data['page_title'] = 'Cuentas a percibir';
	$data['page_name'] 	= 'cpacos';
	$data['page_tag'] 	= 'cpacos  <small>'.$_SESSION["company"].'</small>';
	$data['page_jquery'] = true; $data['page_datatable'] = true;
	$this->views->getView($this,"cpacos",$data);
}

public function getCpaco(int $tipo){
	$intTipo = intval(strClean($tipo));
	$arrData = $this->model->selectCpaco($intTipo);
	echo json_encode($arrData,JSON_UNESCAPED_UNICODE); die();
}

public function getCpacos(int $tipo){
	$intTipo = intval(strClean($tipo));
	$arrData = $this->model->selectCpacos($intTipo);
	echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
	die();
}

public function summToPerception(int $tipo){
	$intTipo = intval(strClean($tipo));
	$arrData = $this->model->selectSumPerception($intTipo);
	echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
}

public function setImage(){	//dep($_POST);
    $campos  =(json_decode($_POST['campos'],true));
    $intId 	 = isset($_SESSION['newPYD']) ? intval($_SESSION['newPYD']) : 0;
    $imgNam  = strClean($campos['campo10']);
    $slsid   = intval(strClean($campos['campo6']));
	$request = $this->model->setImage($intId, $imgNam, $slsid);
	$option  = ($intId==0)?1:2;
	echo analizeSet($request, $option);	die();	    
}
	
public function setCpaco(){   //dep($_POST);
    $campos	= (json_decode($_POST['campos'],true));
    $intId 	= isset($_POST['id']) ? intval($_POST['id']) : 0;
	//if (!$this->verifyTkn(strClean($campos['tkn']))) echo analizeSet(0,4); die();	
	if (!$this->verifyTkn(strClean($campos['tkn']))) {echo ':401<hr>'.$_SESSION['tkn'].'<hr>'.$campos['tkn']; exit();}
	
	$ClType = isset($_POST['clType'])? intval($_POST['clType']) : 0;		
  	$fecha   = strClean($campos['campo2']);
  	$importe = strClean($campos['campo3']);  //percibido
  	$amount  = strClean($campos['campo7']);	 //deuda
	$notas	 = strClean($campos['campo9'],true);
	$client	 = intval(strClean($campos['campo5']));
  	$bank 	 = intval(strClean($campos['campo4'])); 
  	$slsId   = intval(strClean($campos['campo6'])); 
  	$intAcco = intval(strClean($campos['campo8'])); 	
	
	$aFavor = intval(strClean(h($campos['campo11'])));
	$imp_af = strClean(h($campos['campo12']));  //importe a favor
  	
  	$balanceDue=0; $ref='';
	$newAux=$this->model->maxAux($fecha);
	//print_r($campos);
	//if(!$aFavor) echo 'solo pagar la factura seleccionada' ;
	/*pseudocode
	intAcco recibe el clType, es correcto? o hay que usar acco textear 
	*/
	if ($aFavor) { 
		//$req=$this->model->imputar_a_favor($client, $slsId, $imp_af);
		$afa=0; $pyd=0;
		$cred=$this->model->sel_a_favor($client);
		//print_r($cred);
		for($y=0; $y<count($cred); $y++){
			$afa=$cred[$y]['amt']; $pyd=$cred[$y]['pyd'];
			//echo $afa.': ';
			$pendientes=($this->model->pendingSales($ClType, $client));
			for($i=0; $i<count($pendientes); $i++){
			  if ($afa>0) {
			  	//echo $pendientes[$i]['saldo'];
			  	if ($afa>=$pendientes[$i]['saldo']){
			  			$status = 2; 	$imputar=$pendientes[$i]['saldo'];
			  			$balanceDue = 0; 
			  	} else{	$status = 3; 	$imputar=$afa;
						$balanceDue=$pendientes[$i]['saldo']-$afa;
				}
			  	$req=$this->model->setSls_a_favor($client,$pendientes[$i]['sid'], $status, $balanceDue, );
			  	$req=$this->model->setImp_a_favor($cred[$y]['impttid'],
			  		$pendientes[$i]['sid'], $imputar);
			  	$afa = $afa-$imputar;
				if ($afa>0)$this->model->insImptutation($client, $pyd, $afa);
			  }	  
			}
		}//end for
	}
	
	if ($importe<0) {echo analizeSet($req, 2);	die();exit();}

	$newPerc=$this->model->insertPerception($client, $fecha, $importe, $bank, $slsId, $intAcco, $newAux, $notas);
	$option = 1; 
	$_SESSION['newPYD']=$newPerc;
	$pendientes=($this->model->pendingSales($ClType, $client));
	for($i=0; $i<count($pendientes); $i++){
	  if ($importe>0) {
	  	if ($importe>=$pendientes[$i]['saldo']){
	  		$status = 2; 
	  		$imputar=$pendientes[$i]['saldo'];
	  		$balanceDue = 0; 
	  	}else{
	  		$status = 3; 
	  		$imputar=$importe;//cta
			$balanceDue=$pendientes[$i]['saldo']-$importe;//A cta
	  	}
	  	$this->model->updateCpacoSales($client,$pendientes[$i]['sid'], $newPerc, $status, $balanceDue, $imputar);
	  	$importe = $importe-$imputar;
	  }	  
	}//end for	#si queda algo a favor..
	if ($importe>0)$this->model->insImptutation($client, $newPerc, $importe);
	
  	echo analizeSet($newPerc, $option);	die();
} 

public function setCargo(){		//dep($_POST);
    $campos     = json_decode($_POST['campos'],true);
    $intId      = intval(strClean($campos['id']));

    $clid 	= strClean($campos['clid']);
    $acco   = intval(strClean($campos['account']));
    $fecha  = strClean($campos['campo2']); 
    $importe= strClean($campos['campo3']); 
    $notas  = strClean($campos['campo9'],true); 
	$newAux=$this->model->maxAux($fecha);
	$request = $this->model->setCargo($intId,$clid,$fecha,$importe,$notas, $newAux, $acco);
	$option  = ($intId==0)?1:2;
	echo analizeSet($request, $option);	die();
}
	
public function setInvoice(){		//dep($_POST);
    $campos     = json_decode($_POST['campos'],true);
    $intId      = intval(strClean($campos['id']));

    $clid  = strClean($campos['campo1']);
    $fecha = strClean($campos['campo2']); 
    $amt   = strClean($campos['campo3']); 
    $notas = strClean($campos['campo9'],true); 
    $stt   = strClean($campos['campo15']); 
	
    //$arrDets= json_decode($campos['campo4'],true);

	$request = $this->model->stInvo($intId, $clid, $fecha, $amt, $notas, $stt);

	$option  = 2;//($intId==0)?1:2;
	echo analizeSet($request, $option);	die();
}

} ?>