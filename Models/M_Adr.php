<?php 
  class M_Adr extends Mysql{	public function __construct()	{parent::__construct();}

//  ALTER TABLE `ms_sales`
//  ADD COLUMN `user` INT NULL AFTER `saux`;
 

  public function alter(){
    $sql= "ALTER TABLE `ms_sales`
            ADD COLUMN `user` INT NULL AFTER `saux`;";
    $request = $this->my_alter($sql);            
  }

  public function insertAdr(string $data, int $tipo, $campo1, $campo2, $campo3, $campo4, $campo5, $campo6, $campo7, $campo8, $campo9, $campo10 ){
    $return ="";
    $this->strData = $data;  
    $this->strCampo1 = $campo1;  $this->strCampo2 = $campo2;
    $this->intCompany = $_SESSION['idcompany'];    $this->intStatus  = 1;
    $this->intTipo  = $tipo; $this->User = $_SESSION['userid'];

    if ($this->strData =='client') {
      $table = 'ms_clients'; $fieldId = 'clientid';
      $sql ="INSERT INTO $table (clientname, companyid, clstatus, cltype, user ) 
      VALUES(?,?,?,?,? )";
      $arrData=array($this->strCampo1, $this->intCompany,$this->intStatus,$this->intTipo, $this->User);
    }
    if ($this->strData =='product') { $table = 'ms_products'; $fieldId = 'productid';
      $sql ="INSERT INTO $table (productname, companyid, prodstatus, `prodtype`) 
      VALUES(?,?,?,? )";
      $arrData=array($this->strCampo1, $this->intCompany, $this->intStatus, $this->intTipo);
    }

    if ($this->strData =='productPay') {$table = 'ms_products'; $fieldId = 'productid';
      $sql ="INSERT INTO $table (productname, companyid, prodstatus, `prodtype`, client)  VALUES(?,?,?,?,? )";
      $arrData=array($this->strCampo1, $this->intCompany, $this->intStatus, $this->intTipo, $this->strCampo2);
    }


    if ($this->strData =='data') { $table = 'ms_data'; $fieldId = 'dataid';
      $sql ="INSERT INTO $table (dataname, datatype, companyid, dad) VALUES(?,?,?,?)";
      $arrData=array($this->strCampo1, $this->intTipo, $this->intCompany, $this->strCampo2);
    }


    if ($this->strData=='sales') {$table = 'ms_sales'; $fieldId = 'salesid';
      $this->Fecha = $campo3;  $this->Due = $campo4;  
      $this->Notes = $campo6;  $this->Amt = $campo5; //importe 
      $sql ="INSERT INTO $table (clientid, companyid, salesdate, duedate, amount, notes, balancedue, debit, status) 
      VALUES(?,?,?, ?,?,?, ?,?,?)";
      $arrData=array($this->strCampo1, $this->intCompany,$this->Fecha,$this->Due, 
        $this->Amt ,$this->Notes,$this->Amt ,$this->Amt, $this->intStatus );      
    }

    //$sql = "SELECT * FROM $table WHERE $fieldId =-99";
    //$request = $this->select_all($sql);
    //if (empty($request)) {  
      $request = $this->insert($sql, $arrData);
      $return = $request;
    //}else{$return ="exist";}
      //echo "string".$query_insert;
      //print_r($arrData);
    return $return;
  }

  public function inSpec_prod($name, $idx){
    $this->Name = $name; $this->Idx = $idx; $this->Stt=1; $this->Co = $_SESSION['idcompany']; 
    $sql ="INSERT INTO ms_products(productname, companyid, data, prodstatus, categoryid) VALUES(?,?,?, ?,?)";          
    $arrData = array($this->Name,$this->Co ,$this->Idx, $this->Stt, $this->Idx); 
    $this->insert($sql, $arrData);
  }
  public function upData(int $id, string $c1 ){
    $this->intId = $id;     $this->C1 = $c1;
    
    //$this->strApellido = $c2;   
    //$this->Name = $name; $this->Idx = $idx; $this->Stt=1; $this->Co = $_SESSION['idcompany']; 
    if ($id==0)   { //new
      $return='pepe';
    }else{//updt
      $sql = "UPDATE ms_data SET dataname=?
              WHERE dataid = $this->intId and companyid=".CO();
      //echo $sql;
      $arrData = array($this->C1);
      $return = $this->update($sql, $arrData);
    }
    return $return;
  }

  
}?>