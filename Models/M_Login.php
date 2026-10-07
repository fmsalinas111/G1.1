<?php 
	class M_Login extends Mysql{
		public function __construct(){			parent::__construct();		}
    public function obtenerUsuario(string $campo1, string $campo2){
      $this->strCampo1 = $campo1;  $this->strCampo2 = $campo2;
      
      /*$sql = "SELECT ms_users.userid, username, email, lastprojid, projectname, modules, 
         `status`, companyuser, suar, rol as rid, ROL.dataname as rolName, 
          ROL.datadescription as allowed, defaults as defa
          FROM `ms_users`
          left JOIN ms_projects  ON ms_users.lastprojid = ms_projects.projectid
          left join ms_data ROL ON ROL.dataid=rol
          WHERE (username='$this->strCampo1' or email='$this->strCampo1') 
          AND password='$this->strCampo2'";*/
          //echo $sql.'<hr>';
      $sql = "
          SELECT PU.projectid AS pbProj, PU.lastCo AS pbuLastCo, C.companyname, C.`description`, 
          BC.address ,
          C.companylogo AS logo, C.`page`, productconfig, U.userid, username, U.email, U.lastprojid AS uLastPr, projectname AS projName, modules AS mods, `status` AS stt, companyuser, suar, U.rol as rid, ROL.dataname as rolName, ROL.datadescription as allowed, defaults as defa 
          FROM `ms_users` U 
          JOIN ms_projects P ON U.lastprojid = P.projectid 
          left join ms_data ROL ON ROL.dataid=rol 
          left JOIN ms_projbyuser PU ON PU.userid = U.userid 
          JOIN ms_companies C ON C.companyid = PU.lastCo 
          JOIN ms_bcard BC ON BC.companyid = C.companyid
      
          WHERE (username='$this->strCampo1' or U.email='$this->strCampo1') 
          AND password='$this->strCampo2'
          AND U.lastprojid = PU.projectid
          ";
      //echo $sql;
      $request = $this->select($sql);
      return $request;
    }

    public function obtenerCo(int $projid, int $userid){
      $this->intProjid = $projid;      $this->intUserid = $userid;

      $sql = "SELECT companyid as coId , companyname as coName 
      FROM ms_projbyuser INNER JOIN ms_companies
      ON ms_projbyuser.lastCo = ms_companies.companyid
      WHERE projectid = $this->intProjid AND ms_projbyuser.userid = $this->intUserid";
      $request = $this->select($sql);
      echo $sql;
      return $request;
    }    

    public function selectCompany(int $id){
      $this->intId = $id;
      $sql = "SELECT * FROM ms_companies WHERE companyid = $this->intId";
      $request = $this->select($sql);
      return $request;
    }

	} ?>