<?php 
class M_Companies extends Mysql{
  public function __construct()	{parent::__construct();}  
	public function selectEmpresas()	{    
    $sql="SELECT CO.companyid as coId, CO.companyname as coName, description as coDes,
      userid, projid, BC.cardstatus,
      IFNULL(companylogo, '') AS logo, productconfig, BC.city, BC.cardstatus 
      FROM ms_companies CO
      LEFT JOIN ms_bcard BC ON BC.companyid= $this->co 
      WHERE userid=$this->usr and projid = ".APP();

		$request = $this->select_all($sql);
    //echo $sql;
		return $request;
	}	

  public function selectEmpresaBySuar(int $id){
    $this->intId = $id;
    $sql = "SELECT * FROM ms_companies Co
    LEFT JOIN ms_users U ON U.`password` = Co.page WHERE suar = $this->intId and projid=5";
    $request = $this->select($sql); //echo $sql;
    return $request;
  }

  public function in_updEmpresa(int $id, string $campo1 , string $campo2, string $img, bool $isgalery, int $city  ){
    $this->intId = $id;                   $this->strCampo1 = $campo1;
    $this->strCampo2 = $campo2;           $this->Img = $img;
    $this->City = $city;
    $this->intProjId=$_SESSION['app'];    $this->intUserid=$_SESSION["userid"];

    if ($id==0) {# new
      if($isgalery){
        $sql ="SELECT companyid as cid FROM ms_companies LIMIT 1";        
        $requestG = $this->select($sql); # el menor de los negativos
        //add gallery
        $sql ="INSERT INTO ms_companies (companyname, `description`, projid, userid, companylogo, `page`, companyid) VALUES(?,?,?, ?,?,?, ?)";
        $arrData = array($this->strCampo1, $this->strCampo2, $this->intProjId, $this->intUserid, $this->Img, $this->strCampo1, $requestG['cid']-1);         
        $request = $this->insert($sql, $arrData);
        //add msbcard
        $sql ="INSERT INTO ms_bcard (companyname,companyid, city)  VALUES(?,?,?)";
        $arrData = array($this->strCampo1, $requestG['cid']-1, $this->City);    
        $this->insert($sql, $arrData);
      }else{
        $sql ="INSERT INTO ms_companies (companyname, description, projid, userid, companylogo) VALUES(?,?,?,?,?)";
        $arrData = array($this->strCampo1, $this->strCampo2, $this->intProjId, $this->intUserid, $this->Img); 
        $request = $this->insert($sql, $arrData);
      }

    }else{# upd
      $sql = "UPDATE ms_companies SET companyname = ?, description  = ?, companylogo=?
      WHERE companyid = $this->intId";
      $arrData = array($this->strCampo1, $this->strCampo2, $this->Img);
      $request = $this->update($sql, $arrData);
      /*
      if ($request) {
        $_SESSION['company'] = $this->strCampo1;
        $_SESSION['companyDescription'] = $this->strCampo2;
        $_SESSION['logo'] = $this->Img;
      }    */    
    }
    return $request;
  }
  
  public function upd_sttBcard(int $id, int $stt){  
    $this->intId = $id; $this->Stt = $stt;
      $sql = "UPDATE ms_bcard SET cardstatus = ? WHERE companyid = $this->intId";
      $arrData = array($this->Stt); return $this->update($sql, $arrData);
  }
  
  public function deleteEmpresa(int $id){
  	$this->intId = $id;
  	$sql = "SELECT * from ms_users WHERE userid = $this->intId";
  	$request = $this->select_all($sql);
  	if (empty($request)) {
  		$sql = "UPDATE ms_users SET status = ? WHERE userid = $this->intId";
  		$arrData = array(0);
  		$request = $this->update($sql,$arrData);
  		if ($request) {
  			$request = 'ok';
  		}else{
  			$request = 'error';
  		}
  	}else{
  		$request = 'exist';
  	}
  	return $request;
  }

  public function establecerEmpresa(int $campo1 , int $campo2, int $campo3){
    //$this->intId = $id;
    $this->intCampo1 = $campo1;    $this->intCampo2 = $campo2;    $this->intCampo3 = $campo3;
    //$this->intCompany = $_SESSION["idcompany"];
      $sql = "UPDATE ms_projbyuser SET lastCo = ?
      WHERE userid = $this->intCampo2 AND projectid = $this->intCampo3";
      $arrData = array($this->intCampo1);
      $request = $this->update($sql, $arrData);        
    return $request;
  }

  public function selectCards(int $gallery)  {
    if ($gallery==0) $galerias_bcard=' WHERE CARD.companyid>0 AND Co.projid<>6 ';
    else $galerias_bcard = " WHERE CARD.companyid = $gallery AND Co.projid<>6 ";
    if ($gallery==-99) $galerias_bcard=' WHERE CARD.companyid<-1 ';
    //$idCo= $_SESSION['company'];
    $order = "order by city, empresa";
    if (server()==='www.villacelina.com.ar') $order = 'order by empresa';
    $sql = "SELECT CARD.companyid as cId, Co.page AS empresa, address AS direccion, phone as fono, face as fb, insta AS ins, wsp AS whatsapp, web, logo, 
      businesscategory AS rubroid, notes, 
      (SELECT count(B.bcardid) FROM ms_bcard B WHERE B.gallery = CARD.companyid) nroLocales,
      if (isnull(Cat.dataname), '(todos)', Cat.dataname) AS rubro, business_line AS bline, City.dataname as city
      FROM ms_bcard CARD
      LEFT JOIN ms_data Cat ON CARD.businesscategory=Cat.dataid
      LEFT JOIN ms_data City ON CARD.city=City.dataid
      LEFT JOIN ms_companies Co ON Co.companyid=CARD.companyid
       $galerias_bcard 
      AND CARD.cardstatus 
      AND LENGTH( CARD.companyname)>0 $order";
        
    //echo "sql: ".$sql.'<br>';
    $request = $this->select_all($sql);
    return $request;
  } 

  public function selCardsByGallery(int $gallery)  {
    $sql = "SELECT CARD.companyid as cId, CARD.companyname AS empresa, address AS direccion, phone as fono, face as fb, insta AS ins, wsp AS whatsapp, web, logo, twitter as twt, email as mail, businesscategory AS rubroid, notes, plan, `business_line` as bline,
      if (isnull(dataname), '(todos)', dataname) AS rubro
      FROM ms_bcard CARD
      LEFT JOIN ms_data Cat ON CARD.businesscategory=Cat.dataid
      LEFT JOIN ms_companies Co ON Co.companyid=CARD.companyid
      WHERE gallery = $gallery
      AND CARD.cardstatus 
      AND LENGTH( CARD.companyname)>0
      order by city, empresa";
    //echo $sql;
    $request = $this->select_all($sql);
    return $request;
  } 
  public function selectBcard(int $id){
    $this->intId = $id;
    $sql = "SELECT 
          BC.bcardid AS bcid, BC.companyname AS coName, BC.address AS direccion,
          BC.face, BC.insta, BC.twitter, BC.tiktok, BC.phone, BC.wsp, BC.web, BC.email,
          BC.city AS ciudad, BC.gallery AS galeria, BC.businesscategory,
          BC.notes as reseña, BC.cardstatus as stt, BC.business_line AS bline,
          CO.companylogo AS logo, 
          CO.razonsocial as razon, CO.cuit, CO.categiva as iva, CO.iibb, CO.inicact as inicio
      FROM ms_bcard BC
      LEFT JOIN ms_companies CO ON CO.companyid=BC.companyid
      WHERE BC.companyid = $this->intId";
      //echo $sql;
    return  $this->select($sql);
  }

  public function selMyBlines(){
    $this->intCo = CO();
    $sql = "SELECT BC.business_line as blines 
            FROM ms_bcard BC WHERE companyid = $this->intCo";
          //echo $sql.'<br>';
    return  $this->select($sql);
  }

  public function selBlineBy(int $id){
    $this->intId = $id;
    $sql = "SELECT BC.business_line as bline
    FROM ms_bcard BC WHERE companyid = $this->intId";
    //echo $sql;
    return  $this->select($sql);
  }
  public function updateBcard(int $id, string $coName, int $rubro, string $address, string $twitter, string $face, string $insta, string $wsp, string $web, string $tel, string $email, int $stt, string $notes, int $gallery, string $bline, int $city, string $tiktok){

    $this->intId  = $id; //companyid
    $this->Coname = $coName;    $this->Rubro  = $rubro;    $this->Address= $address;   
    $this->Twitter= $twitter;   $this->Face   = $face;      $this->Insta  = $insta;
    $this->Wsp    = $wsp;       $this->Web    = $web;    $this->Tel    = $tel;       
    $this->Email  = $email;    $this->Stt    = $stt;       $this->Notes  = $notes;
    $this->Gallery  = $gallery; //($this->intId<0)?$gallery:0;
    $this->Bline  = $bline;    $this->City  = $city;    $this->Tiktok  = $tiktok;

    $sql = "UPDATE ms_companies SET page=?, companyname=?
    WHERE companyid = $this->intId";
    $arrData = array($this->Coname,$this->Coname);
    $request = $this->update($sql, $arrData);
    
    if (!$request) return $request;
      
    $_SESSION['company']=$this->Coname;
    //$_SESSION['page']=$this->Coname;
    $sql = "SELECT * FROM ms_bcard WHERE companyid = $this->intId";
    $request = $this->select_all($sql);
    if ($request) {  // si existe, actualizar
      $sql = "UPDATE ms_bcard SET companyname=?, address=?, face=?, insta=?,
      wsp=?, web=?, phone=?, email=?, twitter=?, businesscategory=?, cardstatus=?, notes=?, business_line=?, city=?, gallery=?, tiktok=?
      WHERE companyid = $this->intId";
      $arrData = array($this->Coname, $this->Address, $this->Face, $this->Insta, $this->Wsp, $this->Web, $this->Tel, $this->Email, $this->Twitter, $this->Rubro, $this->Stt, $this->Notes, $this->Bline, $this->City, $this->Gallery, $this->Tiktok);
      $request = $this->update($sql, $arrData);

    }else{ //insert
      $query_insert ="INSERT INTO ms_bcard (companyid, companyname, address, face, insta, wsp, web, phone, email, twitter, businesscategory, cardstatus, notes, gallery, business_line, city, tiktok) 
      VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?)";
      $arrData = array($this->intId, $this->Coname, $this->Address, $this->Face, $this->Insta, $this->Wsp,  $this->Web, $this->Tel, $this->Email, $this->Twitter, $this->Rubro, $this->Stt, $this->Notes, $this->Gallery, $this->Bline, $this->City, $this->Tiktok ); 
      $request = $this->insert($query_insert, $arrData);
      //print_r($arrData);
    }
    //echo $sql.'<br>';    print_r($arrData);
    return $request;
  }

  public function updtBcard(string $coName, int $rubro, string $address, 
      string $twitter, string $face, string $insta, string $wsp, string $web, 
      string $tel, string $email, int $stt, string $notes, int $gallery, string $bline, 
      int $city, string $tiktok, 
      string $razon, string $cuit, int $iva, string $ingbrutos, string $inicio ){

    $this->Coname = $coName;    $this->Rubro  = $rubro;     $this->Address= $address;   
    $this->Twitter= $twitter;   $this->Face   = $face;      $this->Insta  = $insta;
    $this->Wsp    = $wsp;       $this->Web    = $web;       $this->Tel    = $tel;       
    $this->Email  = $email;     $this->Stt    = $stt;       $this->Notes  = $notes;
    $this->Gallery= $gallery; //($this->intId<0)?$gallery:0;
    $this->Bline  = $bline;     $this->City   = $city;      $this->Tiktok = $tiktok;
    $this->Razon  = $razon;     $this->Cuit   = $cuit;      $this->Iva    = $iva;
    $this->IIBB   = $ingbrutos; $this->Inicio = $inicio;      
    
    $sql = "UPDATE ms_bcard SET companyname=?, address=?, face=?, insta=?,
        wsp=?, web=?, phone=?, email=?, twitter=?, businesscategory=?, cardstatus=?, 
        notes=?, business_line=?, city=?, gallery=?, tiktok=?
      WHERE companyid = $this->co";
    $arrData = array($this->Coname, $this->Address, $this->Face, $this->Insta, 
        $this->Wsp, $this->Web, $this->Tel, $this->Email, $this->Twitter, $this->Rubro, 
        $this->Stt, $this->Notes, $this->Bline, $this->City, $this->Gallery, $this->Tiktok
        );
    $request = $this->update($sql, $arrData);

    //si rubro==13, cambiar los projid en companies, y donde haga falta, tambien productconfig, APP
    $proj = ($this->Rubro==13)? '001001':'001011' ;
    $sql = "UPDATE ms_companies SET page =?, companyname=?,
        razonsocial=?, cuit=?, categiva=?, iibb=?, inicact=?, projid=?, productconfig=? 
      WHERE companyid = $this->co";
    $arrData = array($this->Coname,$this->Coname, $this->Razon, $this->Cuit, $this->Iva, 
          $this->IIBB, $this->Inicio, $this->Rubro, $proj);
    $request = $this->update($sql, $arrData);
    #en el caso de cambio de rubro.. o proj...
    $sql = "UPDATE ms_users SET lastprojid =?  WHERE userid = $this->usr";
    $arrData = array($this->Rubro);
    $request = $this->update($sql, $arrData);

    $sql = "REPLACE INTO ms_projbyuser (userid, projectid, lastCo) VALUES (?,?,?)";    
    $arrData = array($this->usr, $this->Rubro,$this->co );
    $request = $this->update($sql, $arrData);

    $_SESSION['company']=$this->Coname;
    $_SESSION['app'] = $this->Rubro;
    $_SESSION['productconfig'] = $proj;

      //echo $sql.'<br>';    print_r($arrData);
    return $request;
  }
  public function updateLogoCo(int $id, string $nombre){
    if ($id==0) $id= $_SESSION['idcompany'];
    $this->intId = $id;   $this->strCampo1 = $nombre; 
    $sql = "UPDATE ms_companies SET companylogo=? WHERE companyid = $this->intId";
    $arrData = array($this->strCampo1); $request = $this->update($sql, $arrData);
    return $request;
  }

  public function updateLogoBCard(string $nombre){
    $this->strCampo1 = $nombre; 
    $this->IdCo= $_SESSION['idcompany'];
    $sql = "UPDATE ms_bcard SET logo=? WHERE companyid = $this->IdCo";
    $arrData = array($this->strCampo1); $request = $this->update($sql, $arrData);
    return $request;
  }

  public function updteTemplate(string $template){
    $this->Template = $template; $this->IdCo= $_SESSION['idcompany'];
    $sql = "UPDATE ms_companies SET template=? 
    WHERE companyid = $this->IdCo";
    $arrData = array($this->Template);
    return $this->update($sql, $arrData);
  }

  public function verifyPagename(string $nombre){
    $this->Nombre = $nombre; 
    $this->IdCo= $_SESSION['idcompany'];
    $nomfile='Views/'.$this->Nombre.'.php';

    $patron="/^[A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9;._*$%!()\/-]+$/";
    if (preg_match($patron, $nombre)==0) return 'No permitido';
    if (file_exists($nomfile)) return 'No disponible';
    if (strpos($this->Nombre," ")>0) return 'No disponible';
    //echo (strlen(strpos($this->Nombre, " ")>0);
    //if (strlen(strpos($this->Nombre, " ")>0) return 'No disponible';
    $sql = "SELECT page from ms_companies 
    WHERE page = '$this->Nombre' AND companyid<>$this->IdCo";
    $request = $this->select_all($sql);
    if (empty($request)) $request='permitido';else $request='No disponible';
    return $request;
  }

}?>