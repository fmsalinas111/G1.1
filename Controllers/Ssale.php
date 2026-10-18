<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Ssale extends Controllers {
	public function __construct(){parent:: __construct();}	

	public function ssale(){
		echo "<script>const clipro=1; const cpCaption = 'Cliente'; const cpAction = 'Venta';</script>";
		$data['page_id']=1; 
		$data['page_name']= 'ssale';		
		$data['page_title']= 'Ventas - ...';
		$data['page_tag'] 	= 'clprpames  <small>'.$_SESSION["company"].'</small>';
		//$data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,$data['page_name'], $data);
	}

	public function setSell(string $arg){//dep($_POST);
	  //assign vars
        $campos     = json_decode($_POST['campos'],true);
        $changuito  = json_decode(($_POST['changuito']),true);
        $id         = intval(strClean($campos['id']));
        $intClType  = intval(strClean($campos['clType']));
        $dossier    = strClean(h($campos['dossier'])); //minor?
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
      //end assignation
        //$item['importe']* $item['multiplo']
        if (is_array($changuito)) {
			$total = array_reduce($changuito,
		    	function ($prev, $item) {return $prev + $item['importe'] ;
		    	},0); //el 0 por si el carrito está vacío
    	}
    	if($amount=='')$amount=$importe;
        $newSale=$this->model->setBuy($id, $client, $date, $arg, $newAux, $amount, $notas, $ref, $depot);
        #si no es venta o presup, rechazar el request
        if ($newSale>0&&is_array($changuito)) { 
        	if ($_SESSION['app']!==7) $dossier='0';
        	$this->model->setBuyDetails($newSale, $changuito, $dossier, $depot, $date);
        	//$this->model->updtSalesAmount($newSale, $date, $arg);
        	if ($arg==='Venta') $this->recPayment($campos, $newAux, $intClType, $client, $date, $newSale, $notas);			
        }
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

        $req = $this->model->setDetail($id, $sale, $prod, $quant, $price, $note);
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