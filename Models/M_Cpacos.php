<?php 
class M_Cpacos extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}

  public function setImage(int $id, string $imgName, int $slsid){
    $this->Id = $id;
    $this->ImgName = $imgName;
    $this->SlsId = $slsid;

    //if ($id==0) {
      $sql ="INSERT INTO ms_salesimg (imgname, slsid) VALUES(?,?)";
      $arrData = array($this->ImgName, $this->Id); 
      $request = $this->insert($sql, $arrData);
/*    }else{
      $sql ="UPDATE ms_salesimg set imgname=?  WHERE siid=$this->Id";
      $arrData = array($this->ImgName); 
      $request = $this->update($sql, $arrData);
    }
*/
  //echo $sql;   
   return $request;
  }


  public function aFavorImpp(int $client){
    $this->Client  = $client;    
    $sql = "SELECT * FROM ms_imputation 
            WHERE clientid=$this->Client and sid=-1 and amt>0";
    //echo $sql;
    return $this->select_all($sql);
  }

  //
  public function updStt(int $slsid, int $stt, float $bDue, float $impu){
    $this->SlsId  = $slsid;    $this->Stt  = $stt;
    $this->BDue   = $bDue;    //$this->Stt  = $stt;        
    $sql = "UPDATE  ms_sales SET `status`=?, balancedue=?
            WHERE salesid=$this->SlsId";
    $arrData = array($this->Stt, $this->BDue);              
    //echo $sql;
    return $this->update($sql, $arrData);
  }


public function sel_a_favor(int $clid){
  $this->Cli = $clid;
  $sql="SELECT * FROM ms_imputation WHERE clientid=$this->Cli and sid=-1 and amt>0";
  return $this->select_all($sql); 
}
//$client,$pendientes[$i]['sid'], $newPerc, $status, $balanceDue, $imputar);
public function setSls_a_favor(int $clid, int $slsid, int $stt, $imputar){
  $this->Cli = $clid;       $this->SlsId = $slsid;      $this->BDue = $imputar;
  $sql="UPDATE ms_sales SET `status`=?,balancedue=? WHERE salesid=$this->SlsId";
  $arrData = array($stt, $this->BDue);
  return $this->update($sql, $arrData);
}
public function setImp_a_favor(int $impid, int $slsid, float $imp){
  $this->Impid = $impid;       $this->SlsId = $slsid;      $this->Imp = $imp;
  $sql = "UPDATE ms_imputation SET sid=?, amt=?
  WHERE impttid=$this->Impid";
  $arrData = array($this->SlsId, $this->Imp); 
  return $this->update($sql, $arrData);
}



public function imputar_a_favor(int $clid, int $slsid, float $afa){
  $this->Cli = $clid;       $this->SlsId = $slsid;     $pyd=0;

  $sql="SELECT * FROM ms_imputation WHERE clientid=$this->Cli and sid=-1 and amt>0";
  $xImputar = $this->select_all($sql); 
  for($i=0; $i<count($xImputar); $i++){ 
    $impttid = $xImputar[$i]['impttid']; $pyd=$xImputar[$i]['pyd'];
    if ($afa>0) {
      if($xImputar[$i]['amt'] >= $this->BDue){$stt=2; $this->BDue=0; 
      }else{ $stt=3; $this->BDue = $this->BDue - $xImputar[$i]['amt'];  }
      $afa=$afa-$xImputar[$i]['amt'];

      $sql="UPDATE ms_sales SET `status`=?,balancedue=? WHERE salesid=$this->SlsId";
      $arrData = array($stt, $this->BDue);
      $this->update($sql, $arrData);

      $sql = "UPDATE ms_imputation SET sid=? WHERE impttid=$impttid";
      $arrData = array($this->SlsId); $this->update($sql, $arrData);

    }
  }//endfor
  if ($afa>0){//si queda algo a favor
    $sql ="INSERT INTO ms_imputation (clientid, sid, pyd, amt)  VALUES(?,?,?,? )";
    $this->insert($sql, array($this->Client, -1, $pyd, $afa));
  }

}

  
  public function selectCpacos(int $tipoCli)	{
    $clType = ($tipoCli==2)? ' and (cltype=2 or cltype=6)': ' and (cltype=1 or cltype=3 or cltype =5)';
    if ($tipoCli==-99) $clType='';
    //2 o 6 => proveedor o proveedor de servicios
    $idco= $_SESSION['idcompany'];
  	$sql = " SELECT ref, `salesid` as sid,`salesdate`,`amount`,CONCAT_WS (' ',clientname, clientlastname) as fullname, 
        DATE_FORMAT(salesdate, '%d-%m-%Y') as ffecha, ms_sales.clientid as clid, `status` as stt,
        CONCAT_WS('|',duedate<CURDATE(),coalesce(DATE_FORMAT(duedate, '%d-%m-%Y'),'')) AS vencimiento,
        salesdate as fecha, duedate as fecVen, cltype,
        IF(balancedue=0, amount, balancedue) as saldo, notes, saux,
        prodName(GP.o_productid) AS prodName
        from ms_sales 
        INNER JOIN ms_clients on ms_sales.clientid=ms_clients.clientid 
        LEFT JOIN  g_production GP ON GP.o_code=ms_sales.ref 
        WHERE ms_sales.status <> 2
        and ms_clients.companyid = $idco    and balancedue <>0";
    $sql.= $clType; //determina si es collect or paymnt
    //echo $sql;
  	$request = $this->select_all($sql);
  	return $request;
  }	



  public function insertCpaco(int $cliente , string $campo2, float $campo3, int $campo4, int $req, int $acco, string $newAux){//payment
    //quedaría obsoleto
      $return ="";
      $this->intAcco  = $acco;      $this->intCampo1  = $cliente;  //cliente
      $this->dateCampo2 = $campo2;  //fecha
      if ($this->intAcco==2) {//ctas por pagar
        $this->deciCampo3 = $campo3*-1; //*-1;  //importe
      }else{        $this->deciCampo3 = $campo3;      }

      $this->intCampo4  = $campo4;  //banco
      $this->strNotes   = 'perception';
      $this->intReq     = $req;
      $this->strNewAux  = $newAux;      
      

      //$this->intAux  = (new DateTime("1899-12-30"))->diff(new DateTime($campo2))->days;    

      $sql = "SELECT * FROM  ms_payments WHERE clientid =-99";
      $request = $this->select_all($sql);
      //echo $sql;
      if (empty($request)) {  
        $query_insert ="INSERT INTO ms_payments (clientid, paymentdate, amount, comments, bankid, ref, aux) 
        VALUES(?,?,?, ?,?,?, ? )";
        $arrData = array($this->intCampo1, $this->dateCampo2, $this->deciCampo3, $this->strNotes, $this->intCampo4, $this->intReq, $this->strNewAux); 

        $request_insert = $this->insert($query_insert, $arrData);
        //echo $request_insert.$query_insert;
        $return = $request_insert;
      }else{$return ="exist";}
      return $return;
  }

  public function insertPerception(int $clid , string $fecha, float $importe, int $banco, int $req, int $acco, string $newAux, string $notas){ 
      $this->intClid = $clid;       $this->dateCampo2 = $fecha;  
      $this->deciImporte = $importe;       $this->intAcco  = $acco;  
      //$cuenta = ($this->intAcco==2)?'debit':'credit';
      $cuenta = 'credit';
      $this->intBanco = $banco;        $this->strNotes   = $notas;
      $this->Co= $_SESSION['idcompany'];   $this->Usr = $_SESSION['userid'];
      $this->intReq  = $req; //slsId
      $this->strNewAux  = $newAux;

      $sql="INSERT INTO ms_sales (clientid, salesdate, $cuenta, notes, bankid, saux, companyid, user, acctype) 
        VALUES(?,?,?, ?,?,?, ?,?,?)";
      $arrData=array($this->intClid, $this->dateCampo2, $this->deciImporte, $this->strNotes, $this->intBanco, $this->strNewAux, $this->Co, $this->Usr, $this->intAcco);
      return $this->insert($sql, $arrData);
  }



    public function regSobrante(int $slsId, float $balancedue){
          $this->intId       = $slsId;
          $this->intBalance  = $balancedue;
          $sql = "UPDATE ms_sales 
          SET balancedue = ?
          WHERE salesid = $this->intId";
          $arrData = array($this->intBalance);
          $request = $this->update($sql, $arrData);
          return $request;
      }

  /*
  public function updateCpaco(int $id, string $campo1 , string $campo2, string $campo3 , string $campo4){
        $this->intId = $id;
        $this->strCampo1 = $campo1;   //fecha
        $this->strCampo2 = $campo2;   //importe
        $this->strCampo3 = $campo3;   //clienrte
        $this->strCampo4 = $campo4;   //notas
        $this->intCompany= $_SESSION["idcompany"];
        $sql = "SELECT * FROM ms_sales WHERE  clientid = -99";
        
        $request = $this->select_all($sql);
        if (empty($request))   {
          $sql = "UPDATE ms_sales SET salesdate = ?, amount = ?, clientid = ?, notes = ?
          WHERE salesid = $this->intId";
          $arrData = array($this->strCampo1, $this->strCampo2, $this->strCampo3, $this->strCampo4);
          $request = $this->update($sql, $arrData);
        }else{
          $request = "exist";
        }
        
        return $request;
    }
  */



  public function deleteCpaco(int $id){
  	$this->intId = $id;
  	$sql = "SELECT * from ms_users WHERE userid = $this->intId";
  	$request = $this->select_all($sql);
  	if (empty($request)) {
  		$sql = "UPDATE ms_users SET status = ? WHERE userid = $this->intId";
  		$arrData = array(0);
  		$request = $this->update($sql,$arrData);
  		if ($request) {
  			$request = 'ok';
  		}else{ $request = 'error'; }
  	}else{ $request = 'exist';}
  	return $request;
  }
  
  public function insImptutation(int $client, int $pyd, float $amt){ 
      $this->intSid = -1;  //salesid
      $this->intPyd = $pyd;  //paymntid
      $this->flAmt = $amt; //importe
      $this->Cli   = $client; //client
      $sql = "INSERT INTO ms_imputation (clientid, sid, pyd, amt) 
              VALUES(?,?,?,? )";
      $arrData = array($this->Cli,$this->intSid, $this->intPyd, $this->flAmt); 
      $request = $this->insert($sql, $arrData);
      return  $request;      
  }

  public function selectSumPerception(int $tipoCli)  {
    
    $clType = ($tipoCli==2)? ' and (cltype=2 or cltype=6)': ' and (cltype=1 or cltype=3 or cltype =5)';
    if ($tipoCli==-99) $clType=' and acctype>0 GROUP BY acctype ';
    $idco= $_SESSION['idcompany'];
    $sql = "select acctype as type, sum(balancedue) as saldo
        from ms_sales 
        INNER JOIN ms_clients on ms_sales.clientid=ms_clients.clientid 
        WHERE ms_sales.status <> 2
        and ms_clients.companyid = $idco
        and balancedue <>0";
    $sql.= $clType; //determina si es collect or paymnt
    //echo $sql;
    $request = $this->select_all($sql);
    return $request;
  } 




  public function setCargo(int $id, int $client, string $fecha, float $amt, string $notas, $newAux, int $acco){ 
      $this->intId = $id;      $this->Clid  = $client;  $this->Acc = $acco;
      $this->Fecha = $fecha;   $this->flAmt = $amt;     $this->Notas = $notas;
      if ($id==0)   { //new
        $sql ="INSERT INTO ms_sales (clientid, salesdate, amount, debit, balancedue, notes, companyid, saux, status, acctype)  
          VALUES(?,?,?,  ?,?,?,  ?,?,?,  ?)";
        $arrData = array($this->Clid, $this->Fecha, $this->flAmt, $this->flAmt, $this->flAmt, $this->Notas, $_SESSION['idcompany'], 
          $newAux, 1, $this->Acc ); 
        $request=$this->insert($sql, $arrData);
      }else{
        $sql ="UPDATE ms_sales SET salesdate=?, amount=?, debit=?, balancedue=?, notes=?, saux=? WHERE salesid = $this->intId";
        $arrData = array($this->Fecha, $this->flAmt, $this->flAmt, $this->flAmt, $this->Notas, $newAux); 
        $request=$this->update($sql, $arrData);        
      }
      //echo $sql;
      return $request;
  }


  public function iu_Invoice(int $client, string $fecha, float $amt, string $notas, $newAux, array $arrDets){ 

      $this->Clid  = $client;       $this->Fecha = $fecha;
      $this->flAmt = $amt;          $this->Notas = $notas;
      $sql ="INSERT INTO ms_sales (clientid, salesdate, amount, debit, balancedue, notes, companyid, saux) 
      VALUES(?,?,?,?,?,?,?,? )";
      $arrData = array($this->Clid, $this->Fecha, $this->flAmt, $this->flAmt, $this->flAmt,$this->Notas,$_SESSION['idcompany'],$newAux); 
      $request=$this->insert($sql, $arrData);

      $arrData=array($request);

      foreach ($arrDets as $di) {
        $sql = "UPDATE i_events set invoice=? WHERE eventid=$di";
        $this->update($sql, $arrData); 
      }
      return $request;
  }

  public function stInvo(int $sid, int $clid, string $fecha, float $amt, string $notas, int $stt){ 

      $this->Sid  = $sid;   $this->Clid  = $clid;   $this->Fecha = $fecha;
      $this->flAmt= $amt;   $this->Notas = $notas;  $this->Stt  = $stt;
      $this->Due  =  date("Y-m-d",strtotime($fecha."+ 10 days"));
      $sql ="UPDATE ms_sales SET clientid=?, salesdate=?, amount=?, debit=?, balancedue=?, notes=?, status=?, duedate =? WHERE salesid = $this->Sid";

      $arrData = array($this->Clid, $this->Fecha, $this->flAmt, $this->flAmt, $this->flAmt, $this->Notas, $this->Stt, $this->Due); 

      $request = $this->update($sql, $arrData);
      return $request;
  }


}?>