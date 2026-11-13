<?php 
class M_Receipt extends Mysql{
	public function __construct()	{parent::__construct(); 	}

  public function selConcept(int $pyd)  {//pyd
    $this->intPyd    = $pyd;  //impu.pyd
    $sql = "SELECT pyd, sid, amt, notes as concept
          FROM ms_imputation I
          JOIN ms_sales S ON S.salesid=I.sid
          WHERE pyd=$this->intPyd";
        //echo $sql;
    return $this->select($sql);
  } 

  public function selReceipt(int $id, string $ft){
    $this->intId = $id; 
    $sql = "SELECT salesid as pyd, clientid as cli, UNIX_TIMESTAMP(created) as ft,
            DATE_FORMAT(salesdate, '%d-%m-%Y') as fec_receipt,
            clName(clientid) as nombre, credit as abono, companyid as co
        from ms_sales
        where salesid=$this->intId
        and UNIX_TIMESTAMP(created) = $ft";
        //echo $sql;
    return $this->select($sql);
  }


}?>