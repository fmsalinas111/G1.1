<?php
class M_Ledger extends Mysql{
	public function __construct()	{		parent::__construct(); 	}
	
  public function selCC(int $id){
    $this->intTipo = $id;
		$sql = "select salesid as si, saux, notes, UNIX_TIMESTAMP(created) as ft,
      DATE_FORMAT(salesdate, '%d/%m/%y') as ffecha, salesdate as fecha,   clientname, amount,
      if (C.cltype=5,coalesce(dataname,notes),
	      if ((isnull(dataname) ),'*compra*', coalesce(dataname,'') ) )AS bank,
      if(STATUS=2 OR STATUS=3,'n', if(amount>0, 'e', 'r')) as payd,
      if(debit > 0, debit, 0) as cargo,
      if(credit> 0, credit, 0) as abono, 
          @running_total := @running_total + ms_sales.debit-ms_sales.credit AS balance 
      FROM ms_sales JOIN (SELECT @running_total := 0) r 
          INNER JOIN ms_clients C ON C.clientid = ms_sales.clientid
          LEFT JOIN ms_data BANK ON BANK.dataid = ms_sales.bankid
          WHERE C.clientid=$this->intTipo 
          and (debit+credit<>0)
          ORDER BY saux ";
          //track  and (debit+credit<>0)
          $sqle = "
          SELECT 
    salesid AS si, 
    saux, 
    notes, 
    -- UNIX_TIMESTAMP(created) AS ft,
    DATE_FORMAT(salesdate, '%d-%m-%Y') AS ffecha, 
    salesdate AS fecha,   
    clientname, 
    amount,
    CASE 
        WHEN C.cltype = 5 THEN COALESCE(dataname, notes)
        WHEN dataname IS NULL THEN '*compra*'
        ELSE COALESCE(dataname, '')
    END AS bank,
    CASE 
        WHEN STATUS IN (2, 3) THEN 'n'
        WHEN amount > 0 THEN 'e'
        ELSE 'r'
    END AS payd,
    CASE WHEN debit > 0 THEN debit ELSE 0 END AS cargo,
    CASE WHEN credit > 0 THEN credit ELSE 0 END AS abono, 
    @running_total := @running_total + ms_sales.debit - ms_sales.credit AS balance 
FROM ms_sales 
JOIN (SELECT @running_total := 0) r 
INNER JOIN ms_clients C ON C.clientid = ms_sales.clientid
LEFT JOIN ms_data BANK ON BANK.dataid = ms_sales.bankid
WHERE C.clientid = :clientid 
  AND (debit + credit <> 0)
ORDER BY saux;

          ";
		$request = $this->select_all($sql);
    //echo $sql;
		return $request;
  }
  
  public function selBanks(int $id) {
    $this->intType = $id;    //$this->Idco = $_SESSION['idcompany'];
    $sql = "SELECT DA.dataid as fieldId, DA.dataname as fieldName, DA.dad as aux
            FROM ms_data DA
            WHERE companyid = $this->co AND datatype = $this->intType and datastatus
            order by dataname";
            //echo $sql.'<hr>';
    $request = $this->select_all($sql);
    return $request;
  } 
  
  public function setIncome(array $fields ){ 
  	//print_r($fields);
      $this->intId = $fields['id'];
      $cuenta = 'credit';
     if ($this->intId ===0){//nuevo
        $sql ="INSERT INTO ms_sales (clientid, salesdate, $cuenta, bankid, saux, companyid, user, acctype) 
        VALUES(?,?,?,    ?,?,?,    ?,?)";
		$arrData = array($fields['client'], $fields['fecha'],  $fields['importe'], $fields['bank'], $fields['aux'], $this->co, $this->usr ,1);
        $request = $this->insert($sql, $arrData);
     }else{
		    $sql = "UPDATE ms_data SET dataname=?, datadescription=?, datastatus=?, dad=?
      				WHERE dataid = $this->intId
      				AND companyid = $this->co";
      	$arrData = array($fields['nombre'], $fields['description'], $fields['estado'], $fields['dad']);
        $request = $this->update($sql, $arrData);
      } 
      return $request;
  }
  public function setIncome0 (int $clid , string $fecha, float $importe, int $banco, int $req, int $acco, string $newAux, string $notas){ 
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
  
  
  
  
}?>
