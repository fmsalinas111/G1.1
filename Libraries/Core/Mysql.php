<?php 
class Mysql extends Conexion{
	private $conexion;	private $strquery;	private $arrvalues;
	public $co; public $usr;
	public function __construct(){
		$this->conexion = new Conexion();
		$this->conexion = $this->conexion->conect();
		$this->co = CO();  $this->usr = USR();  
	}
	public function insert(string $query, array $arrValues)	{
		$this->strquery = $query;
		$this->arrvalues = $arrValues;
		$insert = $this->conexion->prepare($this->strquery);
		$resInsert = $insert->execute($this->arrvalues);
		if ($resInsert) {$lastInsert = $this->conexion->lastInsertId();
		}else{$lastInsert = 0;}
		return $lastInsert;
	}
	//buscar un registro
	public function select(string $query){
		$this->strquery = $query;
		$result = $this->conexion->prepare($this->strquery);
		$result->execute();
		$data = $result->fetch(PDO::FETCH_ASSOC);
		return $data;
	}
	public function select_all(string $query){
		$this->strquery = $query;			
		$result = $this->conexion->prepare($this->strquery);
		$result->execute();
		$data = $result->fetchall(PDO::FETCH_ASSOC);
		return $data;
	}		
	public function update(string $query, array $arrValues)	{
		$this->strquery = $query;
		$this->arrvalues = $arrValues;
		$update = $this->conexion->prepare($this->strquery);
		$resExecute = $update->execute($this->arrvalues);
		return $resExecute;
	}
	public function delete(string $query){
		$this->strquery = $query;			
		$result = $this->conexion->prepare($this->strquery);
		$del = $result->execute();
		return $result->rowCount();		//return $del; (oldReturn)
	}

  public function maxAux(string $fecha)  {
    $intAux=(new DateTime("1899-12-30"))->diff(new DateTime($fecha))->days;
    $this->dlbAux = $intAux;  
    $sql="SELECT max(saux)+.01 as newAux FROM ms_sales
    	  	WHERE saux >= $this->dlbAux AND saux <$this->dlbAux+1
          	and companyid = $this->co ";
    $max_aux=$this->select($sql);
	return $max_aux['newAux']!=null? $max_aux['newAux']: $intAux;
  }  

  public function updtSalesAmount(int $sid, string $arg=''){
  	$this->Sid = $sid; //$this->Date = $date; 
  	$this->Arg = $arg;
    $sql = "SELECT SUM(price*quantity) AS amount FROM ms_details 
      		WHERE salesid=$this->Sid";
    $amount = $this->select($sql);
    //echo $arg;
    //$campo=($arg==1)?'credit':'debit';
    $campo = 'debit';
    if ($this->Arg==='Ventas'||$this->Arg==='Compras'||$this->Arg==='1'||$this->Arg==='2') {
    	$total = $amount['amount'];
    	$sql="UPDATE ms_sales set amount =?, $campo=?, balancedue=?
    	WHERE salesid = $this->Sid";
    	$arrData = array($total, $total, $total);
    }else{ //presup?
    	$sql="UPDATE ms_sales set amount =? WHERE salesid = $this->Sid";
    	$arrData = array($amount['amount']);
    }
    return $this->update($sql, $arrData);
}

	public function insPerception(int $clid , string $fecha, float $importe, int $banco, int $pays, int $acco, string $notas, $newAux ){
		$this->intAcco  = $acco;
		$cuenta = ($this->intAcco==2)?'debit':'credit';
  		$sql ="INSERT INTO ms_sales (clientid, salesdate, $cuenta, bankid, companyid, 
									pays, notes, saux, user) 
		VALUES(?,?,?,?,?,   ?,?,?,? )";
		$arrData=array($clid, $fecha, $importe, $banco, $this->co, $pays, $notas, $newAux, $this->usr);
	    return $this->insert($sql, $arrData);
	}

  	public function pendingSales(int $tipoCli, int $client)  {
	    //$clType = ($tipoCli==2)? ' and (type = 2 or type = 6)':' and (type = 1 or type=3 or type =5)';
	    //proveedor o proveedor de servicios
	    $idco= $_SESSION['idcompany'];
	    $sql = " SELECT clientid as clid, `salesid` as sid, amount as monto, balancedue as saldo, status as estado 
				from ms_sales WHERE clientid=$client
	        	and ms_sales.status <> 2 and balancedue <>0 order by salesdate";
	    $request = $this->select_all($sql);
	    return $request;
	} 

  public function updateCpacoSales(int $client, int $slsId, int $nuevo_id, int $status, float $balancedue, float $imputar){
    $this->Client     = $client;	    $this->intId  = $slsId;
    $this->intStatus  = $status;	    $this->intReq = $nuevo_id;
    $this->floBalance = $balancedue;  	$this->fImp   = $imputar;

    $sql = "UPDATE ms_sales SET balancedue = ?, status = ?, pays=?
    WHERE salesid = $this->intId";
    $arrData = array($this->floBalance, $this->intStatus, $this->intReq);
    $request = $this->update($sql, $arrData);
    //echo$sql;

    $sql="INSERT INTO ms_imputation (clientid,sid,pyd,amt) VALUES(?,?,?,?)";
    $arrData=array($this->Client, $this->intId, $this->intReq, $this->fImp); 
    $request = $this->insert($sql, $arrData);
    return $request;
  }



	///
	public function insertAvai(string $query, array $arrValues)	{		
		$this->strquery = $query;
		$insert = $this->conexion->prepare($this->strquery);
		$resInsert = $insert->execute($this->arrvalues);			
		if ($resInsert) {$lastInsert = $this->conexion->lastInsertId();
		}else{$lastInsert = 0;}			
		return $lastInsert;
	}
	///

	public function my_alter(string $sql){
		$this->strquery = $sql;
		$alter = $this->conexion->execute($this->strquery);
		return $alter;
	}
}
?>

