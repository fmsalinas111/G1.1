<?php 
  headerAdmin($data); getModal('modal',$data);  getModal('modal2',$data); 
?>

  <main  class="simple">
    <div class="app-title">
      <div class="row">
        <h1 id="title" style="float: left; margin-right: 20px;"><i class="fa fa-user-tag"></i> </h1>
          <button accesskey="n" id="btnNuevo" class="btn btn-primary" type="button">
          <i class="fas fa-plus-circle"></i> Nuevo  </button>
          <div id="animate" style="display: none;"></div>
          <input type="hidden" id="xst">   
          <label class="mt-2 chk-subcat d-none"  style="color: blue; font-size: small;">&nbsp&nbsp&nbsp
              <input type="checkbox" id="chksubcat" >subcategorías </label>
      </div>
      <ul class="app-breadcrumb breadcrumb d-none">
        <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
        <li class="breadcrumb-item"><a href="<?= base_url();  ?>datos"><?=$data['page_tag'];  ?></a></li>
      </ul>      
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <div class="tile-body">              
            <div class="table-responsive">
              <table class="table table-hover table-bordered" id="tableDatos" co="<?=$_SESSION["userid"]; ?>">
                <thead>
                  <tr>
                    <th>id</th>
                    <th id="dName">Nombre</th>
                    <th>Descripción</th>
                    <th id="dPrecio_Saldo">Balance</th>
                    <th class="text-center">status</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </main>
<script type="text/javascript"></script>
<?php 
  $appmod=$data['page_appmodules'];
  $ico = $_SESSION['idcompany'];
  echo "<script> 
      const iCo = $ico;
      const appMod='$appmod'; 
  </script>";
  footerAdmin($data); 
?>

