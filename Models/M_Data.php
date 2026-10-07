<?php 
  class M_Data extends Mysql{
    //private $co; 
    public function __construct()	{		       parent::__construct(); 	    }
    
  public function selectData(int $id)	{
    $this->intType = $id;
    $iduser = $_SESSION['userid'];
    $this->intIdco = $_SESSION['idcompany'];
    if ($this->intType==2) {//banks
      /*$sql ="SELECT dataid, dataname, datadescription, datastatus, 
      ifnull(sum(ifnull(credit-debit,0)),0) as saldo   from ms_data 
      left  JOIN ms_sales on ms_sales.bankid = ms_data.dataid 
      WHERE ms_data.companyid = $this->intIdco AND datatype = 2
      group BY dataname"; */
      $sql = "SELECT dataid, dataname, datadescription, 
            COALESCE (SUM( if(S.acctype=1,credit, 
              if(S.acctype=2,-credit, 
                if(S.acctype=3 AND S.credit>0, credit,
                  if(S.acctype=3 AND S.debit>0, -debit,0)) ))
                  ),0) AS saldo, datastatus as stt, dad 
          from ms_data D
          LEFT  JOIN ms_sales S ON S.bankid = D.dataid
          WHERE datatype = 2 AND D.companyid = $this->intIdco
          GROUP BY dataname";
    }elseif ($this->intType==4) {
      $sql ="SELECT ms_data.*, price as saldo FROM ms_data
              left JOIN ms_products ON dataid = ms_products.data
              WHERE ms_data.companyid = $this->intIdco
              AND datatype = 4";
    }elseif($this->intType===17) {
      $sql ="SELECT ms_data.*, ' ' as saldo FROM ms_data
              WHERE ms_data.companyid = $this->intIdco
              AND datatype = $this->intType";
    }else{
  		$sql = "SELECT ms_data.*, ' ' as saldo FROM ms_data
            WHERE companyid = $this->intIdco
            AND datatype = $this->intType
            AND dad<=0";
    }
    
    //echo $sql.'<br>'.$this->intType;
		$request = $this->select_all($sql);
		return $request;
	}	


  public function selSubcat(int $dad) {
    $this->Dad = $dad;  $this->intIdco = $_SESSION['idcompany'];
    $sql = "SELECT DA.dataid as fieldId, DA.dataname as fieldName, dad as aux 
      FROM ms_data DA WHERE companyid = $this->intIdco AND dad >0 order by dataname";
    return $this->select_all($sql);
  } 

  public function selDataByType(int $id) {
    $this->intType = $id;
    #rubro comercial o module
    $this->intIdco = ($this->intType==15||$this->intType==19)?-1:$_SESSION['idcompany'];
    if ($this->intType==-2) $this->intType=" and datatype=1 and datatype=3 and datatype=9 and datatype=10 and datatype=11 and datatype=15 and datatype=16 ";
      else $this->intType = " and datatype = $this->intType ";
    $sql = "SELECT DA.dataid as fieldId, DA.dataname as fieldName,
            DA.datadescription as ddesc, dad as aux 
            FROM ms_data DA
            WHERE companyid = $this->intIdco and datastatus $this->intType 
            order by dataname";
    //echo $sql.'<hr>';
    $request = $this->select_all($sql);

    return $request;
  } 

  public function selDataByType_Co(int $id) {
    $this->intType = $id;    //$this->Idco = $_SESSION['idcompany'];
    $sql = "SELECT DA.dataid as fieldId, DA.dataname as fieldName, DA.dad as aux
            FROM ms_data DA
            WHERE companyid = $this->Idco AND datatype = $this->intType and datastatus
            order by dataname";
            //echo $sql.'<hr>';
    $request = $this->select_all($sql);
    return $request;
  } 


  public function selDataTbl($id, string $src, int $prid=0){
    $this->Id = $id;
    switch ($src){
      case 'details':
          $sql = "SELECT detailid as detid, DE.productid as prid,  DE.price as precio,
                  quantity as cantidad, comments as notas, 
                  if (productid<0, comments, prodName(productid)) AS product,
                  E.eventdate, E.staff, username AS staffName, E.`type`, E.invoiced, E.eventid as eid
            FROM ms_details DE 
              LEFT JOIN  i_events E ON E.det_id=DE.detailid
              LEFT JOIN ms_users U ON U.userid=E.staff
            WHERE DE.salesid = $this->Id 
            order by product";
          break;
      case 'prod_details':
        $sql = "SELECT DE.pdetailid as detid, DE.supply as prid, productname as prodName, 
          DE.unitprice as precio, qty as cantidad, unit, notes as notas, qproduced as qprod
            FROM g_proddetails DE LEFT JOIN ms_products PR ON PR.productid=DE.supply
            WHERE DE.orderid= $this->Id ";
        break;
      case 'inventory':
          $sql = "SELECT inventoryid as invId, I.productid as prid, productname AS producto, D.dataid as colorId, D.dataname AS color, input as entrada,
           I.notes AS notas
              FROM ms_inventory I
           LEFT JOIN ms_products PR ON PR.productid=I.productid
           LEFT JOIN ms_data D ON D.dataid=I.color
              WHERE inputRef = $this->Id ";
          if ($prid>0) $sql .= " AND I.productid = $prid ";
        break;
      case 'subcat':
          $sql = "SELECT dataid, dataname
              FROM ms_data WHERE dad = $this->Id and datatype=3";
          break;
      case 'tercer':
          $sql = "SELECT SA.salesid as sid, salesdate AS fecha, SA.clientid AS cl,ref, productname AS product, quantity AS qa, DE.price AS pri,
          CONCAT_WS (' ', clientname, clientlastname) AS fullname, SA.clientid as idvendor, P.productid as idservice, comments as notes
            FROM ms_sales SA
            left JOIN g_production GP ON GP.o_code=SA.ref
            LEFT JOIN ms_details DE ON DE.salesid=SA.salesid
            LEFT join ms_products P ON P.productid=DE.productid
            LEFT JOIN ms_clients C ON C.clientid=SA.clientid
            WHERE GP.o_code='$this->Id'";
          break;
      case 'stockDeta':
            $sql = "SELECT I.inventorydate as iDate, I.unitprice as price, I.output as salida, I.depot,
              D.dataname AS depo, input as entrada, I.notes AS notas 
              FROM ms_inventory I 
              LEFT JOIN ms_data D ON D.dataid=I.depot
              WHERE I.productid = $prid ";
            break;
  
      default:
        echo "esta regla es por defecto";
        break;
    }
    //echo $sql.'<br>';
    $request = $this->select_all($sql);
    return $request;
  }

  public function selClientBySid($id){
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
      //echo $sql;
    return $this->select($sql);
  }

  public function selReceiptBySid($id){
    $this->Id = $id;
    $sql = "select SA.credit, dataname AS bank
            FROM ms_sales SA 
            LEFT JOIN ms_data D ON D.dataid = SA.bankid
            WHERE salesid =  $this->Id";
      //echo $sql;
    return $this->select($sql);
  }

  public function multiDtype(string $ar){
    $f1 = explode(',',$ar);  $nArr=[]; 
    $_ar2 = (in_array("10", $f1))?" OR D1.datatype=10 ":'';
    foreach ($f1 as $v) { if ($v!=='10') array_push($nArr,$v); }
    $_ar = implode(', ',$nArr);
    if(strlen($_ar)>0) $_ar = " AND datatype IN ($_ar) ";
    return $_ar;
  }
  public function selectDataCmb(int $id, string $src, int $cli, string $ar) { 
    $and ='';   $idco = ($_SESSION['idcompany']); $iduser = ($_SESSION['userid']);   
    $this->strSrc=$src;   $this->Cli=$cli;  $this->intType = $id; $sql='';
    
    if ($this->strSrc=='arancel') {
      $sql ="SELECT productid AS fieldId, CONCAT(price,': ', productname) AS fieldName, price, productname, client
        FROM `ms_products`
        WHERE (ms_products.client = $this->intType OR ms_products.client=0)";

    }elseif($this->strSrc=='client') {
      $type= ($this->intType>0)?" and cltype = $this->intType":'';
      $sql = "SELECT clientid as fieldId, CONCAT_WS (' ',clientname, clientlastname) as fieldName, cltype as aux
      FROM ms_clients WHERE companyid = $idco ";
      $and = " AND clstatus $type" ;
      

    }elseif($this->strSrc=='product') {
      $args =argTo2($id);
      $this->intType = $args['arg1'];  $inactive = ( $args['arg2']>0 )?  ' and not inactive ': '';
      $type=  ($this->intType>0)?"and prodtype = $this->intType":'';
      $sql = "SELECT productid as fieldId, productname as fieldName, 
              prodtype as aux, price as precio, inactive as invisible
              FROM ms_products WHERE companyid = $idco $type $inactive";

    }elseif($this->strSrc=='productPay') {
      /*$sql = "SELECT concat(productid,'-',P.`client`) as fieldId, productname as fieldName        FROM ms_products P
       INNER JOIN ms_clients C ON C.clientid =  P.`client`
       WHERE  C.`cltype`=6 ";*/
      $sql = "SELECT productid as fieldId, productname as fieldName, client as aux   FROM ms_products 
        WHERE companyid=$idco ";
      $and = " and prodtype = $this->intType ";

    }elseif($this->strSrc=='staff') {
      $sql = "SELECT U.userid as fieldId, username as fieldName
              FROM ms_companies CO
              JOIN ms_users U ON U.companyuser=CO.userid
              
              where  CO.companyid=$idco "; //companyuser=$idco OR
      //$sql = "SELECT userid as fieldId, username as fieldName
        //FROM ms_users WHERE companyuser = $idco";

    }elseif($this->strSrc=='data') {
      if ($this->intType===10 or $this->intType===12)  $idco=-1; //10.-bussinessCateg 12.-Ciudad
      $tabla = 'ms_data'; 
      $and = (strlen($ar)>0)?$this->multiDtype($ar):" AND datatype = $this->intType ";
      $sql = "SELECT dataid as fieldId, dataname as fieldName, datastatus, dad as erp, datatype as type
      FROM $tabla 
      WHERE companyid = $idco and datastatus" ;      

if ($this->intType===3){
        $sql = "SELECT dataid as fieldId, dataname as fieldName, datastatus, dad, 
                  if(dad=0, dataid , dad) AS ddd FROM ms_data
                WHERE companyid = $idco and datastatus ";
        }
  
    }elseif($this->strSrc=='myapp') {
      $tabla = 'ms_projects'; $and = " AND active ";
      $sql = "SELECT projectid as fieldId, projectname as fieldName, active FROM ms_projects WHERE ms_projects.projectid NOT IN ( SELECT ms_projbyuser.projectid FROM ms_projbyuser WHERE ms_projbyuser.projectid IS NOT NULL and ms_projbyuser.userid =$iduser)";

    }elseif($this->strSrc==='gallery'){
      $sql = "SELECT ms_bcard.companyid as fieldId, ms_bcard.companyname as fieldName FROM ms_bcard WHERE  ms_bcard.cardstatus = 1 AND  
          ms_bcard.companyid <-1 ";
    }
    //if (($this->strSrc=='staff')) echo $sql;
    //if ($this->intType===3) $sql.=" $and ORDER BY ddd,dataname";      else   
    $sql.= " $and ORDER BY fieldName";
    //if ($this->intType===3)echo $sql.'<br>';
    $request = $this->select_all($sql);
    return $request;
  } 

  public function selectDataAdm(){
    $sql = "SELECT ms_data.*, ' ' as saldo FROM ms_data";
    return $this->select_all($sql);
  }

  public function selDefaults(string $ar=''){
    //$_ar = (strlen($ar)>0)?$this->multiDtype($ar):" AND datatype = $this->intType ";
    
    $f1 = explode(',',$ar);  $nArr=[]; 
    $_ar2 = (in_array("10", $f1))?" OR D1.datatype=10 ":'';
    foreach ($f1 as $v) { if ($v!=='10') array_push($nArr,$v); }
    $_ar = implode(', ',$nArr);
    if(strlen($_ar)>0) $_ar = " AND datatype IN ($_ar) ";
		// 1. Validar que el array no esté vacío para evitar errores de SQL
    
    $sql = "SELECT D.dataid did, D.datatype as type, D.dataname dName, 
                   D.datastatus stt, D.datadescription ddesc, dad 
          FROM ms_companies CO
          JOIN ms_data D ON D.companyid = CO.companyid 
          WHERE CO.companyid = $this->co $_ar
          UNION
          SELECT D1.dataid did, D1.datatype as type, D1.dataname dName, D1.datastatus stt, D1.datadescription ddesc, dad 
          FROM ms_companies CO1 JOIN ms_data D1 ON D1.companyid = CO1.companyid 
          WHERE CO1.companyid = -1 AND D1.datatype=15 $_ar2
          ";
    //echo $sql.'<hr>';
    $request = $this->select_all($sql);
    return $request;
  }  

  public function setDefaults(int $id, string $defaults){
    $this->intId = $id;    $this->Def = $defaults; 
    $sql = "UPDATE ms_users SET defaults=? WHERE userid = $this->intId";
    $arrData = array($this->Def);
    return $this->update($sql, $arrData);
  }

  public function selFData(){
    $this->Type=" and (datatype=1 or datatype=3 or datatype=9 or datatype=10 or datatype=11 or datatype=15 or datatype=16 or datatype=21 )";     
    $sql = "SELECT DA.dataid as fieldId, DA.dataname as fieldName,
      DA.datadescription as ddesc, dad as aux, datatype as type 
      FROM ms_data DA
        WHERE companyid = $this->co and datastatus $this->Type 
        order by dataname";    
    $request = $this->select_all($sql);
    //echo $sql;
    return $request;
  }

  public function ins_list(array $arrLIst, int $tipo){
    $sqlBase = "INSERT INTO ms_data(dataname, datatype, companyid) VALUES ";
    $placeholders = [];    $arrData = [];
    foreach ($arrLIst as $v) {
        $placeholders[] = "(?, ?, ?)"; // Aplanamos los valores manteniendo el orden esperado
        $arrData[] = $v;  $arrData[] = $tipo;  $arrData[] = $this->co;
    }
    $sql = $sqlBase . implode(", ", $placeholders);
    //echo $sql;
    $request = $this->insert($sql, $arrData);
    return $request;
    
  }
  
  public function ins_updData(int $id, string $dataname, string $descr, int $estado, int $tipo, string $price,  int $dad, int $frac){
    $this->intId = $id;    $this->DName = $dataname;    $this->Dsec = $descr;   
    $this->iStt = $estado; $this->Dtype = $tipo;          
    $this->Campo5 = $price;   //price desde klk
    $this->Dad = $dad;   //dad desde category
    $this->intCompany = $_SESSION["idcompany"];
    $this->Frac = $frac;   //fractionable desde category textil

    if ($frac==1) $this->Dad = -1;

    $sql = "SELECT * FROM  ms_data WHERE BINARY dataname = '$this->DName' 
            and companyid=$this->intCompany";
    $request = $this->select_all($sql);
    //ver la forma de rechazar si es el mismo nombre al menos en banc
    if (sizeof($request)>0&&$this->intId==0) return -2;
    
    if ($this->intId==0)   {//new
      $sql ="INSERT INTO ms_data (dataname, datadescription, companyid, datatype, datastatus, dad)   VALUES(?,?, ?,?,?,?)";
      $arrData = array($this->DName, $this->Dsec, $this->intCompany, $this->Dtype, $this->iStt, $this->Dad); 
      $request = $this->insert($sql, $arrData);
      $request = $request;
      //crear un registro en productos con el precio categoría
      if ($this->Dtype==4) {// si es especialidad médica
        $query_insert ="INSERT INTO ms_products(productname, description, companyid, data, prodstatus, price, categoryid) VALUES(?,?,?, ?,?,?,?)";          
        $arrData = array($this->DName, $this->Dsec, $this->intCompany, $request, $this->iStt, $this->Campo5, $request); // arma el array 
        $request_insert = $this->insert($query_insert, $arrData);
      }
      if ($this->Dtype==10) {// si es rubro
        $sql ="INSERT INTO ms_companies(companyname, page, userid) 
                VALUES(?,?,?)";
        $arrData = array($this->DName, $this->DName, $_SESSION['userid']); 
        $request = $this->insert($sql, $arrData);
      }
    }else{ //upd
      $sql = "UPDATE ms_data SET dataname=?,datadescription=?,datastatus=?,dad=?
      WHERE dataid = $this->intId";
      $arrData = array($this->DName, $this->Dsec, $this->iStt, $this->Dad);
      $request = $this->update($sql, $arrData);
      if ($this->Dtype==4) {// si es especialidad médica
        $sql ="UPDATE ms_products SET productname=?, description=?, price=?
        WHERE data=$this->intId";
        $arrData = array($this->DName, $this->Dsec, $this->Campo5); 
        $request = $this->update($sql, $arrData);
      }
    }
    //echo $sql.'\n';    print_r($arrData);
    return $request;
  }
  
  public function updStatus(int $id, int $visible){
    $this->intId = $id;    $this->Visible = $visible; 
    $sql = "UPDATE ms_data SET datastatus=? WHERE dataid = $this->intId";
    $arrData = array($this->Visible);
    return $this->update($sql, $arrData);
  }

  public function ins_subCat(int $id, string $scat, int $dad){
    $this->Id=$id; $this->Scat=$scat;  $this->Dad=$dad;    
    if ($id==0)   { //new
      $sql = "INSERT INTO ms_data (dataname, companyid, datatype, dad)   VALUES(?,?, ?,?)";
      $arrData = array($this->Scat, $_SESSION['idcompany'], 3, $this->Dad);
      $request = $this->insert($sql, $arrData);
    } else {
      $sql = "UPDATE ms_data SET dataname=? WHERE dataid = $this->Id";
      $arrData = array($this->Scat);
      $request = $this->update($sql, $arrData);
    } return $request;
  }

  public function delSubcat(int $id, int $sid){
    $this->intId=$id; $this->Sid=$sid; $this->Co=$_SESSION["idcompany"];
    $sql ="DELETE FROM ms_data 
    WHERE dataid = $this->intId and companyid=$this->Co";
    return $this->delete($sql);
  }


  public function ins_Scat(array $cats){
    $this->Cid = $_SESSION['idcompany'];
    $i = 0;
    foreach ($cats as $v) {
      $sql = "INSERT INTO ms_data (dataname, companyid, datatype, dad)   VALUES(?,?, ?,?)";
      $arrData = array($v, $this->Cid, 3, $i);
      $request = $this->insert($sql, $arrData);
      if($i===0)$i=$request;
    }
    return  $request;
  }

  public function selExistsProducts(int $id, int $type){ 
    $this->intId = $id; $this->intType = $type;
    //$campos = array ('','brand','', 'categoryid');
    $campo =  ($type==1) ? 'brand' : (($type==3) ? 'categoryid' : '');
    $sql = "SELECT productid as prid FROM ms_products 
      WHERE $campo = $this->intId and companyid =".$_SESSION['idcompany'];
    return $this->select_all($sql);
  }
  

  
  public function selExistsTrans(int $id, int $type){ 
    $this->intId = $id; $this->intType = $type;
    $campo =  'bankid';
    $sql = "SELECT salesid as sidid FROM ms_sales 
      WHERE $campo = $this->intId and companyid =$this->co";
    return $this->select_all($sql);
  }

  public function delData(int $id){
    $this->intId = $id;  
    #primero las subcats
    $sql ="DELETE FROM ms_data WHERE dad = $this->intId and companyid=$this->co";
    $this->delete($sql);
    $sql ="DELETE FROM ms_data 
    WHERE dataid = $this->intId and companyid=$this->co";
    return $this->delete($sql);
  }
}?>