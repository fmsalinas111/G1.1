<?php 
  class M_Buysal extends Mysql{
	public function __construct()	{		parent::__construct(); 	}
    public int $intTipo; public  int $Id;
    public int $Client;
  public function selSales(int $cltype)  {
    $sql = "select salesid as si, saux, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as fecha, salesdate as ffecha, SA.clientid as clid,
      CONCAT_WS ('|',SA.`status`, CONCAT_WS (' ', clientname, clientlastname)) AS fullname, 
      amount, SA.ref, SA.status as stt, cltype as clType, depot as dep
      FROM ms_sales  SA
      INNER JOIN ms_clients C ON C.clientid = SA.clientid 
      WHERE SA.companyid = $this->co AND bankid=0 "; 
      //echo $sql;
    return $this->select_all($sql);
  } 

  public function selSalesIuri()  {
    $idco= $_SESSION['idcompany'];
    $sql = "select salesid as si, saux, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as fecha, salesdate as ffecha, 
      SA.clientid as clid,
      CONCAT_WS (' ', clientname, clientlastname) AS fullname,
      amount, SA.companyid,SA.ref, SA.status as stt, cltype as clType, depot as dep
      FROM ms_sales  SA
      INNER JOIN ms_clients C ON C.clientid = SA.clientid 
      WHERE SA.companyid = $idco AND bankid=0 "; //and C.cltype=$cltype";
      //echo $sql;
    return $this->select_all($sql);
  } 

	public function selSale(int $salesid)	{ //toDel
    $this->intTipo = $salesid;
		$sql = "select salesid as si, saux, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as ffecha, SA.clientid as clid, clientname, amount, 
      FROM ms_sales SA 
        INNER JOIN ms_clients C ON C.clientid = SA.clientid
      WHERE C.clientid=$this->intTipo  ORDER BY saux ";
		return $this->select_all($sql);
	}	

  public function selClientBySid($id){ //cabecera del pdf
    $this->Id = $id;
    $sql = "select salesid as sid, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as fecha, salesdate as ffecha, 
      DATE_FORMAT(duedate, '%d-%m-%Y') as due, duedate as fdue, 
      CONCAT_WS (' ', clientname, clientlastname) AS fullname,
      amount, clientaddress as addr, D.dataname as iva, clientci as cuit 
      FROM ms_sales SA
      LEFT JOIN ms_clients C ON C.clientid = SA.clientid 
      LEFT JOIN ms_data D ON D.dataid = C.iva
      WHERE salesid = $this->Id";
      //tal vez no hace falta el join con ms_sales, ver si se puede agregar date y duedate al array
      //echo $sql;
    return $this->select($sql);
  }

  # tracking 3 setBuy?
  /*setBuy(int $id, int $client, string $date, string $arg, 
      string $nAux, float $total, string $notes, string $ref, string $depot, string $dueDate)
  setBuySa(int $id, int $client, string $date, string $duedate, string $arg, 
      string $nAux, float $total, string $notes, string $ref, int $cltype, int $depot, int $acco, int $stt)
  sOrder(int $id, int $client, string $date, string $duedate, string $arg, 
                          int $cltype, int $depot, string $nAux, int $acco)
  */
  public function setBuy(int $id, int $client, string $date, string $arg, 
    string $nAux, float $total, string $notes, string $ref, string $depot, string $dueDate){      
      $this->Id = $id;          $this->Client = $client;      $this->Date = $date;
      $this->Notes = $notes;    $this->Arg = $arg;            $this->Ref = $ref;   
      $this->Dep = $depot;      $this->DueDate = $dueDate;
      $this->Company= $_SESSION["idcompany"];  $this->User= $_SESSION["userid"];
    $accType = ($arg==='Venta')? 1 : 2; //venta / compra
    //$app = $_SESSION['app'];
    if ($id==0)   { //new
      if ($arg==='Venta'||$arg==='Compra') {
        $sql ="INSERT INTO ms_sales (clientid, companyid, salesdate, notes, saux, `status`, 
                          amount, debit, balancedue, duedate, ref, depot, user, acctype)  
          VALUES(?,?,?,  ?,?,?,  ?,?,?,  ?,?,?,  ?,?)";
        $arrData = array($this->Client, $this->Company, $this->Date, $this->Notes, $nAux, 1, $total, $total, $total, 
                      $this->Date, $this->Ref, $this->Dep, $this->User, $accType);
      }else{//presupuesto
        $sql ="INSERT INTO ms_sales (clientid, companyid, salesdate, notes, saux, amount, duedate, ref, user) VALUES(?,?,?,?,?,?,?, ?,?)";
        $arrData = array($this->Client, $this->Company, $this->Date, $this->Notes, $nAux, $total, $this->DueDate, $this->Ref, $this->User);
      }
      //else compra...
      $return = $this->insert($sql, $arrData);
    }else{ //udpt
      $sql="UPDATE ms_sales SET clientid=?, salesdate=?, notes=?, ref=?, depot=?     WHERE salesid=$this->Id";
      $arrData = array($this->Client, $this->Date, $this->Notes, $this->Ref, $this->Dep);
      $return = $this->update($sql, $arrData);
    }
    //echo $arg.''.$sql;    print_r($arrData);
    return $return;
  }

  public function setBuySa(int $id, int $client, string $date, string $duedate, string $arg, 
    string $nAux, float $total, string $notes, string $ref, int $cltype, int $depot, int $acco, int $stt){  
    $this->Id = $id;         $this->Client = $client;
    $this->Date = $date;     $this->Due = $duedate;   $this->Notes = $notes;
    $this->Arg = $arg;     $this->Ref = $ref;         $this->Cltype = $cltype;
    $this->Dep = $depot;   $this->Acc = $acco;        $this->Stt = $stt;
    
    if ($id==0)   { //new
      //solo para compra y venta, si es presup, debe ir sin debit, credit no bdue
        $sql ="INSERT INTO ms_sales (clientid, companyid, salesdate, notes, saux, `status`, 
                          amount, duedate, ref, debit, balancedue, acctype, depot, user)  
          VALUES(?,?,?,  ?,?,?,  ?,?,?,  ?,?,?,  ?,?)";
        $arrData = array($this->Client, $this->co, $this->Date, $this->Notes, $nAux, 1, $total, 
                  $this->Date, $this->Ref, $total, $total, $this->Acc, $this->Dep, $this->usr );
      $return = $this->insert($sql, $arrData);
    }else{ //udpt
      $sql="UPDATE ms_sales  SET clientid=?, salesdate=?, duedate =?, 
            notes=?, ref=?, depot=? 
            WHERE salesid=$this->Id";
      $arrData = array($this->Client, $this->Date, $this->Due,  $this->Notes, $this->Ref, $this->Dep);
      $return = $this->update($sql, $arrData);
    }
    //echo $sql;
    //print_r($arrData);
    return $return;
  }


  public function sOrder(int $id, int $client, string $date, string $duedate, string $arg, 
                         int $cltype, int $depot, string $nAux, int $acco){  

    $this->Id    = $id;      $this->Client= $client; //vendor
    $this->Date  = $date;    $this->Due   = $duedate; 
    $this->AType = $cltype;  $this->Depot = $depot;     $this->Acc = $acco;

    $this->Due = ($duedate=="")? date("Y-m-d",strtotime($duedate."+ 10 days")): $duedate; 
    if ($this->Id==0) {
      $sql = "INSERT INTO ms_sales (clientid, salesdate, duedate, `status`, companyid, acctype, depot, saux, user) VALUES(?,?,?, ?,?,?, ?,?,?)";
      $this->Stt = ($arg==='Compras'||$arg==='CuentasporPagar')? 1:0; 
      $arrData = array($this->Client, $this->Date, $this->Due, 
        $this->Stt, $_SESSION['idcompany'],$this->Acc, $this->Depot, $nAux, $this->usr );
      $return=$this->insert($sql, $arrData);
    }else{
      echo 'pepe';
      $sql = "UPDATE ms_sales SET clientid=?, salesdate=?, duedate=? 
        WHERE salesid=$this->Id";
      $arrData = array($this->Client,$this->Date,$this->Due);
      $return=$this->update($sql, $arrData);      
    }
    return $return;
  }
  #end tracking


  public function setBuyDetails(int $newSale, array $cart, string $dossier, int $depot, string $date, string $arg){
    //print_r($cart);
    $this->Id = $newSale; $arrData=[$this->Id]; $amount=0;
    foreach ($cart as $v) {
      $qty = ($dossier==='minor')?$v["cantidad"]:$v["cantidad"]*$v["multiplo"];
      $notInventoried = ($v["pid"]<1)?$v["product"]:'';
      $arrData = array($this->Id, $v["precio"], $v["pid"], $qty, $notInventoried);
      $sql ="INSERT INTO ms_details(salesid, price, productid, quantity, comments) 
             VALUES(?,?,?, ?,?)";
      $this->insert($sql, $arrData);
      $amount += ($v["precio"]*$v["cantidad"]);
    }
    #registra salida en inventario SI NO ES PRESUPUESTO
    if ($arg!=='Presupuesto') {
      $arrData = array($this->Id, $v["precio"], $v["pid"], $qty, $depot, $_SESSION["idcompany"], $date);
      $sql ="INSERT INTO ms_inventory(outputref, unitprice, productid, `output`, depot, companyid, inventorydate) 
             VALUES(?,?,?,  ?,?,?,  ?)";
      $this->insert($sql, $arrData);
    }
  }

  
  public function setDetail(int $id, int $sale, int $product, float $quant, float $price, string $notes){
    $this->Id   = $id;        $this->Sid =$sale;      $this->Product=$product;
    $this->Notes=$notes;      $this->Quant=$quant;    $this->Price=$price;
    
    if ($id==0)   { //new
      $sql ="INSERT INTO ms_details (salesid, productid, quantity, price, comments) VALUES(?,?,?, ?,?)";
      $arrData=array($this->Sid, $this->Product, $this->Quant, $this->Price, $this->Notes);
      $return = $this->insert($sql, $arrData);
    }else{//updt
      $sql = "UPDATE ms_details SET productid=?, quantity=?, price=?, comments=?
              WHERE detailid = $this->Id";
      $arrData = array($this->Product,$this->Quant,$this->Price,$this->Notes);
      $return = $this->update($sql, $arrData);
    }
    return $return;
  }


  public function setIevent(int $id, int $det_id, int $sale, string $date, 
   float $price, int $type, int $staff){
    $this->Id   = $det_id;    $this->Sid =$sale;    $this->Fecha=$date;  
    $this->Type = $type;      $this->Staff=$staff;
    
    if ($id==0)   { //new
      $sql ="INSERT INTO i_events (det_id, salesid, eventdate, `type`, staff) VALUES(?,?,?, ?,?)";
      $arrData=array($this->Id, $this->Sid, $this->Fecha, $this->Type, $this->Staff);
      $return = $this->insert($sql, $arrData);
    }else{//updt
      $sql = "UPDATE ms_details SET productid=?, quantity=?, price=?, comments=?
              WHERE detailid = $this->Id";
      $arrData = array($this->Product,$this->Quant,$this->Price,$this->Notes);
      $return = $this->update($sql, $arrData);
    }
    return $return;
  }
  public function deleteDetail(int $id, int $sid){
    $this->intId = $id;    $this->Sid =$sid; $sql1='';
    if ($sid===-99) {//full deletion sls+details
      $sql ="DELETE FROM ms_sales WHERE salesid = $this->intId";    $req = $this->delete($sql);
      $sql1.=$sql.'; ';
      $sql ="DELETE FROM ms_details WHERE salesid = $this->intId";  $req = $this->delete($sql);      
      $sql1.=$sql.'; ';
      $sql ="DELETE FROM ms_inventory WHERE outputref = $this->intId"; $req = $this->delete($sql);      
      $sql1.=$sql.'; ';
    }else{
      $sql ="DELETE FROM ms_details WHERE detailid = $this->intId"; $req = $this->delete($sql);
      $sql ="DELETE FROM ms_sales WHERE salesid = $this->intId";    $req = $this->delete($sql);
      $sql1.=$sql.'; ';
    }
    //echo $sql1.'<hr>';
    return $req;
  }
  

  public function setStock(int $id, int $sale, int $product, float $quant, float $price, string $notes, int $arg, int $depot){
    $this->Id   = $id;        $this->Sid =$sale;      $this->Product=$product;
    $this->Notes=$notes;      $this->Quant=$quant;    $this->Price=$price;
    $this->Depot=$depot;

    $io = ($arg==2)?'input':'output'; //2=entrada, 1=salida
    $ioRef= ($arg==2)?'inputRef':'outputRef';
    $this->Company= $_SESSION["idcompany"];  $this->User= $_SESSION["userid"];
    if ($id==0)   { //new
      $sql ="INSERT INTO ms_inventory ($ioRef, productid, $io, unitprice, notes, companyid, depot) 
              VALUES(?,?,?,  ?,?,?,  ?)";
      $arrData=array($this->Sid, $this->Product, $this->Quant, $this->Price, $this->Notes, $this->Company, $this->Depot);
      $return = $this->insert($sql, $arrData);
    }else{//updt
      $sql = "UPDATE ms_details SET productid=?, quantity=?, price=?, comments=?
              WHERE detailid = $this->Id";
      $arrData = array($this->Product,$this->Quant,$this->Price,$this->Notes);
      $return = $this->update($sql, $arrData);
    }
    //echo 'arg: '.$arg.'<br>'.$sql;    print_r($arrData);
    return $return;
  }

  public function setSellDetails(int $newSale, array $cart, int $depot, string $date){
    //print_r($cart);
    $this->Id = $newSale; $arrData=[$this->Id]; $amount=0;
    foreach ($cart as $v) { $note='';
      $qty = $v["qty"];//($dossier==='minor')?$v["qty"]:$v["qty"]*$v["multiplo"];
      $note = h($v["note"],'');
      $arrData = array($this->Id, $v["price"], $v["prid"], $qty, $note);
      $sql ="INSERT INTO ms_details(salesid, price, productid, quantity, comments) 
             VALUES(?,?,?,?,?)";
      $this->insert($sql, $arrData);
      $amount += ($v["price"]*$v["qty"]);
      #registra salida en inventario
      $arrData = array($this->Id, $v["price"], $v["prid"], $qty, $depot, $_SESSION["idcompany"], $date);
      $sql ="INSERT INTO ms_inventory(outputref, unitprice, productid, `output`, depot, companyid, inventorydate) 
             VALUES(?,?,?,  ?,?,?,  ?)";
      $this->insert($sql, $arrData);
    }
  }



}?>