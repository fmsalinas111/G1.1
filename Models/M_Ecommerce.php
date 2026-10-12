<?php 
	class M_Ecommerce extends Mysql{		
    public function __construct(){			parent::__construct();		}
    public function selectProducts(int $iCo)  {
      $sql = "
      SELECT productid as prid, productname as producto, brand, categoryid, D.dataname AS marca, D2.dataname AS categoria, price AS precio, factor as multiplo,
        if(ISNULL(imagename), 'noimage.jpg', imagename) AS image
        FROM ms_products P
        LEFT JOIN ms_data D ON D.dataid = P.brand
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
        WHERE P.companyid =  $iCo";          
      $request = $this->select_all($sql);
      return $request;
    } 

    public function selectProducts5(int $iCo, int $pl)  {
      $and="P.companyid =  $iCo  AND P.prodtype=1 AND NOT(P.`inactive`)";
      if ($pl==0) { 
        $sql = "
        SELECT productid as id, productname as name, description as `desc`,
          D.dataname AS marca, D2.dataname AS categoria, P.price, factor as multiplo, bline, 
          if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img,
          coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice 
          FROM ms_products P
          LEFT JOIN ms_data D ON D.dataid = P.brand
          LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
          LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
          WHERE $and";
      }else{
        $sql = "
        SELECT productid as id, productname as name, description as `desc`, 
         PL.`list`, PL.price AS price ,
        
        D.dataname AS marca, D2.dataname AS categoria, factor as multiplo, bline, 
        if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img,
        coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice 
        FROM ms_products P 
        LEFT JOIN ms_data D ON D.dataid = P.brand 
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid 
        LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
        WHERE $and AND PL.`list`=$pl";
      }
      //echo $sql.'<hr>';
      $request = $this->select_all($sql);
      return $request;
    } 


    public function selectProducts6(int $iCo, int $pl)  {
      $and="P.companyid =  $iCo  AND P.prodtype=1 AND NOT(P.`inactive`)";
      if ($pl==0) { //creo que es price list ;|
        $sql = "
        SELECT productid as id, productname as name, description as `description`,
          D.dataname AS marca, COALESCE( D2.dataname,'S/C') AS category, P.price, factor as multiplo, bline as specs, 
          if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS images,          
          coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice 
          FROM ms_products P
          LEFT JOIN ms_data D ON D.dataid = P.brand
          LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
          LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
          WHERE $and";
      }else{
        $sql = "
        SELECT productid as id, productname as name, description as `desc`, 
         PL.`list`, PL.price AS price ,
        
        D.dataname AS marca, D2.dataname AS category, factor as multiplo, bline, 
        if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img,
        coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice 
        FROM ms_products P 
        LEFT JOIN ms_data D ON D.dataid = P.brand 
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid 
        LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
        WHERE $and AND PL.`list`=$pl";
      }
      //echo $sql.'<hr>';
      $request = $this->select_all($sql);
      return $request;
    } 

    public function selProducTEX(int $iCo, int $pl){
      
      $and="P.companyid =  $iCo   ";// AND P.prodtype=1 AND NOT(P.`inactive`)
      if ($pl==0) { 
        /*$sql = "
        SELECT productid as id, productname as name, description as `desc`, 
          D.dataname AS marca, D2.dataname AS subcat, SCAT.dataname AS categ,
          price, factor as multiplo, bline, 
          if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img 
          FROM ms_products P 
          LEFT JOIN ms_data D ON D.dataid = P.brand 
          LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid 
          LEFT JOIN ms_data SCAT ON SCAT.dataid=D2.dad
          WHERE $and
          ORDER BY categ, subcat";*/
          $sql = "SELECT CONCAT_WS ('_', DAD.dataname, P.categoryid) AS dd, 
            DAD.dataname AS subCateg, CAT.dataname AS dad,
            productname as name, COL.dataname as color,  input, P.productid as id, inventoryid as invid, P.price, I.refe as bline, 1 as multiplo,
            if(ISNULL(imagename) OR imagename='', 'noimage.jpg', imagename) AS img  
            FROM ms_inventory I 
            LEFT JOIN ms_data COL ON COL.dataid= I.color 
            left JOIN ms_products P ON P.productid=I.productid 
            LEFT JOIN ms_data CAT ON CAT.dataid=P.categoryid 
            left JOIN ms_data DAD ON CAT.dad=DAD.dataid 
            WHERE $and AND output=0 
            ORDER BY dd, subCateg, dad, productname, COL.dataname "  ;
      }else{
        $sql = "
        SELECT productid as id, productname as name, description as `desc`, 
         PL.`list`, PL.price AS price ,
        
        D.dataname AS marca, D2.dataname AS categoria, factor as multiplo, bline, 
        if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img 
        FROM ms_products P 
        LEFT JOIN ms_data D ON D.dataid = P.brand 
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid 
        LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
        WHERE $and AND PL.`list`=$pl";
      }
      //echo $sql;
      $request = $this->select_all($sql);
      return $request;
    } 


    public function selectCategory(int $iCo)  {
      $sql = "SELECT distinctrow D2.dataname AS categoria
        FROM ms_products P
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
        WHERE P.companyid =  $iCo
        ORDER BY categoria ";      //echo $sql;              
      return $this->select_all($sql);
    } 
 
    public function selectPagedetails(int $bcard, string $section)  {
      /*Transpose      $sql = "SELECT  code, GROUP_CONCAT(line, pagetext SEPARATOR ' | ') as recivers  FROM ms_page2 GROUP BY CODE"  ;      */
      $this->Bcard = $bcard;
      $sql = "SELECT * FROM ms_page2
        WHERE bcard=$this->Bcard";
      $request = $this->select_all($sql);
      return $request;
    } 

    public function selTicket(int $sid)  {
      $this->Sid = $sid;
      $sql = "select productname as producto, D.quantity as cantidad, D.price as precio, 
          (D.quantity* D.price) AS total
          FROM ms_sales  SA
          INNER JOIN ms_details D ON D.salesid = SA.salesid
          INNER JOIN ms_products P ON P.productid = D.productid
          WHERE SA.salesid = $this->Sid";
      $request = $this->select_all($sql);
      return $request;
    } 

  public function selTicketClient(int $id){
    $this->Id = $id;
    $sql = "select salesid as sid, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as fecha, salesdate as ffecha, 
      DATE_FORMAT(duedate, '%d-%m-%Y') as due, duedate as fdue, 
      CONCAT_WS (' ', clientname, clientlastname) AS fullname,
      amount
      FROM ms_sales  SA
      INNER JOIN ms_clients C ON C.clientid = SA.clientid 
      WHERE salesid = $this->Id";
    return $this->select($sql);
  }


    public function setPagedetails(int $id, string $texto, int $bid, string $code){
      $this->Id    = $id;     $this->Texto = $texto;
      $this->Bcard = $bid;    $this->Code  = $code;
      $this->IdCo  = $_SESSION['idcompany'];

      $sql = "SELECT * from ms_page2 P2 
      WHERE P2.bcard=$this->Bcard AND P2.code ='$this->Code'";
      $request = $this->select_all($sql);
      if (empty($request)){
        $sql = "INSERT INTO ms_page2 (pagetext, bcard, code, companyid) values(?,?,?,?)";
        $arrData = array($this->Texto, $this->Bcard,$this->Code, $this->IdCo );
        $request = $this->insert($sql, $arrData);
      }else{
        $sql = "UPDATE ms_page2 set pagetext=?
        WHERE bcard=$this->Bcard AND `code` ='$this->Code'";
        $arrData = array($this->Texto);
        $request = $this->update($sql, $arrData);
      }
      return $request;
    } 

    public function setAlturaImagen(int $id, int $bid, string $code){
      $this->Id = $id;
      $this->Bcard = $bid;
      $this->Code = $code;

      $sql = "UPDATE ms_bcard set heightimageproduct=?
      WHERE bcardid=$this->Bcard";
      $arrData = array($this->Id);
      $request = $this->update($sql, $arrData);
      return $request;
    } 

    public function setSections(int $bid, string $sections){
      $this->Bcard = $bid;
      $this->Sections = $sections;

      $sql = "UPDATE ms_bcard set sections=?
      WHERE bcardid=$this->Bcard";
      $arrData = array($this->Sections);
      $request = $this->update($sql, $arrData);
      return $request;
    } 

    public function selectCarousel(int $idCo)  {
      $this->IdCo = $idCo;
      
              //left JOIN ms_bcard P ON P.companyid=B.companyid
      $sql = "SELECT * FROM ms_banner B
              WHERE B.companyid=$this->IdCo";
      $request = $this->select_all($sql);
      
      return $request;
    } 

    public function setBanner(int $id, string $burl, int $outst, string $target){
      $this->Id    = $id;
      $this->Burl  = $burl;
      $this->Outst = $outst;
      $this->Target= $target;
      $this->IdCo= $_SESSION['idcompany'];
      if ($id==0) {//new
        $sql = "INSERT INTO ms_banner (bannerurl, outstanding, target, companyid) values(?,?,?,?)";
        $arrData = array($this->Burl, $this->Outst,$this->Target,$this->IdCo );
        $request = $this->insert($sql, $arrData);
      }else{//updt
        $sql = "UPDATE ms_banner set bannerurl=?,outstanding=?,target=?
        WHERE bannerid=$this->Id";
        $arrData = array($this->Burl, $this->Outst,$this->Target);
        $request = $this->update($sql, $arrData);
      }
      return $request;
    } 
    
    
    
    
  //----------------    
	}

 ?>
