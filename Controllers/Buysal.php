<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Buysal extends Controllers {public function __construct(){parent:: __construct();}	
	public function buysal(){
		$data['page_id'] 	= 9;
		$data['page_title'] = ($_SESSION['app']===7)?'Expedientes':'Compra - Venta';
		$data['page_name'] 	= 'buysal';
		$data['page_tag'] 	= 'Compra-venta  <small>'.$_SESSION["company"].'</small>';
		//$data['page_jquery'] = true; 
		$data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'],$data);
	}

	public function getSales(int $clType=1){	//dep($_POST);
		$intTipo = intval((strClean($clType)));
		if ($_SESSION['app']==7) 
			 $arrData = $this->model->selSalesIuri();
		else $arrData = $this->model->selSales($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}

	public function getTransactions(int $id_sale){	//dep($_POST);
		$intTipo = intval(strClean($id_sale));			
		$arrData = $this->model->selSales($intTipo);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}

	public function setBuysal(string $arg){//dep($_POST);
        $campos     = json_decode($_POST['campos'],true);
        $changuito  = json_decode(($_POST['changuito']),true);
        $id         = intval(strClean($campos['id']));
        $intClType  = intval(strClean(h($campos['clType']),1));
        $dossier    = strClean(h($campos['dossier'])); //minor?
        $client     = intval(strClean($campos['campo1']));
        $date       = (h($campos['campo2'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo2']);
        $dueDate    = (h($campos['campo3'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo3']);
      	$importe = strClean(h($campos['campo4']));
      	$amount  = strClean(h($campos['campo7']));
        $notas	 = strClean(h($campos['campo9'],true));
        $depot   = intval(strClean(h($campos['campo13'],0)));
        $ref 	 = strClean(h($campos['campo12'])); //hace falta?
        $newAux =  $this->model->maxAux($date);
        $total=0; 
        //$item['importe']* $item['multiplo']  $item['importe']
        if (is_array($changuito)) {
			$total = array_reduce($changuito,
		    	function ($prev, $item) {return $prev + $item['importe'] ;
		    	},0); //el 0 por si el carrito está vacío
    	}
		
		$_SESSION['pdfJson'] = json_encode($changuito,JSON_UNESCAPED_UNICODE);
		
    	if($amount=='')$amount=$importe;
        $newSale=$this->model->setBuy($id, $client, $date, $arg, $newAux, $amount, $notas, $ref, $depot, $dueDate);
        #si no es venta o presup, rechazar el request
        if ($newSale>0&&is_array($changuito)) { 
        	if ($_SESSION['app']!==7) $dossier='0';
        	$this->model->setBuyDetails($newSale, $changuito, $dossier, $depot, $date, $arg);
        	//$this->model->updtSalesAmount($newSale, $date, $arg);
        	if ($arg==='Venta') {
				$this->recPayment($campos, $newAux, $intClType, $client, $date, $newSale, $notas);
			}
        }
		$clData =  $this->model->selClientBySid($newSale); 
		$_SESSION['pdfClient'] = json_encode($clData, JSON_UNESCAPED_UNICODE);
        $option = 1;//($intId==0)?1:2;
        echo analizeSet($newSale, $option);	die();
	}

	public function setDetails(string $arg=''){  //dep($_POST);
        $campos  = json_decode($_POST['campos'],true);
        $id   = intval(strClean($campos['id']));
		$sale = intval(strClean($campos['sid']));

        $prod = intval(strClean($campos['field1']));
        $quant= (strClean($campos['field2']));
        $price= (strClean($campos['field3']));
        $note = strClean($campos['field4'],true);
		$depot= intval(strClean(h($campos['field5'],0)));

        $req=$this->model->setDetail($id, $sale, $prod, $quant, $price, $note);
        if ($_SESSION['app']==7&&$arg!=='2') {//iuri
        	$staff = intval(strClean($campos['field5']));
        	$evDate = (strClean($campos['field6']));
        	$type = intval(strClean($campos['field7']));
		    $quant= (strClean($campos['field8']));
		    $price= (strClean($campos['field9']));

        	$req=$this->model->setIevent($id,$req, $sale, $evDate, $price, 
        		$type, $staff);
        }else{
			if ($depot>0)
			$req=$this->model->setStock($id, $sale, $prod, $quant, $price, $note, $arg, $depot);
		}

        $this->model->updtSalesAmount($sale, $arg);
        $option  = ($id==0)?1:2;
        echo analizeSet($req, $option);	die();
	}

  	public function delBuysa(){   //dep($_POST);
	    if($_POST){
	        $intId = intval($_POST['id']);   $sid = intval($_POST['par2']);			
	        $requestDelete = $this->model->deleteDetail($intId, $sid);
			//$requestDelete = $this->model->delData($intId, $type);
			echo analizeDel($requestDelete,$intId);die();
	    } 
	    die();
	}			

	public function setBuysa(string $arg){//dep($_POST);
		#modelo alternativo a setBuysal qu eno viene de ecom
		#orientado a compras
		#agregar debit status y balancedue
        $campos  = json_decode($_POST['campos'],true);
        $id      = intval(strClean($campos['id']));
        $cltype  = intval(strClean($campos['clType']));
        $acco    = intval(strClean($campos['account']));
        $client  = intval(strClean($campos['campo1']));
        $date    = (h($campos['campo2'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo2']);
        $duedate = (h($campos['campo3'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo3']);
      	$importe = strClean(h($campos['campo4']));
      	$amount  = strClean(h($campos['campo7']));
        $notas	 = strClean(h($campos['campo9'],true));
        $ref 	 = strClean(h($campos['campo12']));
        $depot 	 = intval(strClean(h($campos['campo13'],0)));
        $stt     = intval(strClean(h($campos['campo14'],0)));

        $total = $amount;
        $newAux= $this->model->maxAux($date);
        $newSale=$this->model->setBuySa($id, $client, $date, $duedate, $arg, 
							$newAux, $total, $notas, $ref, $cltype, $depot, $acco, $stt);
        #si no es venta o presup, rechazar el request
        $option = 1;//($intId==0)?1:2;
        echo analizeSet($newSale, $option);	die();
	}

	public function setOrder(string $arg){//dep($_POST);
        $campos  = json_decode($_POST['campos'],true);
        $clType  = intval(strClean($campos['clType']));
        $acco    = intval(strClean($campos['account']));

        $id      = intval(strClean($campos['id']));
        $client  = intval(strClean($campos['campo1']));
        $date    = (h($campos['campo2'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo2']);
		$dueDate = strClean(h($campos['campo3']));
		$depot   = intval(strClean(h($campos['campo13'],0)));
		$newAux  = $this->model->maxAux($date);

        $request=$this->model->sOrder($id, $client, $date, $dueDate, $arg, 
									  $clType, $depot, $newAux, $acco); 

        $option = ($id==0)?1:2;
     	echo analizeSet($request, $option);	die();   
	}

	public function recPayment($campos, $newAux, $intClType, $client, $date, $newSale, $notas){
		#registrar el pago (si hay)
		$bank 	 = intval(strClean($campos['campo5']));
		$_importe = json_decode(($campos['campo4']),true); //floatval
		$ctacte = (strClean(h($campos['campo11'],0)));
		$intAcco = intval(strClean(h($campos['campo8'],1)));
		if ($ctacte<1) {// si no es cta cte
			foreach ($_importe as $v) {
				$importe =  floatval($v['amount']);	
				$bank =  intval($v['bank']);
				$newAux+=.01; 
				$newPerc = $this->model->insPerception($client, $date, $importe, $bank, $newSale, $intAcco, $notas, $newAux);
				$pendientes=($this->model->pendingSales($intClType, $client));// clType no es necesario??
				for($i=0; $i<count($pendientes); $i++){
				if ($importe>0) {
					if ($importe>=$pendientes[$i]['saldo']){
						$status=2; $balanceDue=0; 
						$imputar=$pendientes[$i]['saldo'];
					}else{
						$status=3; $imputar=$importe;// a cta
						$balanceDue=$pendientes[$i]['saldo']-$importe;
					}
					$request = $this->model->updateCpacoSales($client,$pendientes[$i]['sid'], $newPerc, $status, $balanceDue, $imputar);
					$importe = $importe-$imputar;
				}
			  }//fin for
			}
		}else{ 
			//echo 'ctacte';
		}
	}






	//ssales
	public function setSell(string $arg){ //dep($_POST);
	  	$defCltype  = ($arg==='Venta')? 1 : 2; //venta / compra
        $campos     = json_decode($_POST['campos'],true);
        $changuito  = json_decode(($_POST['changuito']),true);
        $id         = intval(strClean($campos['id']));
        $intClType  = intval(strClean(h($campos['clType'],$defCltype)));
        $client     = intval(strClean($campos['campo1']));
        $date       = (h($campos['campo2'])=='null')?date("Y-m-d") 
        				:strClean($campos['campo2']);
        $duedate    = (h($campos['campo3'])=='null')?date("Y-m-d") 
						:strClean($campos['campo3']);
      	$importe = strClean(h($campos['campo4']));
      	$amount  = strClean(h($campos['campo7']));
        $notas	 = strClean(h($campos['campo9'],true));
        $depot   = intval(strClean(h($campos['campo13'],0)));
        $ref 	 = strClean(h($campos['campo12'])); //hace falta?
        $newAux =  $this->model->maxAux($date);
        $total=0; 
        if (is_array($changuito)) {//print_r($changuito);
			$total = array_reduce($changuito,
		    	function ($prev, $item) {return $prev + $item['amt'] ;
		    	},0); //el 0 por si el carrito está vacío
    	}
    	if($amount=='')$amount=$importe;
        $newSale=$this->model->setBuy($id, $client, $date, $arg, $newAux, $amount, $notas, $ref, $depot, $duedate);
        #si no es venta o presup, rechazar el request 
        if ($newSale>0&&is_array($changuito)) { 
        	$this->model->setSellDetails($newSale, $changuito, $depot, $date);
        	if ($arg==='Venta') $this->recPayment($campos, $newAux, $intClType, $client, $date, $newSale, $notas);
			#las compras se pagan desde cpacos por el principio de control de stock
        }
        $option = 1;//($intId==0)?1:2;
        echo analizeSet($newSale, $option);	die();
	}

	public function setCashDetails(string $arg=''){  //dep($_POST);
        $campos  = json_decode($_POST['campos'],true);
        $id   = intval(strClean($campos['id']));
		$sale = intval(strClean($campos['sid']));

        $prod = intval(strClean($campos['field1']));
        $quant= (strClean($campos['field2']));
        $price= (strClean($campos['field3']));
        $note = strClean($campos['field4'],true);

        $req=$this->model->setDetail($id, $sale, $prod, $quant, $price, $note);
        if ($_SESSION['app']==7&&$arg!=='2') {//iuri
        	$staff = intval(strClean($campos['field5']));
        	$evDate = (strClean($campos['field6']));
        	$type = intval(strClean($campos['field7']));
		    $quant= (strClean($campos['field8']));
		    $price= (strClean($campos['field9']));
        	$req=$this->model->setIevent($id,$req, $sale, $evDate, $price, 
        		$type, $staff);
        }else{
			$req=$this->model->setStock($id, $sale, $prod, $quant, $price, $note, $arg);
		}
        $this->model->updtSalesAmount($sale, $arg);
        $option  = ($id==0)?1:2;
        echo analizeSet($req, $option);	die();
	}

}?>